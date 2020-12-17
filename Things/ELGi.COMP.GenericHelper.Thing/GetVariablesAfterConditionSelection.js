// result: INFOTABLE dataShape: ""
var data =  Things["ELGi.COMP.MasterRuleStructure.DT"].GetDataTableEntryByKey({
	key: key /* STRING */
});
// variable  Property
var dataresult = data.Variables;

var tableLength = dataresult.rows.length;
for (var x=0; x < tableLength; x++) {
     //dataresult.rows[x].Property = property;
    if(dataresult.rows[x].variable===Variable){
    dataresult.rows[x].Property = property;
        //Variables
    
    }
}

var result = dataresult;

//var params = {
//    infoTableName : "InfoTable",
//    dataShapeName : "ELGi.COMP.MasterForVariableAndProperty.DS"
//};

// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.CalculationsServiceDataShape.DS)
//var it = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);
//var row = new Object();
//if(row.variable === Variable)
////row.ID = "1";
//row.Property = property;
//it.AddRow(row);
////var id = 
//Things["ELGi.COMP.MasterRuleStructure.DT"].AddOrUpdateDataTableEntry({
//	sourceType: undefined /* STRING */,
//	values: it /* INFOTABLE */,
//	location: undefined /* LOCATION */,
//	source: undefined /* STRING */,
//	tags: undefined /* TAGS */
//});

//var result = data.Variables;
