try {
	logger.info("GetManufacturedThingsCount START");
	var params = {
		infoTableName: "InfoTable",
		dataShapeName: "ELGi.COMP.ThingCount.DS"
	};
	// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.ThingCount.DS)
	var result = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);

	// result: INFOTABLE dataShape: "RootEntityList"
	var thingsList = ThingTemplates["ELGi.comp.ELGiMaster.TT"].QueryImplementingThingsWithData({
		maxItems: undefined /* NUMBER */ ,
		nameMask: undefined /* STRING */ ,
		query: undefined /* QUERY */ ,
		tags: undefined /* TAGS */
	});


	// Query Logic - Query all the things where isRetrofitted is false
	var query1 = {
		"filters": {
			"type": "MissingValue",
			"fieldName": "CRMorCCS"
		}
	};

	var query2 = {
		"filters": {
			"type": "AND",
			"filters": [{
					"type": "NotMissingValue",
					"fieldName": "CRMorCCS"
				},
				{
					"type": "EQ",
					"fieldName": "isRetrofitted",
					"value": false
				}
			]
		}
	};


	//
	// result: INFOTABLE
	var queryResult1 = Resources["InfoTableFunctions"].Query({
		t: thingsList /* INFOTABLE */ ,
		query: query1 /* QUERY */
	});

	var queryResult2 = Resources["InfoTableFunctions"].Query({
		t: thingsList /* INFOTABLE */ ,
		query: query2 /* QUERY */
	});

	// ELGi.COMP.ThingCount.DS entry object
	var newEntry = new Object();
	newEntry.FiltereredCount = queryResult1.rows.length + queryResult2.rows.length; // INTEGER
	newEntry.TotalCount = thingsList.rows.length; // STRING
	result.AddRow(newEntry);
	
} catch (err) {
	logger.error("Error occured :" + err.message);
}
logger.info("GetManufacturedThingsCount END");
