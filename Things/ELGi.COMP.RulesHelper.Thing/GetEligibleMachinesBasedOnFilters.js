var queryObjects = new Array();
var booleanValue;
var filter;

if (ProductGroup !== undefined && ProductGroup !== null && ProductGroup.trim() !== '') {
	filter = {
		"type": "EQ",
		"fieldName": "machine_group",
		"value": ProductGroup
	};
	queryObjects.push(filter);
}

if (MachineVariant !== undefined && MachineVariant !== null && MachineVariant.trim() !== '' && MachineVariant !== 'ALL') {
	filter = {
		"type": "EQ",
		"fieldName": "Machine_variant",
		"value": MachineVariant
	};
	queryObjects.push(filter);
}

if (RatedPower !== undefined && RatedPower !== null && RatedPower.trim() !== '' && RatedPower !== 'ALL') {
	filter = {
		"type": "EQ",
		"fieldName": "Rated_Power",
		"value": RatedPower
	};
	queryObjects.push(filter);
}

if (RatedPressure !== undefined && RatedPressure !== null && RatedPressure.trim() !== '' && RatedPressure !== 'ALL') {
	filter = {
		"type": "EQ",
		"fieldName": "Rated_pressure",
		"value": RatedPressure
	};
	queryObjects.push(filter);
}

if (RatedCFM !== undefined && RatedCFM !== null && RatedCFM.trim() !== '' && RatedCFM !== 'ALL') {
	filter = {
		"type": "EQ",
		"fieldName": "Rated_CFM",
		"value": RatedCFM
	};
	queryObjects.push(filter);
}

if (OperatingVoltage !== undefined && OperatingVoltage !== null && OperatingVoltage.trim() !== '' && OperatingVoltage !== 'ALL') {
	filter = {
		"type": "EQ",
		"fieldName": "Operating_Voltage",
		"value": OperatingVoltage
	};
	queryObjects.push(filter);
}

if (OperatingFrequency !== undefined && OperatingFrequency !== null && OperatingFrequency.trim() !== '' && OperatingFrequency !== 'ALL') {
	filter = {
		"type": "EQ",
		"fieldName": "Operating_Frequency",
		"value": OperatingFrequency
	};
	queryObjects.push(filter);
}

if (Country !== undefined && Country !== null && Country.trim() !== '' && Country !== 'All') {
	filter = {
		"type": "EQ",
		"fieldName": "country",
		"value": Country
	};
	queryObjects.push(filter);
}

if (Region !== undefined && Region !== null && Region.trim() !== '' && Region !== 'All') {
	filter = {
		"type": "EQ",
		"fieldName": "region",
		"value": Region
	};
	queryObjects.push(filter);
}
if (Area !== undefined && Area !== null && Area.trim() !== '' && Area !== 'All') {
	filter = {
		"type": "EQ",
		"fieldName": "area",
		"value": Area
	};
	queryObjects.push(filter);
}

if (InWarranty !== undefined && InWarranty !== null && InWarranty !== 'false' && InWarranty !== false) {
	filter = {
		"type": "EQ",
		"fieldName": "warranty_status",
		"value": InWarranty
	};
	queryObjects.push(filter);
}

if (IsKeyCustomer !== undefined && IsKeyCustomer !== null && IsKeyCustomer !== 'false' && IsKeyCustomer !== false) {
	filter = {
		"type": "EQ",
		"fieldName": "isKeyCustomer",
		"value": IsKeyCustomer
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

// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.ListMap.DS)
var result = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape({
	infoTableName: "InfoTable",
	dataShapeName: "ELGi.COMP.ListMap.DS"
});

var tableLength = queryResult.rows.length;
for (var x=0; x < tableLength; x++) {
    var row = queryResult.rows[x];
    // ELGi.COMP.ListMap.DS entry object
    var newEntry = new Object();
    newEntry.value = row.name; // STRING
    //newEntry.key = undefined; // STRING
	result.AddRow(newEntry);

}






