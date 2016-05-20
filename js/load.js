'use strict';
let    fs = require('fs'),
    parse = require('csv-parse'),
  sqlite3 = require('sqlite3'),
       db = new sqlite3.Database('./db/hawks', sqlite3.OPEN_READWRITE),
insertSQL = 'insert into HawksJoined values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

sqlite3.verbose();

fs.readFile('./db/tail', 'utf8', (err, data) => {

    var count = 1;

    if (err)
        throw err;

    parse(data, (err, rows) => {
        rows.forEach( (row) => {
            db.run(insertSQL, row, (err) => {

                if (err)
                    throw err;

                count++;
                console.log(`insert ${count}`)
            });
        });
    });
});
