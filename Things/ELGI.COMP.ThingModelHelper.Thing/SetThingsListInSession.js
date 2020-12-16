try {
    
    Resources["CurrentSessionInfo"].SetGlobalSessionInfoTableValue({
		name: "ThingsList" /* STRING */,
		value: thingsList /* INFOTABLE */
	});    	

} catch (err) {
	logger.error(me.name + " Set Session ThingsList : Unable to set session ThingsList Error: " + err);
}
