var serviceName, success_Status, exception, thing_Name, Input, Result;
thing_Name = "ELGI.COMP.ThirdPartyIntegrationHelper.Thing";
try{
var headers = {
	"Content-Type" : "application/x-www-form-urlencoded"
};

var urlEncodedBody = '';
// Required parameters in Content/Body of API
urlEncodedBody += 'grant_type='+me.CRM_GrantType01;
urlEncodedBody += '&client_id='+me.CRM_Client_Id;
urlEncodedBody += '&username='+me.CRM_User_Name;
urlEncodedBody += '&password=Cud43262#$';
urlEncodedBody += '&resource='+me.CRM_Resource;

//var result = urlEncodedBody;
//
//var urlEncodedBody = 'grant_type=password&client_id=51f81489-12ee-4a9e-aaae-a2591f45987d&username=servicereport@elgi.onmicrosoft.com&password=Cud43262%23$&resource=https://elgi-dev.api.crm8.dynamics.com';
//
var params = {
	proxyScheme: undefined /* STRING */,
	headers: headers /* JSON */,
	ignoreSSLErrors: undefined /* BOOLEAN */,
	useNTLM: undefined /* BOOLEAN */,
	workstation: undefined /* STRING */,
	useProxy: undefined /* BOOLEAN */,
	withCookies: undefined /* BOOLEAN */,
	proxyHost: undefined /* STRING */,
	url: 'https://login.microsoftonline.com/common/oauth2/token' /* STRING */,
	content: urlEncodedBody /* STRING */,
	timeout: undefined /* NUMBER */,
	proxyPort: undefined /* INTEGER */,
	password: undefined /* STRING */,
	domain: undefined /* STRING */,
	contentType: undefined /* STRING */,
	username: undefined /* STRING */
};

// result: STRING
var response = Resources["ContentLoaderFunctions"].PostText(params);

var responseArray = response.split('^');

var result = JSON.parse(responseArray[0]);

me.CRM_Bearer_Token = result.access_token;
me.CRM_Refresh_Token = result.refresh_token;
    
serviceName = "GetCRMBearerToken";
    success_Status = true;
    exception = "--";
    Input = "headers :" + headers + "," + "urlEncodedBody :" + urlEncodedBody + "," + "response :" + response + "," + "responseArray :" + responseArray;
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
    
    serviceName = "GetCRMBearerToken";
    success_Status = false;
    exception = "Error"+err.message;
    Input = "headers" + "," + "urlEncodedBody" + "," + "response" + "," + "responseArray";
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
