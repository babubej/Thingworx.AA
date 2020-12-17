// --------------------------------------------------------------------------------------
// DESCRIPTION
// This service fetches the history of service of consumable for a particular asset
//---------------------------------------------------------------------------------------
// Revision	Date        Who				What
// 1.0		2020-11-09  Prasoon Kumar	Initial Development...
// --------------------------------------------------------------------------------------

//********************* SERVICE INPUTS/OUTPUT **************************
/** @type {infotable} */
var result;
/** @type {string} */
var fabNumber;

//******************************* SERVICE CODE STARTS HERE *******************************
(function() {
	"use strict";
	try {
		logger.info("ELGi.COMP.MashupHelper.Thing:GetServiceHistoryForAsset Service Execution START ");
		// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.ServiceHistory.DS)
		result = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape({
			infoTableName: "InfoTable",
			dataShapeName: "ELGi.COMP.ServiceHistory.DS"
		});

		// dateValue:DATETIME
		var dateValue = new Date();

		// dateAddMonths(dateValue:DATETIME, amount:NUMBER):STRING
		var calculatedDateValue = dateAddMonths(dateValue, -12);

		var newEntry, newEntry1;
		var propName;
		var consumablesList = Things["ELGi.COMP.CalculationsHelper.Thing"].ConsumablesMapping;
		consumablesList.rows.toArray().forEach(row => {
			propName = row.propertyDisplayName;
			// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(EntityList)
			var propertyList = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape({
				infoTableName: "InfoTable",
				dataShapeName: "EntityList"
			});

			newEntry = new Object();
			newEntry.name = row.eventPropertyName; // STRING [Primary Key]        	
			propertyList.AddRow(newEntry);

			newEntry = new Object();
			newEntry.name = row.valueAtEventPropertyName; // STRING [Primary Key]        	
			propertyList.AddRow(newEntry);
            
            // result: INFOTABLE dataShape: ""
			var queryResult = Things[fabNumber].QueryNamedPropertyHistory({
				oldestFirst: false /* BOOLEAN */ ,
				maxItems: 100 /* NUMBER */ ,
				endDate: dateValue /* DATETIME */ ,
				propertyNames: propertyList /* INFOTABLE */ ,
				query: undefined /* QUERY */ ,
				startDate: calculatedDateValue /* DATETIME */
			});

			queryResult.rows.toArray().forEach(row1 => {
				if (row1[row.valueAtEventPropertyName] !== undefined && row1[row.valueAtEventPropertyName] !== 'undefined' && row1[row.valueAtEventPropertyName] !== null) {
					// ELGi.COMP.ServiceHistory.DS entry object  
					newEntry1 = new Object();
					newEntry1.DateTime = row1.timestamp; // DATETIME
					newEntry1.Consumable = propName; // STRING
					newEntry1.LastValueBeforeService = row1[row.valueAtEventPropertyName]; // INTEGER
					newEntry1.Description = undefined; // STRING
					result.AddRow(newEntry1);
				}
			});
		});
		logger.info("ELGi.COMP.MashupHelper.Thing:GetServiceHistoryForAsset Service Execution END");
	} catch (err) {
		logger.error("Error occured in ELGi.COMP.MashupHelper.Thing : GetServiceHistoryForAsset. Error : " + err);
	}
}());
