
try {
	// sixteen hours  
//	currentDate = new Date();
//	currentDate.setDate(currentDate.getDate() - 1);
//	start = currentDate.setHours(0, 0, 0, 0);
//	endDate = new Date();
//	endDate.setHours(15, 59, 0, 0);
//	end = endDate;
//    
    // dateValue:DATETIME
	var end = new Date();
	// dateAddHours(dateValue:DATETIME, amount:NUMBER):STRING
	var start = dateAddHours(end, -16);

	Median_Ambient_Temperature = Things["ELGi.COMP.GenericHelper.Thing"].CalcMedian({
		propertyName: 'ambient_temperature' /* STRING */ ,
		MachineStatus: 'Running Status' /* STRING */ ,
		thingNames: thingName /* STRING */ ,
		startDate: start /* DATETIME */ ,
		endDate: end /* DATETIME */
	});	
    logger.debug("Median_Ambient_Temperature : "+Median_Ambient_Temperature);

	Median_Discharge_Temperature = Things["ELGi.COMP.GenericHelper.Thing"].CalcMedian({
		propertyName: 'dis_temperature' /* STRING */ ,
		MachineStatus: 'Running Status' /* STRING */ ,
		thingNames: thingName /* STRING */ ,
		startDate: start /* DATETIME */ ,
		endDate: end /* DATETIME */
	});
    
    logger.debug("Median_Discharge_Temperature : "+Median_Discharge_Temperature);
	
    if(Median_Ambient_Temperature === null){
    	Median_Ambient_Temperature = 0;        
    }
    
    if(Median_Discharge_Temperature === null){
    	Median_Discharge_Temperature = 0;        
    }
    
    var result = false;
	var result_1 = med_dis_temp_avg > (med_amb_temp_avg + DesignLimit);
	var result_2 = med_dis_temp_avg > 90;
	if (result_1 && result_2) {
		result = true;
	}
    
	Things[thingName].high_DT_16Hrs = result;
    
    if (!result) {		
		Things[thingName].high_DT_24Hrs = result;
		Things[thingName].high_DT_48Hrs = result;
	}

} catch (err) {
	logger.error("Error in CompressorRunningWithHighDischargeTempSixteenHours : "+err);
}
