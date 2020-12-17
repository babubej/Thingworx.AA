var query;
// because we finds this data under the dealer
var params = {
	infoTableName: "InfoTable",
	dataShapeName: "ELGi.comp.ELGiCRM.PLM.ParametersFor_CompressorSettingLogReport.DS"
};

// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.comp.ELGiCRM.PLM.Parameters.DS)
var toShowFaultAlertStatus = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);

if ((dealer_Name !== "" || dealer_Name === undefined || dealer_Name === "" || dealer_Name === null) && 
    (Country_Name === undefined || Country_Name === "") && 
    (Region_Name === "" || Region_Name === undefined) &&
    (Area_Name === "" || Area_Name === undefined || Area_Name === null) ) {
	query = {
		"filters": {
			"type": "EQ,NE",
			"fieldName": "Assigned_To",
			"value": dealer_Name
		}
	};
}

else if ((Country_Name !== undefined || Country_Name !== "") && (Region_Name === "" || Region_Name === undefined)) {
query = {
		"filters": {
			"type": "EQ",
			"fieldName": "Country",
			"value": Country_Name
		}
	};
}

else if ((Country_Name !== "" || Country_Name !== undefined) &&
   (Region_Name !== "" || Region_Name !== undefined) &&
   (Area_Name === "" || Area_Name === undefined || Area_Name === null)) {
	query = {
		"filters": {
			"type": "And",
			"filters": [
				{
					"type": "EQ",
					"fieldName": "Country",
					"value": Country_Name
				},
				{
					"type": "EQ",
					"fieldName": "RM",
					"value": Region_Name
				}
			]
		}
	};
}

else if ((Country_Name !== "" || Country_Name !== undefined || Country_Name !== null) && 
    (Region_Name !== "" || Region_Name !== undefined || Region_Name !== null) &&
    (Area_Name !== "" || Area_Name !== undefined || Area_Name !== null) &&
    (dealer_Name === "" || dealer_Name === undefined || dealer_Name === null) ) 
{
query = {
		"filters": {
			"type": "And",
			"filters": [
				{
					"type": "EQ",
					"fieldName": "Country",
					"value": Country_Name
				},
				{
					"type": "EQ",
					"fieldName": "RM",
					"value": Region_Name
				},
				{
					"type": "EQ",
					"fieldName": "Area",
					"value": Area_Name
				}
			]
		}
	};
}
//Country_Name !== "" || Country_Name === undefined || Country_Name === "" || Country_Name === null &&
//if(dealer_Name !== "" || dealer_Name !== undefined || dealer_Name === undefined || dealer_Name === "" || dealer_Name === null){
//query =
//{
//    "filters": {
//                "type": "EQ",
//                "fieldName": "Assigned_To",
//                "value": dealer_Name
//               }
//}; 
//}
else if ((dealer_Name !== "" || dealer_Name !== undefined || dealer_Name !== null) && (Country_Name !== "" || Country_Name !== undefined || Country_Name !== null) &&
   (Area_Name !== "" || Area_Name !== undefined || Area_Name !== null) && (Region_Name !== "" || Region_Name !== undefined || Region_Name !== null)) 
{
	query = {
		"filters": {
			"type": "And",
			"filters": [
				{
					"type": "EQ",
					"fieldName": "Country",
					"value": Country_Name
				},
				{
					"type": "EQ",
					"fieldName": "RM",
					"value": Region_Name
				},
				{
					"type": "EQ",
					"fieldName": "Area",
					"value": Area_Name
				},
                {
					"type": "EQ",
					"fieldName": "Assigned_To",
					"value": dealer_Name
				}
			]
		}
	};
}
// result: INFOTABLE dataShape: "RootEntityList"
var thingsList = ThingTemplates["ELGi.comp.ELGiMaster.TT"].QueryImplementingThingsWithData({
	maxItems: undefined /* NUMBER */ ,
	nameMask: undefined /* STRING */ ,
	query: query /* QUERY */ ,
	tags: undefined /* TAGS */
});
// result: INFOTABLE dataShape: "RootEntityList"
//var thingsList =  ThingTemplates["ELGi.comp.ELGiMaster.TT"].GetImplementingThingsWithData();
var currentDate = new Date();
//var current = currentDate.getDate();
var d = new Date();
var Day = d.getDay();
var Month = d.getMonth();
var Year = d.getFullYear();
var current = Day + "." + Month + "." + Year ;
// dateValue:DATETIME
//var dateValue = new Date(); 
//dateValue.getDate();
// dateOffset(dateValue:DATETIME):NUMBER
// var offset = dateOffset(dateValue);
  var timeNow = new Date();
  var hours   = timeNow.getHours();
  var minutes = timeNow.getMinutes();
  var seconds = timeNow.getSeconds();
 
