'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
var mongoose=require('mongoose');
var swaggerjson=require('./api/swagger/swagger.json');

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  app.get('/swagger',function(req,res){
    res.send(swaggerjson);
  });
  next();
});

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});

var uri = process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://ds052819.mlab.com:52819/zanmilearn';
var options= {
      user: 'zanmi',
      pass: 'zanmi@123'
    };

var db = mongoose.connect(uri, options, function (err) {
    // Log Error
    if (err) {
      console.error(chalk.red('Could not connect to MongoDB!'));
      console.log(err);
    } else {

        console.log("mongoose connected")
    }
  });
