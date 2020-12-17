logger.debug("STARTING SUBSCRIPTION TriggerMainMotorOverload  for " + source);
var oldValue = eventData.oldValue.value;
var newValue = eventData.newValue.value;
var value = eventData.newValue.value;
var mainMotorSymptom = 'Main Motor Overload';

// dateValue:DATETIME
var dateValue = new Date();
var startTime = dateAddDays(dateValue, -1);

var binaryAsStringBefore = Things["ELGI.COMP.ThingModelHelper.Thing"].ConvertDecToBinary({
	decimalNumber: oldValue /* INTEGER */
});

var binaryAsStringAfter = Things["ELGI.COMP.ThingModelHelper.Thing"].ConvertDecToBinary({
	decimalNumber: newValue /* INTEGER */
});

var containsMotorValueBefore = (binaryAsStringBefore.charAt(2) === '1');
var containsMotorValueAfter = (binaryAsStringAfter.charAt(2) === '1');

if (containsMotorValueBefore && containsMotorValueAfter) {
	//Trigger Alert
	// ELGi.COMP.ExecutedRules.DS entry object
	var values = Things["ELGi.COMP.ExecutedRules.Stream"].CreateValues();
	values.RuleId = ''; // STRING
	values.RuleExecutionId = undefined; // STRING
	values.RuleName = 'DETECTED'; // STRING
	values.Frequency = ''; // STRING
	values.FabNumber = source; // STRING
	values.ExecutionTimeStamp = new Date(); // DATETIME
	values.Condition = 'Main Motor Oveload'; // STRING
	values.ExecutionStatus = true; // STRING
	values.PropertyValues = 'DETECTED'; // STRING
	values.TicketNumber = ''; // STRING
	values.Symptom = mainMotorSymptom; // STRING
	values.AlertStatus = 'TRIGGERED'; // STRING    
	values.RuleResult = true; // STRING
	var paramsStream = {
		tags: undefined,
		timestamp: undefined,
		source: source,
		values: values,
		location: undefined
	};
	Things["ELGi.COMP.ExecutedRules.Stream"].AddStreamEntry(paramsStream);
	// result: JSON
	var alertResponse = Things["ELGI.COMP.ThirdPartyIntegrationHelper.Thing"].SendAlert({
		ticketNo: undefined /* STRING */ ,
		symptom: mainMotorSymptom /* STRING */ ,
		fabNumber: source /* STRING */ ,
		status: 'TRIGGER' /* STRING */
	});
} else if (containsMotorValueBefore && (containsMotorValueAfter === false)) {
	var streamQuery = {
		"filters": {
			"type": "And",
			"filters": [{
					"type": "EQ",
					"fieldName": "FabNumber",
					"value": source
				},
				{
					"type": "EQ",
					"fieldName": "RuleResult",
					"value": true
				},
				{
					"type": "EQ",
					"fieldName": "Symptom",
					"value": mainMotorSymptom
				}
			]
		}
	};
	// result: INFOTABLE dataShape: ""
	var streamQueryResult = Things["ELGi.COMP.ExecutedRules.Stream"].QueryStreamData({
		oldestFirst: false /* BOOLEAN */ ,
		maxItems: undefined /* NUMBER */ ,
		sourceTags: undefined /* TAGS */ ,
		endDate: dateValue /* DATETIME */ ,
		query: streamQuery /* QUERY */ ,
		source: undefined /* STRING */ ,
		startDate: startTime /* DATETIME */ ,
		tags: undefined /* TAGS */
	});

	var ticketNo, alertStatus;
	var tableLength2 = streamQueryResult.rows.length;
	var isAcknowledged = true;
	for (var z = 0; z < tableLength2; z++) {
		var row2 = streamQueryResult.rows[z];
		if (row2.AlertStatus === 'RESET') {
			break;
		}
		//if (row2.AlertStatus === 'ACKNOWLEDGED' || row2.AlertStatus === 'TRIGGERED' ) {
		if (row2.AlertStatus === 'ACKNOWLEDGED') {
			alertStatus = 'RESET';
			ticketNo = row2.TicketNumber;
			break;
		}
	}
	if (alertStatus === 'RESET') {
		// ELGi.COMP.ExecutedRules.DS entry object
		var values = Things["ELGi.COMP.ExecutedRules.Stream"].CreateValues();
		values.RuleId = ''; // STRING
		values.RuleExecutionId = undefined; // STRING
		values.RuleName = 'DETECTED'; // STRING
		values.Frequency = ''; // STRING
		values.FabNumber = source; // STRING
		values.ExecutionTimeStamp = new Date(); // DATETIME
		values.Condition = 'Main Motor Oveload'; // STRING
		values.ExecutionStatus = true; // STRING
		values.PropertyValues = 'DETECTED'; // STRING
		values.TicketNumber = ticketNo; // STRING
		values.Symptom = mainMotorSymptom; // STRING
		values.AlertStatus = 'RESET'; // STRING    
		values.RuleResult = true; // STRING
		var paramsStream = {
			tags: undefined,
			timestamp: undefined,
			source: source,
			values: values,
			location: undefined
		};
		Things["ELGi.COMP.ExecutedRules.Stream"].AddStreamEntry(paramsStream);
		//Reset Alert for Main Motor OL    
		var alertResponse = Things["ELGI.COMP.ThirdPartyIntegrationHelper.Thing"].SendAlert({
			ticketNo: ticketNo /* STRING */ ,
			symptom: mainMotorSymptom /* STRING */ ,
			fabNumber: source /* STRING */ ,
			status: 'RESET' /* STRING */
		});
	}
} else if ((containsMotorValueBefore === false) && containsMotorValueAfter) {
	//Trigger Alert
	// ELGi.COMP.ExecutedRules.DS entry object
	var values = Things["ELGi.COMP.ExecutedRules.Stream"].CreateValues();
	values.RuleId = ''; // STRING
	values.RuleExecutionId = undefined; // STRING
	values.RuleName = 'DETECTED'; // STRING
	values.Frequency = ''; // STRING
	values.FabNumber = source; // STRING
	values.ExecutionTimeStamp = new Date(); // DATETIME
	values.Condition = 'Main Motor Oveload'; // STRING
	values.ExecutionStatus = true; // STRING
	values.PropertyValues = 'DETECTED'; // STRING
	values.TicketNumber = ''; // STRING
	values.Symptom = mainMotorSymptom; // STRING
	values.AlertStatus = 'TRIGGERED'; // STRING    
	values.RuleResult = true; // STRING
	var paramsStream = {
		tags: undefined,
		timestamp: undefined,
		source: source,
		values: values,
		location: undefined
	};
	Things["ELGi.COMP.ExecutedRules.Stream"].AddStreamEntry(paramsStream);
	// result: JSON
	var alertResponse = Things["ELGI.COMP.ThirdPartyIntegrationHelper.Thing"].SendAlert({
		ticketNo: undefined /* STRING */ ,
		symptom: mainMotorSymptom /* STRING */ ,
		fabNumber: source /* STRING */ ,
		status: 'TRIGGER' /* STRING */
	});
}
