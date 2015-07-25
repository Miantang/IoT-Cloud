module.exports = {
    version : '1.0.0',
    //mongo : 'mongodb://localhost/iot-cloud',
    mongo : 'tingodb://' + __dirname + '/data',
    // mongo : 'tingodb://' + '/q/GitRepo/IoT-Cloud'+ '/data',
    cross : false,//Can I cross Domain
    production: true,
    mqttServer: true,
    mqttPort: 1883
};