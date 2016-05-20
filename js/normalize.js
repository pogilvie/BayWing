'use strict';

let      async = require('async'),
       sqlite3 = require('sqlite3'),
            db = new sqlite3.Database('./db/hawks', sqlite3.OPEN_READWRITE);

const  ftsSQL  = 'select * from Hawks',   // FTS of Hawks table to find bandNumber for each hawk.
      fKeysSQL = 'select bandFather, bandMother from HawksJoined where bandNumber = ?',
     updateSQL = 'update Hawks set bandFather = ?, bandMother = ? where bandNumber = ?',
           rqs = 2;                       // number of outstanding conncurrent requests

var doneCount = 0;

let work = async.queue(function (data, done) {

    db.run(updateSQL, [data.bandFather, data.bandMother, data.bandNumber], function (err) {

        if (err)
            throw err;

        console.log(`Completed ${++doneCount}`);

        return done();
    });

}, rqs);

console.log('starting FTS of Hawks table');


let fKeysStmt = db.prepare(fKeysSQL, function (err) {

    if (err)
        throw err;

    db.each(ftsSQL, function (err, row) {

        if (err)
            throw err;

        fKeysStmt.get(row.bandNumber, function(err, hjRow) {

            if (err)
                throw err;

            work.push({bandNumber : row.bandNumber,
                       bandFather : hjRow.bandFather,
                       bandMother : hjRow.bandMother});

        });
    });
});
