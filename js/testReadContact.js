'use strict';

let       jsforce = require('jsforce'),
               fs = require('fs'),
                c = new jsforce.Connection(),
    customObjects = require('./hawk.js').metadata;

fs.readFile('./cred.json', function (err, credjson) {

    let cred = JSON.parse(credjson);

    c.login(cred.username, cred.password + cred.token, function(err, res) {

        var records = [], query;

        if (err)
            throw err;


        query = c.query("SELECT Id, Name, OwnerId FROM Contact where OwnerId = '00561000000cPxcAAE'");

        query.on("record", function(record) {
                 records.push(record);
             })
             .on("end", function() {
                 console.log(records);
                 console.log("total in database : " + query.totalSize);
                 console.log("total fetched : " + query.totalFetched);
             })
             .on("error", function(err) {
                 console.error(err);
             })
             .run({ autoFetch : true, maxFetch : 4000 });
    });
});
