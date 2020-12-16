logger.info("GetFirmwarePendingOrUpdatedThingsCount START");

try {

	// result: INFOTABLE dataShape: ""
	//var thingsList =  me.SetFirmwareUpdateStatus();

	// result: INFOTABLE dataShape: "RootEntityList"
	var thingsList = Things["ELGI.COMP.ThingModelHelper.Thing"].GetThingsWithData({
		machine: undefined /* STRING */ ,
		nameMask: undefined /* STRING */ ,
		region: undefined /* STRING */
	});

	var params = {
		infoTableName: "InfoTable",
		dataShapeName: "ELGi.COMP.ThingCount.DS"
	};
	// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.ThingCount.DS)
	var result = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);

	var query = {
		"filters": {
			"type": "Or",
			"filters": [{
					"type": "EQ",
					"fieldName": "firmware_update_pending",
					"value": true
				},
				{
					"type": "EQ",
					"fieldName": "firmware_updated",
					"value": true
				}
			]
		}
	};

	// result: INFOTABLE
	var queryResult = Resources["InfoTableFunctions"].Query({
		t: thingsList /* INFOTABLE */ ,
		query: query /* QUERY */
	});
    
    logger.debug("FIRMWARE UPDATE : "+queryResult.rows.length);

	// Get list of things where Firmware update is available
	var query1 = {
		"filters": {
			"type": "EQ",
			"fieldName": "firmware_update_pending",
			"value": true
		}
	};

	// result: INFOTABLE
	var thingsListWithUpdateAvailable = Resources["InfoTableFunctions"].Query({
		t: queryResult /* INFOTABLE */ ,
		query: query1 /* QUERY */
	});

	// ELGi.COMP.ThingCount.DS entry object
	var newEntry = new Object();
	newEntry.FiltereredCount = thingsListWithUpdateAvailable.rows.length; // INTEGER
	newEntry.TotalCount = queryResult.rows.length; // STRING
	result.AddRow(newEntry);

} catch (err) {
	logger.error("Error occured :" + err.message);
}

logger.info("GetFirmwarePendingOrUpdatedThingsCount END");
