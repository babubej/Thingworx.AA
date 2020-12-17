 Start = new Date();
 Start.setDate(Start.getDate() - 1);
 Start.setHours(0, 0, 0, 0);
 end = new Date();
 end.setDate(end.getDate() - 1);
 end.setHours(23, 59, 59, 0);

 var dataTemp = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape({
 	infoTableName: "InfoTable",
 	dataShapeName: "EntityList"
 });

var INPUT_Properties = 'dis_pressure';

 dataTemp.AddRow({
 	name: INPUT_Properties
 });

 var qresult = Things["BADS030510"].QueryNamedPropertyHistory({
 	propertyNames: dataTemp /* INFOTABLE */ ,
 	maxItems: 20000 /* NUMBER */ ,
 	startDate: Start /* DATETIME */ ,
 	endDate: end /* DATETIME */ ,
 	oldestFirst: undefined /* BOOLEAN */ ,
 	query: undefined /* QUERY */
 });
 //logger.debug("Total History : " + qresult.length + " Thing Name :" + row.name);
 // result: INFOTABLE
 var result = Resources["InfoTableFunctions"].Aggregate({
 	t: qresult /* INFOTABLE */ ,
 	columns: INPUT_Properties /* STRING */ ,
 	aggregates: 'MAX' /* STRING */ ,
 	groupByColumns: undefined /* STRING */
 });

//var result = max

// var qresult = Things["BADS030510"].QueryNumberPropertyHistory({
// 	oldestFirst: undefined /* BOOLEAN */ ,
// 	maxItems: 20000 /* NUMBER */ ,
// 	propertyName: "dis_pressure" /* STRING */ ,
// 	endDate: end /* DATETIME */ ,
// 	query: undefined /* QUERY */ ,
// 	startDate: Start /* DATETIME */
// });
//
// // result: INFOTABLE
// var result = Resources["InfoTableFunctions"].Aggregate({
// 	t: qresult /* INFOTABLE */ ,
// 	columns: 'value' /* STRING */ ,
// 	aggregates: 'MAX' /* STRING */ ,
// 	groupByColumns: undefined /* STRING */
// });
