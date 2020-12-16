logger.info("SCHEDULED EXECUTION STARTED. SERVICE NAME : SetUIRelatedPrecalculatedProperties_24Hrs");

try {
	Things["ELGi.COMP.CalculationsHelper.Thing"].SetDailyLoadCount();
} catch (err) {
	logger.error('Error occured in ELGi.COMP.CalculationsHelper.Thing:SetDailyLoadCount. Message : ' + err.message);
}

try {
	Things["ELGi.COMP.CalculationsHelper.Thing"].SetDailyUtilizationPercentage();
} catch (err) {
	logger.error('Error occured in ELGi.COMP.CalculationsHelper.Thing:SetDailyUtilizationPercentage. Message : ' + err.message);
}

try {
	Things["ELGi.COMP.CalculationsHelper.Thing"].SetServiceOfCompressorsDetails();
} catch (err) {
	logger.error('Error occured in ELGi.COMP.CalculationsHelper.Thing:SetServiceOfCompressorsDetails. Message : ' + err.message);
}

try {
	Things["ELGi.COMP.CalculationsHelper.Thing"].SetisOntimeEvent();
} catch (err) {
	logger.error('Error occured in ELGi.COMP.CalculationsHelper.Thing:SetisOntimeEvent. Message : ' + err.message);
}

try {
	Things["ELGi.COMP.CalculationsHelper.Thing"].OverdueLessThan200Hours();
} catch (err) {
	logger.error('Error occured in ELGi.COMP.CalculationsHelper.Thing:OverdueLessThan200Hours. Message : ' + err.message);
}

try {
	Things["ELGi.COMP.CalculationsHelper.Thing"].OverdueGreaterThan200Hours();
} catch (err) {
	logger.error('Error occured in ELGi.COMP.CalculationsHelper.Thing:OverdueGreaterThan200Hours. Message : ' + err.message);
}

try {
	Things["ELGi.COMP.CalculationsHelper.Thing"].SetUtilization_60_to_80_percentage();
} catch (err) {
	logger.error('Error occured in ELGi.COMP.CalculationsHelper.Thing:SetUtilization_60_to_80_percentage. Message : ' + err.message);
}

try {
	Things["ELGi.COMP.CalculationsHelper.Thing"].SetUtilization_80_to_100_percentage();
} catch (err) {
	logger.error('Error occured in ELGi.COMP.CalculationsHelper.Thing:SetUtilization_80_to_100_percentage. Message : ' + err.message);
}

try {
	Things["ELGi.COMP.CalculationsHelper.Thing"].SetUtilization_LessThan_60_percent();
} catch (err) {
	logger.error('Error occured in ELGi.COMP.CalculationsHelper.Thing:SetUtilization_LessThan_60_percent. Message : ' + err.message);
}

try {
	Things["ELGi.COMP.CalculationsHelper.Thing"].SetUtilization_LessThanOrGreaterThan_50_percentService();
} catch (err) {
	logger.error('Error occured in ELGi.COMP.CalculationsHelper.Thing:SetUtilization_LessThanOrGreaterThan_50_percentService. Message : ' + err.message);
}

try {
	Things["ELGi.COMP.CalculationsHelper.Thing"].SetConsumableRemainingDays();
} catch (err) {
	logger.error('Error occured in ELGi.COMP.CalculationsHelper.Thing:SetConsumableRemainingDays. Message : ' + err.message);
}

try {
	Things["ELGi.COMP.CalculationsHelper.Thing"].SetConsumableDueNowService();
} catch (err) {
	logger.error('Error occured in ELGi.COMP.CalculationsHelper.Thing:SetConsumableDueNowService. Message : ' + err.message);
}

try {
	Things["ELGi.COMP.CalculationsHelper.Thing"].SetConsumableDueInNext30Days();
} catch (err) {
	logger.error('Error occured in ELGi.COMP.CalculationsHelper.Thing:SetConsumableDueInNext30Days. Message : ' + err.message);
}

try {
	Things["ELGi.COMP.CalculationsHelper.Thing"].SetConsumableDueInNext60Days();
} catch (err) {
	logger.error('Error occured in ELGi.COMP.CalculationsHelper.Thing:SetConsumableDueInNext60Days. Message : ' + err.message);
}

logger.info("SCHEDULED EXECUTION FINISHED. SERVICE NAME : SetUIRelatedPrecalculatedProperties_24Hrs");
