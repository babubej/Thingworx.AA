//  IsServiceDue, IsServiceOverdue and IsServiceDueSoon

var query = {
    	"filters": {
    		"type": "OR",
    		"filters": [
                {
    				"type": "LT",
    				"fieldName": "rem_AFCT",
    				"value": 0
    			},
    			{
    				"type": "LT",
    				"fieldName": "rem_OFCT",
    				"value": 0
    			},
    			{
    				"type": "LT",
    				"fieldName": "rem_OSCT",
    				"value": 0
    			},
                	{
    				"type": "LT",
    				"fieldName": "rem_OCT",
    				"value": 0
    			},
                	{
    				"type": "LT",
    				"fieldName": "rem_RGT",
    				"value": 0
    			},
                {
    				"type": "LT",
    				"fieldName": "rem_PFCT",
    				"value": 0
    			},
                {
    				"type": "LT",
    				"fieldName": "rem_MPV",
    				"value": 0
    			},
                {
    				"type": "LT",
    				"fieldName": "rem_BDV",
    				"value": 0
    			},
                {
    				"type": "LT",
    				"fieldName": "rem_solenoid",
    				"value": 0
    			},
                {
    				"type": "LT",
    				"fieldName": "rem_ADV",
    				"value": 0
    			},
                {
    				"type": "LT",
    				"fieldName": "rem_oilSampleTest",
    				"value": 0
    			},
                {
    				"type": "LT",
    				"fieldName": "rem_SPM",
    				"value": 0
    			},
                {
    				"type": "LT",
    				"fieldName": "remaining_PF_FF",
    				"value": 0
    			},
                {
    				"type": "LT",
    				"fieldName": "rem_CF",
    				"value": 0
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
var result = thingsList;

var tableLength = thingsList.rows.length;
for (var x=0; x < tableLength; x++) {
    var ThingName = thingsList.rows[x].name;
    Things[ThingName].IsServiceOverdue = true;
    Things[ThingName].IsServiceDue = false;
    Things[ThingName].IsServiceDueSoon = false;
	//IsServiceDue = true;, IsServiceOverdue and IsServiceDueSoon
}
