'use strict';

let   sqlite3 = require('sqlite3'),
           db = new sqlite3.Database('./db/hawks', sqlite3.OPEN_READWRITE),
        async = require('async'),
      jsforce = require('jsforce'),
           fs = require('fs'),
            c = new jsforce.Connection();


const hawkWithDataSQL = 'select * from Hawks where rabbits > 0 or hares > 0 or squirrels > 0 or miscCritters > 0 or waterfowl > 0 or uplandFowl > 0',
    insertLoadDataSQL = 'insert into HawksInSalesforce (bandNumber, salesforceID) values(?,?)',
           HarrisHawk = '00561000000cPxcAAE',
                  rqs = 2;   // number of concurrent inserts to HawksInSalesforce

const            groupHunting = ['0 - No Data',
                                 '1 - Fights with other Hawks',
                                 '2 -',
                                 '3 - Migth fight with some individuals',
                                 '4 -',
                                 '5 - Does not fight even when provoked'],
                         dogs = ['0 - No Data',
                                 '1 - Attacks dogs',
                                 '2 -',
                                 '3 - Attacks some dogs but not others',
                                 '4 -',
                                 '5 - Has never attacked even a small dog chasing a rabbit'],
               followPosition = ['0 - No Data',
                                 '1 - Usually out of position',
                                 '2 -',
                                 '3 - Follows Well',
                                 '4 -',
                                 '5 - Responds to Falconer'],
                        speed = ['0 - No Data',
                                 '1 - Loses ground to a rabbit',
                                 '2 -',
                                 '3 - Faster than a hare except in headwind',
                                 '4 -',
                                 '5 - Goshawk with brains'],
                      footing = ['0 - No Data','1 -','2 -','3 -','4 -','5 -'],
                  persistence = ['0 - No Data','1 - Bad','2 -','3 - Good','4 -','5 - Best'];

var doneCount = 0;

let work = async.queue(function (data, done) {

    db.run(insertLoadDataSQL, [data.bandNumber, data.salesforceID], function (err) {

        if (err)
            throw err;

        console.log(`Completed ${++doneCount}`);

        return done();
    });

}, rqs);


fs.readFile('./cred.json', function (err, credjson) {

    let cred = JSON.parse(credjson);

    c.login(cred.username, cred.password + cred.token, function(err, res) {
        db.each(hawkWithDataSQL, function (err, row) {

            if (err)
                throw (err);

            console.log(row);

            c.sobject('Hawk__c').create(
            {                 name: row.name,
                          OwnerId : HarrisHawk,
                         gender__c: row.gender,
                     bandNumber__c: row.bandNumber,
                    yearHatched__c: row.yearHatched,
               breedInCaptivity__c: (row.cdwc == 'CB') ? true : false,
                     bandFather__c: row.bandFather,
                     bandMother__c: row.bandMother,
                        ownerID__c: row.owner,
                      breederID__c: row.breeder,
                  originCountry__c: row.originCountry,
                          state__c: row.originState,
                       locality__c: row.originLocality,
                            yod__c: row.yod,
                            cod__c: row.cod,
                                    // disposition: null,
                                    // lastUpdate: '14-Dec-05',
                         weight__c: row.weight,
                        seasons__c: row.seasons,
                       comments__c: row.comments,
                        rabbits__c: row.rabbits,
                          hares__c: row.hares,
                      squirrels__c: row.squirrels,
                         upland__c: row.uplandFowl,
                      waterfowl__c: row.waterfowl,
                   miscCritters__c: row.miscCritters,
                     bestSeason__c: row.bestSeason,
                        overall__c: row.overall,
                   groupHunting__c: groupHunting[row.groupHunting],
              Hunting_with_Dogs__c: dogs[row.dogs],
                 followPosition__c: followPosition[row.followPosition],
                          speed__c: speed[row.speed],
                        footing__c: footing[row.footing],
                    persistence__c: persistence[row.persistence]
                                   // huntingComments
            }, function (err, r) {

                if (err)
                    throw err;

                work.push({bandNumber: row.bandNumber, salesforceID: r.id})

                console.log(r);
            });
        });
    });
});
