var params = {
	infoTableName: "InfoTable",
	dataShapeName: "PropertyDefinition"
};

// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.ThingShapeList.DS)
var shape = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);
shape.AddRow({
	name: "ShapeList"
});

// This query will check input with real data and will get the data for to add shapes into thing
var query = {
	"filters": {
		"type": "And",
		"filters": [{
				"type": "EQ",
				"fieldName": "MachineGroup",
				"value": MachineGroup
			},
			{
				"type": "EQ",
				"fieldName": "MachineType",
				"value": MachineType
			},
			{
				"type": "EQ",
				"fieldName": "IsSumpAvailable",
				"value": IsSumpPressure
			},
			{
				"type": "EQ",
				"fieldName": "IsVfdOrNot",
				"value": IsVfdOrNot
			},
			{
				"type": "EQ",
				"fieldName": "NeuronType",
				"value": NeuronType
			}
		]
	}
};

// Below infotable in added query which finds the requred data and i added that query here 
// result: INFOTABLE dataShape: ""
var queryResult = Things["CreateThingDataTable.DT"].QueryDataTableEntries({
	maxItems: undefined /* NUMBER */ ,
	values: undefined /* INFOTABLE */ ,
	query: query /* QUERY */ ,
	source: undefined /* STRING */ ,
	tags: undefined /* TAGS */
});
// here i got template name and shapes list this shape list required to add into thing
var templateName = queryResult.ThingTemplateName;
var shape1 = queryResult.ShapeList;
if(shape1 !== null && shape1 !== undefined){
 //for loop to iterate shapes list and one by one shapes will get here
var tableLength1 = shape1.rows.length;
for (var y = 0; y < tableLength1; y++) {
	var thingShape = shape1.rows[y].ShapeName;

	//Above iteration through i got shape which shape i checked in thing isImplemented or not
	// result: BOOLEAN
	var checkShaperesult = Things[FabNumber].ImplementsShape({
		thingShapeName: thingShape /* THINGSHAPENAME */
	});

	// Here we check IsShapeImplemented or not if false then it goes inside the if loop
	if (checkShaperesult === false) {
		// && thingShape === checkShape thingShape !== "" && 

		//Enable Thing
		Things[FabNumber].EnableThing();

		//Restart Thing
		Things[FabNumber].RestartThing();
		
        try {
		//Here adding unimplemented shape into thing
		if (thingShape !== undefined && thingShape !== null && thingShape.length > 0) {
			var params7 = {
				name: FabNumber /* THINGNAME */ ,
				thingShapeName: thingShape /* THINGSHAPENAME */
			};
			// no return
			Resources["EntityServices"].AddShapeToThing(params7);
			//break;
		} //if closed
		} catch(err) {
			logger.info("Shape Added Successfully ");
		}
	
	} // check shape if closed
    
	//Here will show all implemented shapes after adding new shapes into Required Thing
	var data = Things[FabNumber].GetLocallyImplementedShapes();
	//var result = "Runnable";
}  }else {
var str = "provided Input not matches with input data Or Not Found Shapes";
    logger.warn("provided Input not matches with input data Or Not Found Shapes"+str);
}
