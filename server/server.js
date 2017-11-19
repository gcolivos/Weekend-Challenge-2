// Require express - gives us a function
var express = require('express');

// Create an instance of express by calling the function retured above - gives us an object
var app = express();
var port = 5000;
var bodyParser = require('body-parser');
var welcome = require('./routes/welcome');
var calculation = require('./routes/calculate');
var clearIt = require('./routes/clear.js');

// express static file serving - public is the folder name
app.use(express.static('server/public'));

//body-parser
app.use(bodyParser.urlencoded({extended: true}));

app.use('/welcome', welcome);
app.use('/calculate', calculation);
app.use('/clear', clearIt);

// Start up our server
app.listen(port, function(){
  console.log('listening on port', port);
});