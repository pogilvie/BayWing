'use strict';

let jsforce = require('jsforce'),
         fs = require('fs'),
          c = new jsforce.Connection();


fs.readFile('./cred.json', function (err, credjson) {

    let cred = JSON.parse(credjson);

    c.login(cred.username, cred.password + cred.token, function(err, res) {

        c.describe('Contact', function (err, meta) {
            console.log(meta);
        });
    });
});
