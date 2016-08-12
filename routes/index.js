var express = require('express');
var router = express.Router();
var fs = require('fs');

var dataFile = 'data.db';
var clientIdFile = 'clientId.data';
var current_data = {'is_open': false};
var clientId = 'sample-client-id';

if (fs.existsSync(dataFile)) {
  current_data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
}

if (fs.existsSync(clientIdFile)) {
  clientId = fs.readFileSync(clientIdFile, 'utf8').trim();
  console.log('client id file successfully read');
} else {
  console.warn('no client id file found.');
}

router.get('/', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  res.send(current_data).end();
});

router.post('/', function(req, res, next) {

  var receivedClientId = req.get('clientId');
  if (receivedClientId !== clientId) {
    console.error('invalid clientId', '"' + receivedClientId + '"');
    res.sendStatus(403, 'incorrect clientId');
    return;
  }

  var data = req.body;
  console.log('data received: ', data);

  if (!data || typeof(data.is_open) !== 'boolean') {
    res.sendStatus(400, 'invalid data format' + JSON.stringify(data));
  } else {
    current_data = { 'is_open': data.is_open };

    fs.writeFileSync(dataFile, JSON.stringify(current_data), 'utf8');

    res.sendStatus(200, 'OK');
  }
});

module.exports = router;
