me.dis_pressure = Math.floor(Math.random()*88);
me.dis_temperature = Math.floor(Math.random()*10);
me.dew_point_temperature = Math.floor(Math.random()*10);
me.sump_pressure = Math.floor(Math.random()*10);
me.vfd_speed_percentage = Math.floor(Math.random()*10);
me.motor_winding_temperature = Math.floor(Math.random()*10);
me.ambient_temperature = Math.floor(Math.random()*10);
me.power = Math.floor(Math.random()*10);
me.diff_pressure = Math.floor(Math.random()*10);
me.general_status = Math.floor(Math.random()*10);
me.warn_status = Math.floor(Math.random()*10);
me.fault_status = Math.floor(Math.random()*10);
//SSIP_low SSIT_high FSOP_high SSOT_high
me.SSIP_low = Math.floor(Math.random()*10);
me.SSIT_high = Math.floor(Math.random()*10);
me.FSOP_high = Math.floor(Math.random()*10);
me.SSOT_high = Math.floor(Math.random()*10);
me.oilPressure_low = Math.floor(Math.random()*10);
me.oilTemperature_high = Math.floor(Math.random()*10);
me.inlet_waterPressure_low = Math.floor(Math.random()*10);
me.FSOT_high = Math.floor(Math.random()*10);
me.oilPressure_high = Math.floor(Math.random()*10);
me.inlet_waterPressure_high = Math.floor(Math.random()*10);
me.driveEnd_bearingTemperature = Math.floor(Math.random()*10);
me.nonDriveEnd_bearingTemperature = Math.floor(Math.random()*10);
me.driveEnd_Xvalue = Math.floor(Math.random()*10);
me.driveEnd_Yvalue = Math.floor(Math.random()*10);
me.nonDriveEnd_Xvalue = Math.floor(Math.random()*10);
me.nonDriveEnd_Yvalue = Math.floor(Math.random()*10);

var flowW=Math.floor(Math.random()*5);
if(flowW==2 || flowW==4 || flowW==6) {
me.flowcode="fill";
} else {
me.flowcode="drain";
}
me.Ambient = Math.floor(Math.random()*10);

var GeneralS = Math.floor(Math.random()*5);
if(GeneralS===2 || GeneralS===4 || GeneralS===6) {
me.General_Status="fill";
} else {
me.General_Status="drain";
}


me.set_PFCT= Math.floor(Math.random()*10);
me.set_MPV = Math.floor(Math.random()*10);
me.set_BDV = Math.floor(Math.random()*10);
me.set_solenoid = Math.floor(Math.random()*10);
me.set_ADV = Math.floor(Math.random()*10);
me.set_oilSampleTest = Math.floor(Math.random()*10);
me.set_SPM = Math.floor(Math.random()*10);
me.set_PF_FF = Math.floor(Math.random()*10);

me.rem_CF = Math.floor(Math.random()*10);
me.energy = Math.floor(Math.random()*10);
me.low_utilizationHours = Math.floor(Math.random()*10);

var dateOfToday = new Date();
me.commissioning_date = dateOfToday;

me.warranty_terms = Math.floor(Math.random()*10);// = Math.Floor(Math.random()*10);
me.last_AMC_servicedate = dateOfToday;  //date
me.previous_and_nextService = dateOfToday; //date
//me.service_history = Math.Floor("");  //date given in n4 parameters and but n4 mapping parameter in its data type is string[] 
me.spares_replaced_history = dateOfToday; //date
me.amc_startDate = dateOfToday; //date
me.amc_contractTerms = dateOfToday; //date given in n4 parameters and but n4 mapping parameter in its data type is string
me.noOfvisit_perYear = Math.floor(Math.random()*10);
me.amc_type = "" ;//String should be anything
me.amc_visit1 = dateOfToday; //date
me.amc_visit2 = dateOfToday; //date
me.amc_visit3 = dateOfToday; //date
me.amc_visit4 = dateOfToday; //date
me.amc_visit5 = dateOfToday; //date
me.amc_visit6 = dateOfToday; //date
me.amc_visit7 = dateOfToday; //date
me.amc_visit8 = dateOfToday; //date
me.amc_visit9 = dateOfToday; //date
me.amc_visit10 = dateOfToday; //date
me.power_inkw = Math.floor(Math.random()*10);

//var flowW=Math.floor(Math.random()*5);
//if(flowW===2 || flowW===4 || flowW===6) {
//me.flowcode="fill";
//} else {
//me.flowcode="drain";
//}
me.Ambient = Math.floor(Math.random()*10);
