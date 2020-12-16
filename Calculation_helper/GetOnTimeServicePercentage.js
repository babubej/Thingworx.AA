try{
    
var params = {
    infoTableName : "InfoTable",
    dataShapeName : "ELGi.COMP.ThingCount.DS"
};
// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.ThingCount.DS)
var result = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params); 
  
// result: INFOTABLE dataShape: "ELGi.COMP.ThingDetailsWithData.DS"
thingsList =  Things["ELGI.COMP.ThingModelHelper.Thing"].GetThingsWithData({
	machine: undefined /* STRING */,
	region: undefined /* STRING */
});    
    
var currentdate = new Date();
var someDate = new Date();
var numberOfDaysToAdd = 90;
var last_service_date = someDate.setDate(someDate.getDate() - numberOfDaysToAdd);

var data = ThingTemplates["ELGi.comp.ELGiMaster.TT"].GetImplementingThingsWithData();
    
var query1 = {
	"filters": {
		"type": "And",
		"filters": [{
				"type": "NotMissingValue",
				"fieldName": "CRMorCCS"
			},
			{
				"type": "NE",
				"fieldName": "Rated_pressure",
				"value": 0
			}
		]
	}
	};
    // result: INFOTABLE
    var queryResult1 = Resources["InfoTableFunctions"].Query({
        t: data /* INFOTABLE */,
        query: query1 /* QUERY */
    });        
    
    

var query2 = {
	"filters": {
		"type": "Between",
		"fieldName": "previous_and_nextService",
		"from": last_service_date,
		"to": currentdate
	}
};
// result: INFOTABLE
var queryResult2 = Resources["InfoTableFunctions"].Query({
	t: queryResult1 /* INFOTABLE */ ,
	query: query2 /* QUERY */
});
    
// Query Logic - Query all the things where IsServiceOverdue is true
var query3 = {
    "filters": {
        "type": "EQ",
        "fieldName": "on_Time_Service",
        "value": true
    }
};

// result: INFOTABLE
var queryResult3 = Resources["InfoTableFunctions"].Query({
	t: queryResult2 /* INFOTABLE */,
	query: query3 /* QUERY */
});
    
   var a =  queryResult3.rows.length;
   var b = queryResult2.rows.length;
   var percentage = (a/b)*100;
    
// ELGi.COMP.ThingCount.DS entry object
var newEntry = new Object();
newEntry.FiltereredCount = Math.round(percentage); // INTEGER
newEntry.TotalCount = 100; // STRING
result.AddRow(newEntry);

} catch(err){
	logger.error("Error occured :"+err.message);
}
