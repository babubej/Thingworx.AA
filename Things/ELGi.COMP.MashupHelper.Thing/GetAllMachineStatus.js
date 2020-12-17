try {
	var params = {
		infoTableName: "InfoTable",
		dataShapeName: "ELGi.COMP.ListMap.DS"
	};

	// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.ListMap.DS)
	var result = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);

	// result: INFOTABLE dataShape: ""
    var data =  Things["ELGi.COMP.StatusBits.DT"].GetDataTableEntries({
        maxItems: 50 /* NUMBER */
    });
    
    var newEntry = new Object();
    newEntry.key = -1;
    newEntry.value = 'All'; // STRING    
    result.AddRow(newEntry);
    
    var tableLength = data.rows.length;
    for (var x=0; x < tableLength; x++) {
        var row = data.rows[x];
        var intValue = row.General_Status_Value;
        var general_status = row.General_Status;
        if( general_status !== undefined && general_status !== 'undefined' && general_status.trim() !== '' ){
        	newEntry = new Object();
            newEntry.key = intValue;
            newEntry.value = general_status; // STRING    
            result.AddRow(newEntry);
        }        
    }	
    newEntry = new Object();
    newEntry.key = -2;
    newEntry.value = 'Tripped'; // STRING    
    result.AddRow(newEntry);    
	
} catch (err) {
	logger.error("Error occured in ELGi.COMP.MashupHelper.Thing : GetAllMachineStatus. Error : " + err);
}
