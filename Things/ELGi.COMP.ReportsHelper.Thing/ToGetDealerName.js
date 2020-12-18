try{
//var result;
var params = {
    infoTableName : "InfoTable",
    dataShapeName : "ELGi.comp.ELGiCRM.PLM.ParametersForReportsFilters.DS"
};
// ELGi.comp.ELGiCRM.PLM.Parameters.DS  PropertyDefinition
// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.comp.ELGiCRM.PLM.Parameters.DS)
var infotableShow = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);
//infotableShow.AddRow({name : "Assigned_To"});

if( (Country !== "" || Country !== undefined || Country !== null) && 
   (Region_Name !== "" || Region_Name !== undefined || Region_Name !== null) && 
   (Area_Name !== "" || Area_Name !== undefined || Area_Name !== null))
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
				},
				{
					"type": "EQ",
					"fieldName": "Area",
					"value": Area_Name
				}
			]
		}
	};
   }
       // result: INFOTABLE dataShape: "RootEntityList"
var dataOfDealer =  ThingTemplates["ELGi.comp.ELGiMaster.TT"].QueryImplementingThingsWithData({
	maxItems: undefined /* NUMBER */,
	nameMask: undefined /* STRING */,
	query: query /* QUERY */,
	tags: undefined /* TAGS */
});
 
var params = {
	t: dataOfDealer /* INFOTABLE */,
	columns: "Assigned_To" /* STRING */
};
// result: INFOTABLE
var result = Resources["InfoTableFunctions"].Distinct(params);      
}
catch(err){
}
