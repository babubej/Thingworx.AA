//var last_service_date;
//var last_scheduled_service_date;
//var rem_hour_last_service;
var currentdate = new Date();
//var getHours = currentdate.getHours();
//var d = new Date(currentdate - 95);

var someDate = new Date();
var numberOfDaysToAdd = 90;
var last_service_date = someDate.setDate(someDate.getDate() - numberOfDaysToAdd);

//var last_scheduled_service_date =  
//var last_service_date1 = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
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
	count++;
	var rem_AFCT1, rem_OFCT1, rem_OSCT1, rem_OCT1, rem_RGT1, rem_PFCT1, rem_MPV1, rem_BDV1, rem_solenoid1, rem_ADV1, rem_oilSampleTest1, rem_SPM1, remaining_PF_FF1, rem_CF1;
	if ((thingsList.rows[x].rem_AFCT) >= 0) {
		rem_AFCT1 = thingsList.rows[x].rem_AFCT;
	}
	if ((thingsList.rows[x].rem_OFCT) >= 0) {
		rem_OFCT1 = thingsList.rows[x].rem_OFCT;
	}
	if ((thingsList.rows[x].rem_OSCT) >= 0) {
		rem_OSCT1 = thingsList.rows[x].rem_OSCT;
	}
	if ((thingsList.rows[x].rem_OCT) >= 0) {
		rem_OCT1 = thingsList.rows[x].rem_OCT;
	}
	if ((thingsList.rows[x].rem_RGT) >= 0) {
		rem_RGT1 = thingsList.rows[x].rem_RGT;
	}
	if ((thingsList.rows[x].rem_PFCT) >= 0) {
		rem_AFCT1 = thingsList.rows[x].rem_AFCT;
	}
	if ((thingsList.rows[x].rem_MPV) >= 0) {
		rem_PFCT1 = thingsList.rows[x].rem_PFCT;
	}
	if ((thingsList.rows[x].rem_BDV) >= 0) {
		rem_BDV1 = thingsList.rows[x].rem_BDV;
	}
	if ((thingsList.rows[x].rem_solenoid) >= 0) {
		rem_solenoid1 = thingsList.rows[x].rem_solenoid;
	}
	if ((thingsList.rows[x].rem_ADV) >= 0) {
		rem_ADV1 = thingsList.rows[x].rem_ADV;
	}
	if ((thingsList.rows[x].rem_oilSampleTest) >= 0) {
		rem_oilSampleTest1 = thingsList.rows[x].rem_oilSampleTest;
	}
	if ((thingsList.rows[x].rem_SPM) >= 0) {
		rem_SPM1 = thingsList.rows[x].rem_SPM;
	}
	if ((thingsList.rows[x].remaining_PF_FF) >= 0) {
		remaining_PF_FF1 = thingsList.rows[x].remaining_PF_FF;
	}
	if ((thingsList.rows[x].rem_CF) >= 0) {
		rem_CF1 = thingsList.rows[x].rem_CF;
	}

	var ArrOfEvent_Rem_Hour = [rem_AFCT1, rem_OFCT1, rem_OSCT1, rem_OCT1, rem_RGT1, rem_PFCT1, rem_MPV1, rem_BDV1, rem_solenoid1, rem_ADV1, rem_oilSampleTest1, rem_SPM1, remaining_PF_FF1, rem_CF1];

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

}

var Total_Event = count;
//var result = Total_Event;
var query3 = {
	"filters": {
		"type": "AND",
		"filters": [{
				"type": "OR",
				"filters": [{
					"type": "GE",
					"fieldName": "rem_hour_last_service",
					"value": "0"
				}]
			},
			{
				"type": "GT",
				"fieldName": "previous_and_nextService",
				"value": last_service_date,
			}
		]
	}
};
// "last_scheduled_service_date"
var data1 = ThingTemplates["ELGi.comp.ELGiMaster.TT"].GetImplementingThingsWithData();
// result: INFOTABLE
var queryResult1 = Resources["InfoTableFunctions"].Query({
	t: thingsList /* INFOTABLE */ ,
	query: query3 /* QUERY */
});
var count2 = 0;

var tableLength3 = queryResult1.rows.length;
for (var k = 0; k < tableLength3; k++) {
	var things = queryResult1.rows[k].name;
	count2++;
	  Things[things].on_Time_Service = true;
      //Things[things].OverdueLessThan200Hours_OnTime = false;
	  //Things[things].OverdueGreaterThan200Hours_OnTime  = false;
    //var result = Things[things].on_Time_Service;
	var currentDate1 = new Date();
	var scheduleDate = currentDate1.setDate(currentDate1.getDate() + 7);

	//Things[things].last_scheduled_service_date = scheduleDate;
	//Things[things].previous_and_nextService = currentdate;

}
