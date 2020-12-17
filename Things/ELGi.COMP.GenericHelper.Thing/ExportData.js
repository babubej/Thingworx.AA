var params = {
    infoTableName : "InfoTable",
    dataShapeName : "PropertyDefinition"
};

// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(PropertyDefinition)
var infotableData = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);
//infotableData.AddRow({name : selectedProperties.name});

var tableLength = selectedProperties.rows.length;
for (var x=0; x < tableLength; x++) {
    var row = selectedProperties.rows[x].name;
    infotableData.AddRow({name : row});
}

// result: INFOTABLE dataShape: ""
var result =  Things[thingName].QueryNamedPropertyHistory({
	oldestFirst: undefined /* BOOLEAN */,
	maxItems: 50000 /* NUMBER */,
	endDate: to /* DATETIME */,
	propertyNames: infotableData /* INFOTABLE */,
	query: undefined /* QUERY */,
	startDate: from /* DATETIME */
});

//// result: INFOTABLE dataShape: ""
//var result =  Things[thingName].QueryNamedPropertyHistory({
//	oldestFirst: undefined /* BOOLEAN */,
//	maxItems: undefined /* NUMBER */,
//	endDate: to /* DATETIME */,
//	propertyNames: selectedProperties /* INFOTABLE */,
//	query: undefined /* QUERY */,
//	startDate: from /* DATETIME */
//});
//
