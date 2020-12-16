// dateValue:DATETIME
var dateValue = new Date();
var dateValue1 = new Date();
// dateAddDays(dateValue:DATETIME, amount:NUMBER):STRING
var calculatedDateValue = dateAddDays(dateValue, -1); // last days date 
var startdate = calculatedDateValue.setHours(0,0,0,0); // first set
var enddate = dateValue1;

var query = {
    	"filters": {
    		"type": "And",
    		"filters": [
                {
    				"type": "EQ",
    				"fieldName": "isVfd_Connected",
    				"value": false
    			},
    			{
    				"type": "Between",
    				"fieldName": "device_time",
    				"from": startdate ,
                    "to": enddate
    			},	{
    				"type": "Between",
    				"fieldName": "utilization_percentage",
    				"from": 80,
                    "to": 100
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
var thingsList =  ThingTemplates["ELGi.comp.ELGiMaster.TT"].QueryImplementingThingsWithData({
	maxItems: undefined /* NUMBER */,
	nameMask: undefined /* STRING */,
	query: query /* QUERY */,
	tags: undefined /* TAGS */
});
var result = thingsList;
var tableLength = thingsList.rows.length;
for (var x=0; x < tableLength; x++) {
    var ThingName = thingsList.rows[x].name;
    Things[ThingName].FixedCompUtil_100_to_80_per= true;
	Things[ThingName].FixedCompUtil_80_to_60_per= false;
	Things[ThingName].FixedCompUtil_Less_than_60_per= false;
}
