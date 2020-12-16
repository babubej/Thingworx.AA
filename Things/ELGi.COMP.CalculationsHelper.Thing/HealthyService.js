// result: INFOTABLE dataShape: "RootEntityList"
var thingsList =  ThingTemplates["ELGi.comp.ELGiMaster.TT"].GetImplementingThingsWithData();

try{
    
var params = {
    infoTableName : "InfoTable",
    dataShapeName : "ELGi.COMP.ThingCount.DS"
};
// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.ThingCount.DS)
var result = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);
  
if(thingsList === undefined){
	logger.debug("THINGS COUNT : undefined");
} else {
	logger.debug("THINGS COUNT : "+ thingsList.rows.length);
}

// Query Logic - Query all the things where is_Machine_Connected is true
//var query = {
//    "filters": {
//        "type": "EQ",
//        "fieldName": "is_Machine_Connected",
//        "value": true
//    }
//};

    var query =
{
    "filters": {
        "type": "And",
        "filters": [
            {
                "type": "EQ",
                "fieldName": "fault_status",
                "value": "0"
            },
             {
        "type": "EQ",
        "fieldName": "is_Machine_Connected",
        "value": "true"
    }
        ]
    }
}; 

    
// result: INFOTABLE
var queryResult = Resources["InfoTableFunctions"].Query({
	t: thingsList /* INFOTABLE */,
	query: query /* QUERY */
});
var predictedRuleRes = me.PredictedWithFaults(); // bacause predicted rule = true data or things count we get
    // now all the data minus queried data things count
    // because we want pedicted rule = false 
var predictedRuleFalse = predictedRuleRes.TotalCount - predictedRuleRes.FiltereredCount;
// ELGi.COMP.ThingCount.DS entry object
var newEntry = new Object();
newEntry.FiltereredCount = predictedRuleFalse + queryResult.rows.length; // INTEGER
newEntry.TotalCount = thingsList.rows.length; // STRING
result.AddRow(newEntry);

} catch(err){
	logger.error("Error occured :"+err.message);
}
