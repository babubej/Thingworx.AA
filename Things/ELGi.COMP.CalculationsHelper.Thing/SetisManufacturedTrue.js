var query = {
    	"filters": {
    		"type": "And",
    		"filters": [{
    				"type": "EQ",
    				"fieldName": "isRetrofitted",
    				"value": false
    			},
    			{
    				"type": "NotMissingValue",
    				"fieldName": "customer_name"
    			},
    			{
    				"type": "EQ",
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
    Things [ThingName].isManufactured = true;       
}
