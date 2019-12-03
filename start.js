// temperature-listener.js

const { spawn } = require('child_process');

function connectToToothbrush(callback) {
    console.log("start");
    const sensor = spawn('python', ['OralBScanMain.py']);
    sensor.stdout.on('data', function(data) {
        var output = []; // Store readings

        output.push(data.toString());
        console.log(output[0])
        output = JSON.parse(output[0])
        // This has to be returned once it exists
        callback(output)
        
    });

}
connectToToothbrush(console.log)
