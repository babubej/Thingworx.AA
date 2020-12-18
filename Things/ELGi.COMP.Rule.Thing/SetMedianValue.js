var propertyNameCopy = propertyName;
var propertyName = me[propertyNameCopy];
var FilterPropertyNamesCopy = FilterPropertyNames;
var FilterPropertyNames = me[FilterPropertyNamesCopy];
//var filterValuescopy = filterValues;
//var filterValues = me[filterValuescopy];
var ListOfThings = me.GetThingsList({
	TemplateNameToCompare: templateName /* STRING */
});
var ThingName = "";
var tableLength = ListOfThings.rows.length;
for (var x=0; x < tableLength; x++) {
    ThingName = ListOfThings.rows[x].Name;
    var propertyOf = propertyName;

// result: INFOTABLE dataShape: "PropertyDefinition"
try{
var abc =  Things[ThingName].GetPropertyDefinitions({
	category: undefined /* STRING */,
	type: undefined /* BASETYPENAME */,
	dataShape: undefined /* DATASHAPENAME */
});   
    var query = {
	"filters": 
        [{
				"type": "EQ",
				"fieldName": "name",
				"value": propertyName
			}
		]
};
var params = {
	t: abc /* INFOTABLE */,
	query: query /* QUERY */
};
var propertyList = Resources["InfoTableFunctions"].Query(params);
    if(propertyList.rows[0].name !== "" && propertyList.rows[0].name !== undefined && propertyList.rows[0].name !== null){
    //Things ["ELGi.COMP.Rule.Thing"]
     logger.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@1"+ThingName);
    Things["ELGi.COMP.Rule.Thing"].MedianCalculationsS({
	propertyName: propertyName /* STRING */,
	FilterPropertyNames: FilterPropertyNames /* STRING */,
	filterValues: "fill" /* STRING */,
	thingNames: ThingName /* STRING */
});
    }
}catch(err){

}
 
        //var a = ThingName+"_"+propertyName;
       // var result = "Successful";
            //ThingShapes ["ELGi.COMP.RuleType.MedianCalc.Shape"] 

    //me.mediaProp = me.medPropertyResult;
   
//    var property = me[propertyName];
//    var MedianProperty_Name = "Median"+"_"+property;
//    var theMedian = Things[ThingName].MedianProperty_Name;
//    if(MedianProperty_Name === Things[ThingName].MedianProperty_Name &&  medianOfProperty !== undefined && medianOfProperty !== ""){
//    Things[ThingName].MedianProperty_Name = medianOfProperty;
//    }
        //var result = ThingName;
}

var result = "Successful";
