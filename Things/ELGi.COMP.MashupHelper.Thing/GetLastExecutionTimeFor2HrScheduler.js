logger.info("GetLastExecutionTimeFor2HrScheduler START");

var execTime = Things["ELGi.COMP.2HrScheduler.Thing"].LastExecutionTime;

// dateValue:DATETIME
var dateValue = execTime;

// dateAddHours(dateValue:DATETIME, amount:NUMBER):STRING
var calculatedDateValue = dateAddHours(dateValue, 5);

// dateAddMinutes(dateValue:DATETIME, amount:NUMBER):STRING
var calculatedDateValue1 = dateAddMinutes(calculatedDateValue, 30);

var result = '*last updated on ' + dateFormat(calculatedDateValue1, "HH:mm dd.MM.yyyy");

logger.info("GetLastExecutionTimeFor2HrScheduler END");
