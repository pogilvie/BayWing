'use strict';

let sqlite3 = require('sqlite3'),
         db = new sqlite3.Database('./db/hawks', sqlite3.OPEN_READWRITE),
      async = require('async'),
    jsforce = require('jsforce'),
         fs = require('fs'),
          c = new jsforce.Connection(),
  updateSQL = 'update Contacts set salesforceID = ? where rowid = ?',
        rqs = 2;  // number of outstanding requests to sqlite

let work = async.queue(function (data, done) {

    db.run(updateSQL, data.salesforceID, data.rowid, function (err) {
        console.log(`updatte Contact ${data.rowid}:${data.salesforceID}`);
        done()
    });

}, rqs);

fs.readFile('./cred.json', function (err, credjson) {

    let cred = JSON.parse(credjson);

    c.login(cred.username, cred.password + cred.token, function(err, res) {

        if (err)
            throw err;

        c.query('SELECT Id, rowid__c FROM Contact where rowid__c != null', function (err, allSFContacts) {

            if (err)
                throw err;

            allSFContacts.records.forEach(function(r) {

                work.push({salesforceID: r.Id, rowid: r.rowid__c})

            });
        });
    });
});
