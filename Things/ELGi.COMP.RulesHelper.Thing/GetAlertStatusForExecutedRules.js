
var query = {
	"filters": {
		"type": "And",
		"filters": [
            {
				"type": "NE",
				"fieldName": "AlertStatus",
				"value": ""
			},
			{
				"type": "Between",
				"fieldName": "ExecutionTimeStamp",
				"from": start,
				"to": end
			}
		]
	}
};
logger.warn("After Query"+start);

// result: INFOTABLE dataShape: ""
var result = Things["ELGi.COMP.ExecutedRules.Stream"].QueryStreamEntriesWithData({
	oldestFirst: undefined /* BOOLEAN */ ,
	maxItems: undefined /* NUMBER */ ,
	sourceTags: undefined /* TAGS */ ,
	endDate: undefined /* DATETIME */ ,
	query: query /* QUERY */ ,
	source: undefined /* STRING */ ,
	startDate: undefined /* DATETIME */ ,
	tags: undefined /* TAGS */
});
