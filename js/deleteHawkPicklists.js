'use strict';

let jsforce = require('jsforce'),
         fs = require('fs'),
          c = new jsforce.Connection();


let picklists = ['Hawk__c.followPosition__c',
                 'Hawk__c.footing__c',
                 'Hawk__c.groupHunting__c',
                 'Hawk__c.persistence__c',
                 'Hawk__c.speed__c',
                 'Hawk__c.groupHunting__c'];


fs.readFile('./cred.json', function (err, credjson) {

    let cred = JSON.parse(credjson);

    c.login(cred.username, cred.password + cred.token, function(err, res) {

        c.metadata.delete('CustomField', picklists, function(err, result) {

            if (err)
                throw err;

            console.log(result);

        });
    });
});
