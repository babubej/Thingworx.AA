var params = {
    infoTableName : "InfoTable",
    dataShapeName : "FieldDefinition"
};

// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(PropertyList)
var result = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);

// result: INFOTABLE dataShape: "FieldDefinition"
var fieldDefinitions =  DataShapes[dataShapeName].GetFieldDefinitions();

var query = {
	"filters" : {
    	"type" : "EQ",
        "fieldName" : "baseType",
        "value" : "BOOLEAN"
    }
};

// result: INFOTABLE
result = Resources["InfoTableFunctions"].Query({
	t: fieldDefinitions /* INFOTABLE */,
	query: query /* QUERY */
});
