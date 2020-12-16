var propertyName = 'cum_run';

// Assumption is that the this service is ran next day after 12 AM
// dateValue:DATETIME
var dateValue = new Date();
// dateAddDays(dateValue:DATETIME, amount:NUMBER):STRING
var calculatedDateValue1 = dateAddDays(dateValue, -31);
var calculatedDateValue2 = dateAddDays(dateValue, -1);

var startDate1 = calculatedDateValue1.setHours(0, 0, 0, 0);
var endDate1 = calculatedDateValue1.setHours(23, 59, 59, 0);

var startDate2 = calculatedDateValue2.setHours(0, 0, 0, 0);
var endDate2 = calculatedDateValue2.setHours(23, 59, 59, 0);

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
    
    //Query Data of 31st day
	var queryResult1 = Things[thingName].QueryIntegerPropertyHistory({
		oldestFirst: true /* BOOLEAN */ ,
		maxItems: undefined /* NUMBER */ ,
		propertyName: propertyName /* STRING */ ,
		endDate: endDate1 /* DATETIME */ ,
		query: undefined /* QUERY */ ,
		startDate: startDate1 /* DATETIME */
	});
	var runCount1=0;
	if (queryResult1 !== undefined && queryResult1 !== null && queryResult1.rows.length > 0) {
		runCount1 = queryResult1[0].value;        
	}
    
    //Query Data of yesterday
    var queryResult2 = Things[thingName].QueryIntegerPropertyHistory({
		oldestFirst: true /* BOOLEAN */ ,
		maxItems: undefined /* NUMBER */ ,
		propertyName: propertyName /* STRING */ ,
		endDate: endDate2 /* DATETIME */ ,
		query: undefined /* QUERY */ ,
		startDate: startDate2 /* DATETIME */
	});
	var runCount2=0;
	if (queryResult2 !== undefined && queryResult2 !== null && queryResult2.rows.length > 0) {
		var lastIndex = queryResult2.rows.length - 1;
		runCount2 = queryResult2[lastIndex].value;        
	}
    
    var avg = ( runCount2 - runCount1 )/30;
    
    var consumablesList = me.ConsumablesMapping;
    var tableLength1 = consumablesList.rows.length;
    for (var y=0; y < tableLength1; y++) {
        var row1 = consumablesList.rows[y];
        if( avg !== 0 ){
      	Things[thingName][row1.propertyName] = Math.round( Things[thingName][row1.actualPropertyName]/avg );
        }            
    }   
}
