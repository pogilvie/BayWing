

'use strict';

let   sqlite3 = require('sqlite3'),
           db = new sqlite3.Database('./db/hawks', sqlite3.OPEN_READONLY),
      jsforce = require('jsforce'),
           fs = require('fs'),
            c = new jsforce.Connection();

const  findHawkSQL = "select * from Hawks where bandNumber = '?'",
        HarrisHawk = '00561000000cPxcAAE';


const groupHunting = ['0 - No Data',
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

let bandNumbers = ['R0002907',
                   'RW080501',
                   'R0030067',
                   'RX080255',
                   '10A14W95',
                   'R0010361',
                   'R0013110',
                   'R0029015',
                   'R0029170',
                   'R0030081',
                   'R0103113',
                   'RW081353',
                   'RW083503',
                   'RW086564',
                   'RW086710',
                   'RW091086',
                   'RX080253'];

fs.readFile('./cred.json', function (err, credjson) {

    let cred = JSON.parse(credjson);

    c.login(cred.username, cred.password + cred.token, function(err, res) {

        if (err)
            throw err;

        console.log(res);

        bandNumbers.forEach(function (bandNumber) {

            db.get(findHawkSQL, bandNumber, function (err, result) {

                if (err)
                    throw (err);

                c.sobject('Hawk__c').create(
                {                 name: result.name,
                              OwnerId : HarrisHawk,
                             gender__c: result.gender,
                         bandNumber__c: result.bandNumber,
                        yearHatched__c: result.yearHatched,
                   breedInCaptivity__c: (result.cdwc == 'CB') ? true : false,
                         bandFather__c: result.bandFather,
                         bandMother__c: result.bandMother,
                            ownerID__c: result.owner,
                          breederID__c: result.breeder,
                      originCountry__c: result.originCountry,
                              state__c: result.originState,
                           locality__c: result.originLocality,
                                yod__c: result.yod,
                                cod__c: result.cod,
                                        // disposition: null,
                                        // lastUpdate: '14-Dec-05',
                             weight__c: result.weight,
                            seasons__c: result.seasons,
                           comments__c: result.comments,
                            rabbits__c: result.rabbits,
                              hares__c: result.hares,
                          squirrels__c: result.squirrels,
                             upland__c: result.uplandFowl,
                          waterfowl__c: result.waterfowl,
                       miscCritters__c: result.miscCritters,
                         bestSeason__c: result.bestSeason,
                            overall__c: result.overall,
                       groupHunting__c: groupHunting[result.groupHunting],
                  Hunting_with_Dogs__c: dogs[result.dogs],
                     followPosition__c: followPosition[result.followPosition],
                              speed__c: speed[result.speed],
                            footing__c: footing[result.footing],
                        persistence__c: persistence[result.persistence]
                                       // huntingComments
                }, function (err, r) {

                    if (err)
                        throw err;

                    console.log(r);
                });
            });
        });
    });
});
