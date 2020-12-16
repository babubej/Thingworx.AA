var propertyName1 = 'cum_load';
var propertyName2 = 'cum_run';

// Assumption is that the this service is ran next day after 12 AM
// dateValue:DATETIME
var dateValue = new Date();
// dateAddDays(dateValue:DATETIME, amount:NUMBER):STRING
var calculatedDateValue = dateAddDays(dateValue, -1);

var startDate = calculatedDateValue.setHours(0, 0, 0, 0);
var endDate = calculatedDateValue.setHours(23, 59, 59, 0);

var query = {
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

// result: INFOTABLE dataShape: "RootEntityList"
var thingsList = ThingTemplates["ELGi.comp.ELGiMaster.TT"].QueryImplementingThingsWithData({
	maxItems: undefined /* NUMBER */ ,
	nameMask: undefined /* STRING */ ,
	query: query /* QUERY */ ,
	tags: undefined /* TAGS */
});

var tableLength = thingsList.rows.length;
logger.debug("Total THINGS :: "+tableLength);
for (var x = 0; x < tableLength; x++) {
	var row = thingsList.rows[x];
	// result: INFOTABLE dataShape: "IntegerValueStream"
	var thingName = row.name;
    
	var queryResult1 = Things[thingName].QueryIntegerPropertyHistory({
		oldestFirst: true /* BOOLEAN */ ,
		maxItems: undefined /* NUMBER */ ,
		propertyName: propertyName1 /* STRING */ ,
		endDate: endDate /* DATETIME */ ,
		query: undefined /* QUERY */ ,
		startDate: startDate /* DATETIME */
	});
	var loadCount=0;
	if (queryResult1 !== undefined && queryResult1 !== null && queryResult1.rows.length > 0) {
		var lastIndex = queryResult1.rows.length - 1;
		loadCount = queryResult1[lastIndex].value - queryResult1[0].value;        
	}
    
    var queryResult2 = Things[thingName].QueryIntegerPropertyHistory({
		oldestFirst: true /* BOOLEAN */ ,
		maxItems: undefined /* NUMBER */ ,
		propertyName: propertyName2 /* STRING */ ,
		endDate: endDate /* DATETIME */ ,
		query: undefined /* QUERY */ ,
		startDate: startDate /* DATETIME */
	});
	var runCount=0;
	if (queryResult2 !== undefined && queryResult2 !== null && queryResult2.rows.length > 0) {
		var lastIndex = queryResult2.rows.length - 1;
		runCount = queryResult2[lastIndex].value - queryResult2[0].value;        
	}
    logger.debug("Thing : "+thingName+"LOAD COUNT : "+loadCount + ", RUN COUNT : "+runCount);
    if( ( loadCount !== undefined || loadCount !== null || loadCount > 0 ) && ( runCount !== undefined || runCount !== null || runCount > 0 ) ){
    	Things[thingName].utilization_percentage = (loadCount/runCount)*100;
    } else {
    	Things[thingName].utilization_percentage = (loadCount/runCount)*100;
    }
    
    
}
