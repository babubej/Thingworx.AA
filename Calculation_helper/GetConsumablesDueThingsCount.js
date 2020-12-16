logger.info("GetConsumablesDueThingsCount START");

try {

	if (machineGroup !== undefined && machineGroup !== null && machineGroup.toUpperCase() !== 'ALL') {
		// result: INFOTABLE dataShape: "RootEntityList"
		thingsList = Things["ELGI.COMP.ThingModelHelper.Thing"].GetThingsWithData({
			machine: undefined /* STRING */ ,
			nameMask: undefined /* STRING */ ,
			region: undefined /* STRING */
		});

		var queryObjects = new Array();
		var filter;
		if (country !== undefined && country !== null && country.trim() !== '' && country !== 'All') {
			filter = {
				"type": "EQ",
				"fieldName": "country",
				"value": country
			};
			queryObjects.push(filter);
		}

		if (region !== undefined && region !== null && region.trim() !== '' && region !== 'All') {
			filter = {
				"type": "EQ",
				"fieldName": "region",
				"value": region
			};
			queryObjects.push(filter);
		}
		if (area !== undefined && area !== null && area.trim() !== '' && area !== 'All') {
			filter = {
				"type": "EQ",
				"fieldName": "area",
				"value": area
			};
			queryObjects.push(filter);
		}
		if (dealer !== undefined && dealer !== null && dealer.trim() !== '' && dealer !== 'All') {
			filter = {
				"type": "EQ",
				"fieldName": "dealer_name",
				"value": dealer
			};
			queryObjects.push(filter);
		}
		if (customer !== undefined && customer !== null && customer.trim() !== '' && customer !== 'All') {
			filter = {
				"type": "EQ",
				"fieldName": "customer_name",
				"value": customer
			};
			queryObjects.push(filter);
		}

		if (machineGroup !== undefined && machineGroup !== null && machineGroup.trim() !== '' && machineGroup !== 'ALL') {
			filter = {
				"type": "EQ",
				"fieldName": "machine_group",
				"value": machineGroup
			};
			queryObjects.push(filter);
		}		

		var query = {
			"filters": {
				"type": "And",
				"filters": queryObjects
			}
		};

		// result: INFOTABLE
		var queryResult = Resources["InfoTableFunctions"].Query({
			t: thingsList /* INFOTABLE */ ,
			query: query /* QUERY */
		});


		var params = {
			infoTableName: "InfoTable",
			dataShapeName: "ELGi.COMP.ConsumablesOutput.DS"
		};
		// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.ThingCount.DS)
		var result = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);



		if (thingsList === undefined) {
			logger.debug("THINGS COUNT : undefined");
		} else {
			//logger.debug("THINGS COUNT : "+ thingsList.rows.length);
		}

		var consumablesProperties = me.ConsumablesMapping;

		var tableLength = consumablesProperties.rows.length;

		for (var x = 0; x < tableLength; x++) {
			var row = consumablesProperties.rows[x];
			// Query Logic - Query all the things Consumable Due Now is true
			var query1 = {
				"filters": {
					"type": "EQ",
					"fieldName": row.consumablesDueNowPropertyName,
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
					"fieldName": row.consumablesDue30DaysPropertyName,
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
					"fieldName": row.consumablesDue60DaysPropertyName,
					"value": true
				}
			};
			// result: INFOTABLE
			var queryResult3 = Resources["InfoTableFunctions"].Query({
				t: queryResult /* INFOTABLE */ ,
				query: query3 /* QUERY */
			});

			// ELGi.COMP.ConsumablesOutput.DS entry object
			var newEntry = new Object();
			newEntry.Name = row.propertyDisplayName; // STRING
			if (queryResult1 !== undefined && queryResult1 !== null && queryResult1.rows.length > 0) {
				newEntry.Current = queryResult1.rows.length; // NUMBER
			} else {
				newEntry.Current = 0;
			}

			if (queryResult2 !== undefined && queryResult2 !== null && queryResult2.rows.length > 0) {
				newEntry.Next30Days = queryResult2.rows.length; // NUMBER                
			} else {
				newEntry.Next30Days = 0;
			}
			if (queryResult3 !== undefined && queryResult3 !== null && queryResult3.rows.length > 0) {
				newEntry.Next60Days = queryResult3.rows.length; // NUMBER
			} else {
				newEntry.Next60Days = 0;
			}
			newEntry.Total = queryResult.rows.length; // NUMBER
			newEntry.Icon = row.icon; // NUMBER
			result.AddRow(newEntry);
		}
	}

} catch (err) {
	logger.error("Error occured :" + err.message);
}

logger.info("GetConsumablesDueThingsCount END");
