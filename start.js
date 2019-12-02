// temperature-listener.js

const { spawn } = require('child_process');
const temperatures = []; // Store readings
<<<<<<< HEAD
console.log("start");
const sensor = spawn('python', ['OralBScanMain.py']);
sensor.stdout.on('data', function(data) {
    console.log("we in");
//    console.log(data);
    // Coerce Buffer object to Float
   temperatures.push(data.toString());
=======

const sensor = spawn('python', ['OralBScanMain.py']);
sensor.stdout.on('data', function(data) {
//    console.log(data);
    // Coerce Buffer object to Float
    temperatures.push(data.toString());
>>>>>>> 598c3587ceaf898af01d8064faabf03e795033da

    // Log to debug
   console.log(temperatures);
});
<<<<<<< HEAD
console.log('sensor');
=======
//console.log('ok');
>>>>>>> 598c3587ceaf898af01d8064faabf03e795033da

