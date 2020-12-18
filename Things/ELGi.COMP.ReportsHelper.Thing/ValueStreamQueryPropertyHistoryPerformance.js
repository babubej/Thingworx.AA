// ValueStreamQueryPropertyHistoryPerformance
var ThingsName = "BPHS030579";
var query = {
   "filters":{
      "type": "EQ",
      "fieldName": "rem_ADV",
      "value": "591"
   }
}; 

//// result: INFOTABLE dataShape: ""
//var result =  Things["ELGi.COMP.ThingData.VS"].QueryPropertyHistory({
//	oldestFirst: true /* BOOLEAN */,
//	maxItems: 500 /* NUMBER */,
//	endDate: end /* DATETIME */,
//	query: query /* QUERY */,
//	startDate: start /* DATETIME */
//});


//// result: INFOTABLE dataShape: ""
//var table =  Things["BPHS030579"].QueryPropertyHistory({
//	oldestFirst: false /* BOOLEAN */,
//	maxItems: 500 /* NUMBER */,
//	endDate: end /* DATETIME */,
//	query: query /* QUERY */,
//	startDate: start /* DATETIME */
//});
// result: INFOTABLE dataShape: ""
var data =  Things["BPHS030579"].GetPropertyValues();
// MIN ,MAX ,AVERAGE ,COUNT ,SUM 
var params = {
	t: data /* INFOTABLE */,
	columns: "dis_temperature" /* STRING */,
	aggregates: "MAX" /* STRING */,
	groupByColumns: undefined /* STRING */
};

// result: INFOTABLE
var result = Resources["InfoTableFunctions"].Aggregate(params);
