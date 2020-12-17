var params = {
    infoTableName : "InfoTable",
    dataShapeName : "ELGi.COMP.ConsumablesProperties.DS"
};
// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.ThingDetailsWithData.DS)
var result = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);

var params = {
    infoTableName : "InfoTable",
    dataShapeName : "EntityList"
};
// CreateInfoTableFromDataShape
var propInfoTable = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);

// infotable datashape iteration
var dataShapeFields = result.dataShape.fields;
for (var fieldName in dataShapeFields) {
    var columnName = dataShapeFields[fieldName].name;
    if(columnName !== 'name'){
        var newEntry = new Object();
        newEntry.name = columnName; // STRING [Primary Key]
        newEntry.description = undefined; // STRING
        propInfoTable.AddRow(newEntry);
    }   
}

// CreateInfoTableFromDataShape
var basicpropInfoTable = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);

// EntityList entry object
var newEntry1 = new Object();
newEntry1.name = "name"; // STRING [Primary Key]
newEntry1.description = undefined; // STRING

basicpropInfoTable.AddRow(newEntry1);

//result =  ThingTemplates["ELGi.comp.ELGiMaster.TT"].QueryImplementingThingsWithNamedData({
//maxItems: undefined /* NUMBER */,
//nameMask: fabNumber /* STRING */,
//propertyNames: propInfoTable,
//basicPropertyNames: basicpropInfoTable,
//query: undefined /* QUERY */,
//tags: undefined /* TAGS */
//});

// result: INFOTABLE dataShape: "RootEntityList"
result =  ThingTemplates["ELGi.comp.ELGiMaster.TT"].QueryImplementingThingsWithData({
	maxItems: undefined /* NUMBER */,
	nameMask: fabNumber /* STRING */,
	query: undefined /* QUERY */,
	tags: undefined /* TAGS */
});

logger.debug("GETTHINGSWITHDATA : "+result.length);
