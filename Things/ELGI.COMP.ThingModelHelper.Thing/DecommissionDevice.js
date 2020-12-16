try {
	var locaThingName = remoteThingName.substr(7);

	if (!!Things[remoteThingName]) {
		logger.debug("REmote Thing Exists");
		if (Things[remoteThingName].isConnected && Things[remoteThingName].isReporting) {
			logger.debug("REmote Thing Is Connected");
			if (type === "TEMPORARY") {
				logger.debug("Before Unregisterapplication call");
				// result: BOOLEAN
				var result = Things[remoteThingName].UnregisterApplication({
					suspendAcquisition: true /* BOOLEAN */ ,
					shouldShutdown: false /* BOOLEAN */ ,
					timeoutSec: undefined /* INTEGER */
				});

				if (result === false) {
					throw new Error(remoteThingName + " cannot be decommissioned due to error.");
				}

				logger.debug("After Unregisterapplication call");
				//Disable Remote Thing    
				Things[remoteThingName].DisableThing();

				//Disable Local Thing
				Things[locaThingName].DisableThing();

			} else if (type === "PERMANENT") {

				// result: BOOLEAN
				var result = Things[remoteThingName].RemoveApplication({
					confirm: true /* BOOLEAN */
				});

				if (result === true) {
					//Disable Remote Thing    
					Things[remoteThingName].DisableThing();

					//Disable Local Thing
					Things[locaThingName].DisableThing();
				} else {
					throw new Error("Error occured while removing the agent permanently");
				}
			} else {
				throw new Error("Please select Decommission type as Temporary or Permanent");
			}

		} else {
			throw new Error(remoteThingName + " is not connected. Please contact Administrator.");
		}
	} else {
		throw new Error(remoteThingName + " does not exist. Please contact Administrator.");
	}
} catch (err) {
	logger.error(remoteThingName + " cannot be Decommissioned due to error. " + err);	
	throw new Error(remoteThingName + " cannot be Decommissioned due to error. " + err);
}
