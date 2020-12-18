var query = {
	"filters": {
		"type": "EQ",
		"fieldName": "Frequency",
		"value": "ELGi.COMP.24HrScheduler.Thing"
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

for (var x = 0; x < tableLength; x++) {
    
	var property01 = null;
	var property01Value = null;
	var property02 = null;
	var property02Value = null;
	var property03 = null;
	var property03Value = null;
	var alertStatus = '';

	logger.debug("x = " + x);
	var row = queryResult.rows[x];
    
//    var thingsList = (row.Things);
//
//    var thingsArr = row.split(",");
//
//    var tableLength_1 = thingsArr.length;
//
//    for (var a = 0; a < tableLength_1; a++) {
//		
//    }

	var tableLength1 = (row.Variables).rows.length;
	for (var y = 0; y < tableLength1; y++) {
		logger.debug("y = " + y);
		var row1 = (row.Variables).rows[y];
		if (row1.variable === 'A') {
			property01 = row1.Property;
			property01Value = Things[row.Entity][property01];
		} else if (row1.variable === 'B') {
			property02 = row1.Property;
			property02Value = Things[row.Entity][property02];
		} else if (row1.variable === 'C') {
			property03 = row1.Property;
			property03Value = Things[row.Entity][property03];
		}
	}

    // result: BOOLEAN
    var ruleResult =  Things["ELGi.COMP.RulesLibrary.Thing"].ExecuteConditionBasedRules({
        condition: row.ConditionType /* STRING */ ,
		property04: undefined /* NUMBER */ ,
		property03: property03Value /* NUMBER */ ,
		property02: property02Value /* NUMBER */ ,
		property01: property01Value /* NUMBER */,
        entity: row.Entity /* STRING */
    });
    
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
		values.FabNumber = row.Entity; // STRING
		values.ExecutionTimeStamp = new Date(); // DATETIME
		values.Condition = row.Condition; // STRING
		values.ExecutionStatus = true; // STRING
		values.PropertyValues = undefined; // STRING
		values.TicketNumber = undefined; // STRING
		values.Symptom = row.Symptom; // STRING
		values.AlertStatus = alertStatus; // STRING    
		values.RuleResult = ruleResult; // STRING
		var paramsStream = {
			tags: undefined,
			timestamp: undefined,
			source: row.Entity,
			values: values,
			location: undefined
		};
		Things["ELGi.COMP.ExecutedRules.Stream"].AddStreamEntry(paramsStream);
		//pause(1000);
		// Trigger Alert
		// result: JSON
        var alertResponse =  Things["ELGI.COMP.ThirdPartyIntegrationHelper.Thing"].SendAlert({
            symptom: row.Symptom /* STRING */,
            ticketNo: undefined /* STRING */,
            fabNumber: row.Entity /* STRING */,
            status: 'TRIGGER' /* STRING */
        });
		
        Things[row.Entity].predicted_alert_count = Things[row.Entity].predicted_alert_count + 1;
        
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
						"value": row.Entity
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
            if (row2.AlertStatus === 'ACKNOWLEDGED' ) {
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
		values.FabNumber = row.Entity; // STRING
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
			source: row.Entity,
			values: values,
			location: undefined
		};
		Things["ELGi.COMP.ExecutedRules.Stream"].AddStreamEntry(paramsStream);
        
        if(alertStatus === 'RESET'){
            // Trigger Alert
            // result: JSON
            var alertResponse =  Things["ELGI.COMP.ThirdPartyIntegrationHelper.Thing"].SendAlert({
                symptom: row.Symptom /* STRING */,
                ticketNo: ticketNo /* STRING */,
                fabNumber: row.Entity /* STRING */,
                status: 'RESET' /* STRING */
            });
            
            if( Things[row.Entity].predicted_alert_count > 0 ){
           		Things[row.Entity].predicted_alert_count = 0;
            }
         }
	}
}
