var rated_pressure = Things[entityName].Rated_pressure;
var median_dis_pressure = Things[entityName].Median_Discharge_Pressure;

// dateValue:DATETIME
var dateValue = new Date();
// Start and End Date of last 1 week
var startDate1 = dateAddDays(dateValue, -8);
var endDate1 = dateAddDays(dateValue, -1);

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

// Start and End Date of last 2 weeks
var startDate2 = dateAddDays(dateValue, -15);
var endDate2 = dateAddDays(dateValue, -1);

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
	endDate: endDate2 /* DATETIME */,
	query: query_Case2 /* QUERY */,
	startDate: startDate2 /* DATETIME */
});

// Start and End Date of last 2 weeks
var startDate3 = dateAddDays(dateValue, -91);
var endDate3 = dateAddDays(dateValue, -1);

var query_Case3 = {
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
	endDate: endDate3 /* DATETIME */,
	query: query_Case3 /* QUERY */,
	startDate: startDate3 /* DATETIME */
});


if(queryResult1.rows.length >= 2){
	//Trigger Alert    
	// result: JSON
	var alertResponse = Things["ELGI.COMP.ThirdPartyIntegrationHelper.Thing"].SendAlert({
		ticketNo: undefined /* STRING */ ,
		symptom: symptom /* STRING */ ,
		fabNumber: entityName /* STRING */ ,
        status: 'TRIGGER' /* STRING */
	});    
}
if(queryResult2.rows.length >= 3){
	//Trigger Alert    
	// result: JSON
	var alertResponse = Things["ELGI.COMP.ThirdPartyIntegrationHelper.Thing"].SendAlert({
		ticketNo: undefined /* STRING */ ,
		symptom: symptom /* STRING */ ,
		fabNumber: entityName /* STRING */ ,
        status: 'TRIGGER' /* STRING */
	});
}

if(queryResult3.rows.length >= 90){
	//Trigger Alert    
	// result: JSON
	var alertResponse = Things["ELGI.COMP.ThirdPartyIntegrationHelper.Thing"].SendAlert({
		ticketNo: undefined /* STRING */ ,
		symptom: symptom /* STRING */ ,
		fabNumber: entityName /* STRING */ ,
        status: 'TRIGGER' /* STRING */
	});
}
