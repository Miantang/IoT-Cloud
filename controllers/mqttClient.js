var mqtt = require('mqtt');
var config = require('../config');
var mosca = require('mosca');
var settings = {
  port: config.mqttPort
};
var mqttServer = new mosca.Server(settings);

mqttServer.on('clientConnected', function (cli) {
    console.log('client connected : ', cli.id);
});
mqttServer.on('published', function (packet, cli) {
    console.log('Published : ', packet.payload);
});
// fired when a client subscribes to a topic
mqttServer.on('subscribed', function (topic, client) {
    console.log('subscribed : ', topic);
});

// fired when a client subscribes to a topic
mqttServer.on('unsubscribed', function (topic, client) {
    console.log('unsubscribed : ', topic);
});

// fired when a client is disconnecting
mqttServer.on('clientDisconnecting', function (client) {
    console.log('clientDisconnecting : ', client.id);
});

// fired when a client is disconnected
mqttServer.on('clientDisconnected', function (client) {
    console.log('clientDisconnected : ', client.id);
});

mqttServer.on('ready', setup);
function setup () {
    console.log('mqtt server is ok and running at ' + config.mqttPort);
}

if(config.mqttServer) {
    var client = mqtt.createClient(config.mqttPort, '127.0.0.1');
}
module.exports = client;