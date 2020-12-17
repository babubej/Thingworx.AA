try {
	var params = {
		infoTableName: "InfoTable",
		dataShapeName: "ELGi.COMP.ConsumableForecastReport.DS"
	};
	//ELGi.comp.ELGiCRM.PLM.Parameters.DS
	// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.comp.ELGiCRM.PLM.Parameters.DS)
	var spareForecastList = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);

	// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.ListMap.DS)
	var dealerList = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape({
		infoTableName: "InfoTable",
		dataShapeName: "ELGi.COMP.ListMap.DS"
	});

	if (dealer !== undefined && dealer !== null && dealer.trim() !== '' && dealer !== 'All') {
		// ELGi.COMP.ListMap.DS entry object
		var newEntry1 = new Object();
		newEntry1.value = dealer; // STRING
		dealerList.AddRow(newEntry1);
	} else {
		// result: INFOTABLE dataShape: "ELGi.COMP.ListMap.DS"
		dealerList = Things["ELGi.COMP.MashupHelper.Thing"].GetDealersList({
			areaName: 'All' /* STRING */ ,
			regionName: 'All' /* STRING */ ,
			countryName: 'All' /* STRING */
		});

	}

	var tableLength = dealerList.rows.length;
	for (var x = 0; x < tableLength; x++) {
		var row = dealerList.rows[x];
		var dealerName = row.value;
		if (dealerName !== 'All') {
			var queryObjects = new Array();
			var filter;
			//			if (country !== undefined && country !== null && country.trim() !== '' && country !== 'All') {
			//				filter = {
			//					"type": "EQ",
			//					"fieldName": "country",
			//					"value": country
			//				};
			//				queryObjects.push(filter);
			//			}
			//
			//			if (region !== undefined && region !== null && region.trim() !== '' && region !== 'All') {
			//				filter = {
			//					"type": "EQ",
			//					"fieldName": "region",
			//					"value": region
			//				};
			//				queryObjects.push(filter);
			//			}
			//			if (area !== undefined && area !== null && area.trim() !== '' && area !== 'All') {
			//				filter = {
			//					"type": "EQ",
			//					"fieldName": "area",
			//					"value": area
			//				};
			//				queryObjects.push(filter);
			//			}
			//if (dealer !== undefined && dealer !== null && dealer.trim() !== '' && dealer !== 'All') {
			filter = {
				"type": "EQ",
				"fieldName": "dealer_name",
				"value": dealerName
			};
			queryObjects.push(filter);
			//}

			if (productGroup !== undefined && productGroup !== null && productGroup.trim() !== '' && productGroup !== 'ALL') {
				logger.debug("machine_group : " + productGroup);
				filter = {
					"type": "EQ",
					"fieldName": "machine_group",
					"value": productGroup
				};
				queryObjects.push(filter);
			}

			filter = {
				"type": "NotMissingValue",
				"fieldName": "CRMorCCS"
			};
			queryObjects.push(filter);

			filter = {
				"type": "NE",
				"fieldName": "Rated_pressure",
				"value": 0
			};
			queryObjects.push(filter);

			var query = {
				"filters": {
					"type": "And",
					"filters": queryObjects
				}
			};

			// result: INFOTABLE dataShape: "RootEntityList"
			var queryResult = ThingTemplates["ELGi.comp.ELGiMaster.TT"].QueryImplementingThingsWithData({
				maxItems: undefined /* NUMBER */ ,
				nameMask: undefined /* STRING */ ,
				query: query /* QUERY */ ,
				tags: undefined /* TAGS */
			});

			if (queryResult !== undefined && queryResult !== null && queryResult !== '' && queryResult.rows.length > 0) {
				var consumablesProperties = Things["ELGi.COMP.CalculationsHelper.Thing"].ConsumablesMapping;
				var tableLength1 = consumablesProperties.rows.length;

				for (var y = 0; y < tableLength1; y++) {
					var row1 = consumablesProperties.rows[y];
					// Query Logic - Query all the things Consumable Due Now is true
					var query1 = {
						"filters": {
							"type": "EQ",
							"fieldName": row1.consumablesDueNowPropertyName,
							"value": true
						}
					};
					// result: INFOTABLE
					var queryResult1 = Resources["InfoTableFunctions"].Query({
						t: queryResult /* INFOTABLE */ ,
						query: query1 /* QUERY */
					});

					// Query Logic - Query all the things Consumable Due in next 30 Days is true
					var query2 = {
						"filters": {
							"type": "EQ",
							"fieldName": row1.consumablesDue30DaysPropertyName,
							"value": true
						}
					};
					// result: INFOTABLE
					var queryResult2 = Resources["InfoTableFunctions"].Query({
						t: queryResult /* INFOTABLE */ ,
						query: query2 /* QUERY */
					});

					// Query Logic - Query all the things Consumable Due in next 60 Days is true
					var query3 = {
						"filters": {
							"type": "EQ",
							"fieldName": row1.consumablesDue60DaysPropertyName,
							"value": true
						}
					};
					// result: INFOTABLE
					var queryResult3 = Resources["InfoTableFunctions"].Query({
						t: queryResult /* INFOTABLE */ ,
						query: query3 /* QUERY */
					});
					// ELGi.COMP.ConsumableForecastReport.DS entry object
					var newEntry = new Object();
					newEntry.Dealer = dealerName; // STRING
					newEntry.Part = row1.propertyDisplayName; // STRING
					if (queryResult1 !== undefined && queryResult1 !== null && queryResult1.rows.length > 0) {
						newEntry.Current = queryResult1.rows.length; // INTEGER
					} else {
						newEntry.Current = 0;
					}

					if (queryResult2 !== undefined && queryResult2 !== null && queryResult2.rows.length > 0) {
						newEntry.Next30Days = queryResult2.rows.length; // INTEGER                
					} else {
						newEntry.Next30Days = 0;
					}
					if (queryResult3 !== undefined && queryResult3 !== null && queryResult3.rows.length > 0) {
						newEntry.Next60Days = queryResult3.rows.length; // NUMBER
					} else {
						newEntry.Next60Days = 0;
					}
					newEntry.MachinePopulation = newEntry.Current + newEntry.Next30Days + newEntry.Next60Days; // NUMBER					
					spareForecastList.AddRow(newEntry);
				}
			}
		}
	}

	var result = spareForecastList;
} catch (err) {
	logger.error(err);
}
