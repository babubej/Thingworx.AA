var result = false;
var rated_pressure = Things[entityName].Rated_pressure;
var median_dis_pressure = Things[entityName].Median_Discharge_Pressure;

// dateValue:DATETIME
var dateValue = new Date();

// Start and End Date of last 3 months
var startDate = dateAddDays(dateValue, -8);
var endDate = dateAddDays(dateValue, -1);

var query = {
    "filters": {
        "type": "LT",
        "fieldName": "value",
        "value": rated_pressure/1.4        
    }
};

// result: INFOTABLE dataShape: "NumberValueStream"
var queryResult3 =  Things[entityName].QueryNumberPropertyHistory({
	oldestFirst: undefined /* BOOLEAN */,
	maxItems: undefined /* NUMBER */,
	propertyName: 'Median_Discharge_Pressure' /* STRING */,
	endDate: dateValue /* DATETIME */,
	query: query /* QUERY */,
	startDate: startDate /* DATETIME */
});

if(queryResult3.rows.length >= 90){
	result = true;
}
