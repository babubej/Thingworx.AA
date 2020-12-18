var result = false;
var daily_load_count = Things[entityName].daily_load_count;

// dateValue:DATETIME
var dateValue = new Date();
// Start and End Date of last 1 week
var startDate = dateAddDays(dateValue, -31);
var endDate = dateAddDays(dateValue, -1);

var query_Case3 = {
    "filters": {                         
                "type": "BETWEEN",
                "fieldName": "value",
        		"from": 1000,
        		"to": 1500
    }
}; 

// result: INFOTABLE dataShape: "NumberValueStream"
var queryResult =  Things[entityName].QueryNumberPropertyHistory({
	oldestFirst: undefined /* BOOLEAN */,
	maxItems: undefined /* NUMBER */,
	propertyName: 'daily_load_count' /* STRING */,
	endDate: dateValue /* DATETIME */,
	query: query_Case3 /* QUERY */,
	startDate: startDate /* DATETIME */
});

if(queryResult.rows.length >= 15){
	result = true;
}
