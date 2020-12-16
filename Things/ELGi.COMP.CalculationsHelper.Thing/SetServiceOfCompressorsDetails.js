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

//result: INFOTABLE dataShape: "RootEntityList"
var thingsList = ThingTemplates["ELGi.comp.ELGiMaster.TT"].QueryImplementingThingsWithData({
	maxItems: undefined /* NUMBER */ ,
	nameMask: undefined /* STRING */ ,
	query: query /* QUERY */ ,
	tags: undefined /* TAGS */
});

var tableLength = thingsList.rows.length;

for (var x = 0; x < tableLength; x++) {
	var ThingName = thingsList.rows[x].name;

	var minValue = Math.min(Things[ThingName].rem_AFCT, Things[ThingName].rem_OFCT,
		Things[ThingName].rem_OSCT, Things[ThingName].rem_OCT,
		Things[ThingName].rem_RGT, Things[ThingName].rem_PFCT,
		Things[ThingName].rem_MPV, Things[ThingName].rem_BDV,
		Things[ThingName].rem_solenoid, Things[ThingName].rem_ADV,
		Things[ThingName].rem_oilSampleTest, Things[ThingName].rem_SPM,
		Things[ThingName].remaining_PF_FF, Things[ThingName].rem_CF);

    var consumableName = "";
	if (Things[ThingName].rem_AFCT === minValue) {
		consumableName = 'rem_AFCT';
	} else if (Things[ThingName].rem_OFCT === minValue) {
		consumableName = 'rem_OFCT';
	} else if (Things[ThingName].rem_OSCT === minValue) {
		consumableName = 'rem_OSCT';
	} else if (Things[ThingName].rem_OCT === minValue) {
		consumableName = 'rem_OCT';
	} else if (Things[ThingName].rem_RGT === minValue) {
		consumableName = 'rem_RGT';
	} else if (Things[ThingName].rem_PFCT === minValue) {
		consumableName = 'rem_PFCT';
	} else if (Things[ThingName].rem_MPV === minValue) {
		consumableName = 'rem_MPV';
	} else if (Things[ThingName].rem_BDV === minValue) {
		consumableName = 'rem_BDV';
	} else if (Things[ThingName].rem_solenoid === minValue) {
		consumableName = 'rem_solenoid';
	} else if (Things[ThingName].rem_ADV === minValue) {
		consumableName = 'rem_ADV';
	} else if (Things[ThingName].rem_oilSampleTest === minValue) {
		consumableName = 'rem_oilSampleTest';
	} else if (Things[ThingName].rem_SPM === minValue) {
		consumableName = 'rem_SPM';
	} else if (Things[ThingName].remaining_PF_FF === minValue) {
		consumableName = 'remaining_PF_FF';
	} else if (Things[ThingName].rem_CF === minValue) {
		consumableName = 'rem_CF';
	}
	
	if (minValue < 0) {
		Things[ThingName].IsServiceDue = false;
		Things[ThingName].IsServiceOverdue = true;
		Things[ThingName].IsServiceDueSoon = false;
		Things[ThingName].MinValueConsumableName = consumableName;
	} else if (minValue >= 0 && minValue < 200) {
		Things[ThingName].IsServiceDue = true;
		Things[ThingName].IsServiceOverdue = false;
		Things[ThingName].IsServiceDueSoon = false;
		Things[ThingName].MinValueConsumableName = consumableName;
	} else if (minValue >= 200 && minValue < 500) {
		Things[ThingName].IsServiceDue = false;
		Things[ThingName].IsServiceOverdue = false;
		Things[ThingName].IsServiceDueSoon = true;
		Things[ThingName].MinValueConsumableName = consumableName;
	}

}
