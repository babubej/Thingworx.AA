thingsList = ThingTemplates["ELGi.comp.ELGiMaster.TT"].GetImplementingThingsWithData();

try{
    
var params = {
    infoTableName : "InfoTable",
    dataShapeName : "ELGi.COMP.ThingCount.DS"
};
// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.ThingCount.DS)
var result = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);
  
if(dataOfStream === undefined){
	logger.debug("THINGS COUNT : undefined");
} else {
	logger.debug("THINGS COUNT : "+ dataOfStream.rows.length);
}

// Query Logic - Query all the things where Alert was triggered 
var query =
{
    "filters": {
        "type": "And",
        "filters": [
            {
                "type": "EQ",
                "fieldName": "AlertStatus",
                "value": "ACKNOWLEDGED"
            },
            {
                "type": "EQ",
                "fieldName": "RuleResult",
                "value": "true"
            }
        ]
    }
}; 

    

// dateValue:DATETIME
var startDate = new Date();

// dateAddDays(dateValue:DATETIME, amount:NUMBER):STRING
var endDate = dateAddDays(dateValue, -2);
    
// result: INFOTABLE dataShape: ""
var queryResult =  Things["ELGi.COMP.ExecutedRules.Stream"].QueryStreamData({
	oldestFirst: undefined /* BOOLEAN */,
	maxItems: undefined /* NUMBER */,
	sourceTags: undefined /* TAGS */,
	endDate: endDate /* DATETIME */,
	query: query /* QUERY */,
	source: undefined /* STRING */,
	startDate: startDate /* DATETIME */,
	tags: undefined /* TAGS */
});
    
var tableLength = queryResult.rows.length;
for (var x=0; x < tableLength; x++) {
    var row = queryResult.rows[x];    
}    
    
//var result = queryResult; 
// ELGi.COMP.ThingCount.DS entry object
var newEntry = new Object();
newEntry.FiltereredCount = queryResult.rows.length; // INTEGER
newEntry.TotalCount = thingsList.rows.length; // STRING 
result.AddRow(newEntry);

} catch(err){
	logger.error("Error occured :"+err.message);
}
