

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var server = express();
var $http = require('axios');

var port = process.env.PORT || 8080;
var apiKey = require('./config').apiKey;
var baseUrl = 'https://api.forecast.io/forecast/';


server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(cors());

//test route
server.get('/forecast/hourly/:lat,:lon', function(req, res){
     $http.get(baseUrl + apiKey + '/'+req.params.lat+','+req.params.lon) // a promise
          .then(function(response){
            var resOBj = {
              latitude: response.data.latitude,
              longitude: response.data.longitude,
              hourly: response.data.hourly
            };
            res.status(200).json(resOBj);
          })
          .catch(function(error){
            res.status(500).json({
              msg: error
            })
          });
});

server.listen(port, function(){
  console.log('Now running on port...', port);
});
