var propertyName1 = propertyName;
var Property_Names = me[propertyName1];
//var result = Property_Names; 
//propertyName startDate endDate 
 //propertyName  dis_temperature startDate endDate
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

dataTemp.AddRow({name : Property_Names});
dataTemp.AddRow({name : FilterPropertyNames});
var query = {
          "filters": [

            {

            "fieldName": Property_Names,

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
//var filterValues = "fill";
//var b = FilterPropertyNames;
//var FilterPropertyNames= me[b];
if( FilterPropertyNames !== "" && FilterPropertyNames !== undefined){

        var params = {
        fieldName: FilterPropertyNames /* STRING */,
        t: data/* INFOTABLE */,
        value: filterValues /* STRING */,
        };
        // result: INFOTABLE
        FilteredData = Resources["InfoTableFunctions"].EQFilter(params);
	//var result = FilteredData;	
	var sortPropertyDataOfpropertyName = Resources["InfoTableFunctions"].Sort({
	t: FilteredData /* INFOTABLE */,
	sortColumn: Property_Names /* STRING */,
	ascending: true /* BOOLEAN */
		});

countOfpropertyName= sortPropertyDataOfpropertyName.rows.length; // odd even

if(countOfpropertyName % 2 === 0){
//even 
    medianOfProperty = sortPropertyDataOfpropertyName.rows[countOfpropertyName/2][Property_Names];

}else{
medianOfProperty = sortPropertyDataOfpropertyName.rows[(countOfpropertyName-1)/2][Property_Names];
//result = AfterMedian_OfProperty;
}
//me[mediansOf] = medianOfProperty;
}

else
    
{
var sortPropertyDataOfpropertyName = Resources["InfoTableFunctions"].Sort({
	t: data /* INFOTABLE */,
	sortColumn: Property_Names /* STRING */,
	ascending: true /* BOOLEAN */
});

countOfpropertyName= sortPropertyDataOfpropertyName.rows.length; // odd even
    
if(countOfpropertyName % 2 === 0){
//even 
    medianOfProperty = sortPropertyDataOfpropertyName.rows[countOfpropertyName/2][Property_Names];
}
    else
    {
medianOfProperty = sortPropertyDataOfpropertyName.rows[(countOfpropertyName-1)/2][Property_Names];
}
//me[mediansOf] = medianOfProperty;
}
var result = medianOfProperty;



//
