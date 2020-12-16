logger.info("GetOnTimeServiceDetails START");

try {
	// result: INFOTABLE dataShape: "RootEntityList"
	var thingsList = Things["ELGI.COMP.ThingModelHelper.Thing"].GetThingsWithData({
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

	var query1 = {
		"filters": {
			"type": "And",
			"filters": queryObjects
		}
	};

	// result: INFOTABLE
	var queryResult1 = Resources["InfoTableFunctions"].Query({
		t: thingsList /* INFOTABLE */ ,
		query: query1 /* QUERY */
	});

	var currentDate = new Date();
	var startDate = dateAddDays(currentDate, -90);
	var total, onTime, overDueLT200, overDueGT200;
	total = onTime = overDueLT200 = overDueGT200 = 0;

	// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.OnTimeServiceValues.DS)
	var result = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape({
		infoTableName: "InfoTable",
		dataShapeName: "ELGi.COMP.OnTimeServiceValues.DS"
	});

	var newEntry, newEntry1;
	var propertyList = me.ConsumablesMapping;

	if (queryResult1 !== undefined && queryResult1 !== null && queryResult1.rows.length > 0) {
		//Iterate Consumables
		var tableLength = propertyList.rows.length;
		for (var x = 0; x < tableLength; x++) {
			var row = propertyList.rows[x];
			var eventDatePropertyName = row.eventPropertyName;
			var valueAtEventPropertyName = row.valueAtEventPropertyName;

			//Iterate Things
			var tableLength1 = queryResult1.rows.length;
			for (var y = 0; y < tableLength1; y++) {
				var fabNumber = queryResult1.rows[y].name;

				// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(EntityList)
				var propList = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape({
					infoTableName: "InfoTable",
					dataShapeName: "EntityList"
				});
				// EntityList entry object
				newEntry1 = new Object();
				newEntry1.name = eventDatePropertyName; // STRING [Primary Key]
				newEntry1.description = undefined; // STRING
				propList.AddRow(newEntry1);
				// EntityList entry object
				newEntry1 = new Object();
				newEntry1.name = valueAtEventPropertyName; // STRING [Primary Key]
				newEntry1.description = undefined; // STRING
				propList.AddRow(newEntry1);

				// result: INFOTABLE dataShape: ""
				var history = Things[fabNumber].QueryNamedPropertyHistory({
					oldestFirst: undefined /* BOOLEAN */ ,
					maxItems: 500 /* NUMBER */ ,
					endDate: currentDate /* DATETIME */ ,
					propertyNames: propList /* INFOTABLE */ ,
					query: undefined /* QUERY */ ,
					startDate: startDate /* DATETIME */
				});
				if (fabNumber === 'BDHS030461') {
					logger.debug("History :" + history.rows.length);
				}
				//Iterate History
				var tableLength2 = history.rows.length;
				for (var z = 0; z < tableLength2; z++) {
					var row1 = history.rows[z];
					if (row1[eventDatePropertyName] >= startDate && row1[eventDatePropertyName] <= currentDate && row1[valueAtEventPropertyName] !== 20000 && row1[valueAtEventPropertyName] !== undefined && row1[valueAtEventPropertyName] !== null) {
						if (row1[valueAtEventPropertyName] >= 0) {
							//On Time
							onTime++;
							total++;
						} else if (row1[valueAtEventPropertyName] < 0 && row1[valueAtEventPropertyName] >= -200) {
							//Over Due LT 200 Hrs
							overDueLT200++;
							total++;
						} else if (row1[valueAtEventPropertyName] < -200) {
							//Over Due GT 200 Hrs
							overDueGT200++;
							total++;
						}
					}
				}
			}
		}
		logger.debug("Total=" + total + ', onTime=' + onTime + ', overDueLT200=' + overDueLT200 + ', overDueGT200=' + overDueGT200);
		if (total !== 0) {
			// ELGi.COMP.OnTimeServiceValues.DS entry object
			newEntry = new Object();
			newEntry.OverdueGT200 = Math.round((overDueGT200 / total) * 100); // NUMBER
			newEntry.OverdueLT200 = Math.round((overDueLT200 / total) * 100); // NUMBER
			newEntry.OnTime = Math.round((onTime / total) * 100); // NUMBER
			result.AddRow(newEntry);
		} else {
        	// ELGi.COMP.OnTimeServiceValues.DS entry object
			newEntry = new Object();
			newEntry.OverdueGT200 = 0; // NUMBER
			newEntry.OverdueLT200 = 0; // NUMBER
			newEntry.OnTime = 0; // NUMBER
			result.AddRow(newEntry);
        }
	} else {		
			// ELGi.COMP.OnTimeServiceValues.DS entry object
			var newEntry2 = new Object();
			newEntry2.OverdueGT200 = 0; // NUMBER
			newEntry2.OverdueLT200 = 0; // NUMBER
			newEntry2.OnTime = 0; // NUMBER
			result.AddRow(newEntry2);		
	}
} catch (err) {
	logger.error("Error occured in ELGi.COMP.CalculationsHelper.Thing . Message : " + err);
}

logger.info("GetOnTimeServiceDetails END");

