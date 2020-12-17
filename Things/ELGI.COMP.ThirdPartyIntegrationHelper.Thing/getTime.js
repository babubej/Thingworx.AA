var serviceName, success_Status, exception, thing_Name, Input, Result;
thing_Name = "ELGI.COMP.ThirdPartyIntegrationHelper.Thing";
try{
// dateValue:DATETIME
var dateValue = new Date(1596732369);

// dateFormat(dateValue:DATETIME, dateFormat:STRING):STRING
var re2sult = dateFormat(dateValue, "HH:mm:ss");

// dateValue:DATETIME
var dateValue = new Date(1596732369);

// dateFormatISO(dateValue:DATETIME):STRING
var result = dateFormatISO(dateValue);
    
    serviceName = "getTime";
    success_Status = true;
    exception = "--";
    Input = "dateValue :" + dateValue;
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
    
    serviceName = "getTime";
    success_Status = false;
    exception = "Error"+err.message;
    Input = "dateValue";
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
