var result = false;
var rated_pressure = Things[entityName].Rated_pressure;
var median_dis_pressure = Things[entityName].Median_Discharge_Pressure;

// dateValue:DATETIME
var dateValue = new Date();

// Start and End Date of last 2 weeks
var startDate = dateAddDays(dateValue, -15);
var endDate = dateAddDays(dateValue, -1);

var query_Case2 = {
    "filters": {
        "type": "Between",
        "fieldName": "value",
        "from": rated_pressure/1.2,
        "to": rated_pressure/1.4
    }
};

// result: INFOTABLE dataShape: "NumberValueStream"
var queryResult2 =  Things[entityName].QueryNumberPropertyHistory({
	oldestFirst: undefined /* BOOLEAN */,
	maxItems: undefined /* NUMBER */,
	propertyName: 'Median_Discharge_Pressure' /* STRING */,
	endDate: dateValue /* DATETIME */,
	query: query_Case2 /* QUERY */,
	startDate: startDate /* DATETIME */
});

if(queryResult2.rows.length >= 3){
	result = true;
}
