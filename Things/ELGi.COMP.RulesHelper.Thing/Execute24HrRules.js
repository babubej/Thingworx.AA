logger.debug("RULES EXEC STARTED");
var query = {
	"filters": {
		"type": "EQ",
		"fieldName": "Frequency",
		"value": "24Hrs"
	}
};
// result: INFOTABLE dataShape: ""
var queryResult = Things["ELGi.COMP.MasterRulesDefinition.DT"].QueryDataTableEntries({
	maxItems: undefined /* NUMBER */ ,
	values: undefined /* INFOTABLE */ ,
	query: query /* QUERY */ ,
	source: undefined /* STRING */ ,
	tags: undefined /* TAGS */
});

var tableLength = queryResult.rows.length;

logger.debug("RULES EXEC 20 : " + tableLength);

for (var x = 0; x < tableLength; x++) {

    var y,z;
	var property01 = null;
	var property01Value = null;
	var property02 = null;
	var property02Value = null;
	var property03 = null;
	var property03Value = null;
	var alertStatus = '';

	logger.debug("x = " + x);
	var row = queryResult.rows[x];
	var ThingTemplate = row.ThingTemplate;
	// If Rule Created for specific Things
	if (row.Things !== undefined && (row.Things).trim() !== "") {
		logger.debug("RULES EXEC 62");
		var thingsArr = (row.Things).split(",");

		var tableLength2 = thingsArr.length;
		for (var z = 0; z < tableLength2; z++) {
			var row2 = thingsArr[z];
			var fabNumber = thingsArr[z];

			var tableLength1 = (row.Variables).rows.length;
			logger.debug("tableLength1 : " + tableLength1);
			for (var y = 0; y < tableLength1; y++) {
				logger.debug("y = " + y);
				var row1 = (row.Variables).rows[y];
				logger.debug("row1 :" + row1);
				if (row1.Variable === 'A') {
					property01 = row1.PropertyValue;
					if (isNaN(property01)) {
						property01Value = Things[fabNumber][property01];
					} else {
						property01Value = property01;
					}
				} else if (row1.Variable === 'B') {
					property02 = row1.PropertyValue;
					if (isNaN(property02)) {
						property02Value = Things[fabNumber][property02];
					} else {
						property02Value = property02;
					}
				} else if (row1.Variable === 'C') {
					property03 = row1.PropertyValue;
					if (isNaN(property03)) {
						property03Value = Things[fabNumber][property03];
					} else {
						property03Value = property03;
					}
				}
			}
			logger.debug("Before Execute Conditions");
			// result: BOOLEAN
			var ruleResult = Things["ELGi.COMP.RulesLibrary.Thing"].ExecuteConditionBasedRules({
				condition: row.Condition /* STRING */ ,
				property04: undefined /* NUMBER */ ,
				property03: property03Value /* NUMBER */ ,
				property02: property02Value /* NUMBER */ ,
				property01: property01Value /* NUMBER */ ,
				entity: fabNumber /* STRING */ ,
				symptom: row.Symptom /* STRING */ ,
			});
			logger.debug("RULES EXEC After ExecuteConditionBasedRules");
			var ruleExecTime = new Date();

			// Result of Rule execution is TRUE, then write the entry in Alert Stream and trigger alert
			if (ruleResult) {
				// Write Rule Execution details in ELGi.COMP.ExecutedRules.Stream Stream    				
				alertStatus = 'TRIGGERED';
				// ELGi.COMP.ExecutedRules.DS entry object
				var values = Things["ELGi.COMP.ExecutedRules.Stream"].CreateValues();
				values.RuleId = row.ID; // STRING
				values.RuleExecutionId = undefined; // STRING
				values.RuleName = row.ID; // STRING
				values.Frequency = row.Frequency; // STRING
				values.FabNumber = fabNumber; // STRING
				values.ExecutionTimeStamp = new Date(); // DATETIME
				values.Condition = row.Condition; // STRING
				values.ExecutionStatus = true; // STRING
				values.PropertyValues = row.ConditionType; // STRING
				values.TicketNumber = undefined; // STRING
				values.Symptom = row.Symptom; // STRING
				values.AlertStatus = alertStatus; // STRING    
				values.RuleResult = ruleResult; // STRING
				var paramsStream = {
					tags: undefined,
					timestamp: undefined,
					source: fabNumber,
					values: values,
					location: undefined
				};
				Things["ELGi.COMP.ExecutedRules.Stream"].AddStreamEntry(paramsStream);
				//pause(1000);
				// Trigger Alert
				// result: JSON
				var alertResponse = Things["ELGI.COMP.ThirdPartyIntegrationHelper.Thing"].SendAlert({
					symptom: row.Symptom /* STRING */ ,
					ticketNo: undefined /* STRING */ ,
					fabNumber: fabNumber /* STRING */ ,
					status: 'TRIGGER' /* STRING */
				});

				Things[fabNumber].predicted_alert_count = Things[fabNumber].predicted_alert_count + 1;

				//		alertStatus = "ACKNOWLEDGED";
				//		values.AlertStatus = alertStatus; // STRING   alertResponse     
				//		values.TicketNumber = alertResponse.ticketNo; // STRING        
				//		// ELGi.COMP.ExecutedRules.DS entry object		
				//		Things["ELGi.COMP.ExecutedRules.Stream"].AddStreamEntry(paramsStream);

			} else {
				var startTime = dateAddDays(ruleExecTime, -1);

				var streamQuery = {
					"filters": {
						"type": "And",
						"filters": [{
								"type": "EQ",
								"fieldName": "FabNumber",
								"value": fabNumber
							},
							{
								"type": "EQ",
								"fieldName": "RuleId",
								"value": row.ID
							},
							{
								"type": "EQ",
								"fieldName": "RuleResult",
								"value": true
							},
							{
								"type": "EQ",
								"fieldName": "Symptom",
								"value": row.Symptom
							}
						]
					}
				};

				// result: INFOTABLE dataShape: ""
				var streamQueryResult = Things["ELGi.COMP.ExecutedRules.Stream"].QueryStreamData({
					oldestFirst: true /* BOOLEAN */ ,
					maxItems: undefined /* NUMBER */ ,
					sourceTags: undefined /* TAGS */ ,
					endDate: ruleExecTime /* DATETIME */ ,
					query: streamQuery /* QUERY */ ,
					source: undefined /* STRING */ ,
					startDate: startTime /* DATETIME */ ,
					tags: undefined /* TAGS */
				});
				var ticketNo;
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
					}
				}

				// ELGi.COMP.ExecutedRules.DS entry object
				var values = Things["ELGi.COMP.ExecutedRules.Stream"].CreateValues();
				values.RuleId = row.ID; // STRING
				values.RuleExecutionId = undefined; // STRING
				values.RuleName = row.ID; // STRING
				values.Frequency = row.Frequency; // STRING
				values.FabNumber = fabNumber; // STRING
				values.ExecutionTimeStamp = new Date(); // DATETIME
				values.Condition = row.Condition; // STRING
				values.ExecutionStatus = true; // STRING
				values.PropertyValues = undefined; // STRING
				values.TicketNumber = ticketNo; // STRING
				values.Symptom = row.Symptom; // STRING
				values.AlertStatus = alertStatus; // STRING    
				values.RuleResult = ruleResult; // STRING
				var paramsStream = {
					tags: undefined,
					timestamp: undefined,
					source: fabNumber,
					values: values,
					location: undefined
				};
				Things["ELGi.COMP.ExecutedRules.Stream"].AddStreamEntry(paramsStream);

				if (alertStatus === 'RESET') {
					// Trigger Alert
					// result: JSON
					var alertResponse = Things["ELGI.COMP.ThirdPartyIntegrationHelper.Thing"].SendAlert({
						symptom: row.Symptom /* STRING */ ,
						ticketNo: ticketNo /* STRING */ ,
						fabNumber: fabNumber /* STRING */ ,
						status: 'RESET' /* STRING */
					});

					if (Things[fabNumber].predicted_alert_count > 0) {
						Things[fabNumber].predicted_alert_count = 0;
					}
				}
			}
		}
	} else if (ThingTemplate !== undefined && ThingTemplate.trim() !== "") {
		// result: INFOTABLE dataShape: "RootEntityList"
		var thingsList = ThingTemplates[ThingTemplate].GetImplementingThings();

		var tableLength2 = thingsList.rows.length;
		logger.debug("Things List : " + tableLength2);
		for( z = 0; z < tableLength2; z++ ) {
			logger.debug("START of LOOP z:" + z);
			var row2 = thingsList.rows[z];
			var fabNumber = row2.name;
			logger.debug("FAB Number : " + fabNumber);
			var tableLength1 = (row.Variables).rows.length;
			logger.debug("tableLength1 : " + tableLength1);
			for (var y = 0; y < tableLength1; y++) {
				logger.debug("y = " + y);
				var row1 = (row.Variables).rows[y];
				logger.debug("row1 :" + row1);
				if (row1.Variable === 'A') {
					property01 = row1.PropertyValue;
					if (isNaN(property01)) {
						property01Value = Things[fabNumber][property01];
					} else {
						property01Value = property01;
					}
				} else if (row1.Variable === 'B') {
					property02 = row1.PropertyValue;
					if (isNaN(property02)) {
						property02Value = Things[fabNumber][property02];
					} else {
						property02Value = property02;
					}
				} else if (row1.Variable === 'C') {
					property03 = row1.PropertyValue;
					if (isNaN(property03)) {
						property03Value = Things[fabNumber][property03];
					} else {
						property03Value = property03;
					}
				}
			}
			logger.debug("Before Execute Conditions");
			// result: BOOLEAN
			var ruleResult = Things["ELGi.COMP.RulesLibrary.Thing"].ExecuteConditionBasedRules({
				condition: row.Condition /* STRING */ ,
				property04: undefined /* NUMBER */ ,
				property03: property03Value /* NUMBER */ ,
				property02: property02Value /* NUMBER */ ,
				property01: property01Value /* NUMBER */ ,
				entity: fabNumber /* STRING */ ,
				symptom: row.Symptom /* STRING */ ,
			});
			logger.debug("RULES EXEC After ExecuteConditionBasedRules " + ruleResult);
			var ruleExecTime = new Date();

			// Result of Rule execution is TRUE, then write the entry in Alert Stream and trigger alert
			if (ruleResult) {
				// Write Rule Execution details in ELGi.COMP.ExecutedRules.Stream Stream    				
				alertStatus = 'TRIGGERED';
				// ELGi.COMP.ExecutedRules.DS entry object
				var values = Things["ELGi.COMP.ExecutedRules.Stream"].CreateValues();
				values.RuleId = row.ID; // STRING
				values.RuleExecutionId = undefined; // STRING
				values.RuleName = row.ID; // STRING
				values.Frequency = row.Frequency; // STRING
				values.FabNumber = fabNumber; // STRING
				values.ExecutionTimeStamp = new Date(); // DATETIME
				values.Condition = row.Condition; // STRING
				values.ExecutionStatus = true; // STRING
				values.PropertyValues = row.ConditionType; // STRING
				values.TicketNumber = undefined; // STRING
				values.Symptom = row.Symptom; // STRING
				values.AlertStatus = alertStatus; // STRING    
				values.RuleResult = ruleResult; // STRING
				var paramsStream = {
					tags: undefined,
					timestamp: undefined,
					source: fabNumber,
					values: values,
					location: undefined
				};
				Things["ELGi.COMP.ExecutedRules.Stream"].AddStreamEntry(paramsStream);
				//pause(1000);
				// Trigger Alert
				// result: JSON
				var alertResponse = Things["ELGI.COMP.ThirdPartyIntegrationHelper.Thing"].SendAlert({
					symptom: row.Symptom /* STRING */ ,
					ticketNo: undefined /* STRING */ ,
					fabNumber: fabNumber /* STRING */ ,
					status: 'TRIGGER' /* STRING */
				});

				Things[fabNumber].predicted_alert_count = Things[fabNumber].predicted_alert_count + 1;

				//		alertStatus = "ACKNOWLEDGED";
				//		values.AlertStatus = alertStatus; // STRING   alertResponse     
				//		values.TicketNumber = alertResponse.ticketNo; // STRING        
				//		// ELGi.COMP.ExecutedRules.DS entry object		
				//		Things["ELGi.COMP.ExecutedRules.Stream"].AddStreamEntry(paramsStream);

			} else {
				logger.debug("RULES EXEC Inside Else in Rule Trigger " + fabNumber);
				var startTime = dateAddDays(ruleExecTime, -1);

				var streamQuery = {
					"filters": {
						"type": "And",
						"filters": [{
								"type": "EQ",
								"fieldName": "FabNumber",
								"value": fabNumber
							},
							{
								"type": "EQ",
								"fieldName": "RuleId",
								"value": row.ID
							},
							{
								"type": "EQ",
								"fieldName": "RuleResult",
								"value": true
							},
							{
								"type": "EQ",
								"fieldName": "Symptom",
								"value": row.Symptom
							}
						]
					}
				};

				// result: INFOTABLE dataShape: ""
				var streamQueryResult = Things["ELGi.COMP.ExecutedRules.Stream"].QueryStreamData({
					oldestFirst: true /* BOOLEAN */ ,
					maxItems: undefined /* NUMBER */ ,
					sourceTags: undefined /* TAGS */ ,
					endDate: ruleExecTime /* DATETIME */ ,
					query: streamQuery /* QUERY */ ,
					source: undefined /* STRING */ ,
					startDate: startTime /* DATETIME */ ,
					tags: undefined /* TAGS */
				});
				var ticketNo;
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
					}
				}
				logger.debug("RULES EXEC Inside Else Before Stream Write " + fabNumber);
				// ELGi.COMP.ExecutedRules.DS entry object
				var values = Things["ELGi.COMP.ExecutedRules.Stream"].CreateValues();
				values.RuleId = row.ID; // STRING
				values.RuleExecutionId = undefined; // STRING
				values.RuleName = row.ID; // STRING
				values.Frequency = row.Frequency; // STRING
				values.FabNumber = fabNumber; // STRING
				values.ExecutionTimeStamp = new Date(); // DATETIME
				values.Condition = row.Condition; // STRING
				values.ExecutionStatus = true; // STRING
				values.PropertyValues = undefined; // STRING
				values.TicketNumber = ticketNo; // STRING
				values.Symptom = row.Symptom; // STRING
				values.AlertStatus = alertStatus; // STRING    
				values.RuleResult = ruleResult; // STRING
				var paramsStream = {
					tags: undefined,
					timestamp: undefined,
					source: fabNumber,
					values: values,
					location: undefined
				};
				Things["ELGi.COMP.ExecutedRules.Stream"].AddStreamEntry(paramsStream);

				if (alertStatus === 'RESET') {
					logger.debug("Alert STATUS RESET " + fabNumber);
					// Trigger Alert
					// result: JSON
					var alertResponse = Things["ELGI.COMP.ThirdPartyIntegrationHelper.Thing"].SendAlert({
						symptom: row.Symptom /* STRING */ ,
						ticketNo: ticketNo /* STRING */ ,
						fabNumber: fabNumber /* STRING */ ,
						status: 'RESET' /* STRING */
					});

					if (Things[fabNumber].predicted_alert_count > 0) {
						Things[fabNumber].predicted_alert_count = 0;
					}
					logger.debug("Alert STATUS END OF ELSE RESET" + fabNumber);
				}
				logger.debug("Alert STATUS END OF ELSE " + fabNumber);
			}
			logger.debug("RULE EXEC END OF LOOP " + fabNumber);
		}
	} else if (row.Filters !== undefined && (row.Filters).rows.length > 0) {
		var filtersList = row.Filters;
		var tableLength3 = filtersList.rows.length;
		for (var a = 0; x < tableLength3; a++) {
			var row4 = filtersList.rows[a];
			var queryObjects = new Array();
			var filter = {
				"type": "EQ",
				"fieldName": row4.FilterName,
				"value": row4.FilterValue
			};
			queryObjects.push(filter);
		}
		var query1 = {
			"filters": {
				"type": "And",
				"filters": queryObjects
			}
		};

		// result: INFOTABLE dataShape: "RootEntityList"
		var thingsList1 = ThingTemplates["ELGi.comp.ELGiMasterEPSAC.TT"].QueryImplementingThingsWithData({
			maxItems: undefined /* NUMBER */ ,
			nameMask: undefined /* STRING */ ,
			query: query1 /* QUERY */ ,
			tags: undefined /* TAGS */
		});

		var tableLength2 = thingsList1.rows.length;
		for (var z = 0; z < tableLength2; z++) {
			var row2 = thingsList1.rows[z];
			var fabNumber = row2.name;

			var tableLength1 = (row.Variables).rows.length;
			logger.debug("tableLength1 : " + tableLength1);
			for (var y = 0; y < tableLength1; y++) {
				logger.debug("y = " + y);
				var row1 = (row.Variables).rows[y];
				logger.debug("row1 :" + row1);
				if (row1.Variable === 'A') {
					property01 = row1.PropertyValue;
					if (isNaN(property01)) {
						property01Value = Things[fabNumber][property01];
					} else {
						property01Value = property01;
					}
				} else if (row1.Variable === 'B') {
					property02 = row1.PropertyValue;
					if (isNaN(property02)) {
						property02Value = Things[fabNumber][property02];
					} else {
						property02Value = property02;
					}
				} else if (row1.Variable === 'C') {
					property03 = row1.PropertyValue;
					if (isNaN(property03)) {
						property03Value = Things[fabNumber][property03];
					} else {
						property03Value = property03;
					}
				}
			}
			logger.debug("Before Execute Conditions");
			// result: BOOLEAN
			var ruleResult = Things["ELGi.COMP.RulesLibrary.Thing"].ExecuteConditionBasedRules({
				condition: row.Condition /* STRING */ ,
				property04: undefined /* NUMBER */ ,
				property03: property03Value /* NUMBER */ ,
				property02: property02Value /* NUMBER */ ,
				property01: property01Value /* NUMBER */ ,
				entity: fabNumber /* STRING */ ,
				symptom: row.Symptom /* STRING */ ,
			});
			logger.debug("RULES EXEC After ExecuteConditionBasedRules");
			var ruleExecTime = new Date();

			// Result of Rule execution is TRUE, then write the entry in Alert Stream and trigger alert
			if (ruleResult) {
				// Write Rule Execution details in ELGi.COMP.ExecutedRules.Stream Stream    				
				alertStatus = 'TRIGGERED';
				// ELGi.COMP.ExecutedRules.DS entry object
				var values = Things["ELGi.COMP.ExecutedRules.Stream"].CreateValues();
				values.RuleId = row.ID; // STRING
				values.RuleExecutionId = undefined; // STRING
				values.RuleName = row.ID; // STRING
				values.Frequency = row.Frequency; // STRING
				values.FabNumber = fabNumber; // STRING
				values.ExecutionTimeStamp = new Date(); // DATETIME
				values.Condition = row.Condition; // STRING
				values.ExecutionStatus = true; // STRING
				values.PropertyValues = row.ConditionType; // STRING
				values.TicketNumber = undefined; // STRING
				values.Symptom = row.Symptom; // STRING
				values.AlertStatus = alertStatus; // STRING    
				values.RuleResult = ruleResult; // STRING
				var paramsStream = {
					tags: undefined,
					timestamp: undefined,
					source: fabNumber,
					values: values,
					location: undefined
				};
				Things["ELGi.COMP.ExecutedRules.Stream"].AddStreamEntry(paramsStream);
				//pause(1000);
				// Trigger Alert
				// result: JSON
				var alertResponse = Things["ELGI.COMP.ThirdPartyIntegrationHelper.Thing"].SendAlert({
					symptom: row.Symptom /* STRING */ ,
					ticketNo: undefined /* STRING */ ,
					fabNumber: fabNumber /* STRING */ ,
					status: 'TRIGGER' /* STRING */
				});

				Things[fabNumber].predicted_alert_count = Things[fabNumber].predicted_alert_count + 1;

				//		alertStatus = "ACKNOWLEDGED";
				//		values.AlertStatus = alertStatus; // STRING   alertResponse     
				//		values.TicketNumber = alertResponse.ticketNo; // STRING        
				//		// ELGi.COMP.ExecutedRules.DS entry object		
				//		Things["ELGi.COMP.ExecutedRules.Stream"].AddStreamEntry(paramsStream);

			} else {
				var startTime = dateAddDays(ruleExecTime, -1);

				var streamQuery = {
					"filters": {
						"type": "And",
						"filters": [{
								"type": "EQ",
								"fieldName": "FabNumber",
								"value": fabNumber
							},
							{
								"type": "EQ",
								"fieldName": "RuleId",
								"value": row.ID
							},
							{
								"type": "EQ",
								"fieldName": "RuleResult",
								"value": true
							},
							{
								"type": "EQ",
								"fieldName": "Symptom",
								"value": row.Symptom
							}
						]
					}
				};

				// result: INFOTABLE dataShape: ""
				var streamQueryResult = Things["ELGi.COMP.ExecutedRules.Stream"].QueryStreamData({
					oldestFirst: true /* BOOLEAN */ ,
					maxItems: undefined /* NUMBER */ ,
					sourceTags: undefined /* TAGS */ ,
					endDate: ruleExecTime /* DATETIME */ ,
					query: streamQuery /* QUERY */ ,
					source: undefined /* STRING */ ,
					startDate: startTime /* DATETIME */ ,
					tags: undefined /* TAGS */
				});
				var ticketNo;
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
					}
				}

				// ELGi.COMP.ExecutedRules.DS entry object
				var values = Things["ELGi.COMP.ExecutedRules.Stream"].CreateValues();
				values.RuleId = row.ID; // STRING
				values.RuleExecutionId = undefined; // STRING
				values.RuleName = row.ID; // STRING
				values.Frequency = row.Frequency; // STRING
				values.FabNumber = fabNumber; // STRING
				values.ExecutionTimeStamp = new Date(); // DATETIME
				values.Condition = row.Condition; // STRING
				values.ExecutionStatus = true; // STRING
				values.PropertyValues = undefined; // STRING
				values.TicketNumber = ticketNo; // STRING
				values.Symptom = row.Symptom; // STRING
				values.AlertStatus = alertStatus; // STRING    
				values.RuleResult = ruleResult; // STRING
				var paramsStream = {
					tags: undefined,
					timestamp: undefined,
					source: fabNumber,
					values: values,
					location: undefined
				};
				Things["ELGi.COMP.ExecutedRules.Stream"].AddStreamEntry(paramsStream);

				if (alertStatus === 'RESET') {
					// Trigger Alert
					// result: JSON
					var alertResponse = Things["ELGI.COMP.ThirdPartyIntegrationHelper.Thing"].SendAlert({
						symptom: row.Symptom /* STRING */ ,
						ticketNo: ticketNo /* STRING */ ,
						fabNumber: fabNumber /* STRING */ ,
						status: 'RESET' /* STRING */
					});

					if (Things[fabNumber].predicted_alert_count > 0) {
						Things[fabNumber].predicted_alert_count = 0;
					}
				}
			}
		}
	}

}
