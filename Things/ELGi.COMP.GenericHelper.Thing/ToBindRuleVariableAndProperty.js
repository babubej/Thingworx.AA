// ELGi.COMP.MasterForVariableAndProperty.DS
//var params = {
//    infoTableName : "InfoTable",
//    dataShapeName : "ELGi.COMP.MasterForVariableAndProperty.DS"
//};
//
//// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.MasterForVariableAndProperty.DS)
//var data1 = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);
//
//

// result: INFOTABLE
var data = Resources["CurrentSessionInfo"].GetGlobalSessionValues();
data.AddRow({Property : "Property"});
data.AddRow({variable : "variable"});

var dataOfSession = data.RuleVariable3;

var tableLength = dataOfSession.rows.length;
for (var x=0; x < tableLength; x++) {
    //var a = dataOfSession.SelectedRow[x].variable;
    if(dataOfSession.rows[x].variable === Variable){
   dataOfSession.rows[x].Property = property;
    }
}
var result = dataOfSession;

//var a = RuleVariable1.Property = "rahul";
//var params = {
//
//name: "RuleVariable1" /* STRING */,
//
//value: "Rahul" /* STRING */
//
//};
//
//// no return
//
//Resources["CurrentSessionInfo"].SetGlobalSessionStringValue(params);
