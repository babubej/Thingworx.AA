// OverdueLestThan200Hours
// OverdueLestThan200Hours_OnTime

//var last_service_date;
//var last_scheduled_service_date;
//var rem_hour_last_service;
// ELGi.COMP.ThingDetailsWithData.DS
//var thingsList =  ThingTemplates["ELGi.comp.ELGiMaster.TT"].GetImplementingThingsWithData();
// result: INFOTABLE dataShape: "RootEntityList"
var currentdate = new Date();
//var getHours = currentdate.getHours();
//var d = new Date(currentdate - 95);

var someDate = new Date();
var numberOfDaysToAdd = 90;
var last_service_date = someDate.setDate(someDate.getDate() - numberOfDaysToAdd);
var someDate1 = new Date();
var numberOfDaysToAdd1 = 81;
var last_scheduled_service_date_And_EightDays = someDate1.setDate(someDate1.getDate() - numberOfDaysToAdd1);

var data = ThingTemplates["ELGi.comp.ELGiMaster.TT"].GetImplementingThingsWithData();
//var thingsList = data.name;
var query = {
	"filters": {
		"type": "Between",
		"fieldName": "previous_and_nextService",
		"from": last_service_date,
		"to": currentdate
	}
};
// result: INFOTABLE
var queryResult = Resources["InfoTableFunctions"].Query({
	t: data /* INFOTABLE */ ,
	query: query /* QUERY */
});
//var result = queryResult;

