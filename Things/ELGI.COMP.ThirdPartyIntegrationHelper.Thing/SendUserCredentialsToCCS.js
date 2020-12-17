var serviceName, success_Status, exception, thing_Name, Input, Result;
thing_Name = "ELGI.COMP.ThirdPartyIntegrationHelper.Thing";

var body = new Object();
body.username = username;
body.password = password;

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
	url: 'https://ccs.elgi.com/airalert/air_credit.php' /* STRING */,
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
    
if(result !== 'Success'){
	throw new Error();
}    
	serviceName = "SendUserCredentialsToCCS";
	success_Status = true;
	exception = "--";
	Input = "CCS_User_Name :" + username + "," + "CCS_Password :" + password;
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
    
    serviceName = "SendUserCredentialsToCCS";
	success_Status = false;
	exception = "Error" + ex.message;
	Input = "CCS_User_Name :" + username + "," + "CCS_Password :" + password;
	Result = ex.message;

	Things["ELGI.COMP.InformationAboutServicesExecution.DT"].ServiceExecutionAndExceptionService({
		ServiceName: serviceName /* STRING */ ,
		Success_Status: success_Status /* STRING */ ,
		Exception: exception /* STRING */ ,
		Thing_Name: thing_Name /* STRING */ ,
		Input: Input /* STRING */ ,
		Result: Result /* STRING */
	});

    
	logger.error("Error occured while executing ELGI.COMP.ThirdPartyIntegrationHelper.Thing : SendUserCredentialsToCCS for +"+username+ " . Error: "+ex);
}    
