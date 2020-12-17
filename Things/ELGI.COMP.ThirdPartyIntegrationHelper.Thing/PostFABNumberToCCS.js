var serviceName, success_Status, exception, thing_Name, Input, Result;
thing_Name = "ELGI.COMP.ThirdPartyIntegrationHelper.Thing";
try{    
var body = new Object();
body.fabno = fabNumber;

var params = {
	proxyScheme: undefined /* STRING */,
	headers: undefined /* JSON */,
	ignoreSSLErrors: undefined /* BOOLEAN */,
	useNTLM: undefined /* BOOLEAN */,
	workstation: undefined /* STRING */,
	useProxy: undefined /* BOOLEAN */,
	withCookies: undefined /* BOOLEAN */,
	proxyHost: undefined /* STRING */,
	url: me.CCS_PostFabNumber_API /* STRING */,
	content: body /* STRING */,
	timeout: undefined /* NUMBER */,
	proxyPort: undefined /* INTEGER */,
	password: me.CCS_Password /* STRING */,
	domain: undefined /* STRING */,
	contentType: 'JSON' /* STRING */,
	username: me.CCS_User_Name /* STRING */
};

// result: STRING
var result = Resources["ContentLoaderFunctions"].PostText(params);

    serviceName = "PostFABNumberToCCS";
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
	logger.error("Error occured while executing ELGI.COMP.ThirdPartyIntegrationHelper.Thing : PostFABNumberToCCS for +"+fabNumber+ " . Error: "+ex);
    serviceName = "PostFABNumberToCCS";
    success_Status = false;
    exception = "Error"+ex.message;
	Input = "fabNumber :"+fabNumber;
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
