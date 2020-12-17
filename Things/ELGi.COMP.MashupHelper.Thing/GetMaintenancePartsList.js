// --------------------------------------------------------------------------------------
// DESCRIPTION
// This service fetches the list of consumables and returns there remaining values and total value
//---------------------------------------------------------------------------------------
// Revision	Date        Who				What
// 1.0		2020-11-09  Prasoon Kumar	Initial Development...
// --------------------------------------------------------------------------------------

//********************* DEFINE YOUR SERVICE INPUTS/OUTPUT HERE **************************
/** @type {infotable} */
var result;
/** @type {string} */
var fabNumber;

//******************************* SERVICE CODE STARTS HERE *******************************
(function() {
	"use strict";
	try {
		logger.info("ELGi.COMP.MashupHelper.Thing:GetMaintenancePartsList Service Execution START");
		// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.ListMap.DS)
		result = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape({
			infoTableName: "InfoTable",
			dataShapeName: "ELGi.COMP.MaintenanceParts.DS"
		});

		var newEntry = new Object();
		var consumablesList = Things["ELGi.COMP.CalculationsHelper.Thing"].ConsumablesMapping;
		consumablesList.rows.toArray().forEach(row => {
			var propName = row.propertyDisplayName;
			if (propName !== 'PFCT' && propName !== 'MPV' && propName !== 'BDV' && propName !== 'Solenoid' && propName !== 'ADV' && propName !== 'Oil Sample' && propName !== 'SPM' && propName !== 'PF/FF' && propName !== 'CF') {
				newEntry.rem_property = propName;
				newEntry.rem_property_value = Things[fabNumber][row.actualPropertyName];
				newEntry.set_property_value = Things[fabNumber][row.propertyName];
				result.AddRow(newEntry);
			}
		});
		logger.info("ELGi.COMP.MashupHelper.Thing:GetMaintenancePartsList Service Execution END");
	} catch (err) {
		logger.error("Error occured in ELGi.COMP.MashupHelper.Thing : GetMaintenancePartsList. Error : " + err);
	}
}());
