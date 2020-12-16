var propertyName = 'cum_LDC';

// Assumption is that the this service is ran next day after 12 AM
// dateValue:DATETIME
var dateValue = new Date();
// dateAddDays(dateValue:DATETIME, amount:NUMBER):STRING
var calculatedDateValue = dateAddDays(dateValue, -1);

var startDate = calculatedDateValue.setHours(0, 0, 0, 0);
var endDate = calculatedDateValue.setHours(23, 59, 59, 0);

// result: INFOTABLE dataShape: "RootEntityList"
var thingsList = ThingTemplates["ELGi.comp.ELGiMaster.TT"].QueryImplementingThings({
	maxItems: undefined /* NUMBER */ ,
	nameMask: undefined /* STRING */ ,
	query: undefined /* QUERY */ ,
	tags: undefined /* TAGS */
});

var tableLength = thingsList.rows.length;
for (var x = 0; x < tableLength; x++) {
	var row = thingsList.rows[x];
	// result: INFOTABLE dataShape: "IntegerValueStream"
	var thingName = row.name;
	var queryResult = Things[thingName].QueryIntegerPropertyHistory({
		oldestFirst: true /* BOOLEAN */ ,
		maxItems: undefined /* NUMBER */ ,
		propertyName: propertyName /* STRING */ ,
		endDate: endDate /* DATETIME */ ,
		query: undefined /* QUERY */ ,
		startDate: startDate /* DATETIME */
	});

	if (queryResult !== undefined && queryResult !== null && queryResult.rows.length > 0) {
		var lastIndex = queryResult.rows.length - 1;
		Things[thingName].daily_load_count = queryResult[lastIndex].value - queryResult[0].value;
        Things[thingName].load_count_per_day = queryResult[lastIndex].value - queryResult[0].value;        
	}
}
