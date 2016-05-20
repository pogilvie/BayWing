'use strict';

let      async = require('async'),
       sqlite3 = require('sqlite3'),
            db = new sqlite3.Database('./db/hawks', sqlite3.OPEN_READWRITE);

const    ftsSQL = 'select * from HawksJoined',    // FTS of HawksJointed to pull all contacts.
  newContactSQL = 'insert into ContactList (firstName, lastName, fullName) values (?,?,?)',
            rqs = 2;                             // number of outstanding conncurrent requests

var outstanding = 0;

function contactFactory(fullName) {
    var names = fullName.split(';');

    if (names.length == 2) {

        return {firstName : names[1].trim(),
                 lastName : names[0].trim(),
                 fullName : fullName.trim()};
    }
    return {};

}

let newContactQ = async.queue(function (data, done) {

    db.run(newContactSQL, [data.firstName, data.lastName, data.fullName], function (err) {

        if (err)
            throw err;

        console.log(`Completed ${--outstanding}`);

        done();
    });

}, rqs);

console.log('starting FTS of HawksJointed table');


db.all(ftsSQL, function (err, rows) {

    if (err)
        throw err;

    rows.forEach(function (row) {
        newContactQ.push(contactFactory(row.owner));
        newContactQ.push(contactFactory(row.breeder));
        outstanding += 2;
        console.log(`Completed ${outstanding}`);

    });
});
