var serviceName, success_Status, exception, thing_Name, Input, Result;
thing_Name = "ELGI.COMP.ThirdPartyIntegrationHelper.Thing";
var headers = new Object();
headers.Authorization = "Bearer " + me.CRM_Bearer_Token;
//headers.Prefer = 'return=representation';
//headers['MSCRM.SuppressDuplicateDetection'] = 'false';

var body = new Object();
body.elgi_airalertfabnumber = fabNumber;
body.elgi_airalertsymptom = symptom;
body.elgi_ticketno = ticketNo;
body.elgi_status = status;

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
		url: 'https://elgi-dev.api.crm8.dynamics.com/api/data/v9.1/elgi_airalertccrequests' /* STRING */ ,
		content: body /* JSON */ ,
		timeout: undefined /* NUMBER */ ,
		proxyPort: undefined /* INTEGER */ ,
		password: undefined /* STRING */ ,
		domain: undefined /* STRING */ ,
		username: undefined /* STRING */
	};

	// result: JSON
	var result = Resources["ContentLoaderFunctions"].PostJSON(params);
	serviceName = "SendAlertToCRM";
	success_Status = true;
	exception = "--";
	Input = "fabNumber :" + fabNumber + "," + "symptom :" + symptom + "," + "ticketNo :" + ticketNo + "," + "status :" + status;
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

	serviceName = "SendAlertToCRM";
	success_Status = false;
	exception = "Error" + ex.message;
	Input = "fabNumber :" + fabNumber + "," + "symptom :" + symptom + "," + "ticketNo :" + ticketNo + "," + "status :" + status;
	Result = ex.message;

	Things["ELGI.COMP.InformationAboutServicesExecution.DT"].ServiceExecutionAndExceptionService({
		ServiceName: serviceName /* STRING */ ,
		Success_Status: success_Status /* STRING */ ,
		Exception: exception /* STRING */ ,
		Thing_Name: thing_Name /* STRING */ ,
		Input: Input /* STRING */ ,
		Result: Result /* STRING */
	});

	logger.error("Error occured while executing ELGI.COMP.ThirdPartyIntegrationHelper.Thing : SendAlertToCRM for +" + fabNumber + " . Error: " + ex);
}
