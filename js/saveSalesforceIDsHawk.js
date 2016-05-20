'use strict';

let sqlite3 = require('sqlite3'),
         db = new sqlite3.Database('./db/hawks', sqlite3.OPEN_READWRITE),
      async = require('async'),
    jsforce = require('jsforce'),
         fs = require('fs'),
          c = new jsforce.Connection(),
  updateSQL = 'update Hawks set salesforceID = ? where bandNumber = ?',
        rqs = 2;  // number of outstanding requests to sqlite

let work = async.queue(function (data, done) {

    db.run(updateSQL, data.salesforceID, data.rowid, function (err) {
        console.log(`update Hawk ${data.bandNumber}:${data.salesforceID}`);
        done();
    });

}, rqs);

fs.readFile('./cred.json', function (err, credjson) {

    let cred = JSON.parse(credjson);

    c.login(cred.username, cred.password + cred.token, function(err, res) {

        if (err)
            throw err;

        c.query('SELECT Id, bandNumber__c FROM Hawk__c', function (err, allSFHawks) {

            if (err)
                throw err;

            allSFHawks.records.forEach(function(r) {

                work.push({salesforceID: r.Id, bandNumber: r.bandNumber__c})

            });
        });
    });
});
