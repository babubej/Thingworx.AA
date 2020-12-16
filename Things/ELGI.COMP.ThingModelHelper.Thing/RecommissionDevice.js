//try {
var locaThingName = remoteThingName.substr(7);

if (!!Things[remoteThingName]) {

	//Enable Remote Thing            
	Things[remoteThingName].EnableThing();

	//Enable Local Thing            
	Things[locaThingName].EnableThing();

	//Restart Remote Thing            
	Things[remoteThingName].RestartThing();

	//Restart Local Thing            
	Things[locaThingName].RestartThing();
	var i = 0;
	while (i < 5) {

		pause(2000);

		if (Things[remoteThingName].isConnected && Things[remoteThingName].isReporting) {

			// result: BOOLEAN
			var result = Things[remoteThingName].StartDataAcquisition();

			if (result === false) {
				throw new Error(remoteThingName + " cannot be commissioned due to error. Data Acquisition is not successful");
			}
            break;
		} 
//        else {
//			throw new Error(remoteThingName + " is not connected. Please contact Administrator.");
//		}
        i++;
	}
} else {
	throw new Error(remoteThingName + " does not exist. Please contact Administrator.");
}

//} catch (err) {
//	logger.error(remoteThingName + " cannot be Decommissioned due to error. " + err);
//}
