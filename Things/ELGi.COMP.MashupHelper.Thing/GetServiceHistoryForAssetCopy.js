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
		logger.info("ELGi.COMP.MashupHelper.Thing:GetServiceHistoryForAsset Service Execution START " + fabNumber);
		// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.ServiceHistory.DS)
		result = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape({
			infoTableName: "InfoTable",
			dataShapeName: "ELGi.COMP.ServiceHistory.DS"
		});

		// dateValue:DATETIME
		var dateValue = new Date();

		// dateAddMonths(dateValue:DATETIME, amount:NUMBER):STRING
		var calculatedDateValue = dateAddMonths(dateValue, -12);

		// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(EntityList)
		
		var newEntry, newEntry1;
		var propName;
		var consumablesList = Things["ELGi.COMP.CalculationsHelper.Thing"].ConsumablesMapping;     
		var tableLength = consumablesList.rows.length;
        logger.debug("Total Consumables : "+tableLength);
		for (var x = 0; x < 5; x++) {
			var row = consumablesList.rows[x];
			propName = row.propertyDisplayName;
            //logger.debug("Prop Name : "+propName);
            var propertyList = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape({
			infoTableName: "InfoTable",
			dataShapeName: "EntityList"
		});
			// EntityList entry object
			newEntry = new Object();
			newEntry.name = row.eventPropertyName; // STRING [Primary Key]
			newEntry.description = undefined; // STRING
			propertyList.AddRow(newEntry);

			newEntry = new Object();
			newEntry.name = row.valueAtEventPropertyName; // STRING [Primary Key]
			newEntry.description = undefined; // STRING
			propertyList.AddRow(newEntry);

			// result: INFOTABLE dataShape: ""
			var queryResult = Things[fabNumber].QueryNamedPropertyHistory({
				oldestFirst: false /* BOOLEAN */ ,
				maxItems: 1000 /* NUMBER */ ,
				endDate: undefined /* DATETIME */ ,
				propertyNames: propertyList /* INFOTABLE */ ,
				query: undefined /* QUERY */ ,
				startDate: undefined /* DATETIME */
			});
			logger.debug("Consumable : "+propName+" History Length :" + queryResult.rows.length);

		}



//		consumablesList.rows.toArray().forEach(row => {
//			propName = row.propertyDisplayName;
//			logger.debug("eventPropertyName :" + row.eventPropertyName);
//			logger.debug("valueAtEventPropertyName :" + row.valueAtEventPropertyName);
//
//			//if (propName === 'RGT') {
//			newEntry = new Object();
//			newEntry.name = row.eventPropertyName; // STRING [Primary Key]        	
//			propertyList.AddRow(newEntry);
//
//			newEntry = new Object();
//			newEntry.name = row.valueAtEventPropertyName; // STRING [Primary Key]        	
//			propertyList.AddRow(newEntry);
//
//			// result: INFOTABLE dataShape: ""
//			var queryResult = Things[fabNumber].QueryNamedPropertyHistory({
//				oldestFirst: undefined /* BOOLEAN */ ,
//				maxItems: 1000 /* NUMBER */ ,
//				endDate: undefined /* DATETIME */ ,
//				propertyNames: propertyList /* INFOTABLE */ ,
//				query: undefined /* QUERY */ ,
//				startDate: undefined /* DATETIME */
//			});
//
//			if (propName === 'RGT')
//				logger.debug("History Length :" + queryResult.rows.length);
//			var tablelength1 = queryResult.rows.length;
//			for (var x = 0; x < tablelength1; x++) {
//				var row1 = queryResult.rows[x];
//
//				if (row1[row.valueAtEventPropertyName] !== undefined && row1[row.valueAtEventPropertyName] !== 'undefined' && row1[row.valueAtEventPropertyName] !== null) {
//					// ELGi.COMP.ServiceHistory.DS entry object  
//
//					newEntry1 = new Object();
//					newEntry1.DateTime = row1.timestamp; // DATETIME
//					newEntry1.Consumable = propName; // STRING
//					newEntry1.LastValueBeforeService = row1[row.valueAtEventPropertyName]; // INTEGER
//					newEntry1.Description = undefined; // STRING
//					result.AddRow(newEntry1);
//				}
//
//			}
//
			//				queryResult.rows.toArray().forEach(row1 => {
			//					if (row1[row.valueAtEventPropertyName] !== undefined && row1[row.valueAtEventPropertyName] !== 'undefined' && row1[row.valueAtEventPropertyName] !== null) {
			//						// ELGi.COMP.ServiceHistory.DS entry object  
			//
			//						newEntry1 = new Object();
			//						newEntry1.DateTime = row1.timestamp; // DATETIME
			//						newEntry1.Consumable = propName; // STRING
			//						newEntry1.LastValueBeforeService = row1[row.valueAtEventPropertyName]; // INTEGER
			//						newEntry1.Description = undefined; // STRING
			//						result.AddRow(newEntry1);
			//					}
			//				});
			//}
	//	});
		logger.info("ELGi.COMP.MashupHelper.Thing:GetServiceHistoryForAsset Service Execution END");
	} catch (err) {
		logger.error("Error occured in ELGi.COMP.MashupHelper.Thing : GetServiceHistoryForAsset. Error : " + err);
	}
}());
