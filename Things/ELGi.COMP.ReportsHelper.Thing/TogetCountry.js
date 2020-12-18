var params = {
    infoTableName : "InfoTable",
    dataShapeName : "PropertyDefinition"
};
// ELGi.comp.ELGiCRM.PLM.Parameters.DS
// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.comp.ELGiCRM.PLM.Parameters.DS)
var infotableShow = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);
//infotableShow.AddRow({name : "RM"});

var countryData =  ThingTemplates["ELGi.comp.ELGiMaster.TT"].QueryImplementingThingsWithData({
	maxItems: undefined /* NUMBER */,
	nameMask: undefined /* STRING */,
	query:  undefined/* QUERY */,
	tags: undefined /* TAGS */
});
var params = {
	t: countryData /* INFOTABLE */,
	columns: "Country" /* STRING */
};

// result: INFOTABLE
 result = Resources["InfoTableFunctions"].Distinct(params);
