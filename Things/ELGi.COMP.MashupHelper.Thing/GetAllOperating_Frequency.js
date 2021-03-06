try {
	var params = {
		infoTableName: "InfoTable",
		dataShapeName: "ELGi.COMP.ListMap.DS"
	};

	// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.ListMap.DS)
	var result = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);

	var query = {
		"filters": {
			"type": "And",
			"filters": [{
					"type": "NotMissingValue",
					"fieldName": "CRMorCCS"
				},
				{
					"type": "NE",
					"fieldName": "Rated_pressure",
					"value": 0
				}
			]
		}
	};
	// result: INFOTABLE dataShape: "RootEntityList"
	var queryResult = ThingTemplates["ELGi.comp.ELGiMaster.TT"].QueryImplementingThingsWithData({
		maxItems: undefined /* NUMBER */ ,
		nameMask: undefined /* STRING */ ,
		query: query /* QUERY */ ,
		tags: undefined /* TAGS */
	});

	var params1 = {
		t: queryResult /* INFOTABLE */ ,
		columns: 'Operating_Frequency' /* STRING */
	};

	// result: INFOTABLE
	var distinctList = Resources["InfoTableFunctions"].Distinct(params1);
	logger.info("In GetAllOperating_Frequency"+ distinctList);
	if (distinctList !== undefined && distinctList !== null && distinctList.rows.length > 0) {
		//Add First entry as All
		var newEntry = new Object();
		newEntry.value = 'All'; // STRING    
		result.AddRow(newEntry);
		
		var tableLength = distinctList.rows.length;
		for (var x = 0; x < tableLength; x++) {
			var row = distinctList.rows[x];
			var operating_Frequency = row.Operating_Frequency;
			if (operating_Frequency !== undefined && operating_Frequency !== 'undefined' && operating_Frequency !== null && operating_Frequency !== '' && operating_Frequency !== 0 | 0.0) {
				newEntry = new Object();
				newEntry.value = operating_Frequency; // STRING    			
				result.AddRow(newEntry);
			}
		}
	}
} catch (err) {
	logger.error("Error occured in ELGi.COMP.MashupHelper.Thing : GetAllOperating_Frequency. Error : " + err);
}
