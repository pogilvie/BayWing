'use strict';

let jsforce = require('jsforce'),
         fs = require('fs'),
          c = new jsforce.Connection();


fs.readFile('./cred.json', function (err, credjson) {

    let cred = JSON.parse(credjson);

    c.login(cred.username, cred.password + cred.token, function(err, res) {

        if (err)
            return console.error(err);

        c.metadata.read('CustomObject', ['Osprey__c',], function(err, results) {

            if (err)
                throw err;

            console.log(results);

        });
    });
});
