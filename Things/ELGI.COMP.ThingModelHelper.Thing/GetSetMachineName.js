var result = "";

var params = {
	infoTableName: "InfoTable",
	dataShapeName: "ELGI.COMP.MachineNameSetting.DS"
};

// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGI.COMP.MachineNameSetting.DS)
var infotableData = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);
var infoObj = new Object();
// result: INFOTABLE dataShape: "RootEntityList"
var thingsData = ThingTemplates["ELGi.comp.ELGiMaster.TT"].GetImplementingThingsWithData();
var id=1;
var tableLength = thingsData.rows.length;
for (var x = 0; x < tableLength; x++) {
	var thingName = thingsData.rows[x].name;
	var machineName = thingsData.rows[x].machine_name;

	infoObj.id = id;
	infoObj.ThingsName = thingName;
	infoObj.MachineName = machineName;

	infotableData.AddRow(infoObj);
	id++;
}
result = infotableData;
