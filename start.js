// temperature-listener.js

const { spawn } = require('child_process');
const temperatures = []; // Store readings
console.log("start");

const sensor = spawn('python', ['OralBScanMain.py']);
sensor.stdout.on('data', function(data) {
//    console.log(data);
    // Coerce Buffer object to Float
    temperatures.push(data.toString());

    // Log to debug
   console.log(temperatures);
});
console.log('ok');


