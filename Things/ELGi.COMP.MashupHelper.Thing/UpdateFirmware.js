var result = "";

if (!IsUpdateDisabled) {
	var remoteThingName = "Remote_" + FabNumber;
	if (!!Things[remoteThingName]) {
		if (Things[remoteThingName].isConnected && Things[remoteThingName].isReporting) {            
			// result: STRING
			result = Things[remoteThingName].StartNeuronBootloader();			
		} else {
			result = remoteThingName + " is not connected. Please contact Administrator.";
			throw new Error(result);
		}
	} else {
		result = remoteThingName + " does not exist. Please contact Administrator.";
		throw new Error(result);
	}
}
