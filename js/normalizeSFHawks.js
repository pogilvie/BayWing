'use strict';

let       fs = require('fs'),
     sqlite3 = require('sqlite3'),
     jsforce = require('jsforce'),
       async = require('async'),
          db = new sqlite3.Database('./db/hawks', sqlite3.OPEN_READWRITE);

const ftsContactsSQL = 'select rowid,salesforceID from Contacts',
      loadedHawksSQL = 'select bandNumber, salesforceID from Hawks where length(salesforceID) > 0'

function createContactMap(cb) {
    let m = new Map();

    db.all(ftsContactsSQL, function (err, rows) {

        if (err)
            throw err;

        rows.forEach(function (row) {
            m.set(row.rowid, row.salesforceID);
        });

    });

    cb(null,function (key) {
        return m.get(key);
    });
}

function createHawkMap(cb) {
    let m = new Map();

    db.all(loadedHawksSQL, function (err, rows) {

        if (err)
            throw (err);

        rows.forEach(function(row) {
            m.set(row.bandNumber, row.salesforceID);
        });

        cb(null,function (key) {
            return m.get(key);
        });
    });

}

function getCredentials(cb) {

    fs.readFile('./cred.json', function (err, credjson) {

        if (err)
            throw err;

        cb(null, JSON.parse(credjson));

    });

}

async.parallel([createContactMap, createHawkMap, getCredentials], function (err, results) {

    if (err)
        throw err;

    let contactMap = results[0],
           hawkMap = results[1],
              cred = results[2];

    let  c = new jsforce.Connection();
    c.login(cred.username, cred.password + cred.token, function(err, res) {

        if (err)
            throw err;

        // Update the lookups for each Hawk in Salesforce
        c.query("SELECT Id, bandFather__c, bandMother__c, ownerID__c, breederID__c FROM Hawk__c", function(err, results) {

            if (err)
                return console.error(err);

            results.records.forEach(function (hawkRecord) {

                // {     attributes : [Object],
                //               Id : 'a0i61000001xfGSAAY',
                //    bandFather__c : 'R0035231',
                //    bandMother__c : 'R0103113',
                //       ownerID__c : 7,
                //     breederID__c : 23 },


                c.sobject("Hawk__c")
                 .update({           Id : hawkRecord.Id,
                              father__c : hawkMap(hawkRecord.bandFather__c),
                              mother__c : hawkMap(hawkRecord.bandMother__c),
                           hawkOwner__c : contactMap(hawkRecord.ownerID__c),
                             breeder__c : contactMap(hawkRecord.breederID__c)
                         },
                  function(err, ret) {
                      if (err || !ret.success)
                          return console.error(err, ret);

                      console.log('Updated Successfully : ' + ret.id);
                });
            });
        });
    });
});