//var timeString = hours + ":" + minutes + ":" + seconds ;
  var timeString = "" + ((hours > 12) ? hours - 12 : hours);
  timeString  += ((minutes < 10) ? ":0" : ":") + minutes;
  timeString  += ((seconds < 10) ? ":0" : ":") + seconds;
 // timeString  += (hours >= 12) ? " P.M." : " A.M.";
  timeString  += (hours >= 12) ? " A.M." :  " P.M." || (hours <= 12) ? " P.M." :  " A.M.";
//me.ids = 1;
var setData = new Object();
var tableLength = thingsList.rows.length;
for (var x = 0; x < tableLength; x++) {
	setData.SrNo = me.ids;
	setData.FAB_No = thingsList.rows[x].name;
	setData.Model = thingsList.rows[x].Model;
	setData.Date = current;
	setData.time = timeString;
	setData.Parameter = "";
	setData.Status = "Open";
	setData.Customer = thingsList.rows[x].Customer;
	setData.Contact = thingsList.rows[x].Caller_Name;
	setData.Dealer_name = thingsList.rows[x].Assigned_To;
	setData.Dealer_contact = thingsList.rows[x].Telephone_OfCustomer;
	setData.Area = thingsList.rows[x].Area;
	setData.Country = thingsList.rows[x].Country;
	setData.Severity = "High/Low";

    setData.Pre_filter_Setting = thingsList.rows[x].set_PF_FF;
    setData.Pre_filter_Actual = thingsList.rows[x].remaining_PF_FF;
    setData.Air_filter_Setting = thingsList.rows[x].set_AFCT;
    setData.Air_filter_Actual = thingsList.rows[x].rem_AFCT;
    setData.Oil_filter_Setting = thingsList.rows[x].set_OFCT;
    setData.Oil_filter_Actual = thingsList.rows[x].rem_OFCT;
    setData.Oil_Setting = thingsList.rows[x].set_OCT;
    setData.Oil_Actual = thingsList.rows[x].rem_OCT;
    setData.Valve_kits_Setting = thingsList.rows[x].set_valveKit;
    setData.Valve_kits_Actual = thingsList.rows[x].rem_valveKit; 
    setData.Motor_Re_grease_Setting = thingsList.rows[x].set_MPV;   
    setData.Motor_Re_grease_Actual = thingsList.rows[x].rem_MPV; 
   
    //s.set_CF = data.rows[x].set_CF;
    //s.rem_CF = data.rows[x].rem_CF;
    setData.Motor_bearing_change_Setting = thingsList.rows[x].set_BDV;
    setData.Motor_bearing_change_Actual = thingsList.rows[x].rem_BDV;
    setData.Oil_condition_check_Setting = thingsList.rows[x].set_solenoid;
    setData.Oil_condition_check_Actual = thingsList.rows[x].rem_solenoid;
    setData.Airend_bearing_change_Setting = thingsList.rows[x].set_ADV;
    setData.Airend_bearing_change_Actual = thingsList.rows[x].rem_ADV;
    
	toShowFaultAlertStatus.AddRow(setData);
	//me.ids = me.ids + 1;
}
var result = toShowFaultAlertStatus;
