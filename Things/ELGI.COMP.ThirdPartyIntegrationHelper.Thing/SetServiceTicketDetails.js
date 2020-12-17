var serviceName, success_Status, exception, thing_Name, Input, Result;
thing_Name = "ELGI.COMP.ThirdPartyIntegrationHelper.Thing";

logger.debug("SetServiceTicketDetails API called for " + fabNumber);
try {

var executionStatus = false;
var message = "";

logger.info("Fab Number : " + fabNumber + ",TICKET No : " + ticketNo);

if (fabNumber === undefined || fabNumber === null || fabNumber.length === 0) {
	executionStatus = false;
	message = "Fab Number cannot be empty";
}
//else if( symptom === undefined || symptom === null || symptom.length === 0 ){
//	executionStatus = false;
//    message = "Symptom cannot be empty";
//} 
else if (ticketNo === undefined || ticketNo === null || ticketNo.length === 0) {
	executionStatus = false;
	message = "Ticket Number cannot be empty";
} else {
        
	// dateValue:DATETIME
	var dateValue = new Date();    
    var startTime = dateAddDays(dateValue, -1);

		var streamQuery = {
			"filters": {
				"type": "And",
				"filters": [{
						"type": "EQ",
						"fieldName": "FabNumber",
						"value": fabNumber
					},					
					{
						"type": "EQ",
						"fieldName": "RuleResult",
						"value": true
					}
				]
			}
		};

		// result: INFOTABLE dataShape: ""
		var streamQueryResult = Things["ELGi.COMP.ExecutedRules.Stream"].QueryStreamData({
			oldestFirst: undefined /* BOOLEAN */ ,
			maxItems: undefined /* NUMBER */ ,
			sourceTags: undefined /* TAGS */ ,
			endDate: dateValue /* DATETIME */ ,
			query: streamQuery /* QUERY */ ,
			source: undefined /* STRING */ ,
			startDate: startTime /* DATETIME */ ,
			tags: undefined /* TAGS */
		});            
    
	var values = Things["ELGi.COMP.ExecutedRules.Stream"].CreateValues();
	values.RuleId = streamQueryResult.RuleId; // STRING
	values.RuleExecutionId = undefined; // STRING
	values.RuleName = undefined; // STRING
	values.Frequency = undefined; // STRING
	values.FabNumber = fabNumber; // STRING
	values.ExecutionTimeStamp = new Date(); // DATETIME
	values.Condition = undefined; // STRING
	values.ExecutionStatus = true; // STRING
	values.PropertyValues = undefined; // STRING
	values.TicketNumber = ticketNo; // STRING
	values.Symptom = symptom; // STRING
	values.AlertStatus = 'ACKNOWLEDGED'; // STRING    
	values.RuleResult = true; // STRING
	var paramsStream = {
		tags: undefined,
		timestamp: undefined,
		source: undefined,
		values: values,
		location: undefined
	};
	Things["ELGi.COMP.ExecutedRules.Stream"].AddStreamEntry(paramsStream);
	executionStatus = true;
	message = "Ticket number received successfully for " + fabNumber;
}

var result = {
	"success": executionStatus,
	"message": message
};
    
    serviceName = "SetServiceTicketDetails";
    success_Status = true;
    exception = "--";
    Input = "fabNumber :"+ fabNumber + "," + "symptom :" +symptom + "," + "ticketNo :" +ticketNo + "," + "status :" +status + "," + "type :" +type;
	Result = result;

	Things["ELGI.COMP.InformationAboutServicesExecution.DT"].ServiceExecutionAndExceptionService({
		ServiceName: serviceName /* STRING */ ,
		Success_Status: success_Status /* STRING */ ,
		Exception: exception /* STRING */ ,
		Thing_Name: thing_Name /* STRING */ ,
		Input: Input /* STRING */ ,
		Result: Result /* STRING */
	});
    
}
catch(err){
    
    serviceName = "SetServiceTicketDetails";
    success_Status = false;
    exception = "Error"+err.message;
    Input = "fabNumber :"+ fabNumber + "," + "symptom :" +symptom + "," + "ticketNo :" +ticketNo + "," + "status :" +status + "," + "type :" +type;
	Result = err.message;

	Things["ELGI.COMP.InformationAboutServicesExecution.DT"].ServiceExecutionAndExceptionService({
		ServiceName: serviceName /* STRING */ ,
		Success_Status: success_Status /* STRING */ ,
		Exception: exception /* STRING */ ,
		Thing_Name: thing_Name /* STRING */ ,
		Input: Input /* STRING */ ,
		Result: Result /* STRING */
	});
}    
