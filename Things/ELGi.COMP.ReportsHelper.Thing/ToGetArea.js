var params = {
    infoTableName : "InfoTable",
    dataShapeName : "PropertyDefinition"
};
// ELGi.comp.ELGiCRM.PLM.Parameters.DS
// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.comp.ELGiCRM.PLM.Parameters.DS)
var infotableShow = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);
//infotableShow.AddRow({name : "Area"});

try{
if( (Country !== "" || Country !== undefined || Country !== null) && (Region_Name !== "" || Region_Name !== undefined || Region_Name !== null))
{
var query = {
		"filters": {
			"type": "And",
			"filters": [
				{
					"type": "EQ",
					"fieldName": "Country",
					"value": Country
				},
				{
					"type": "EQ",
					"fieldName": "RM",
					"value": Region_Name
				}
			]
		}
	};
}
//// result: INFOTABLE dataShape: "RootEntityList"
//var result =  ThingTemplates["ELGi.comp.ELGiMaster.TT"].QueryImplementingThingsWithNamedData({
//	maxItems: undefined /* NUMBER */,
//	basicPropertyNames: undefined /* INFOTABLE */,
//	nameMask: undefined /* STRING */,
//	propertyNames: infotableShow /* INFOTABLE */,
//	query: query /* QUERY */,
//	tags: undefined /* TAGS */
//});
//

// result: INFOTABLE dataShape: "RootEntityList"
var dataOfArea =  ThingTemplates["ELGi.comp.ELGiMaster.TT"].QueryImplementingThingsWithData({
	maxItems: undefined /* NUMBER */,
	nameMask: undefined /* STRING */,
	query: query /* QUERY */,
	tags: undefined /* TAGS */
});
 
var params = {
	t: dataOfArea /* INFOTABLE */,
	columns: "Area" /* STRING */
};

// result: INFOTABLE
var result = Resources["InfoTableFunctions"].Distinct(params);

   
}
catch(err){
logger.warn("Not Found Required Input For To Area");
}
