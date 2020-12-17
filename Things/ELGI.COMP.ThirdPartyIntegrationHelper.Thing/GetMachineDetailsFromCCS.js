var serviceName, success_Status, exception, thing_Name, Input, Result;
thing_Name = "ELGI.COMP.ThirdPartyIntegrationHelper.Thing";
var body = new Object();
body.fabno = fabNumber;

try{
var params = {
	proxyScheme: undefined /* STRING */,
	headers: undefined /* JSON */,
	ignoreSSLErrors: undefined /* BOOLEAN */,
	useNTLM: undefined /* BOOLEAN */,
	workstation: undefined /* STRING */,
	useProxy: undefined /* BOOLEAN */,
	withCookies: undefined /* BOOLEAN */,
	proxyHost: undefined /* STRING */,
	url: me.CCS_GetMachineDetails_API /* STRING */,
	content: body /* JSON */,
	timeout: undefined /* NUMBER */,
	proxyPort: undefined /* INTEGER */,
	password: me.CCS_Password /* STRING */,
	domain: undefined /* STRING */,
	username: me.CCS_User_Name /* STRING */
};

// result: JSON
var result = Resources["ContentLoaderFunctions"].PostJSON(params);
    
    serviceName = "GetMachineDetailsFromCCS";
    success_Status = true;
    exception = "--";
    Input = "fabNumber :" +fabNumber;
	Result = result;
    
Things["ELGI.COMP.InformationAboutServicesExecution.DT"].ServiceExecutionAndExceptionService({
		ServiceName: serviceName /* STRING */ ,
		Success_Status: success_Status /* STRING */ ,
		Exception: exception /* STRING */ ,
		Thing_Name: thing_Name /* STRING */ ,
		Input: Input /* STRING */ ,
		Result: Result /* STRING */
	});
    
} catch(ex){
	logger.error("Error occured while executing ELGI.COMP.ThirdPartyIntegrationHelper.Thing : GetMachineDetailsFromCCS for +"+fabNumber+ " . Error: "+ex);

    serviceName = "GetMachineDetailsFromCCS";
    success_Status = false;
    exception = "Error"+ex.message;
    Input = "fabNumber :" + fabNumber;
    Result = ex.message;

	Things["ELGI.COMP.InformationAboutServicesExecution.DT"].ServiceExecutionAndExceptionService({
		ServiceName: serviceName /* STRING */ ,
		Success_Status: success_Status /* STRING */ ,
		Exception: exception /* STRING */ ,
		Thing_Name: thing_Name /* STRING */ ,
		Input: Input /* STRING */ ,
		Result: Result /* STRING */
	});
}    
