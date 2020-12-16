try {
	// result: INFOTABLE dataShape: "RootEntityList"
	var thingsList = Things["ELGI.COMP.ThingModelHelper.Thing"].GetThingsWithData({
		machine: undefined /* STRING */ ,
		nameMask: undefined /* STRING */ ,
		region: undefined /* STRING */
	});

	if (thingsList === undefined) {
		logger.debug("THINGS COUNT : undefined");
	} else {
		logger.debug("THINGS COUNT : " + thingsList.rows.length);
	}

	var query1 = {
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
	// result: INFOTABLE
	var queryResult1 = Resources["InfoTableFunctions"].Query({
		t: thingsList /* INFOTABLE */ ,
		query: query1 /* QUERY */
	});

	var currentDate = new Date();
	var startDate = dateAddDays(currentDate, -90);
	var total, onTime, overDueLT200, overDueGT200;
	total = onTime = overDueLT200 = overDueGT200 = 0;

	var propertyList = me.ConsumablesMapping;

	var tableLength = propertyList.rows.length;
	for (var x = 0; x < tableLength; x++) {
		var row = propertyList.rows[x];
		var eventDatePropertyName = row.eventPropertyName;
		var valueAtEventPropertyName = row.valueAtEventPropertyName;
		var query2 = {
			"filters": {
				"type": "Between",
				"fieldName": eventDatePropertyName,
				"from": startDate,
				"to": currentDate
			}
		};
		// result: INFOTABLE
		var queryResult2 = Resources["InfoTableFunctions"].Query({
			t: queryResult1 /* INFOTABLE */ ,
			query: query2 /* QUERY */
		});

		var tableLength1 = queryResult2.rows.length;
		total = total + tableLength1;
		for (var y = 0; y < tableLength1; y++) {
			thingName = queryResult2.rows[y].name;
			if (Things[thingName][eventDatePropertyName] >= startDate && Things[thingName][eventDatePropertyName] <= currentDate) {
				if (Things[thingName][valueAtEventPropertyName] >= 0) {
					//On Time
					onTime++;
				} else if (Things[thingName][valueAtEventPropertyName] < 0 && Things[thingName][valueAtEventPropertyName] >= -200) {
					//Over Due LT 200 Hrs
					overDueLT200++;
				} else if (Things[thingName][valueAtEventPropertyName] < -200) {
					//Over Due GT 200 Hrs
					overDueGT200++;
				}
			}
		}
	}

	// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.OnTimeServiceValues.DS)
	var result = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape({
		infoTableName: "InfoTable",
		dataShapeName: "ELGi.COMP.OnTimeServiceValues.DS"
	});

	// ELGi.COMP.OnTimeServiceValues.DS entry object
	var newEntry = new Object();
	newEntry.OverdueGT200 = Math.round( (overDueGT200 / total) * 100 ); // NUMBER
	newEntry.OverdueLT200 = Math.round( (overDueLT200 / total) * 100 ); // NUMBER
	newEntry.OnTime = Math.round( (onTime / total) * 100 ); // NUMBER
	result.AddRow(newEntry);

} catch (err) {
	logger.error("Error occured in ELGi.COMP.CalculationsHelper.Thing . Message : " + err);
}
