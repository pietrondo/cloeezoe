var express = require('express');
var app = express();
var path = require('path');

module.exports = (function(){
app.set('port', (process.env.PORT || 5000));
//app.use(express.static(__dirname + '/public'));

//pp.get('/', function(req, res) {
//        res.sendFile(path.join(__dirname + '/index.html'));
//          });
//
//          views is directory for all template files

app.use(express.static(__dirname + '/../public'));
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname + '/public/index.html'));
});

/*app.get('/images', function(request, response) {
  response.sendFile(path.join(__dirname + '/public/images/'));
});
*/
return app;
})()
