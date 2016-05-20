'use strict';

let      fs = require('fs'),
    jsforce = require('jsforce'),
          c = new jsforce.Connection();

fs.readFile('./cred.json', function (err, credjson) {

    let cred = JSON.parse(credjson);

    c.login(cred.username, cred.password + cred.token, function(err, res) {

        if (err)
            throw err;

        console.log(res);

        c.query("SELECT Id FROM Hawk__c", function(err, queryResults) {

            if (err)
                throw err;

            console.log(queryResults);

            queryResults.records.forEach(function (r) {

                console.log(r);

                c.sobject("Hawk__c").destroy(r.Id, function(err, recordDestroyResult) {

                    if (err)
                        throw err;

                    console.log(recordDestroyResult);
                });
            });
        });
    });
});
