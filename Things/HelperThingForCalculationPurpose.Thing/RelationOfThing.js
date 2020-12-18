var data =  ThingTemplates["ELGi.comp.EPSAC.Neu4.C.TT_2"].GetImplementingThingsWithData();
//var result = data;
var tableLength = data.rows.length;
for (var x=0; x < tableLength; x++) {     
    var nameOfThing = data.rows[x].name;
    var isConnected1 = data.rows[x].isConnected;
    //var result = isConnected1;
    
    var params = {
    infoTableName : "InfoTable",
    dataShapeName : "PropertyDefinition"
};

// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ToShowIsConnectedThings)
var dataInfo = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);
dataInfo.AddRow({name : "name"});
dataInfo.AddRow({name : "isConnected"}); // isConnecteOrNot
    
      var query2 = {
        	"filters": {
        		"type": "And",
        		"filters": [{
        				"type": "EQ",
        				"fieldName": "name",
        				"value": nameOfThing //FAB444_2
        			},
                            {
        				"type": "EQ",
        				"fieldName": "isConnected",
        				"value": isConnected1
        			}

        		]
        	}
        };
    
    
    
    // result: INFOTABLE dataShape: "RootEntityList"
var dataTemp =  ThingTemplates["ELGi.comp.EPSAC.Neu4.C.TT_2"].QueryImplementingThingsWithData({
	maxItems: 500 /* NUMBER */,
	nameMask: undefined /* STRING */,
	query: query2 /* QUERY */,
	tags: undefined /* TAGS */
});
var IsConnectedThing = dataTemp.name;
    var result = dataTemp;
    //var result = IsConnectedThing;
//    var result = Things[IsConnectedThing].QueryNamedPropertyHistory({
//	propertyNames: dataInfo /* INFOTABLE */,
//	maxItems: undefined /* NUMBER */,
//	startDate: undefined /* DATETIME */,
//	endDate: undefined /* DATETIME */,
//	oldestFirst: undefined /* BOOLEAN */,
//	query: undefined /* QUERY */
//});
//}
//

}
