'use strict';

let jsforce = require('jsforce'),
         fs = require('fs'),
          c = new jsforce.Connection();


let picklists = [
           {      fullName: 'Hawk__c.followPosition__c',
                      type: 'Picklist',
               description: 'Subjective Hunting Performance Measure',
                externalId: 'false',
                     label: 'FollowPosition',
               picklist:  {
                      sorted: 'false',
                  picklistValues:
                  [   { default: 'true',  fullName: '0 - No Data' },
                      { default: 'false', fullName: '1 - Usually out of position' },
                      { default: 'false', fullName: '2 -' },
                      { default: 'false', fullName: '3 - Follows Well' },
                      { default: 'false', fullName: '4 -' },
                      { default: 'false', fullName: '5 - Responds to Falconer' } ]
               },
           },
           {      fullName: 'Hawk__c.footing__c',
                      type: 'Picklist',
               description: 'Subjective Hunting Performance Measure',
                externalId: 'false',
                     label: 'Footing',
               picklist:  {
                      sorted: 'false',
                  picklistValues:
                  [   { default: 'true',  fullName: '0 - No Data' },
                      { default: 'false', fullName: '1 -' },
                      { default: 'false', fullName: '2 -' },
                      { default: 'false', fullName: '3 -' },
                      { default: 'false', fullName: '4 -' },
                      { default: 'false', fullName: '5 -' } ]
               },
           },
           {      fullName: 'Hawk__c.groupHunting__c',
                      type: 'Picklist',
               description: 'Subjective Hunting Performance Measure',
                externalId: 'false',
                     label: 'Group Hunting',
               picklist:  {
                      sorted: 'false',
                  picklistValues:
                  [   { default: 'true',  fullName: '0 - No Data' },
                      { default: 'false', fullName: '1 - Fights with other Hawks' },
                      { default: 'false', fullName: '2 -' },
                      { default: 'false', fullName: '3 - Migth fight with some individuals' },
                      { default: 'false', fullName: '4 -' },
                      { default: 'false', fullName: '5 - Does not fight even when provoked' } ]
               },
           },
           {      fullName: 'Hawk__c.persistence__c',
                      type: 'Picklist',
               description: 'Subjective Hunting Performance Measure',
                externalId: 'false',
                     label: 'Persistence',
               picklist:  {
                      sorted: 'false',
                  picklistValues:
                  [   { default: 'true',  fullName: '0 - No Data' },
                      { default: 'false', fullName: '1 - Bad' },
                      { default: 'false', fullName: '2 -' },
                      { default: 'false', fullName: '3 - Good' },
                      { default: 'false', fullName: '4 -' },
                      { default: 'false', fullName: '5 - Best' } ]
               },
           },
           {      fullName: 'Hawk__c.speed__c',
                      type: 'Picklist',
               description: 'Subjective Hunting Performance Measure',
                externalId: 'false',
                     label: 'Speed',
               picklist:  {
                      sorted: 'false',
                  picklistValues:
                  [   { default: 'true',  fullName: '0 - No Data' },
                      { default: 'false', fullName: '1 - Loses ground to a rabbit' },
                      { default: 'false', fullName: '2 -' },
                      { default: 'false', fullName: '3 - Faster than a hare except in headwind' },
                      { default: 'false', fullName: '4 -' },
                      { default: 'false', fullName: '5 - Goshawk with brains' } ]
               },
           },
];


fs.readFile('./cred.json', function (err, credjson) {

    let cred = JSON.parse(credjson);

    c.login(cred.username, cred.password + cred.token, function(err, res) {

        c.metadata.create('CustomField', picklists, function(err, result) {

            if (err)
                throw err;

            console.log(result);

        });
    });
});
