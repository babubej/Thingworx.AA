try {
	// dateValue:DATETIME
	var end = new Date();
	// dateAddHours(dateValue:DATETIME, amount:NUMBER):STRING
	var start = dateAddHours(end, -8);

	Median_Ambient_Temperature = Things["ELGi.COMP.GenericHelper.Thing"].CalcMedian({
		propertyName: 'ambient_temperature' /* STRING */ ,
		MachineStatus: 'Load' /* STRING */ ,
		thingNames: thingName /* STRING */ ,
		startDate: start /* DATETIME */ ,
		endDate: end /* DATETIME */
	});

	Median_Discharge_Temperature = Things["ELGi.COMP.GenericHelper.Thing"].CalcMedian({
		propertyName: 'dis_temperature' /* STRING */ ,
		MachineStatus: 'Load' /* STRING */ ,
		thingNames: thingName /* STRING */ ,
		startDate: start /* DATETIME */ ,
		endDate: end /* DATETIME */
	});

	if (Median_Ambient_Temperature === null) {
		Median_Ambient_Temperature = 0;
	}

	if (Median_Discharge_Temperature === null) {
		Median_Discharge_Temperature = 0;
	}

	var result = false;
	var result_1 = med_dis_temp_avg > (med_amb_temp_avg + DesignLimit);
	var result_2 = med_dis_temp_avg > 90;
	if (result_1 && result_2) {
		result = true;
	}
	Things[thingName].high_DT_8Hrs = result;

	if (!result) {
		Things[thingName].high_DT_16Hrs = result;
		Things[thingName].high_DT_24Hrs = result;
		Things[thingName].high_DT_48Hrs = result;
	}

} catch (err) {}
