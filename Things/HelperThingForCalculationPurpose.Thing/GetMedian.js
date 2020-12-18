try{
    var result = 0;
    //logger.warn('Inside getMedian ThingName ' + thingName + ' PropertyName: '+ propertyName);
    
    var resultIT =  Things[thingName].QueryIntegerPropertyHistory({
        oldestFirst: undefined /* BOOLEAN */,
        maxItems: 50000 /* NUMBER */,
        propertyName: propertyName /* STRING */,
        endDate: endTime /* DATETIME */,
        query: undefined /* QUERY */,
        startDate: startTime /* DATETIME */
    });
    if (resultIT.rows.length>0){
        var sort = new Object();
        sort.name = "value";
        sort.ascending = true;
        resultIT.Sort(sort);
        var tableLength = resultIT.rows.length;

        if (tableLength % 2 === 0) {  // is even
            result = resultIT.rows[tableLength/2].value;
        } else { // is odd
            result = resultIT.rows[(tableLength-1)/2].value;
        }
    }
}    catch (err){   
    logger.error(thingName + " GetMedian " + err + " at line " + err.lineNumber);
}
