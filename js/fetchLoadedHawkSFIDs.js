'use strict';

// Save SalesforceID's for all loaded Hawks

let   fs = require('fs'),
 sqlite3 = require('sqlite3'),
 jsforce = require('jsforce'),
   async = require('async'),
       c = new jsforce.Connection(),
      db = new sqlite3.Database('./db/hawks', sqlite3.OPEN_READWRITE);

const rqs = 2,
      updateSQL = 'update Hawks set salesforceID = ? where bandNumber = ?';

var doneCount = 0;

let work = async.queue(function (data, done) {

    db.run(updateSQL, [data.salesforceID, data.bandNumber], function (err) {

        if (err)
            throw err;

        console.log(`insert ${++doneCount}:${data.salesforceID}:${data.bandNumber}`);

        done();

    });

}, rqs);

fs.readFile('./cred.json', function (err, credjson) {

    let cred = JSON.parse(credjson);

    c.login(cred.username, cred.password + cred.token, function(err, res) {

        c.query("SELECT Id, bandNumber__c FROM Hawk__c", function(err, results) {

            if (err)
                return console.error(err);

            results.records.forEach(function (record) {

                work.push({salesforceID: record.Id, bandNumber: record.bandNumber__c});

            });
        });
    });
});
