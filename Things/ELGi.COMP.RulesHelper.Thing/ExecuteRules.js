var query = {
	"filters" : {
    	"type": "EQ",
      	"fieldName": "Frequency",
      	"value": "24Hours"
    }
};
// result: INFOTABLE dataShape: ""
var result =  Things["ELGi.COMP.MasterRulesDefinition.DT"].QueryDataTableEntries({
	maxItems: undefined /* NUMBER */,
	values: undefined /* INFOTABLE */,
	query: query /* QUERY */,
	source: undefined /* STRING */,
	tags: undefined /* TAGS */
});
