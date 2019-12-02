Module.register("MMM-toothbrush", {
    defaults: {
        updateInterval: 1000,
        debug: true
    },
    requiresVersion: "2.1.0",

    start: function() {
        this.loaded = false;
        this.getData();

        // update data?

    },
    getData: function(){
        this.sendSocketNotification("MMM-toothbrush-GETDATA", this.config)
        this.loaded = true;
    },
    updateDom: function(){

    },

    sendSocketNotificationReceived: function(notification, payload) {
        if(notification === "MMM-toothbrush-DISPLAY_DATA") {
			this.dataNotification = payload;
			this.updateDom();
			this.loaded = true;
		}
	},
    


})