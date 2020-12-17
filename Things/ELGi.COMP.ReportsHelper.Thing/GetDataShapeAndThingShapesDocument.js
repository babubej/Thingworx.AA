// result: INFOTABLE dataShape: "EntityReference"
var data =  Projects["ELGi.comp.ELGiEcosystem.Project"].GetEntities();
var query = 
    {
        "filters": {
            "type": "EQ",
            "fieldName": "type",
            "value": "DataShape"
        }
    };

var query1 = 
    {
        "filters": {
            "type": "EQ",
            "fieldName": "type",
            "value": "ThingShape"
        }
    };

        params = {
            t: data /* INFOTABLE */,
            query: query /* QUERY */
        };
    
    // result: INFOTABLE
    var records = Resources["InfoTableFunctions"].Query(params);

        params1 = {
            t: data /* INFOTABLE */,
            query: query1 /* QUERY */
        };
    
    // result: INFOTABLE
    var records1 = Resources["InfoTableFunctions"].Query(params1);

var params = {
    infoTableName : "InfoTable",
    dataShapeName : "EntityReference"
};

// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(EntityReference)
var finaldata = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);

var arr = [];
var name, type;
var tableLength = records.rows.length;
for (var x=0; x < tableLength; x++) {
    var row = records.rows[x];
    name = records.rows[x].name;
    type = records.rows[x].type;
    arr.push({
    name : name,
    type : type
    });
}
var tableLength1 = records1.rows.length;
for (var x1=0; x1 < tableLength1; x1++) {
    //var row = records1.rows[x1];
    name = records1.rows[x1].name;
    type = records1.rows[x1].type;
    arr.push({
    name : name,
    type : type
    });
}
var arrData = new Object();
var tableLength2 = arr.length;
for (var x2=0; x2 < tableLength2; x2++) {
    name = arr[x2].name;
    type = arr[x2].type;
    arrData.name = name;
	arrData.type = type;
	finaldata.AddRow(arrData);
}
var result = finaldata;
