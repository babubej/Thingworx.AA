var queryObjects = new Array();
var firmwareFilterValue, filter;

if (fabNumber !== undefined && fabNumber !== null && fabNumber.trim() !== '') {

	filter = {
		"type": "LIKE",
		"fieldName": "name",
		"value": '*' + fabNumber + '*'
	};
	queryObjects.push(filter);
}

if (firmwareFilter !== undefined && firmwareFilter !== null && firmwareFilter.trim() !== '' && firmwareFilter !== 'ALL') {
	if (firmwareFilter === 'PENDING') {
		filter = {
			"type": "EQ",
			"fieldName": "firmware_update_pending",
			"value": true
		};
		queryObjects.push(filter);

	} else if (firmwareFilter === 'UPDATED') {
		filter = {
			"type": "EQ",
			"fieldName": "firmware_updated",
			"value": true
		};
		queryObjects.push(filter);
	}
}

if (warrantyFilter !== undefined && warrantyFilter !== null && warrantyFilter.trim() !== '') {

	if (warrantyFilter === 'IN WARRANTY') {
		booleanValue = true;
	} else {
		booleanValue = false;
	}

	filter = {
		"type": "EQ",
		"fieldName": "warranty_status",
		"value": booleanValue
	};
	queryObjects.push(filter);
}

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

if (model !== undefined && model !== null && model.trim() !== '' && model !== 'All') {
	filter = {
		"type": "EQ",
		"fieldName": "Machine_variant",
		"value": model
	};
	queryObjects.push(filter);
}

var params = {
	infoTableName: "InfoTable",
	dataShapeName: "ELGi.COMP.FirmwareStausOfCompressors.DS"
};
// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.FirmwareStausOfCompressors.DS)
var result = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);

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

var tableLength = queryResult.rows.length;
for (var x = 0; x < tableLength; x++) {
	var row = queryResult.rows[x];

	// ELGi.COMP.ConnectedCompressors.DS entry object
	var newEntry = new Object();
	newEntry.device_time = row.device_time; // DATETIME
	newEntry.Machine_variant = row.Machine_variant; // STRING
	newEntry.customer_name = row.customer_name; // STRING    
	newEntry.fabNo = row.name; // STRING
	newEntry.Product_group = row.Product_group; // STRING
	if (row.firmware_update_pending === true) {
		newEntry.machine_status = 'PENDING';
	} else if (row.firmware_updated === true) {
		newEntry.machine_status = 'UPDATED';
	} else {
		newEntry.machine_status = '--';
	}
	newEntry.isConnected = row.is_machine_connected; // BOOLEAN
	result.AddRow(newEntry);
}
