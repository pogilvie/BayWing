'use strict';

let       jsforce = require('jsforce'),
          sqlite3 = require('sqlite3'),
               db = new sqlite3.Database('./db/hawks', sqlite3.OPEN_READONLY),
               fs = require('fs'),
                c = new jsforce.Connection();

const getByIdSQL = 'select rowid,fullName,lastName,firstName from Contacts where rowid = 10',
      HarrisHawk = '00561000000cPxcAAE';

fs.readFile('./cred.json', function (err, credjson) {

    let cred = JSON.parse(credjson);

    c.login(cred.username, cred.password + cred.token, function(err, res) {

        if (err)
            throw err;

        db.each(getByIdSQL, function (err, row) {

            console.log(row);

            if (err)
                throw err;

            c.sobject("Contact").create(
                { FirstName : row.firstName,
                   LastName : row.lastName,
                   rowid__c : row.rowid,
                    OwnerId : HarrisHawk
                }, function (err, r) {

                        if (err)
                            throw err;

                        console.log(`Created Salesforce contact ${r.id}: ${row.firstName} ${row.lastName} rowid:${row.rowid}`);
                    }
            );
        });
    });
});
