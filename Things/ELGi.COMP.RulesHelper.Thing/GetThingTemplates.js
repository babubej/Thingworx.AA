var params = {
	infoTableName: "InfoTable",
	dataShapeName: "ELGi.COMP.DisplayValueMap.DS"
};

// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.DisplayValueMap.DS)
var result = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);

var params = {
	maxItems: undefined /* NUMBER */ ,
	nameMask: undefined /* STRING */ ,
	type: 'ThingTemplate' /* STRING */ ,
	tags: 'ELGi.comp.ELGiEcosystem.MTag:BaseTemplate' /* TAGS */
};
// result: INFOTABLE dataShape: RootEntityList
var queryResult = Resources["EntityServices"].GetEntityList(params);

var tableLength = queryResult.rows.length;
for (var x = 0; x < tableLength; x++) {
	var row = queryResult.rows[x];
    var name = row.name;
	var newEntry = new Object();
	if (name.indexOf("EPSAC") !== -1) {
		newEntry.DisplayName = "EPSAC"; // STRING	
	} else if (name.indexOf("OFSAC") !== -1) {
		newEntry.DisplayName = "OFSAC"; // STRING	
	} else if (name.indexOf("AB") !== -1) {
		newEntry.DisplayName = "AB"; // STRING	
	} else {
		newEntry.DisplayName = "ALL"; // STRING	
	}
	newEntry.Value = row.name; // STRING
	result.AddRow(newEntry);
}
