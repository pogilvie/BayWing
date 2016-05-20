'use strict';

let   sqlite3 = require('sqlite3'),
           db = new sqlite3.Database('./db/hawks', sqlite3.OPEN_READWRITE),
        async = require('async'),
      jsforce = require('jsforce'),
           fs = require('fs'),
            c = new jsforce.Connection();


const hawksWithDataSQL = 'select * from Hawks where rabbits > 0 or hares > 0 or squirrels > 0 or miscCritters > 0 or waterfowl > 0 or uplandFowl > 0',
       HarrisHawk = '00561000000cPxcAAE';



let loadQ = [];


fs.readFile('./cred.json', function (err, credjson) {

    let cred = JSON.parse(credjson);
