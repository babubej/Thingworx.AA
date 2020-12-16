//var currentDate1 = new Date();
//    var scheduleDate = currentDate1.setDate(currentDate1.getDate() - 95);
////var result = scheduleDate;
//var date1 = new Date(scheduleDate);
//    var a = date1;
//    var numberOfDaysToAdd1 = 7;
//    var setlast_scheduled_service_date = a.setDate(a.getDate() + 7);
//var date = new Date(setlast_scheduled_service_date);
//	var result = date;
//

var currentdate = new Date();
//var getHours = currentdate.getHours();
//var d = new Date(currentdate - 95);

var someDate = new Date();
var numberOfDaysToAdd = 90;
var last_service_date = someDate.setDate(someDate.getDate() - numberOfDaysToAdd);
//var last_service_date = new Date(last_service_date1);
//var last_scheduled_service_date =  
//var last_service_date1 = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
var data = ThingTemplates["ELGi.comp.ELGiMaster.TT"].GetImplementingThingsWithData();
//var result = data;
//var thingsList = data.name;
//var query = {
//	"filters": {
//		"type": "Between",
//		"fieldName": "previous_and_nextService",
//		"from": last_service_date,
//		"to": currentdate
//	}
//};
//// result: INFOTABLE
//var queryResult = Resources["InfoTableFunctions"].Query({
//	t: data /* INFOTABLE */ ,
//	query: query /* QUERY */
//});
////var result = queryResult;
//
//var Event_Rem_Hour;
//var count = 0;
//var thingsList = queryResult;
////var result = thingsList;
//var tableLength = thingsList.rows.length;
//for (var x = 0; x < tableLength; x++) {
//	var thingName = thingsList.rows[x].name;
//    count++;
//    var a = new Date();
//	//var result = previosDate; last_service_date
//  	var numberOfDaysToAdd1 = 85;
//    var setlast_scheduled_service_date1 = a.setDate(a.getDate() - numberOfDaysToAdd);
//    
////thingsList.rows[x].previous_and_nextService = setlast_scheduled_service_date1;
////Things[thingName].previous_and_nextService = setlast_scheduled_service_date1;
//    //var result = thingsList.rows[x].previous_and_nextService;
//}
//var result = count;
//









//    thingsList.rows[x].last_scheduled_service_date = setlast_scheduled_service_date;

// dateValue:DATETIME
//var dateValue = new Date();

// dateAddMilliseconds(dateValue:DATETIME, amount:NUMBER):STRING



//    previosDate = thingsList.rows[x].previous_and_nextService;
//    var a = new Date(previosDate);
//    //var result = previosDate;
//    var numberOfDaysToAdd1 = 7;
//    var setlast_scheduled_service_date1 = a.setDate(a.getDate() + numberOfDaysToAdd);
//	var setlast_scheduled_service_date = new Date(setlast_scheduled_service_date1);
//    thingsList.rows[x].last_scheduled_service_date = setlast_scheduled_service_date;
//        var result = thingsList.rows[x].last_scheduled_service_date;
//















var tableLength = data.rows.length;
for (var x = 0; x < tableLength; x++) {
	var thingName = data.rows[x].name;
    
    var a = new Date();
	//var result = previosDate; last_service_date
  	var numberOfDaysToAdd1 = 82;
    var setlast_scheduled_service_date1 = a.setDate(a.getDate() - numberOfDaysToAdd1);
  
    Things[thingName].last_scheduled_service_date = setlast_scheduled_service_date1;
	//Things[thingName].previous_and_nextService = setlast_scheduled_service_date1;
    
//Things[thingName].last_scheduled_service_date = setlast_scheduled_service_date1;
    //Things[thingName].
      Things[thingName].on_Time_Service = true;
      Things[thingName].OverdueLessThan200Hours_OnTime = true;
      Things[thingName].OverdueGreaterThan200Hours_OnTime  = true;
    //var result = Things[thingName].on_Time_Service;
    //var result = thingsList.rows[x].previous_and_nextService;
    
    //var result = Things[thingName].previous_and_nextService;
    //var result = Things[thingName].last_scheduled_service_date;
}
var result = Things[thingName].last_scheduled_service_date;
//var result = Things[thingName].previous_and_nextService;
