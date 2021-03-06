logger.info("GetFixedSpeed80To60UtilThingsCount START");

try {

	var params = {
		infoTableName: "InfoTable",
		dataShapeName: "ELGi.COMP.ThingCount.DS"
	};
	// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.ThingCount.DS)
	var result = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);

	if (thingsList === undefined) {
		logger.debug("THINGS COUNT : undefined");
	} else {
		//logger.debug("THINGS COUNT : "+ thingsList.rows.length);
	}

	// dateValue:DATETIME
	var dateValue = new Date();
	var dateValue1 = new Date();
	// dateAddDays(dateValue:DATETIME, amount:NUMBER):STRING
	var calculatedDateValue = dateAddDays(dateValue, -1); // last days date	
	var startdate = calculatedDateValue.setHours(0, 0, 0, 0); // first set
	var enddate = dateValue1.setHours(23, 59, 0, 0); // second set

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

	filter = {
		"type": "EQ",
		"fieldName": "isVfd_Connected",
		"value": false
	};
	queryObjects.push(filter);

	filter = {
		"type": "Between",
		"fieldName": "device_time",
		"from": startdate,
		"to": enddate
	};
	queryObjects.push(filter);

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

	// Query Logic - Query all the things where IsServiceOverdue is true
	var query2 = {
		"filters": {
			"type": "EQ",
			"fieldName": "FixedCompUtil_80_to_60_per",
			"value": true
		}
	};

	// result: INFOTABLE
	var queryResult2 = Resources["InfoTableFunctions"].Query({
		t: queryResult1 /* INFOTABLE */ ,
		query: query2 /* QUERY */
	});

	// ELGi.COMP.ThingCount.DS entry object
	var newEntry = new Object();
	newEntry.FiltereredCount = queryResult2.rows.length; // INTEGER
	newEntry.TotalCount = queryResult1.rows.length; // STRING
	result.AddRow(newEntry);

} catch (err) {
	logger.error("Error occured :" + err.message);
}

logger.info("GetFixedSpeed80To60UtilThingsCount END");
