'use strict';

let       fs = require('fs'),
     sqlite3 = require('sqlite3'),
     jsforce = require('jsforce'),
       async = require('async'),
           c = new jsforce.Connection(),
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

async.parallel([createContactMap, createHawkMap], function (err, results) {

    if (err)
        throw err;

    let contactMap = results[0], hawkMap = results[1];

    //16:0036100000bfi4lAAA
    console.log(`Contact:${contactMap(16)}`);

    // RW081357:a0i61000001xfG8AAI
    console.log(`Hawk:${hawkMap('RW081357')}`);

});
