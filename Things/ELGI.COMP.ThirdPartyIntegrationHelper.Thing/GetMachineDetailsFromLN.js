var serviceName, success_Status, exception, thing_Name, Input, Result;
thing_Name = "ELGI.COMP.ThirdPartyIntegrationHelper.Thing";
try{
    //API code to get details from LN
    
    var result = {
    	"Machine_Variant" : "EG22",
        "Type_Of_Cooling" : "",
        "No_Of_Stages" : "",
        "Operating_Voltage" : "240",
        "Operating_Frequency" : "50",
        "Rated_Pressure" : "15",
        "Rated_CFM" : "24",
        "Manufacture_Date" : "",
        "Rated_Power_KW_Based" : "200",
        "TPL_No" : "W3422442"
    };
    
    serviceName = "GetMachineDetailsFromLN";
    success_Status = true;
    exception = "--";
    Input = "fabNumber :" + fabNumber;
    Result = result;

	Things["ELGI.COMP.InformationAboutServicesExecution.DT"].ServiceExecutionAndExceptionService({
		ServiceName: serviceName /* STRING */ ,
		Success_Status: success_Status /* STRING */ ,
		Exception: exception /* STRING */ ,
		Thing_Name: thing_Name /* STRING */ ,
		Input: Input /* STRING */ ,
		Result: Result /* STRING */
	});
    
} catch (ex) {
    logger.error(me.name + ": Failed to create & register new Remote Thing with fabNumber='" + fabNumber + "', imeiNumber='" + imeiNumber + "': " + ex + " " + ex.stack);
    var result = {
        success: false,
        message: ex + ""
    };
    
     serviceName = "GetMachineDetailsFromLN";
    success_Status = false;
    exception = "Error"+ex.message;
    Input = "fabNumber :"+fabNumber;
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
