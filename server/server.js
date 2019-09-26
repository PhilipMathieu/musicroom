//server/server.js
var express = require('express');
var router = require('./routes/routes.js')
var path = require('path');

var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));

app.use('/', router);

//dht22 demo code
var sensorLib = require("node-dht-sensor");
 
var sensor = {
    sensors: [ {
        name: "Music Room",
        type: 22,
        pin: 17
    } ],
    read: function() {
        console.log('Attempting to read sensor...')
        for (var a in this.sensors) {
        	if (!sensorLib.initialize(this.sensors[a].type, this.sensors[a].pin)) {
			    console.warn('Failed to initialize sensor');
			    process.exit(1);
			}
            var b = sensorLib.read(this.sensors[a].type, this.sensors[a].pin);
            console.log(this.sensors[a].name + ": " +
              b.temperature.toFixed(1) + "°C, " +
              b.humidity.toFixed(1) + "%");
        }
        setTimeout(function() {
            sensor.read();
        }, 2000);
    }
};
 
sensor.read();

module.exports=app;
