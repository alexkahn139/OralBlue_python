var NodeHelper = require('node_helper');
var connect = require('./start.js')


module.exports = NodeHelper.create({
    socketNotificationReceived: function(notification, payload) {
        if (notification === "MMM-toothbrush-GETDATA") {
            var self = this;
            this.getData(function(data){
                self.sendNotification(data);
            })
        }
    },
    sendNotification: function(payload){
        console.log(payload)
        this.sendSocketNotification("MMM-toothbrush-DISPLAY_DATA", payload)
    },
    getData: function(callback){
        console.log("getdata")
        connect.connectToToothbrush(callback);

    }
})