
var params = {
    infoTableName : "InfoTable",
    dataShapeName : "PropertyDefinition"
};
// ELGi.comp.ELGiCRM.PLM.Parameters.DS
// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.comp.ELGiCRM.PLM.Parameters.DS)
var infotableShow = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);
try{
if(Country !== "" || Country !== undefined || Country !== null){
var query = 
    {
    filters:{
    "type":"EQ",
    "fieldName" : "Country",
    "value" : Country
    }
    };

// result: INFOTABLE dataShape: "RootEntityList"
var dataOfRegion =  ThingTemplates["ELGi.comp.ELGiMaster.TT"].QueryImplementingThingsWithData({
	maxItems: undefined /* NUMBER */,
	nameMask: undefined /* STRING */,
	query: query /* QUERY */,
	tags: undefined /* TAGS */
});
 
var params = {
	t: dataOfRegion /* INFOTABLE */,
	columns: "RM" /* STRING */
};

// result: INFOTABLE
var result = Resources["InfoTableFunctions"].Distinct(params); 
}
}
catch(err){

}
