try {
    /************* Service to bind properties of Local thing with Remote Thing *************/

    //Get list of properties of Local Thing
    //result: INFOTABLE dataShape: "PropertyDefinition"
    var localThingProperties = Things[localThingName].GetPropertyDefinitions({
        category: undefined /* STRING */ ,
        type: undefined /* BASETYPENAME */ ,
        dataShape: undefined /* DATASHAPENAME */
    });

    //Get list of properties of Local Thing
    //result: INFOTABLE dataShape: "PropertyDefinition"
    var remoteThingProperties = Things[remoteThingName].GetPropertyDefinitions({
        category: undefined /* STRING */ ,
        type: undefined /* BASETYPENAME */ ,
        dataShape: undefined /* DATASHAPENAME */
    });

    // Get the common properties for Local bindings
    var params = {
        columns2: "name" /* STRING */ ,
        columns1: "name" /* STRING */ ,
        joinType: "INNER" /* STRING */ ,
        t1: localThingProperties /* INFOTABLE */ ,
        t2: remoteThingProperties /* INFOTABLE */ ,
        joinColumns1: "name" /* STRING */ ,
        joinColumns2: "name" /* STRING */
    };
    // result: INFOTABLE
    var commonProperties = Resources["InfoTableFunctions"].Intersect(params);

    var tableLength = commonProperties.rows.length;
    for (var x = 0; x < tableLength; x++) {
        var row = commonProperties.rows[x];

        // Binding each property locally
        Things[localThingName].SetLocalPropertyBinding({
            propertyName: row.name /* STRING */ ,
            aspects: undefined /* JSON */ ,
            sourceThingName: remoteThingName /* STRING */ ,
            sourcePropertyName: row.name /* STRING */
        });	
    }
} catch(ex) {
    logger.error("BindLocalProperties('"+localThingName+"'): " + ex + " " + ex.stack);
    throw ex;
}
