logger.info("SCHEDULED EXECUTION STARTED. SERVICE NAME : SetUIRelatedPrecalculatedProperties_2Hrs");

try {
	Things["ELGi.COMP.CalculationsHelper.Thing"].SetisConnectedTrue();
} catch (err) {
	logger.error('Error occured in ELGi.COMP.CalculationsHelper.Thing:SetisConnectedTrue. Message : ' + err.message);
}

try {
	Things["ELGi.COMP.CalculationsHelper.Thing"].SetisManufacturedTrue();
} catch (err) {
	logger.error('Error occured in ELGi.COMP.CalculationsHelper.Thing:SetisManufacturedTrue. Message : ' + err.message);
}

try {
	Things["ELGi.COMP.CalculationsHelper.Thing"].SetisManufacturedFalse();
} catch (err) {
	logger.error('Error occured in ELGi.COMP.CalculationsHelper.Thing:SetisManufacturedFalse. Message : ' + err.message);
}

me.last_update_commisioned_machines = new Date();

Things["ELGi.COMP.2HrScheduler.Thing"].LastExecutionTime = new Date();

logger.info("SCHEDULED EXECUTION FINISHED. SERVICE NAME : SetUIRelatedPrecalculatedProperties_2Hrs");
