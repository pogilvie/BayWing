'use strict';

let sqlite3 = require('sqlite3'),
         db = new sqlite3.Database('./db/hawks', sqlite3.OPEN_READWRITE),
      async = require('async'),
    jsforce = require('jsforce'),
         fs = require('fs'),
          c = new jsforce.Connection();

const      ftsHawksSQL = 'select name, bandNumber, salesforceID, owner, breeder from Hawks where length(salesforceID) > 0',
      lookupContactSQL = 'select salesforceID from Contacts where rowid = ?';

fs.readFile('./cred.json', function (err, credjson) {

      let cred = JSON.parse(credjson);

      c.login(cred.username, cred.password + cred.token, function(err, res) {

          if (err)
              throw err;

          db.each(ftsHawksSQL, function (err, qhawk) {

              async.parallel(
              [
                  function (done) {
                      db.get(lookupContactSQL, qhawk.owner, function (err, r) {

                          if (err)
                              throw err;

                          if (r == undefined)  {// no owner set this hawk
                              done(`No owner set for: ${qhawk.bandNumber}`);
                          }
                          else {
                              done(null, r.salesforceID);
                          }
                      });
                  },
                  function (done) {
                      db.get(lookupContactSQL, qhawk.breeder, function (err, r) {

                          if (err)
                            throw err;

                          if (r == undefined) { // no breeder set for this hawk
                             done(`No breeder set for: ${qhawk.bandNumber}`);
                          }
                          else {
                              done(null, r.salesforceID);
                          }
                      });
                  }
              ],
              function (err, results) {

                  if (err)
                      console.log(err);
                  else
                      console.log(results);
              });
          });
      });
});
