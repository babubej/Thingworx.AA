// dateValue:DATETIME
var end = new Date();

// dateAddDays(dateValue:DATETIME, amount:NUMBER):STRING
var start = dateAddDays(end, -1);

// result: INFOTABLE dataShape: "NumberValueStream"
var medDisTemp = Things[thingName].QueryNumberPropertyHistory({
	oldestFirst: undefined /* BOOLEAN */ ,
	maxItems: undefined /* NUMBER */ ,
	propertyName: 'Median_Discharge_Temperature' /* STRING */ ,
	endDate: end /* DATETIME */ ,
	query: undefined /* QUERY */ ,
	startDate: start /* DATETIME */
});

var sum = 0;
var tableLength = medDisTemp.rows.length;
for (var x = 0; x < tableLength; x++) {
	var row = medDisTemp.rows[x];
	sum = sum + row.value;
}

var med_dis_temp_avg = 0;
if (tableLength !== 0) {
	med_dis_temp_avg = sum / tableLength;
}

// result: INFOTABLE dataShape: "NumberValueStream"
var medAmbTemp = Things[thingName].QueryNumberPropertyHistory({
	oldestFirst: undefined /* BOOLEAN */ ,
	maxItems: undefined /* NUMBER */ ,
	propertyName: 'Median_Ambient_Temperature' /* STRING */ ,
	endDate: end /* DATETIME */ ,
	query: undefined /* QUERY */ ,
	startDate: start /* DATETIME */
});

sum = 0;
tableLength = medAmbTemp.rows.length;
for (var y = 0; y < tableLength; y++) {
	var row1 = medAmbTemp.rows[y];
	sum = sum + row1.value;
}

var med_amb_temp_avg = 0;
if (tableLength !== 0) {
	med_amb_temp_avg = sum / tableLength;
}

var result = false;
var result_1 = med_dis_temp_avg > (med_amb_temp_avg + DesignLimit);
var result_2 = med_dis_temp_avg > 90;
if (result_1 && result_2) {
	result = true;
}
Things[thingName].high_DT_24Hrs = result;
if (!result) {
	Things[thingName].high_DT_48Hrs = result;
}
