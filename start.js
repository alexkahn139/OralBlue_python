// temperature-listener.js

const { spawn } = require('child_process');

module.exports = {
    connectToToothbrush: function (callback) {
// function connectToToothbrush(callback){
    console.log("start"); 
    const sensor = spawn('python', ['OralBScanMain.py']);
    setTimeout(callback, 10000, '{"state":"off", "brushTime":0, "sector":"0"}');
    sensor.stdout.on('data', function(data) {
        console.log("Got data")
        var output = []; // Store readings
        
        output.push(data.toString());
        console.log(output[0])
        output = JSON.parse(output[0])
        // This has to be returned once it exists
        callback(output)
        
    });
   
}
}
// connectToToothbrush(console.log)
