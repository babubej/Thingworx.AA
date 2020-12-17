var serviceName, success_Status, exception, thing_Name, Input, Result;
thing_Name = "ELGI.COMP.ThirdPartyIntegrationHelper.Thing";
logger.debug("SEND Alert Triggered for " + fabNumber);

try {
	var CRMorCCS = Things[fabNumber].CRMorCCS;

	if (CRMorCCS === 'CRM') {
		// result: JSON
		var result = me.SendAlertToCRM({
			fabNumber: fabNumber /* STRING */ ,
			symptom: symptom /* STRING */ ,
			ticketNo: ticketNo /* STRING */ ,
			status: status /* STRING */
		});
		logger.debug("RESPONSE from SendAlert CRM API : " + JSON.stringify(result));
	} else if (CRMorCCS === 'CCS') {
		// result: JSON
		var result = me.SendAlertToCCS({
			fabNumber: fabNumber /* STRING */ ,
			symptom: symptom /* STRING */ ,
			ticketNo: ticketNo /* STRING */ ,
			status: status /* STRING */
		});
		logger.debug("RESPONSE from SendAlert CCS API : " + JSON.stringify(result));
	} else {
		logger.error("Alert cannot be sent to CRM or CCS as CRMorCCS property is not set on " + fabNumber);
	}

	logger.debug("SEND Alert Service Completed for " + fabNumber);
	serviceName = "SendAlert";
	success_Status = true;
	exception = "--";
	Input = "fabNumber :" + fabNumber + "," + "CRMorCCS :" + CRMorCCS + "," + "symptom :" + symptom + "," + "status :" + status + "," + "ticketNo :" + ticketNo;
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

	serviceName = "SendAlert";
	success_Status = false;
	exception = "Error" + err.message;
	Input = "fabNumber :" + fabNumber + "," + "CRMorCCS :" + CRMorCCS + "," + "symptom :" + symptom + "," + "status :" + status + "," + "ticketNo :" + ticketNo;
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
