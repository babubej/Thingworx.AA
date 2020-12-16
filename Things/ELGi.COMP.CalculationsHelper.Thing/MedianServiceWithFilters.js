var medianofProperyNameProvided = 0;
var medianofpropertyNameAmbient = 0;
var result = 0, median_propertyName, AfterMedian_OfProperty;
// propertyName  dis_temperature startDate endDate
var params = { 
    infoTableName : "InfoTable",
    dataShapeName : "PropertyDefinition"
};

// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.CalculationPurpose.DS)
var dataTemp = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);

dataTemp.AddRow({name : propertyName});
dataTemp.AddRow({name : flowCode});
dataTemp.AddRow({name : propertyNameAmbient});


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

var data = Things["HelperThingForCalculationPurpose.Thing"].QueryNamedPropertyHistory({
	propertyNames: dataTemp /* INFOTABLE */,
	maxItems: undefined /* NUMBER */,
	startDate: undefined /* DATETIME */,
	endDate: undefined /* DATETIME */,
	oldestFirst: undefined /* BOOLEAN */,
	query: query /* QUERY */
});
var FilteredData = "";
if( flowCode !== "" && flowCode !== undefined){
        var params2 = {
        fieldName: flowCode /* STRING */,
        t: data/* INFOTABLE */,
        value: "fill" /* STRING */,
        };
        // result: INFOTABLE
        FilteredData = Resources["InfoTableFunctions"].EQFilter(params2);
}
        var sortPropertyDataOfpropertyName = Resources["InfoTableFunctions"].Sort({
        	t: FilteredData /* INFOTABLE */,
        	sortColumn: propertyName /* STRING */,
        	ascending: true /* BOOLEAN */
        });

        var countOfpropertyName= sortPropertyDataOfpropertyName.getRowCount(); // odd even
		//var countOfpropertyName = sortPropertyDataOfpropertyName.rows.length;
        
        if(countOfpropertyName % 2 === 0){
        //even     
        median_propertyName = sortPropertyDataOfpropertyName.rows[countOfpropertyName/2][propertyName];
        medianofProperyNameProvided = median_propertyName;
        }else {
        AfterMedian_OfProperty = sortPropertyDataOfpropertyName.rows[(countOfpropertyName-1)/2][propertyName];
          medianofProperyNameProvided = AfterMedian_OfProperty;
        }

        var sortPropertyDataOfpropertyNameAmbient = Resources["InfoTableFunctions"].Sort({
        	t: FilteredData /* INFOTABLE */,
        	sortColumn: propertyNameAmbient /* STRING */,
        	ascending: true /* BOOLEAN */
        });
		//var tablelength1 = sortPropertyDataOfpropertyNameAmbient.rows.length;
        var countOfpropertyNameAmbient= sortPropertyDataOfpropertyNameAmbient.getRowCount(); // odd even
        //result = 0;
        if(countOfpropertyNameAmbient % 2 === 0){
        //even 
      	medianofpropertyNameAmbient = sortPropertyDataOfpropertyNameAmbient.rows[countOfpropertyNameAmbient/2][propertyNameAmbient];
        medianofpropertyNameAmbient = medianofpropertyNameAmbient;
        }else        {
        AfterMedian_OfProperty = sortPropertyDataOfpropertyNameAmbient.rows[(countOfpropertyNameAmbient-1)/2][propertyNameAmbient];
          medianofpropertyNameAmbient = AfterMedian_OfProperty;
        }

	if(medianofProperyNameProvided>=medianofpropertyNameAmbient){
    	result = true;    
    }else{
    	result = false;
    }
