// propertyName FilterPropertyNames filterValues thingNames

try{
    logger.debug("In MedianCalculations Service");
var propertyNameCopy = propertyName;
var propertyName = me[propertyNameCopy];
//propertyName startDate endDate 
// propertyName  dis_temperature startDate endDate
var start = new Date();
var end = new Date();
var startDate = start.setHours(0,0,0,0);
var endDate = end.setHours(23,59,0,0);
var params = { 
    infoTableName : "InfoTable",
    dataShapeName : "PropertyDefinition"
};

// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.CalculationPurpose.DS)
var dataTemp = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);

dataTemp.AddRow({name : propertyName});
dataTemp.AddRow({name : FilterPropertyNames});

var query = {
          "filters": [

            {

            "fieldName": propertyName,

            "type": "BETWEEN",

            "from": startDate,

            "to": endDate

          }
        

       ]

 };
// thingNames  ELGi.COMP.Rule.Thing   HelperThingForCalculationPurpose.Thing
var data = Things[thingNames].QueryNamedPropertyHistory({
	propertyNames: dataTemp /* INFOTABLE */,
	maxItems: undefined /* NUMBER */,
	startDate: undefined /* DATETIME */,
	endDate: undefined /* DATETIME */,
	oldestFirst: undefined /* BOOLEAN */,
	query: query /* QUERY */
});
logger.debug("befor FilteredData");
var FilteredData = "";
//var filterValues = "fill";
if( FilterPropertyNames !== " " && FilterPropertyNames !== undefined){

        var params = {
        fieldName: FilterPropertyNames /* STRING */,
        t: data/* INFOTABLE */,
        value: filterValues /* STRING */,
        };
        // result: INFOTABLE
        FilteredData = Resources["InfoTableFunctions"].EQFilter(params);
		
	var sortPropertyDataOfpropertyName = Resources["InfoTableFunctions"].Sort({
	t: FilteredData /* INFOTABLE */,
	sortColumn: propertyName /* STRING */,
	ascending: true /* BOOLEAN */
		});

//var result = sortPropertyDataOfpropertyName;
countOfpropertyName= sortPropertyDataOfpropertyName.getRowCount(); // odd even

if(countOfpropertyName % 2 === 0){
//even 
    medianOfProperty = sortPropertyDataOfpropertyName.rows[countOfpropertyName/2][propertyName];

}else{

    
medianOfProperty = sortPropertyDataOfpropertyName.rows[(countOfpropertyName-1)/2][propertyName];
//result = AfterMedian_OfProperty;

}
//me[mediansOf] = medianOfProperty;
}
else{
logger.debug("second block");
var sortPropertyDataOfpropertyName = Resources["InfoTableFunctions"].Sort({
	t: data /* INFOTABLE */,
	sortColumn: propertyName /* STRING */,
	ascending: true /* BOOLEAN */
});

//var result = sortPropertyDataOfpropertyName;
countOfpropertyName= sortPropertyDataOfpropertyName.getRowCount(); // odd even
//var result = 0;

if(countOfpropertyName % 2 === 0){
//even 
    medianOfProperty = sortPropertyDataOfpropertyName.rows[countOfpropertyName/2][propertyName];

}else{
medianOfProperty = sortPropertyDataOfpropertyName.rows[(countOfpropertyName-1)/2][propertyName];
}
//me[mediansOf] = medianOfProperty;
}
logger.error("******************************"+thingNames);
me.medPropertyResult = medianOfProperty;
me.NameOFThingTestPurpose = thingNames;
//var thingNamescopy = thingNames;
//var thingNames = 
//var property = me[propertyName];
logger.debug("The Input Comes into median CalculationsService"+propertyName);
    var medianProperty_Name = "Median" + "_" + propertyName;
	//var result = medianProperty_Name;
    try{
var abc =  Things[ThingName].GetPropertyDefinitions({
	category: undefined /* STRING */,
	type: undefined /* BASETYPENAME */,
	dataShape: undefined /* DATASHAPENAME */
});   
    var query = {
	"filters": 
        [{
				"type": "EQ",
				"fieldName": "name",
				"value": propertyName
			}
		]
};
var params = {
	t: abc /* INFOTABLE */,
	query: query /* QUERY */
};
var propertyList = Resources["InfoTableFunctions"].Query(params);
if(propertyList.rows[0].name === medianProperty_Name &&  medianOfProperty !== undefined && medianOfProperty !== "" && medianProperty_Name !== null){
   
Things[thingNames].medianProperty_Name = medianOfProperty;
}
}catch(err){
}

logger.debug("End Of MedianCalculations Service");
}
catch(err){
logger.error("Error"+err);
}
