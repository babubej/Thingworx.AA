//UpdateAvailable

// dateValue:DATETIME
var dateValue = new Date();
var dateValue1 = new Date();
// dateAddDays(dateValue:DATETIME, amount:NUMBER):STRING
var calculatedDateValue = dateAddDays(dateValue, -1);
var calculatedDateValue1 = dateAddDays(dateValue1, -1);
var startdate = calculatedDateValue.setHours(0, 0, 0, 0);
var enddate = calculatedDateValue1.setHours(23, 59, 0, 0);
//var yesterdays_Date = calculatedDateValue;

var queryObjects = new Array();
var filter;

if (machineGroup !== undefined && machineGroup !== null && machineGroup.trim() !== '' && machineGroup !== 'ALL') {
	filter = {
		"type": "EQ",
		"fieldName": "machine_group",
		"value": machine
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

filter = {
	"type": "EQ",
	"fieldName": "updateAvailable",
	"value": true
};
queryObjects.push(filter);

var query = {
	"filters": {
		"type": "And",
		"filters": queryObjects
	}
};

// result: INFOTABLE dataShape: "RootEntityList"
var thingsList = ThingTemplates["ELGi.comp.ELGiMaster.TT"].QueryImplementingThingsWithData({
	maxItems: undefined /* NUMBER */ ,
	nameMask: undefined /* STRING */ ,
	query: query /* QUERY */ ,
	tags: undefined /* TAGS */
});

var result = thingsList;

var tableLength = thingsList.rows.length;
for (var x = 0; x < tableLength; x++) {
	var ThingName = thingsList.rows[x].name;
	//neuron_version UpdateVersion
	var UpdateVersion = Things[ThingName].UpdateVersion;
	var neuron_version = Things[ThingName].neuron_version;
	var firmware_version = Things[ThingName].firmware_version;

	if (UpdateVersion != neuron_version) {
		Things[ThingName].IsFirmwareUpdatePending = true;
	} else if (UpdateVersion != firmware_version) {
		Things[ThingName].IsFirmwareUpdatePending = true;
	} else {
		Things[ThingName].IsFirmwareUpdatePending = false;
	}

	//	if (UpdateVersion === neuron_version) {
	//		Things[ThingName].isFirmwareUpdated = true;
	//	} else if (UpdateVersion === firmware_version) {
	//		Things[ThingName].isFirmwareUpdated = true;
	//	}
}
