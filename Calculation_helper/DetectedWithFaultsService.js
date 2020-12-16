//ELGi.COMP.ExecutedRules.Stream
var thingsList =  ThingTemplates["ELGi.comp.ELGiMaster.TT"].GetImplementingThingsWithData();
var query =
{
    "filters": {
                "type": "GT",
                "fieldName": "fault_status",
                "value": "0"
            }
}; 
// result: INFOTABLE
var queryResult = Resources["InfoTableFunctions"].Query({
	t: thingsList /* INFOTABLE */,
	query: query /* QUERY */
});
var count = 0;
var tableLength = queryResult.rows.length;
for (var x=0; x < tableLength; x++) {
    var row = queryResult.rows[x].FabNumber;
    count = count + 1;
}
var result = count;
