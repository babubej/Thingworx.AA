var propertyName = propertyToCalculate;

// Assumption is that the this service is ran next day after 12 AM
// dateValue:DATETIME
var dateValue = new Date();
// dateAddDays(dateValue:DATETIME, amount:NUMBER):STRING
var calculatedDateValue = dateAddDays(dateValue, -1);

var startDate = calculatedDateValue.setHours(0, 0, 0, 0);
var endDate = calculatedDateValue.setHours(23, 59, 59, 0);

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
	var result = queryResult[lastIndex].value - queryResult[0].value;
}
