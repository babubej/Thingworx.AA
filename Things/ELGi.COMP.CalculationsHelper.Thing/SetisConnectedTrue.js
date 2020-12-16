var currentdate = new Date();

// dateAddHours(dateValue:DATETIME, amount:NUMBER):STRING
var calculatedDateValue = dateAddHours(currentdate, -2);

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
    var deviceTime = Things[ThingName].device_time;
    if( deviceTime >= calculatedDateValue && deviceTime <= currentdate ){
		Things[ThingName].is_Machine_Connected = true;
    } else {
    	Things[ThingName].is_Machine_Connected = false;
    }    
}
