try {
	logger.info("GETTHINGSWITHDATA START");
	//	var params = {
	//		infoTableName: "InfoTable",
	//		dataShapeName: "ELGi.COMP.ThingDetailsWithData.DS"
	//	};
	//
	//	// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.ThingDetailsWithData.DS)
	//	var result1 = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);
	//logger.debug("Machine GROUP :: " + machine);
	//	var params2 = {
	//		infoTableName: "InfoTable",
	//		dataShapeName: "EntityList"
	//	};
	// CreateInfoTableFromDataShape
	//var propInfoTable = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params2);

	// Will be used in TWX 8.5    
	// infotable datashape iteration
	//var dataShapeFields = result1.dataShape.fields;
	//for (var fieldName in dataShapeFields) {
	//    var columnName = dataShapeFields[fieldName].name;
	//    if(columnName !== 'name'){
	//        var newEntry = new Object();
	//        newEntry.name = columnName; // STRING [Primary Key]
	//        newEntry.description = undefined; // STRING
	//        propInfoTable.AddRow(newEntry);
	//    }   
	//}

	// CreateInfoTableFromDataShape
	//var basicpropInfoTable = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);

	//result =  ThingTemplates["ELGi.comp.ELGiMaster.TT"].QueryImplementingThingsWithNamedData({
	//maxItems: undefined /* NUMBER */,
	//nameMask: undefined /* STRING */,
	//propertyNames: propInfoTable,
	//basicPropertyNames: basicpropInfoTable,
	//query: undefined /* QUERY */,
	//tags: undefined /* TAGS */
	//});
	//
	var queryObjects = new Array();
	var filter;

	if (machine !== undefined && machine !== null && machine.trim() !== '' && machine !== 'ALL') {
		filter = {
			"type": "EQ",
			"fieldName": "machine_group",
			"value": machine
		};
		queryObjects.push(filter);
	}

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


	// result: INFOTABLE dataShape: "RootEntityList"
	var result = ThingTemplates["ELGi.comp.ELGiMaster.TT"].QueryImplementingThingsWithData({
		maxItems: undefined /* NUMBER */ ,
		nameMask: nameMask /* STRING */ ,
		query: query /* QUERY */ ,
		tags: undefined /* TAGS */
	});

	logger.debug("Total Machine Count :: " + result.rows.length);

	//var tableLength = queryResult.rows.length;
	//for (var x=0; x < tableLength; x++) {
	//    var row = queryResult.rows[x];
	//    // ELGi.COMP.ThingDetailsWithData.DS entry object
	//    newEntry = new Object();
	//    newEntry.name = row.name; // STRING [Primary Key]
	//    newEntry.is_Machine_Connected = row.is_Machine_Connected; // BOOLEAN    
	//	result.AddRow(newEntry);
	//}

//	me.SetThingsListInSession({
//		thingsList: result /* INFOTABLE */
//	});


} catch (err) {
	logger.error("Error occured : " + err.message);
}
logger.info("GETTHINGSWITHDATA END");
