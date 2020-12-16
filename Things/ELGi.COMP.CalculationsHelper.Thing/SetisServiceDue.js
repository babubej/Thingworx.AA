var query = {
    	"filters": {
    		"type": "OR",
    		"filters": [
                {
    				"type": "Between",
    				"fieldName": "rem_AFCT",
                    "from": "0",
        			"to": "200"

    			},
    			{
    				"type": "Between",
    				"fieldName": "rem_OFCT",
    				"from": "0",
        			"to": "200"
    			},
    			{
    				"type": "Between",
    				"fieldName": "rem_OSCT",
    				"from": "0",
        			"to": "200"
    			},
                	{
    				"type": "Between",
    				"fieldName": "rem_OCT",
    				"from": "0",
        			"to": "200"
    			},
                	{
    				"type": "Between",
    				"fieldName": "rem_RGT",
    				"from": "0",
        			"to": "200"
    			},
                {
    				"type": "Between",
    				"fieldName": "rem_PFCT",
    				"from": "0",
        			"to": "200"
    			},
                {
    				"type": "Between",
    				"fieldName": "rem_MPV",
    				"from": "0",
        			"to": "200"
    			},
                {
    				"type": "Between",
    				"fieldName": "rem_BDV",
    				"from": "0",
        			"to": "200"
    			},
                {
    				"type": "Between",
    				"fieldName": "rem_solenoid",
    				"from": "0",
        			"to": "200"
    			},
                {
    				"type": "Between",
    				"fieldName": "rem_ADV",
    				"from": "0",
        			"to": "200"
    			},
                {
    				"type": "Between",
    				"fieldName": "rem_oilSampleTest",
    				"from": "0",
        			"to": "200"
    			},
                {
    				"type": "Between",
    				"fieldName": "rem_SPM",
    				"from": "0",
        			"to": "200"
    			},
                {
    				"type": "Between",
    				"fieldName": "remaining_PF_FF",
    				"from": "0",
        			"to": "200"
    			},
                {
    				"type": "Between",
    				"fieldName": "rem_CF",
    				"from": "0",
        			"to": "200"
    			},
    		]
    	}
    };
 //result: INFOTABLE dataShape: "RootEntityList"
var thingsList =  ThingTemplates["ELGi.comp.ELGiMaster.TT"].QueryImplementingThingsWithData({
	maxItems: undefined /* NUMBER */,
	nameMask: undefined /* STRING */,
	query: query /* QUERY */,
	tags: undefined /* TAGS */
});
//var result = thingsList;

var tableLength = thingsList.rows.length;
for (var x=0; x < tableLength; x++) {
    var ThingName = thingsList.rows[x].name;
    Things[ThingName].IsServiceDue = true;
    Things[ThingName].IsServiceOverdue = false;
    Things[ThingName].IsServiceDueSoon = false;
}
