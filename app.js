var express = require('express');
var bodyParser = require('body-parser');

var morgan = require('morgan');

var app = express();
var port = 6231;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan());

var swords = require('./routes/swords');

app.use('/api/swords', swords);

// app.listen(port, function(){
//   console.log("Listening on port", port);
// });

module.exports = app;
