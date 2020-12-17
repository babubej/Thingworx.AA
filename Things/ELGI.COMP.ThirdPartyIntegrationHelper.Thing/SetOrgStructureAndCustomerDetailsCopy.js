var serviceName, success_Status, exception, thing_Name, Input, Result;
thing_Name = "ELGI.COMP.ThirdPartyIntegrationHelper.Thing";

//logger.debug("ORG JSON : "+JSON.stringify(input));
var inputObj = JSON.parse(input);

try {
	// result: BOOLEAN
	var response = Things["ELGi.COMP.OrgStructureHelper.Thing"].CreateOrgStructure_Tested1({
		input: inputObj /* JSON */
	});
	var status = false;
	if (response) {
		status = true;
	}

	var result = {
		success: status
	};

	serviceName = "SetOrgStructureAndCustomerDetailsCopy";
	success_Status = true;
	exception = "--";
	Input = "input :" + input;
	Result = result;

	Things["ELGI.COMP.InformationAboutServicesExecution.DT"].ServiceExecutionAndExceptionService({
		ServiceName: serviceName /* STRING */ ,
		Success_Status: success_Status /* STRING */ ,
		Exception: exception /* STRING */ ,
		Thing_Name: thing_Name /* STRING */ ,
		Input: Input /* STRING */ ,
		Result: Result /* STRING */
	});


} catch (err) {
	logger.error("Org Structure Creation Service Failed : " + err);
	var result = {
		success: false,
		message: err.message
	};
    
   	serviceName = "SetOrgStructureAndCustomerDetailsCopy";
	success_Status = false;
	exception = "Error" + err.message;
	Input = "input :" + input;
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
