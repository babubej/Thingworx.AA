var result = false;
var rated_pressure = Things[entityName].Rated_pressure;
var median_dis_pressure = Things[entityName].Median_Discharge_Pressure;

// dateValue:DATETIME
var dateValue = new Date();
// Start and End Date of last 1 week
var startDate = dateAddDays(dateValue, -91);
var endDate = dateAddDays(dateValue, -1);

var query_Case1 = {
    "filters": {                         
                "type": "Between",
                "fieldName": "value",
        		"from": rated_pressure,
        		"to": rated_pressure/1.2        
    }
}; 

// result: INFOTABLE dataShape: "NumberValueStream"
var queryResult1 =  Things[entityName].QueryNumberPropertyHistory({
	oldestFirst: undefined /* BOOLEAN */,
	maxItems: undefined /* NUMBER */,
	propertyName: 'Median_Discharge_Pressure' /* STRING */,
	endDate: dateValue /* DATETIME */,
	query: query_Case1 /* QUERY */,
	startDate: startDate /* DATETIME */
});

if(queryResult1.rows.length >= 2){
	result = true;
}