var Event_Rem_Hour;
var count = 0;
var thingsList = queryResult;
var tableLength = thingsList.rows.length;
for (var x = 0; x < tableLength; x++) {
	var thingName = thingsList.rows[x].name;
    var lastscheduled1 = Things[thingName].last_scheduled_service_date;
    var previous_and_nextService1 = Things[thingName].previous_and_nextService;
    //var da = new Date();
    //da = lastscheduled1;
    //var lastscheduled = da;
    //var numberOfDaysToAdd1 = 8;
    //var last_scheduled_service_date_And_EightDays = 33467567867897;
//var last_scheduled_service_date_And_EightDays  = lastscheduled.setDate(lastscheduled.getDate() + numberOfDaysToAdd1);
    
	count++;
	var rem_AFCT1, rem_OFCT1, rem_OSCT1, rem_OCT1, rem_RGT1, rem_PFCT1, rem_MPV1, rem_BDV1, rem_solenoid1, rem_ADV1, rem_oilSampleTest1, rem_SPM1, remaining_PF_FF1, rem_CF1;
	if ((thingsList.rows[x].rem_AFCT) > 0 && (thingsList.rows[x].rem_AFCT) < -200) {
		rem_AFCT1 = thingsList.rows[x].rem_AFCT;
	}
	if ((thingsList.rows[x].rem_OFCT) > 0 && (thingsList.rows[x].rem_OFCT) < -200) {
		rem_OFCT1 = thingsList.rows[x].rem_OFCT;
	}
	if ((thingsList.rows[x].rem_OSCT) > 0 && (thingsList.rows[x].rem_OSCT) < -200) {
		rem_OSCT1 = thingsList.rows[x].rem_OSCT;
	}
	if ((thingsList.rows[x].rem_OCT) > 0 && (thingsList.rows[x].rem_OSCT) < -200) {
		rem_OCT1 = thingsList.rows[x].rem_OCT;
	}
	if ((thingsList.rows[x].rem_RGT) > 0 && (thingsList.rows[x].rem_RGT) < -200) {
		rem_RGT1 = thingsList.rows[x].rem_RGT;
	}
	if ((thingsList.rows[x].rem_PFCT) > 0 && (thingsList.rows[x].rem_PFCT) < -200) {
		rem_AFCT1 = thingsList.rows[x].rem_AFCT;
	}
	if ((thingsList.rows[x].rem_MPV) > 0 && (thingsList.rows[x].rem_MPV) < -200) {
		rem_PFCT1 = thingsList.rows[x].rem_PFCT;
	}
	if ((thingsList.rows[x].rem_BDV) > 0 && (thingsList.rows[x].rem_BDV) < -200) {
		rem_BDV1 = thingsList.rows[x].rem_BDV;
	}
	if ((thingsList.rows[x].rem_solenoid) > 0 && (thingsList.rows[x].rem_solenoid) < -200) {
		rem_solenoid1 = thingsList.rows[x].rem_solenoid;
	}
	if ((thingsList.rows[x].rem_ADV) > 0 && (thingsList.rows[x].rem_ADV) < -200) {
		rem_ADV1 = thingsList.rows[x].rem_ADV;
	}
	if ((thingsList.rows[x].rem_oilSampleTest) > 0 && (thingsList.rows[x].rem_oilSampleTest) < -200) {
		rem_oilSampleTest1 = thingsList.rows[x].rem_oilSampleTest;
	}
	if ((thingsList.rows[x].rem_SPM) > 0 && (thingsList.rows[x].rem_SPM) < -200) {
		rem_SPM1 = thingsList.rows[x].rem_SPM;
	}
	if ((thingsList.rows[x].remaining_PF_FF) >= 0 && (thingsList.rows[x].remaining_PF_FF) < -200) {
		remaining_PF_FF1 = thingsList.rows[x].remaining_PF_FF;
	}
	if ((thingsList.rows[x].rem_CF) > 0 && (thingsList.rows[x].rem_CF) < -200) {
		rem_CF1 = thingsList.rows[x].rem_CF;
	}
	//var result = rem_CF1;
	var ArrOfEvent_Rem_Hour = [rem_AFCT1, rem_OFCT1, rem_OSCT1, rem_OCT1, rem_RGT1, rem_PFCT1, rem_MPV1, rem_BDV1, rem_solenoid1, rem_ADV1, rem_oilSampleTest1, rem_SPM1, remaining_PF_FF1, rem_CF1];
	//var result = ArrOfEvent_Rem_Hour;
	//var countofarr = ArrOfEvent_Rem_Hour.length;
	for (var y = 0; y < 14; y++) {
		var row = ArrOfEvent_Rem_Hour[y];

		for (var z = 1; z < 14; z++) {
			var row1 = ArrOfEvent_Rem_Hour[z];

			if (ArrOfEvent_Rem_Hour[y] < ArrOfEvent_Rem_Hour[z]) {
				Event_Rem_Hour = ArrOfEvent_Rem_Hour[y];
				thingsList.rows[x].rem_hour_last_service = Event_Rem_Hour;

			}
		}

	}
var Total_Event = count;
    
//var data = ThingTemplates["ELGi.comp.ELGiMaster.TT"].GetImplementingThingsWithData();
var query1 = {
	"filters": {
		"type": "AND",
		"filters": [
            {
				"type": "OR",
			"filters": [
                {
					"type": "Between",
					"fieldName": "rem_hour_last_service",
					"from": "0",
					"to": "-200"
				}
            ]
			},
			{
					"type": "Between",
					"fieldName": "previous_and_nextService",
					"from": last_service_date,
					"to": currentdate
			},
			{
				"type": "Between",
				"fieldName": "previous_and_nextService",
				"from": lastscheduled1,
				"to":  last_scheduled_service_date_And_EightDays
			}
		]
	}
};
// result: INFOTABLE
var queryResult1 = Resources["InfoTableFunctions"].Query({
	t: queryResult /* INFOTABLE */ ,
	query: query1 /* QUERY */
});
var count2 = 0;
var tableLength3 = queryResult1.rows.length;
for (var k = 0; k < tableLength3; k++) {
	var things = queryResult1.rows[k].name;
	count2 ++;

	//var currentDate1 = new Date();
	//var scheduleDate = currentDate1.setDate(currentDate1.getDate() + 8);

	//Things[things].on_Time_Service = false;
	Things[things].OverdueLessThan200Hours_OnTime = true;
	//Things[things].OverdueGreaterThan200Hours_OnTime = false;

	// var scheduleDate2 = currentDate1.setDate(currentDate1.getDate() - 95);
	//Things[things].last_scheduled_service_date = scheduleDate;
	//Things[things].previous_and_nextService = currentdate;

}
//var Overdue_lt200_event = count2;
//var result = (Overdue_lt200_event/Total_Event)*100;
var result = count2;
}
//var result = lastscheduled1;
// previous_and_nextService1 = 2020-05-31 12:33:40.728;
// last_scheduled_service_date_And_EightDays = 2020-06-01 12:53:22.522;
// lastscheduled1 = 2020-05-28 12:32:09.935;
