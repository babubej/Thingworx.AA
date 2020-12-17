// --------------------------------------------------------------------------------------
// DESCRIPTION
// This service fetches the history of alerts for a particular asset
//---------------------------------------------------------------------------------------
// Revision	Date        Who				What
// 1.0		2020-11-09  Prasoon Kumar	Initial Development...
// --------------------------------------------------------------------------------------

//********************* SERVICE INPUTS/OUTPUT **************************
/** @type {infotable} */
var result;
/** @type {string} */
var fabNumber;
/** @type {datetime} */
var from;
/** @type {datetime} */
var to;

//******************************* SERVICE CODE STARTS HERE *******************************
(function() {
	"use strict";
	try {
		logger.info("ELGi.COMP.MashupHelper.Thing:GetAlertHistoryForAsset Service Execution START");
		// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.ListMap.DS)
		result = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape({
			infoTableName: "InfoTable",
			dataShapeName: "ELGi.COMP.AlertsHistory.DS"
		});

		var query1 = {
			"filters": {
				"type": "GT",
				"fieldName": "value",
				"value": 0
			}
		};

		// result: INFOTABLE dataShape: "IntegerValueStream"
		var detectedFaults = Things[fabNumber].QueryIntegerPropertyHistory({
			oldestFirst: undefined /* BOOLEAN */ ,
			maxItems: undefined /* NUMBER */ ,
			propertyName: 'fault_status' /* STRING */ ,
			endDate: to /* DATETIME */ ,
			query: query1 /* QUERY */ ,
			startDate: from /* DATETIME */
		});

		var newEntry;
		detectedFaults.rows.toArray().forEach(row => {
			// ELGi.COMP.AlertsHistory.DS entry object
			newEntry = new Object();
			newEntry.DateTime = row.timestamp; // DATETIME
			newEntry.AlertType = 'TRIPPED'; // STRING            
			var detectedFault = Things['ELGi.COMP.ReportsHelper.Thing'].GetDetectedFaults({
				fault_status: row.value /* INTEGER */
			});
			newEntry.Description = detectedFault; // STRING
			result.AddRow(newEntry);
		});
		logger.debug("Detected  : " + detectedFaults.rows.length);
		logger.debug("Result: " + result.rows.length);
		var query2 = {
			"filters": {
				"type": "And",
				"filters": [{
						"type": "EQ",
						"fieldName": "FabNumber",
						"value": fabNumber
					},
					{
						"type": "EQ",
						"fieldName": "AlertStatus",
						"value": "TRIGGERED"
					}
				]
			}
		};

		// result: INFOTABLE dataShape: ""
		var predictedAlerts = Things["ELGi.COMP.ExecutedRules.Stream"].QueryStreamData({
			oldestFirst: undefined /* BOOLEAN */ ,
			maxItems: undefined /* NUMBER */ ,
			sourceTags: undefined /* TAGS */ ,
			endDate: to /* DATETIME */ ,
			query: query2 /* QUERY */ ,
			source: undefined /* STRING */ ,
			startDate: from /* DATETIME */ ,
			tags: undefined /* TAGS */
		});
		logger.debug("predicted : " + predictedAlerts.rows.length);


		predictedAlerts.rows.toArray().forEach(row => {
			// ELGi.COMP.AlertsHistory.DS entry object
			newEntry = new Object();
			newEntry.DateTime = row.timestamp; // DATETIME
			newEntry.AlertType = 'PREDICTED'; // STRING            
			newEntry.Description = row.Symptom; // STRING
			result.AddRow(newEntry);
		});

		var sort = new Object();
		sort.name = 'DateTime';
		sort.ascending = false;
		result.Sort(sort);


		logger.info("ELGi.COMP.MashupHelper.Thing:GetAlertHistoryForAsset Service Execution END");
	} catch (err) {
		logger.error("Error occured in ELGi.COMP.MashupHelper.Thing : GetAlertHistoryForAsset. Error : " + err);
	}
}());
