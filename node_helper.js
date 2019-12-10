var NodeHelper = require('node_helper');
import connectToToothbrush from './start'


module.exports = NodeHelper.create({
    socketNotificationReceived: function(notification, payload) {
        if (notification === "MMM-toothbrush-GETDATA") {
            this.getData(function(data){
                self.sendNotification(data);
            })
        }
    },
    sendNotification: function(payload){
        this.sendSocketNotification("")
    },
    getData: function(callback){
        connectToToothbrush(callback);

    }
})