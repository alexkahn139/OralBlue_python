// temperature-listener.js

const { spawn } = require('child_process');
const data = []; // Store readings
console.log("start");

const sensor = spawn('python', ['OralBScanMain.py']);
sensor.stdout.on('data', function(data) {
//    console.log(data);
    // Coerce Buffer object to Float
    data.push(data.toString());

    // Log to debug
   console.log(JSON.parse(data[0]));
});
console.log('ok');


