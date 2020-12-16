//if (MappedVariables !== undefined && MappedVariables !== null && MappedVariables.rows.length > 0) {
//	var tableLength = MappedVariables.rows.length;
//	for (var x = 0; x < tableLength; x++) {
//		var row = MappedVariables.rows[x];

//me.EditableValue = UpdateTable;
if(UpdateTable !== undefined && UpdateTable !== null && UpdateTable.length > 0 ){

var tableLength = UpdateTable.rows.length;
for (var x = 0; x < tableLength; x++) {
	// var row = yourInfotableHere.rows[x];
	var thingName = UpdateTable.rows[x].ThingsName;
	var machineName = UpdateTable.rows[x].MachineName;
	Things[thingName].machine_name = machineName;
}
}
var result = UpdateTable;
