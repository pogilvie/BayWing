'use strict';

let   jsforce = require('jsforce'),
           fs = require('fs'),
            c = new jsforce.Connection();



fs.readFile('./cred.json', function (err, credjson) {

    let cred = JSON.parse(credjson);

    c.login(cred.username, cred.password + cred.token, function(err, res) {

        // All Hawk Records in Hawk Object
        c.query("SELECT Id, ownerID__c, breederID__c FROM Hawk__c", function(err, allHawks) {

            if (err)
                throw err;

            allHawks.records.forEach(function (hawk) {

                // A Hawk record looks like ...
                // { attributes:
                // {        type: 'Hawk__c',
                //           url: '/services/data/v34.0/sobjects/Hawk__c/a0i61000001xdtdAAA' },
                //    ownerID__c: 34,
                //  breederID__c: 35 }

                // find the Contact SalesforceID associated with a given ownerID
                c.query(`SELECT Id from Contact where rowid__c = ${hawk.ownerID__c}`, function (err, ownerContact) {

                    if (err)
                        throw err;

                    console.log(`hawk:${hawk.Id} contact:${ownerContact.records[0].Id}`);

                    // Update the lookup field with the given contact ID
                    c.sobject("Hawk__c")
                     .update(        {            Id : hawk.Id,
                                        hawkOwner__c : ownerContact.records[0].Id
                                     },
                                     function(err, ret) {

                                         if (err || !ret.success)
                                             return console.error(err, ret);

                                         console.log('Updated Successfully : ' + ret.id);

                                     }
                            );
                });
            });
        });
    });
});
