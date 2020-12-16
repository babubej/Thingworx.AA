var params = {
	infoTableName: "InfoTable",
	dataShapeName: "ELGi.COMP.RegisteredDevices.DS"
};
// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.RegisteredDevices.DS)
var infoTableData = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);



// result: INFOTABLE dataShape: "RootEntityList"
var thingsData = ThingTemplates["ELGi.comp.ELGiMaster.TT"].GetImplementingThingsWithData();
var tableLength = thingsData.rows.length;
for (var x = 0; x < tableLength; x++) {    
	var thingName = thingsData.rows[x].name;
    
    var obj = new Object();
	obj.ThingName = thingName;
	var shapesData = "";
	// result: INFOTABLE dataShape: "EntityList"
	var templateName = Things[thingName].GetThingTemplate();
	//obj.TemplateName = templateName.name;

	// result: INFOTABLE dataShape: "EntityList"
	var implementedShapesList = Things[thingName].GetLocallyImplementedShapes();

	var tableLength2 = implementedShapesList.rows.length;
	for (var y = 0; y < tableLength2; y++) {
		var shapesName = implementedShapesList.rows[y].name;

		var length = tableLength2 - 1;
		if (y === length) {
			shapesData = shapesData + shapesName;
		} else {
			shapesData = shapesData + shapesName + ",";
		}
		obj.Shapes = shapesData;
	}
	// , TemplateName , Shapes , Device_Time , Machine_Variant , Rated_Power , Rated_Pressure , Rated_CFM , Operating_Voltage ,
	// Operating_Frequency , TPL_No
	obj.Device_Time = Things[thingName].device_time;
	obj.Machine_Variant = Things[thingName].Machine_variant;
    obj.TemplateName = Things[thingName].machine_group;
	obj.Rated_Power = Things[thingName].Rated_Power;
	obj.Rated_Pressure = Things[thingName].Rated_pressure;
	obj.Rated_CFM = Things[thingName].Rated_CFM;
	obj.Operating_Voltage = Things[thingName].Operating_Voltage;
	obj.Operating_Frequency = Things[thingName].Operating_Frequency;
	obj.TPL_No = Things[thingName].TPL_No;
    obj.Dis_Pressure = Things[thingName].dis_pressure;
    obj.Dis_Temp = Things[thingName].dis_temperature;
    obj.Customer_Name = Things[thingName].customer_name;

	var confChanges = Things[thingName].GetConfigurationChangeHistory();
	confChanges.Filter({
		changeAction: "CREATE"
	});
	var creationDate = confChanges.rows[0].timestamp;
	obj.Created_On = creationDate;
	infoTableData.AddRow(obj);
}

var sort = new Object();
sort.name = 'Created_On';
sort.ascending = false;
infoTableData.Sort(sort);
var query = {
    "filters":{
        "type": "Between",
        "fieldName": "Created_On",
        "from": From,
        "to": End
    }	
};
// result: INFOTABLE
var result = Resources["InfoTableFunctions"].Query({
	t: infoTableData /* INFOTABLE */,
	query: query /* QUERY */
});
//var result = infoTableData;
