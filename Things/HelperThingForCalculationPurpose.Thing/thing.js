var data =  ThingTemplates["ELGi.comp.EPSAC.Neu4.C.TT_2"].GetImplementingThingsWithData();


var params = {
	fieldName: "isConnected" /* STRING */,
	isCaseSensitive: undefined /* BOOLEAN */,
	t: data /* INFOTABLE */,
	value: "false" /* STRING */
};

// result: INFOTABLE
var Required = Resources["InfoTableFunctions"].EQFilter(params);
var result = Required;

//    var params1 = {
//    infoTableName : "InfoTable",
//    dataShapeName : "PropertyDefinition"
//};
//
//// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ToShowIsConnectedThings)
//var dataInfo = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params1);
////dataInfo.AddRow({name : "name"});
////dataInfo.AddRow({name : "isConnected"}); // isConnecteOrNot
//
//
//var tableLength = Required.rows.length;
//for (var x=0; x < tableLength; x++) {
//    var row = Required.rows[x].name;
//    var row1 = Required.rows[x].isConnected;
//    //Your code here
//    //var temp=Things[row].thingTemplate;
//    
//       dataInfo.AddRow({name:row});
// 	   //dataInfo.AddRow({IsConnectedOrNot:row1});
//     var result = dataInfo;
//}
