// propertyName outputProperties FilterPropertyNames filterValues thingNames startDate endDate
var medianOfProperty = 0;
//SSIT_high

//var propertyName = INPUT_Properties;
var propertyNameCopy = propertyName;
propertyName = me[propertyNameCopy];
var outputPropertiesCopy = outputProperties;
var outputProperties = me[outputPropertiesCopy];
var result = propertyNameCopy;

//try{
//logger.debug("In MedianCalculations Service");
//
////var start = new Date();
////var end = new Date();
////var startDate = start.setHours(0,0,0,0);
////var endDate = end.setHours(23,59,0,0);
//var params = { 
//    infoTableName : "InfoTable",
//    dataShapeName : "PropertyDefinition"
//};
//
//// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.CalculationPurpose.DS)
//var dataTemp = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);
//
//dataTemp.AddRow({name : propertyName});
//dataTemp.AddRow({name : outputProperties});
////dataTemp.AddRow({name : INPUT_Properties});
////dataTemp.AddRow({name : OUTPUT_Properties});
//dataTemp.AddRow({name : FilterPropertyNames}); // FilterPropertyNames
//// Name Type Thing_OR_ThingTemplates INPUT_Properties OUTPUT_Properties Frequency Interval 
//
//var query = {
//          "filters": [
//
//            {
//
//            "fieldName": propertyName,
//
//            "type": "BETWEEN",
//
//            "from": startDate,
//
//            "to": endDate
//
//          }
//        
//
//       ]
//
// };
//// thingNames  ELGi.COMP.Rule.Thing   HelperThingForCalculationPurpose.Thing
//var data = Things[thingNames].QueryNamedPropertyHistory({
//	propertyNames: dataTemp /* INFOTABLE */,
//	maxItems: undefined /* NUMBER */,
//	startDate: undefined /* DATETIME */,
//	endDate: undefined /* DATETIME */,
//	oldestFirst: undefined /* BOOLEAN */,
//	query: query /* QUERY */
//});
//logger.debug("befor FilteredData");
//var FilteredData = "";
////var filterValues = "fill";
//if( FilterPropertyNames !== " " && FilterPropertyNames !== undefined && filterValues !== " " && filterValues !== undefined){
//
//        var params1 = {
//        fieldName: FilterPropertyNames /* STRING */,
//        t: data/* INFOTABLE */,
//        value: filterValues /* STRING */,
//        };
//        // result: INFOTABLE
//        FilteredData = Resources["InfoTableFunctions"].EQFilter(params1);
//		
//	var sortPropertyDataOfpropertyName = Resources["InfoTableFunctions"].Sort({
//	t: FilteredData /* INFOTABLE */,
//	sortColumn: propertyName /* STRING */,
//	ascending: true /* BOOLEAN */
//		});
//
////var result = sortPropertyDataOfpropertyName;
//countOfpropertyName= sortPropertyDataOfpropertyName.rows.length; // odd even
//
//if(countOfpropertyName % 2 === 0){
////even 
//    medianOfProperty = sortPropertyDataOfpropertyName.rows[countOfpropertyName/2][propertyName];
//
//}else{
//    
//medianOfProperty = sortPropertyDataOfpropertyName.rows[(countOfpropertyName-1)/2][propertyName];
////result = AfterMedian_OfProperty;
//}
////me[mediansOf] = medianOfProperty;
//}
//else{
//logger.debug("second block");
//var sortPropertyDataOfpropertyName1 = Resources["InfoTableFunctions"].Sort({
//	t: data /* INFOTABLE */,
//	sortColumn: propertyName /* STRING */,
//	ascending: true /* BOOLEAN */
//});
//
////var result = sortPropertyDataOfpropertyName;
//countOfpropertyName= sortPropertyDataOfpropertyName1.rows.length; // odd even
////var result = 0;
//
//if(countOfpropertyName % 2 === 0){
////even 
//    medianOfProperty = sortPropertyDataOfpropertyName.rows[countOfpropertyName/2][propertyName];
//
//}else{
//medianOfProperty = sortPropertyDataOfpropertyName.rows[(countOfpropertyName-1)/2][propertyName];
//}
////me[mediansOf] = medianOfProperty;
//}
//    //var result = medianOfProperty;
//    
//    try{
//var listOfSecondProperty =  Things[ThingName].GetPropertyDefinitions({
//	category: undefined /* STRING */,
//	type: undefined /* BASETYPENAME */,
//	dataShape: undefined /* DATASHAPENAME */
//});   
//    var query1 = {
//		"filters": {
//					"type": "EQ",
//					"fieldName": "name",
//					"value": propertyName
//					}
//				};
//var params2 = {
//	t: listOfSecondProperty /* INFOTABLE */,
//	query: query1 /* QUERY */
//};
//var propertyList = Resources["InfoTableFunctions"].Query(params2);
//        
//if(propertyList.rows[0].name === outputProperties &&  outputProperties !== undefined && outputProperties !== "" && outputProperties !== null){
//   
//Things[thingNames][outputProperties] = medianOfProperty;
//    //var result = Things[thingNames][outputProperties];
//}
//}catch(err){
//}
////var result = medianOfProperty;
//logger.debug("End Of MedianCalculations Service");
//}
//
//catch(err){
//logger.error("Error"+err);
//}
//
//var result = Things[thingNames][outputProperties];
