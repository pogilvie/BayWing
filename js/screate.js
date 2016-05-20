'use strict';

let       jsforce = require('jsforce'),
               fs = require('fs'),
                c = new jsforce.Connection(),
    customObjects = require('./hawk.js').metadata;

fs.readFile('./cred.json', function (err, credjson) {

    let cred = JSON.parse(credjson);

    c.login(cred.username, cred.password + cred.token, function(err, res) {

        if (err)
            throw err;

        c.metadata.create('CustomObject', customObjects, function(err, result) {

            if (err)
                throw err;

            console.log(`Name: ${result.fullName} success ? : ${result.success}`);

        });
    });
});
