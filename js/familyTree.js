'use strict';

let sqlite3 = require('sqlite3'),
         db = new sqlite3.Database('../db/hawks', sqlite3.OPEN_READWRITE),
         fs = require('fs'),
    jsforce = require('jsforce'),
          c = new jsforce.Connection(),
      async = require('async'),
    current = new Set(), toadd = new Set(),
         pl = require('./hawk.js').picklists;

const hawksInSalesforceSQL = 'select SF.bandNumber, Hawks.bandFather, Hawks.bandMother from HawksInSalesforce as SF, Hawks where SF.bandNumber = Hawks.bandNumber',
         insertLoadDataSQL = 'insert into HawksInSalesforce (bandNumber, salesforceID) values(?,?)',
             hawkbyBandSQL = 'select * from Hawks where bandNumber = ?',
                       rqs = 2,
                HarrisHawk = '00561000000cPxcAAE';

var doneCount = 0;

let work = async.queue(function (data, done) {

    db.run(insertLoadDataSQL, [data.bandNumber, data.salesforceID], function (err) {

        if (err)
            throw err;

        console.log(`Completed ${++doneCount}`);

        return done();
    });

}, rqs);

fs.readFile('../cred.json', function (err, credjson) {

    let cred = JSON.parse(credjson);

    c.login(cred.username, cred.password + cred.token, function(err, res) {

        if (err)
            throw err;

        db.all(hawksInSalesforceSQL, function (err, hawks) {

            if (err)
                throw err;

            hawks.forEach(function (hawk) {
                current.add(hawk.bandNumber);
                toadd.add(hawk.bandFather);
                toadd.add(hawk.bandFather);
            });

            toadd.forEach(function (bandNumber) {
                if (bandNumber.length > 0) {
                    db.get(hawkbyBandSQL, bandNumber, function (err, row) {

                        if (err)
                            throw err;

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
                               groupHunting__c: pl.groupHunting[row.groupHunting],
                          Hunting_with_Dogs__c: pl.dogs[row.dogs],
                             followPosition__c: pl.followPosition[row.followPosition],
                                      speed__c: pl.speed[row.speed],
                                    footing__c: pl.footing[row.footing],
                                persistence__c: pl.persistence[row.persistence]
                                               // huntingComments
                        }, function (err, r) {

                            if (err)
                                throw err;

                            work.push({bandNumber: row.bandNumber, salesforceID: r.id})

                            console.log(r);
                        });
                    });
                }
            });
        });
    });
});
