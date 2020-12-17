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

	var params = {
		t: queryResult /* INFOTABLE */ ,
		columns: 'Rated_CFM' /* STRING */
	};

	// result: INFOTABLE
	var distinctList = Resources["InfoTableFunctions"].Distinct(params);

	if (distinctList !== undefined && distinctList !== null && distinctList.rows.length > 0) {
		//Add First entry as All
		var newEntry = new Object();
		newEntry.value = 'All'; // STRING    
		result.AddRow(newEntry);
		
		var tableLength = distinctList.rows.length;
		for (var x = 0; x < tableLength; x++) {
			var row = distinctList.rows[x];
			var Rated_CFM = row.Rated_CFM;
			if (Rated_CFM !== undefined && Rated_CFM !== 'undefined' && Rated_CFM !== null && Rated_CFM !== '' && Rated_CFM !== 0 | 0.0) {
				newEntry = new Object();
				newEntry.value = Rated_CFM; // STRING    			
				result.AddRow(newEntry);
			}
		}
	}
} catch (err) {
	logger.error("Error occured in ELGi.COMP.MashupHelper.Thing : GetAllRated_CFM. Error : " + err);
}
