var serviceName, success_Status, exception, thing_Name, Input;
thing_Name = "ELGI.COMP.ThirdPartyIntegrationHelper.Thing";

var inputObj = JSON.parse(input);

try {
	// result: JSON
	var response = Things["ELGi.COMP.OrgStructureHelper.Thing"].CreateOrgStructure({
		input: inputObj /* JSON */
	});
//	var status = false;
//	if (response) {
//		status = true;
//	}
//
//	var result = {
//		success: status
//	};
    
    var result = response;

	serviceName = "SetOrgStructureAndCustomerDetails";
	success_Status = true;
	exception = "--";
	Input = "input :" + input;	

	Things["ELGI.COMP.InformationAboutServicesExecution.DT"].ServiceExecutionAndExceptionService({
		ServiceName: serviceName /* STRING */ ,
		Success_Status: success_Status /* STRING */ ,
		Exception: exception /* STRING */ ,
		Thing_Name: thing_Name /* STRING */ ,
		Input: Input /* STRING */ ,
		Result: result /* STRING */
	});


} catch (err) {
	logger.error("Org Structure Creation Service Failed : " + err);
	var result = {
		success: false,
		message: err.message
	};

	serviceName = "SetOrgStructureAndCustomerDetails";
	success_Status = false;
	exception = "Error" + err.message;
	Input = "input :" + input;

	Things["ELGI.COMP.InformationAboutServicesExecution.DT"].ServiceExecutionAndExceptionService({
		ServiceName: serviceName /* STRING */ ,
		Success_Status: success_Status /* STRING */ ,
		Exception: exception /* STRING */ ,
		Thing_Name: thing_Name /* STRING */ ,
		Input: Input /* STRING */ ,
		Result: result /* STRING */
	});

}
