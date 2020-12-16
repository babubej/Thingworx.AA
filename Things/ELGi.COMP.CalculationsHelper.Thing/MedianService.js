//ELGi.COMP.CalculationsHelper.Thing
// propertyName  dis_temperature startDate endDate
var params = { 
    infoTableName : "InfoTable",
    dataShapeName : "PropertyDefinition"
};

// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.CalculationPurpose.DS)
var dataTemp = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);

dataTemp.AddRow({name : propertyName});

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
//thingName = HelperThingForCalculationPurpose.Thing
var data = Things[thingName].QueryNamedPropertyHistory({
	propertyNames: dataTemp /* INFOTABLE */,
	maxItems: undefined /* NUMBER */,
	startDate: undefined /* DATETIME */,
	endDate: undefined /* DATETIME */,
	oldestFirst: undefined /* BOOLEAN */,
	query: query /* QUERY */
});

var sortPropertyDataOfpropertyName = Resources["InfoTableFunctions"].Sort({
	t: data /* INFOTABLE */,
	sortColumn: propertyName /* STRING */,
	ascending: true /* BOOLEAN */
});
//var result = sortPropertyDataOfpropertyName;
countOfpropertyName= sortPropertyDataOfpropertyName.getRowCount(); // odd even
var result = 0;
if(countOfpropertyName % 2 === 0){
//even 
    result = sortPropertyDataOfpropertyName.rows[countOfpropertyName/2][propertyName];

}else{
result = sortPropertyDataOfpropertyName.rows[(countOfpropertyName-1)/2].value;
//result = AfterMedian_OfProperty;
}
