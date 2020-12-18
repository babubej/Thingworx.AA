var propertyNameCopy = propertyName;
var propertyName = me[propertyNameCopy];
var FilterPropertyNamesCopy = FilterPropertyNames;
var FilterPropertyNames = me[FilterPropertyNamesCopy];

var ListOfThings = me.GetThingsList({
	TemplateNameToCompare: templateName /* STRING */
});
var ThingNames = "";
var tableLength = ListOfThings.rows.length;
for (var x=0; x < tableLength; x++) {
    ThingNames = ListOfThings.rows[x].Name;
    //var property = Things[ThingName].propertyName;

    //Things[ThingName].propertyOf === propertyName;
var query = {
	"filters": 
        [{
				"type": "EQ",
				"fieldName": "name",
				"value": propertyNameCopy
			}
		]
};

var params = {
	t: ListOfThings /* INFOTABLE */,
	query: query /* QUERY */
};
// result: INFOTABLE
var thingList = Resources["InfoTableFunctions"].Query(params);
    var tableLength = ListOfThings.rows.length;
for (var x=0; x < tableLength; x++) {
    ThingName = ListOfThings.rows[x].Name;
 
    me.MedianCalculations({
	propertyName: propertyName /* STRING */,
	FilterPropertyNames: FilterPropertyNames /* STRING */,
	filterValues: "drain" /* STRING */,
	thingNames: ThingName /* STRING */
});  
}
}
