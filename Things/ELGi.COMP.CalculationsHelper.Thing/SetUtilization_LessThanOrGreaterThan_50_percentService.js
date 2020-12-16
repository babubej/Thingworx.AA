// dateValue:DATETIME
var dateValue = new Date();
var dateValue1 = new Date();
// dateAddDays(dateValue:DATETIME, amount:NUMBER):STRING
var calculatedDateValue = dateAddDays(dateValue, -1);
var startdate = calculatedDateValue.setHours(0, 0, 0, 0);
var enddate = dateValue1.setHours(23, 59, 0, 0);
//var yesterdays_Date = calculatedDateValue;

var query = {
	"filters": {
		"type": "And",
		"filters": [{
				"type": "EQ",
				"fieldName": "isVfd_Connected",
				"value": true
			},
			{
				"type": "Between",
				"fieldName": "device_time",
				"from": startdate,
				"to": enddate
			},
			{
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
	var MedianVFDSpeed = Things[ThingName].Median_VFD_Speed_Per;
	if (MedianVFDSpeed < 50) {
		Things[ThingName].VarCompUtil_Less_than_50_per = true;
        Things[ThingName].VarCompUtil_Greater_than_50_per = false;
	} else if (MedianVFDSpeed > 50) {
        Things[ThingName].VarCompUtil_Less_than_50_per = false;
		Things[ThingName].VarCompUtil_Greater_than_50_per = true;
	}
}
