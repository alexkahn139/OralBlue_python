Module.register("MMM-toothbrush", {
	defaults: {
		updateInterval: 1000,
		debug: true,
		polling: false, 
		// counter: 0
	},
	requiresVersion: "2.1.0",
	
	start: function() {
		var self = this
		this.loaded = false;
		this.getData();
		
		// update data?
		setInterval(function() {
			self.getData()
			self.updateDom();
		}, this.config.updateInterval);
		
	},
	getData: function(){
		if (!this.polling){
			this.sendSocketNotification("MMM-toothbrush-GETDATA", this.config)
			this.loaded = true;
			this.polling = true;
		}
	},

	getDom: function() {
		var self = this;

		
		// create element wrapper for show into the module
		var wrapper = document.createElement("div");
		wrapper.className = "small";
		if(!this.loaded) {
			wrapper.innerHTML = "Loading...";
			wrapper.classname = "small dimmed";
			return wrapper;
		}
		
		if (this.dataNotification) {
		
				console.log(this.dataNotification);
			data = JSON.parse(this.dataNotification);

			if (!data.state == "off")
			// this.config.counter = this.config.counter+1;
			var wrapperDataNotification = document.createElement("div");
			var timelabel = document.createElement("label");
			timelabel.innerHTML =  this.translate("Time: ") + data.brushTime /*+ this.config.counter*/ +"<br>";
			wrapper.appendChild(timelabel);
			var sectorlable = document.createElement("label");
			sectorlable.innerHTML =  this.translate("Sector: ") +data.sector//+ Math.floor(this.config.counter/30);
			wrapper.appendChild(sectorlable);
			
			// if (this.config.debug) {
			// 	var d = new Date();
			// 	var labelLastUpdate = document.createElement("label");
			// 	labelLastUpdate.innerHTML = "<br><br>Updated: " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)+ ":" + ("0" + d.getSeconds()).slice(-2) + "<br>Intervall: " + this.config.updateInterval/1000 + "s";
			// 	wrapper.appendChild(labelLastUpdate);
			// }
			
			return wrapper;
		}
	},
	
	socketNotificationReceived: function(notification, payload) {
		console.log(payload)
		console.log(notification)
		if(notification == "MMM-toothbrush-DISPLAY_DATA") {
			console.log(payload)
			
			this.dataNotification = payload;
			this.updateDom();
			this.loaded = true;
			this.polling = false;
		}
	},
	
	
	
})