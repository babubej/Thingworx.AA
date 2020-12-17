var SmoothFactor = 10;

// This is just for passing the property name into the query
var infotable = Resources["InfoTableFunctions"].CreateInfoTable({infotableName: "NamedProperties"});
infotable.AddField({name: "name", baseType: "STRING"});
infotable.AddRow({name: "dis_pressure"});

//var queryResults =  Things["ThisThingIsToTestEverything.Thing"].QueryNamedPropertyHistory({
//	maxItems: 9999999,
//	endDate: to,// to
//	propertyNames: infotable,
//	startDate: from // from
//});

// This will be filled in below, based on the smoothing calculation
var result = Resources["InfoTableFunctions"].CreateInfoTable({infotableName: "SmoothedQueryResults"});
result.AddField({name: "dis_pressure", baseType: "NUMBER"});
result.AddField({name: "timestamp", baseType: "DATETIME"});

// If there is no smooth factor, then just return everything
if(SmoothFactor === 0 || SmoothFactor  === undefined || SmoothFactor === "")
    result = queryResults;
else {
    // Increment by smooth factor
    for(var i = 0; i < queryResults.rows.length; i += SmoothFactor) {
        var sum = 0;
        var count = 0;

        // Increment by one to average all points in this interval
        for(var j = i; j < (i+SmoothFactor); j++) {
            if(j < queryResults.rows.length)
            	if(j === i) { // First time set sum equal to first property value
                	sum = queryResults.getRow(j).dis_pressure;
                    count++;
                } else { // All other times, add property values to first value
            		sum += queryResults.getRow(j).dis_pressure;
                    count++;
                }
        }

        var average = sum / count; // Use count because the last interval may not equal smooth factor

        result.AddRow({dis_pressure: average, timestamp: queryResults.getRow(i).timestamp});
    }
}	
