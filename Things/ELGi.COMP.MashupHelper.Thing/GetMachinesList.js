try{
var queryObjects = new Array();
var filter;
if (customer !== undefined && customer !== null && customer.trim() !== '' && customer !== 'All' ) {
	filter = {
		"type": "EQ",
		"fieldName": "customer_name",
		"value": customer
	};
	queryObjects.push(filter);
}   
    
if (machineGroup !== undefined && machineGroup !== null && machineGroup.trim() !== '' && machineGroup !== 'ALL' ) {
	filter = {
		"type": "EQ",
		"fieldName": "machine_group",
		"value": machineGroup
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
var result =  ThingTemplates["ELGi.comp.ELGiMaster.TT"].QueryImplementingThingsWithData({
	maxItems: undefined /* NUMBER */,
	nameMask: undefined /* STRING */,
	query: query /* QUERY */,
	tags: undefined /* TAGS */
});
} catch(err){
	logger.error("Error in ELGi.COMP.MashupHelper.Thing : GetMachinesList. Error :"+err);
}
