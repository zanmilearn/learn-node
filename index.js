var express = require('express');
var app = express();


// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

var sql = require("mssql");

var config = {
    user: 'Zanmi',
    password: 'zanmi@123',
    server: '184.168.194.68',
    database: 'ZanmiLearn'
};

app.get('/', function (req, res) {

    // connect to your database
    sql.connect(config, function (err) {

        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        request.query('select * from Courses', function (err, recordset) {

            if (err) console.log(err)

            // send records as a response
            res.send(recordset);

        });
    });
});

app.listen(port, function () {
    console.log('Server is running..');
});