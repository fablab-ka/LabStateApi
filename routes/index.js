var express = require('express');
var router = express.Router();
var fs = require('fs');

var dataFile = 'data.db';
var clientIdFile = 'clientId.data';
var current_data = {'is_on': false};
var clientId = 'sample-client-id';

if (fs.existsSync(dataFile)) {
  current_data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
}

if (fs.existsSync(clientIdFile)) {
  clientId = fs.readFileSync(clientIdFile, 'utf8');
}

router.get('/', function(req, res, next) {
  res.send(current_data).end();
});

router.post('/', function(req, res, next) {

  var receivedClientId = req.get('clientId');
  if (receivedClientId !== clientId) {
    console.error('invalid clientId', receivedClientId);
    res.sendStatus(403, 'incorrect clientId');
    return;
  }

  var data = req.body;
  console.log('data received: ', data);

  if (!data || typeof(data.is_on) !== 'boolean') {
    res.sendStatus(400, 'invalid data format' + JSON.stringify(data));
  } else {
    current_data = { 'is_on': data.is_on };

    fs.writeFileSync(dataFile, JSON.stringify(current_data), 'utf8');

    res.sendStatus(200, 'OK');
  }
});

module.exports = router;
