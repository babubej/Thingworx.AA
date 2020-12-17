// dateValue:DATETIME
var dateValue = new Date();

// dateAddHours(dateValue:DATETIME, amount:NUMBER):STRING
var calculatedDateValue = dateAddHours(dateValue, -24);

if( selectedProperty === 'utilization_percentage' ){
    
// dateAddDays(dateValue:DATETIME, amount:NUMBER):STRING
calculatedDateValue = dateAddDays(dateValue, -30);
}

var params = {
    infoTableName : "InfoTable",
    dataShapeName : "ELGi.COMP.ChartData.DS"
};
// CreateInfoTableFromDataShape
var result = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);

try{

// result: INFOTABLE dataShape: "ELGi.COMP.ChartData.DS"
var propertyHistoricalData =  Things[fabNumber].QueryNumberPropertyHistory({
	oldestFirst: true /* BOOLEAN */,
	maxItems: undefined /* NUMBER */,
	propertyName: selectedProperty /* STRING */,
	endDate: dateValue /* DATETIME */,
	query: undefined /* QUERY */,
	startDate: calculatedDateValue /* DATETIME */
});
    
var tableLength = propertyHistoricalData.rows.length;
for (var x=0; x < tableLength; x++) {
    var row = propertyHistoricalData.rows[x];
    // ELGi.COMP.ChartData.DS entry object
    var newEntry = new Object();
    newEntry.PropertyValue = row.value; // NUMBER
    newEntry.timestamp = row.timestamp; // DATETIME
    result.AddRow(newEntry);
}    

} catch(err){
	logger.debug("No Data available!!");
}    
    

