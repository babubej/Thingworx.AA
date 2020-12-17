try {
	var params = {
		infoTableName: "InfoTable",
		dataShapeName: "ELGi.COMP.ListMap.DS"
	};

	// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.ListMap.DS)
	var result = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);

	if (countryName === 'All') {
		countryName = '**';
	}
	if (regionName === 'All') {
		regionName = '**';
	}
	if (areaName === 'All') {
		areaName = '**';
	}


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
				},
				{
					"type": "LIKE",
					"fieldName": "country",
					"value": countryName
				},
				{
					"type": "LIKE",
					"fieldName": "region",
					"value": regionName
				},
				{
					"type": "LIKE",
					"fieldName": "area",
					"value": areaName
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
		columns: 'dealer_name' /* STRING */
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
			var dealer = row.dealer_name;
			if (dealer !== undefined && dealer !== 'undefined' && dealer !== null && dealer.trim() !== '') {
				newEntry = new Object();
				newEntry.value = dealer; // STRING    			
				result.AddRow(newEntry);
			}
		}
	}
} catch (err) {
	logger.error("Error occured in ELGi.COMP.MashupHelper.Thing : GetDealersList. Error : " + err);
}
