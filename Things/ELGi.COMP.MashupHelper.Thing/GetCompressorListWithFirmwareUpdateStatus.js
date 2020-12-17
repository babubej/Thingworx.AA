var queryObjects = new Array();
var filter;

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

//filter = {
//	"type": "NE",
//	"fieldName": "firmware_update_pending",
//	"value": true
//};
//queryObjects.push(filter);

var query = {
	"filters": {
		"type": "And",
		"filters": queryObjects
	}
};

// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(PropertyList)
var basicPropertyNames = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape({
	infoTableName: "InfoTable",
	dataShapeName: "EntityList"
});

basicPropertyNames.AddRow({
	name: "name"
});

// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(PropertyList)
var propertyNames = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape({
	infoTableName: "InfoTable",
	dataShapeName: "EntityList"
});

propertyNames.AddRow({
	name: "firmware_update_pending"
});

propertyNames.AddRow({
	name: "firmware_updated"
});


// result: INFOTABLE dataShape: "RootEntityList"
var queryResult = ThingTemplates["ELGi.comp.ELGiMaster.TT"].QueryImplementingThingsWithNamedData({
	maxItems: undefined /* NUMBER */ ,
	basicPropertyNames: basicPropertyNames /* INFOTABLE */ ,
	nameMask: undefined /* STRING */ ,
	propertyNames: propertyNames /* INFOTABLE */ ,
	query: query /* QUERY */ ,
	tags: undefined /* TAGS */
});

// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.FirmwareUpdateDetails.DS)
var result = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape({
	infoTableName: "InfoTable",
	dataShapeName: "ELGi.COMP.FirmwareUpdateDetails.DS"
});

queryResult.rows.toArray().forEach(row => {
	// ELGi.COMP.FirmwareUpdateDetails.DS entry object
	var newEntry = new Object();
	newEntry.FabNumber = row.name; // STRING
	if (row.firmware_update_pending && !row.firmware_updated) {
		newEntry.IsUpdateDisabled = false; // BOOLEAN
	} else {
		newEntry.IsUpdateDisabled = true; // BOOLEAN
	}
	result.AddRow(newEntry);
});
