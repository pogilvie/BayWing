'use strict';

let jsforce = require('jsforce'),
         fs = require('fs'),
          c = new jsforce.Connection();


let newField = {
      fullName: 'Hawk__c.Hunting_with_Dogs__c',
          type: 'Picklist',
   description: 'Subjective Hunting Performance Measure',
    externalId: 'false',
         label: 'Hunting with Dogs',
      picklist:  {
                 sorted: 'false',
         picklistValues:
         [   { default: 'true',  fullName: '0 - No Data' },
             { default: 'false', fullName: '1 - Attacks dogs' },
             { default: 'false', fullName: '2 -' },
             { default: 'false', fullName: '3 - Attacks some dogs but not others' },
             { default: 'false', fullName: '4 -' },
             { default: 'false', fullName: '5 - Has never attacked even a small dog chasing a rabbit' } ]
      }
};


fs.readFile('./cred.json', function (err, credjson) {

    let cred = JSON.parse(credjson);

    c.login(cred.username, cred.password + cred.token, function(err, res) {

        c.metadata.delete('CustomField', 'Hawk__c.dogs__c', function(err, result) {

            //if (err)
            //    throw err;

            console.log(result);

            c.metadata.create('CustomField', newField, function(err, result) {

                if (err)
                    throw err;
            });
        });
    });
});
