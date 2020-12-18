var result = false;
var daily_load_count = Things[entityName].daily_load_count;

// dateValue:DATETIME
var dateValue = new Date();
// Start and End Date of last 1 week
var startDate1 = dateAddDays(dateValue, -8);
var endDate1 = dateAddDays(dateValue, -1);

var query_Case1 = {
    "filters": {                         
                "type": "GT",
                "fieldName": "value",
        		"value": 3000
    }
}; 

// result: INFOTABLE dataShape: "NumberValueStream"
var queryResult1 =  Things[entityName].QueryNumberPropertyHistory({
	oldestFirst: undefined /* BOOLEAN */,
	maxItems: undefined /* NUMBER */,
	propertyName: 'daily_load_count' /* STRING */,
	endDate: dateValue /* DATETIME */,
	query: query_Case1 /* QUERY */,
	startDate: startDate /* DATETIME */
});

if(queryResult1.rows.length >= 2){
	result = true;
}
