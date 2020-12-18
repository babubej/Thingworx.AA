//TemplateNameToCompare
// result: INFOTABLE dataShape: "EntityReference"
var data =  Projects["ELGi.comp.ELGiEcosystem.Project"].GetEntities();
query = 
    {
        "filters": {
            "type": "EQ",
            "fieldName": "type",  // name of parameter
            "value": "Thing"      // the value parameter
        }
    };
    
        params = {
            t: data /* INFOTABLE */,
            query: query /* QUERY */
        };
    
    // result: INFOTABLE
    var records = Resources["InfoTableFunctions"].Query(params);
var params = {
    infoTableName : "InfoTable",
    dataShapeName : "ELGi.COMP.ShowImplementedThings.DS"
};
//acme.comp.ShowImplementedThings.DS
// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(acme.comp.ShowImplementedThings.DS)
var finaldata = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);


var tableLength = records.rows.length;
for (var x=0; x < tableLength; x++) {
    var row = records.rows[x].name;
    //Your code here
    var temp=Things[row].thingTemplate;
    if(temp===TemplateNameToCompare){
       finaldata.AddRow({Name:row});
 //TemplateNameToComapre
       }
    
    
}
var result=finaldata;
