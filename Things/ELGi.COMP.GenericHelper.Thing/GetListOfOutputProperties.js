var params = {
    infoTableName : "InfoTable",
    dataShapeName : "PropertyDefinition"
};
// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(PropertyDefinition)
var result = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);

// result: INFOTABLE dataShape: "PropertyDefinition"
var propertyList =  ThingShapes["ELGi.COMP.CalculationsShape.TS"].GetInstancePropertyDefinitions({
	type: undefined /* STRING */
});

var tableLength = propertyList.rows.length;
for (var x=0; x < tableLength; x++) {
    var row = propertyList.rows[x];
    
    if(row.baseType === 'INTEGER' || row.baseType === 'NUMBER' || row.baseType === 'BOOLEAN'){
    	// PropertyDefinition entry object
        var newEntry = new Object();
        newEntry.isReadOnly = row.isReadOnly; // BOOLEAN
        newEntry.isPersistent = row.isPersistent; // BOOLEAN
        newEntry.isLogged = row.isLogged; // BOOLEAN
        newEntry.name = row.name; // STRING [Primary Key]
        newEntry.description = row.description; // STRING
        newEntry.baseType = row.baseType; // BASETYPENAME
        result.AddRow(newEntry);	   
    }
    
}
