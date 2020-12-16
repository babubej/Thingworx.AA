var params = {
    infoTableName : "InfoTable",
    dataShapeName : "ELGi.COMP.DischargeParameters.DS"
};

// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.DischargeParameters.DS)
var result = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);

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
    
var query = {
	"filters": {
		"type": "And",
		"filters": queryObjects
	}
};
// result: INFOTABLE
result = Resources["InfoTableFunctions"].Query({
	t: thingsList /* INFOTABLE */,
	query: query /* QUERY */
});        
