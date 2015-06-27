/* eslint-env node */
var express = require('express');

var port = process.env.PORT || 1337;

var app = express();
app.use(express.static('.'));

app.listen(port, function(error) {
  if (error) {
    return console.error(error);
  }
  console.log('Listening at localhost:' + port);
});
