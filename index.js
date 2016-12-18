var express = require('express');
var app = express();

app.get('/', function (req, res) {

    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'Zanmi',
        password: 'zanmi@123',
        server: '184.168.194.68',
        database: 'ZanmiLearn'
    };

    // set the port of our application
    // process.env.PORT lets the port be set by Heroku
    var port = process.env.PORT || 8080;

    // set the view engine to ejs
    app.set('view engine', 'ejs');

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