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

var data = me.QueryNamedPropertyHistory({
	propertyNames: dataTemp /* INFOTABLE */,
	maxItems: undefined /* NUMBER */,
	startDate: undefined /* DATETIME */,
	endDate: undefined /* DATETIME */,
	oldestFirst: undefined /* BOOLEAN */,
	query: undefined /* QUERY */
});


var recordsToDisplay = Resources['InfoTableFunctions'].Query(
    {      
        query : query,     

        t : data   
    } );

var sortPropertyDataOfpropertyName = Resources["InfoTableFunctions"].Sort({
	t: recordsToDisplay /* INFOTABLE */,
	sortColumn: propertyName /* STRING */,
	ascending: true /* BOOLEAN */
});

countOfpropertyName= sortPropertyDataOfpropertyName.getRowCount(); // odd even
var result = 0;
if(countOfpropertyName % 2 === 0){
//even 
mid_OfpropertyName = countOfpropertyName/2;

median_propertyName = sortPropertyDataOfpropertyName.getRow(mid_OfpropertyName)[propertyName]; //dis_pressure AddRow({name : propertyName})
//median_propertyName = sortPropertyDataOfpropertyName[mid_OfpropertyName][propertyName]; //dis_pressure AddRow({name : propertyName})
result = median_propertyName;

}else if(countOfpropertyName % 2 !== 0)
{
//odd
var firstmed  = countOfpropertyName + 1;
var mid_OfpropertyName_firstmed = firstmed / 2;
var median_propertyName_firstmed = sortPropertyDataOfpropertyName.getRow(mid_OfpropertyName_firstmed)[propertyName];

var secondmed  = countOfpropertyName - 1;
var mid_OfpropertyName_secondmed = secondmed / 2;
var median_propertyName_secondmed = sortPropertyDataOfpropertyName.getRow(mid_OfpropertyName_secondmed)[propertyName];

var BeforMedian_OfProperty = median_propertyName_firstmed + median_propertyName_secondmed;
var AfterMedian_OfProperty = BeforMedian_OfProperty / 2; 
result = AfterMedian_OfProperty;
}

//mid_OfpropertyName = countOfpropertyName/2;
//
//median_propertyName = sortPropertyDataOfpropertyName.getRow(mid_OfpropertyName)[propertyName]; //dis_pressure AddRow({name : propertyName})
//median_propertyName = sortPropertyDataOfpropertyName[mid_OfpropertyName][propertyName]; //dis_pressure AddRow({name : propertyName})

//var result =  Things["StatisticalCalculationThing"].CalculateMedianValue({
//	timedValues: recordsToDisplay /* INFOTABLE */
//});

//1 2 3 4 5 6
