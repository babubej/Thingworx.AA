var result = false;
if (entityName !== undefined && entityName !== 'undefined' && entityName !== null && entityName.trim() !== '') {

	var propertyName = 'fault_status';
	var dateValue = new Date();
	var dateValue1 = new Date();
	var startDate = dateValue.setHours(0, 0, 0, 0);
	var endDate = dateValue1.setHours(23, 59, 59, 0);

	var queryResult = Things[entityName].QueryIntegerPropertyHistory({
		oldestFirst: true /* BOOLEAN */ ,
		maxItems: undefined /* NUMBER */ ,
		propertyName: propertyName /* STRING */ ,
		endDate: endDate /* DATETIME */ ,
		query: undefined /* QUERY */ ,
		startDate: startDate /* DATETIME */
	});
	var tableLength = queryResult.rows.length;
	var count = 0;
	for (var x = 0; x < tableLength; x++) {
		var row = queryResult.rows[x];
		var binaryAsString = Things["ELGI.COMP.ThingModelHelper.Thing"].ConvertDecToBinary({
			decimalNumber: row.value /* INTEGER */
		});
		if (binaryAsString.charAt(1) === '1') {
			count++;
		}
	}
	if (count >= 3) {
		result = true;
	} else {
		result = false;
	}

} else {
	result = false;
}
