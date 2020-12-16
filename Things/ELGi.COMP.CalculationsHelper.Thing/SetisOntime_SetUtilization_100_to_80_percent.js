// SetisOntime service "changed" to SetisOntime_SetUtilization_100_to_80_percent

var dateValue = new Date();
// dateAddDays(dateValue:DATETIME, amount:NUMBER):STRING
var calculatedDateValue = dateAddDays(dateValue, -1);
var yesterdays_Date = calculatedDateValue;
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
    				"type": "EQ",
    				"fieldName": "date_time",
    				"value": yesterdays_Date
    			},	{
    				"type": "Between",
    				"fieldName": "utilization",
    				"from": "80",
                    "to": "100"
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

var tableLength = thingsList.rows.length;
for (var x=0; x < tableLength; x++) {
    var ThingName = thingsList.rows[x].name;
    Things [ThingName].SetUtilization_100_to_80_percent = true;

}
