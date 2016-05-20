'use strict';

let       jsforce = require('jsforce'),
          sqlite3 = require('sqlite3'),
               db = new sqlite3.Database('./db/hawks', sqlite3.OPEN_READONLY),
               fs = require('fs'),
                c = new jsforce.Connection();

const FTScontactsSQL = 'select rowid,lastName,firstName from Contacts',
          HarrisHawk = '00561000000cPxcAAE';

fs.readFile('./cred.json', function (err, credjson) {

    let cred = JSON.parse(credjson);

    c.login(cred.username, cred.password + cred.token, function(err, res) {

        if (err)
            throw err;

        db.each(FTScontactsSQL, function (err, row) {

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
/*
Created Salesforce contact 0036100000bfhzpAAA: Michael Hicks rowid:754
Created Salesforce contact 0036100000bfi7RAAQ: Justin Monroe rowid:756
Created Salesforce contact 0036100000bfi5hAAA: Billy Waterman rowid:735
Created Salesforce contact 0036100000bfi4QAAQ: Mike Moreland rowid:727
Created Salesforce contact 0036100000bfi6IAAQ: Todd Sherer rowid:728
Created Salesforce contact 0036100000bfi7CAAQ: Kent Carbaugh rowid:725
Created Salesforce contact 0036100000bfi77AAA: Mike Pendergast rowid:658
Created Salesforce contact 0036100000bfi7WAAQ: Tom Howell rowid:751
Created Salesforce contact 0036100000bfi72AAA: Jeff Fornier rowid:653
Created Salesforce contact 0036100000bfi7MAAQ: John Brenan rowid:755
Created Salesforce contact 0036100000bfi7bAAA: Joni Gnyp rowid:369
Created Salesforce contact 0036100000bfi7gAAA: Minnesota Zoo rowid:372
Created Salesforce contact 0036100000bfi6tAAA: Kim Olson rowid:376
Created Salesforce contact 0036100000bfi6DAAQ: Larry McConnell rowid:384
Created Salesforce contact 0036100000bfi73AAA: Nathan Schewe rowid:433
Created Salesforce contact 0036100000bfi5lAAA: Don Cisek rowid:421
Created Salesforce contact 0036100000bfi4uAAA: Matt Klar rowid:416
Created Salesforce contact 0036100000bfhq3AAA: Gene Toikka rowid:120
Created Salesforce contact 0036100000bfi7lAAA: Alex Paredes rowid:114
Created Salesforce contact 0036100000bfi5iAAA: Phelan Butler rowid:465
Created Salesforce contact 0036100000bfi4lAAA: Bob Armbruster rowid:16
Created Salesforce contact 0036100000bfi7IAAQ: Rob Todd rowid:411
*/
