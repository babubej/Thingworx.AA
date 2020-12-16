try {
	var queryObjects = new Array();
	var filter;
	var PKG_NAME = "Generic";

	filter = {
		"type": "NotMissingValue",
		"fieldName": "CRMorCCS"
	};
	queryObjects.push(filter);

	filter = {
		"type": "NE",
		"fieldName": "Rated_pressure",
		"value": 0
	};
	queryObjects.push(filter);

	var query = {
		"filters": {
			"type": "And",
			"filters": queryObjects
		}
	};

	var basicPropertyNames = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape({
		infoTableName: "InfoTable",
		dataShapeName: "EntityList"
	});

	basicPropertyNames.AddRow({
		name: "name"
	});

	var propertyNames = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape({
		infoTableName: "InfoTable",
		dataShapeName: "EntityList"
	});

	propertyNames.AddRow({
		name: "CRMorCCS"
	});

	propertyNames.AddRow({
		name: "isRetrofitted"
	});

	// result: INFOTABLE dataShape: "RootEntityList"
	var thingsList = ThingTemplates["ELGi.comp.ELGiMaster.TT"].QueryImplementingThingsWithNamedData({
		maxItems: undefined /* NUMBER */ ,
		basicPropertyNames: basicPropertyNames /* INFOTABLE */ ,
		nameMask: undefined /* STRING */ ,
		propertyNames: propertyNames /* INFOTABLE */ ,
		query: query /* QUERY */ ,
		tags: undefined /* TAGS */
	});

	thingsList.rows.toArray().forEach(row => {
		var thingName = row.name;
		var remoteThingName = 'Remote_' + thingName;
		try {
			// result: INFOTABLE dataShape: "TW.RSM.SFW.DataShape.Campaign" 
			var deploymentsResult = Things["TW.RSM.SFW.SoftwareManager"].GetAllDeploymentsForAsset({
				AssetName: remoteThingName /* STRING */
			});
            logger.debug("Remote Thing Name : "+remoteThingName+", deploymentsResult count : "+deploymentsResult.rows.length);

			if (deploymentsResult !== undefined && deploymentsResult.rows.length > 0) {
				var query1 = {
					"sorts": [{
						"fieldName": "ScheduledInstallDate",
						"isAscending": false
					}],
					"filters": {
						"type": "And",
						"filters": [
                            {
								"type": "LIKE",
								"fieldName": "PackageName",
								"value": "*" + PKG_NAME + "*"
							},
							{
								"type": "EQ",
								"fieldName": "Status",
								"value": "completed"
							},
							{
								"type": "EQ",
								"fieldName": "CompletedWithIssues",
								"value": false
							}
						]
					}
				};
                

				// result: INFOTABLE
				var queryResult = Resources["InfoTableFunctions"].Query({
					t: deploymentsResult /* INFOTABLE */ ,
					query: query1 /* QUERY */
				});
                
                logger.debug("Remote Thing Name : "+remoteThingName+"ID : "+queryResult[0].ID);
                
				logger.debug("Remote Thing Name : "+remoteThingName+", queryResult count : "+queryResult.rows.length);
				if (queryResult !== undefined && queryResult.rows.length > 0) {
					if (Things[thingName].Last_Deployment_ID !== queryResult.ID) {
						Things[thingName].Last_Deployment_ID = queryResult.ID;
						Things[thingName].firmware_update_pending = true;
						Things[thingName].firmware_updated = false;
					} else {
						Things[thingName].firmware_update_pending = false;
						Things[thingName].firmware_updated = false;
					}
				}
			}
		} catch (err) {
			logger.error("Error occured in SetFirmwareUpdateDetails for '" + thingName + "'): " + err + " " + err.stack);
		}
	});

} catch (ex) {
	logger.error("Error occured in SetFirmwareUpdateDetails : " + ex + " " + ex.stack);
}
