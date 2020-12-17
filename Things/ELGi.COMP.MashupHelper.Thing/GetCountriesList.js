logger.info("GetCountriesList START");
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
		columns: 'country' /* STRING */
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
			var country = row.country;
			if (country !== undefined && country !== 'undefined' && country !== null && country.trim() !== '') {
				newEntry = new Object();
				newEntry.value = country; // STRING    			
				result.AddRow(newEntry);
			}
		}
	}
} catch (err) {
	logger.error("Error occured in ELGi.COMP.MashupHelper.Thing : GetAreaList. Error : " + err);
}

logger.info("GetCountriesList END");

