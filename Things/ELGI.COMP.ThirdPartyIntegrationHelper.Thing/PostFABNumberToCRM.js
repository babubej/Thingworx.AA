var serviceName, success_Status, exception, thing_Name, Input, Result;
thing_Name = "ELGI.COMP.ThirdPartyIntegrationHelper.Thing";

var headers = new Object();
headers.Authorization = "Bearer " + me.CRM_Bearer_Token;
headers.Prefer = 'return=representation';
//headers['MSCRM.SuppressDuplicateDetection'] = 'false';

var body = new Object();
body.elgi_name = fabNumber;

try {

	var params = {
		proxyScheme: undefined /* STRING */ ,
		headers: headers /* JSON */ ,
		ignoreSSLErrors: undefined /* BOOLEAN */ ,
		useNTLM: undefined /* BOOLEAN */ ,
		workstation: undefined /* STRING */ ,
		useProxy: undefined /* BOOLEAN */ ,
		withCookies: undefined /* BOOLEAN */ ,
		proxyHost: undefined /* STRING */ ,
		url: 'https://elgi-dev.api.crm8.dynamics.com/api/data/v9.1/elgi_airalertfabs' /* STRING */ ,
		content: body /* JSON */ ,
		timeout: undefined /* NUMBER */ ,
		proxyPort: undefined /* INTEGER */ ,
		password: undefined /* STRING */ ,
		domain: undefined /* STRING */ ,
		username: undefined /* STRING */
	};

	// result: JSON
	var result = Resources["ContentLoaderFunctions"].PostJSON(params);

	serviceName = "PostFABNumberToCRM";
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

	serviceName = "PostFABNumberToCRM";
	success_Status = false;
	exception = "Error" + ex.message;
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

	logger.error("Error occured while executing ELGI.COMP.ThirdPartyIntegrationHelper.Thing : PostFABNumberToCRM for +" + fabNumber + " . Error: " + ex);

}
