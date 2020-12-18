var result;
if (condition === 'A > B') {
	result = property01 > property02;
} else if (condition === 'A > B + C') {
    logger.debug("Inside ELSEIF");
	if (symptom === 'Compressor running with high discharge temperature') {
        logger.debug("Inside Symp");
		if (!Things[entity].high_DT_48Hrs) {
            logger.debug("Inside 48HR");
			// result: STRING
			result = me.CompressorRunningWithHighDischargeTempFourtyEightHours({
				DesignLimit: property03 /* NUMBER */ ,
				CompressorStatus: undefined /* STRING */ ,
				start: undefined /* DATETIME */ ,
				end: undefined /* DATETIME */ ,
				thingName: entity /* STRING */
			});
		} else if (!Things[entity].high_DT_24Hrs) {                        
			// result: STRING
			result = me.CompressorRunningWithHighDischargeTempTwentyFourHours({
				DesignLimit: property03 /* NUMBER */ ,
				CompressorStatus: undefined /* STRING */ ,
				start: undefined /* DATETIME */ ,
				end: undefined /* DATETIME */ ,
				thingName: entity /* STRING */
			});
		} else if (!Things[entity].high_DT_16Hrs) {
            result = me.CompressorRunningWithHighDischargeTempSixteenHours({
				DesignLimit: property03 /* NUMBER */ ,
				CompressorStatus: undefined /* STRING */ ,
				start: undefined /* DATETIME */ ,
				end: undefined /* DATETIME */ ,
				thingName: entity /* STRING */
			});			
		} else {
			result = me.CompressorRunningWithHighDischargeTempEightHours({
				DesignLimit: property03 /* NUMBER */ ,
				CompressorStatus: undefined /* STRING */ ,
				start: undefined /* DATETIME */ ,
				end: undefined /* DATETIME */ ,
				thingName: entity /* STRING */
			});
		}
	} else {
		result = property01 > (property02 + property03);
	}
} else if (condition === 'A < B') {
	result = property01 < property02;
} else if (condition === 'A > B - C') {
	result = property01 > (property02 - property03);
} else if (condition === 'A < B - C') {
	result = property01 < (property02 - property03);
} else if (condition === 'Rated_pressure > A > Rated_pressure/1.2') {
	// result: INFOTABLE dataShape: ""
	result = Things["ELGi.COMP.RulesLibrary.Thing"].ExecuteRule_EG_Symp02_Case1({
		symptom: undefined /* STRING */ ,
		entityName: entity /* STRING */
	});
} else if (condition === 'Rated_pressure/1.2 > A > Rated_pressure/1.4') {
	// result: INFOTABLE dataShape: ""
	result = Things["ELGi.COMP.RulesLibrary.Thing"].ExecuteRule_EG_Symp02_Case2({
		symptom: undefined /* STRING */ ,
		entityName: entity /* STRING */
	});
} else if (condition === 'A < Rated_pressure/1.4') {
	// result: INFOTABLE dataShape: ""
	result = Things["ELGi.COMP.RulesLibrary.Thing"].ExecuteRule_EG_Symp02_Case3({
		symptom: undefined /* STRING */ ,
		entityName: entity /* STRING */
	});
} else if (condition === 'Main_Motor_OL > 3') {
	// result: INFOTABLE dataShape: ""
	result = Things["ELGi.COMP.RulesLibrary.Thing"].ExecuteRule_MainMotorOL({
		symptom: undefined /* STRING */ ,
		entityName: entity /* STRING */
	});
} else if (condition === 'Cooler_Motor_OL > 3') {
	// result: INFOTABLE dataShape: ""
	result = Things["ELGi.COMP.RulesLibrary.Thing"].ExecuteRule_CoolerMotorOL({
		symptom: undefined /* STRING */ ,
		entityName: entity /* STRING */
	});
} else {
	throw new Error('None of the condition matches. Please contact Administrator. ');
}
logger.debug("condition rule result : " + result + " , CONDITION : " + condition);
