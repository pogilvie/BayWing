'use strict';

let      async = require('async'),
       sqlite3 = require('sqlite3'),
            db = new sqlite3.Database('./db/hawks', sqlite3.OPEN_READWRITE);

const           ftsSQL  = 'select * from HawksOld',   // Find the fullName of Each owner,breeder
      rowidfromFNameSQL = 'select rowid from Contacts where fullName = ?',
              updateSQL = 'update Hawks set owner = ?, breeder = ? where bandNumber = ?',
                    rqs = 2;                       // number of outstanding conncurrent requests
// get each row in the HawksOld table
// --> bandNumber, owner(fullName), breeder(fullName)
//
// Contacts(fullName) ->  rowid  select rowid from Contacts where fullName = 'A Full Name'
// Contacts(fullName)) -> rowid
//
// update Hawks(owner) <- rowid update Hawks(breeder) -> rowid
var doneCount = 0;

let work = async.queue(function (data, done) {

    db.run(updateSQL, [data.rowidOwner, data.rodidBreeder, data.bandNumber], function (err) {

        if (err)
            throw err;

        console.log(data);

        console.log(`Completed ${++doneCount}`);

        return done();
    });

}, rqs);

console.log('starting FTS of HawksOld table');


let getRowidStmt = db.prepare(rowidfromFNameSQL, function (err) {

    if (err)
        throw err;

    db.each(ftsSQL, function (err, row) {   // each Hawk in HawksJoined

        // row.name, row.owner(fullName), row.breeder(fullName)

        if (err)
            throw err;


        async.parallel([
            function(callback) {
                if (row.owner != '') {
                    console.log(row.owner);
                    db.all(rowidfromFNameSQL, row.owner, function (err, rows) {

                        if (err)
                            throw err;

                        console.log(rows);

                        if (rows.length === 0)
                            throw `no row found for row(owner) -${row.owner}-`;

                        if (rows.length > 1)
                            throw `more than one row(owner) for -${row.owner}-`;

                        callback(null, rows[0].rowid);
                    });
                }
            },
            function(callback){
                if (row.breeder != '') {
                    console.log(row.breeder);
                    db.all(rowidfromFNameSQL, row.breeder, function (err, rows) {

                        if (err)
                            throw err;

                        console.log(rows);

                        if (rows.length === 0)
                            throw `no row found for row(breeder) -${row.breeder}-`;

                        if (rows.length > 1)
                            throw `more than one row(breeder) for -${row.breeder}-`;

                        callback(null, rows[0].rowid);
                    });
                }
            }
        ],
        function(err, results){

            if (err)
                throw err;

            if (results.length != 2)
                throw `unexpected number of results ${results.length}`;

            //console.log(results);
            work.push({  bandNumber : row.bandNumber,
                         rowidOwner : results[0],
                       rowidBreeder : results[1]});

        });
    });
});
