
var propertyList = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape({
			infoTableName: "InfoTable",
			dataShapeName: "EntityList"
		});

var newEntry = new Object();
			newEntry.name = 'RGT_ChangeDate'; // STRING [Primary Key]        	
			propertyList.AddRow(newEntry);
			
            newEntry = new Object();
			newEntry.name = 'rem_RGT_AtChangeDate'; // STRING [Primary Key]        	
			propertyList.AddRow(newEntry);
// result: INFOTABLE dataShape: ""
var result =  Things["BPHS040255"].QueryNamedPropertyHistory({
	oldestFirst: undefined /* BOOLEAN */,
	maxItems: undefined /* NUMBER */,
	endDate: undefined /* DATETIME */,
	propertyNames: propertyList /* INFOTABLE */,
	query: undefined /* QUERY */,
	startDate: undefined /* DATETIME */
});
