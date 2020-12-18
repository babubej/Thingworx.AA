//
// BindRemoteProperties service
// * remoteThingName - STRING

var remoteThing = Things[remoteThingName];
if (!remoteThing) {
    var thingIdentifier = "" + remoteThingName;
    if (thingIdentifier.indexOf("*") === 0) {
        thingIdentifier = thingIdentifier.substr(1);
    }
    var thingNameForIdentifier = Resources["EntityServices"].GetThingNameForIdentifier({
        identifier: thingIdentifier
    });
    if (!thingNameForIdentifier) {
        throw Error("Input Remote Thing '" + thingIdentifier + "' does not exist!");
    } else {
        remoteThing = Things[thingNameForIdentifier];
        if (!remoteThing) {
            // extremely unlikely, however... missing visibility permissions?
            throw Error("Input Remote Thing '" + thingNameForIdentifier + "'/'" + thingIdentifier + "' does not exist!");
        } else {
            remoteThingName = thingNameForIdentifier;
        }
    }
} //? got remote thing
var result = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape({
    infoTableName: "result",
    dataShapeName: "RemotePropertyBinding"
});
var remoteMetadata = remoteThing.GetRemoteMetadata();
// Get all remote properties from the Edge device
var properties = remoteMetadata.propertyDefinitions;
var propertyNames = Object.keys(properties);
// Iterate through each property returned by the Remote device
for (var idx = 0; idx < propertyNames.length; idx++) {
    var property = properties[propertyNames[idx]];
    var bound = true;
    // Check Binding	
    try {
        // If a property is not bound, this will throw an exception.
        var binding = remoteThing.GetRemotePropertyBinding({ propertyName: property.name });
        if (!!binding.rows.length) {
            result.AddRow(binding.rows[0]);
        }
        // No exception thrown, so this property is already bound. Onward.
        logger.info("Property {} is already bound on {}. Skipping.", property.name, remoteThingName);
        continue;
    } catch (ex) {
        // Property is not bound. 
        bound = false;
        logger.info("Property {} is not bound on {}. Binding.", property.name, remoteThingName);
    }
    var isLogged = true;
    var isPersistent = true;
    // Create Property (if it doesn't exist)
    try {
        var definition = remoteThing.GetPropertyDefinition({ name: property.name });
    } catch (ex) {
        // Exception thrown, property does not exist. Create property.
        logger.info("Local property for {} not found, creating.", property.name);
		if(property.name == "device_time") {
        	isLogged = false; // no need to log device time (too many updates)
        }
        // Create the property on the Thing type. 
        remoteThing.AddPropertyDefinition({
            name: property.name /* STRING */,
            description: property.description /* STRING */,
            readOnly: property.aspects.isReadOnly /* BOOLEAN */,
            type: property.baseType /* BASETYPENAME */,
            logged: isLogged /* BOOLEAN */,
            dataChangeType: "VALUE" /* STRING */,
            dataChangeThreshold: 0 /* NUMBER */,
            category: property.category /* STRING */,
            persistent: isPersistent /* BOOLEAN */,
            dataShape: property.aspects.dataShape /* ?? DATASHAPENAME */,

            // Remote Binding
            remote: true /* BOOLEAN */,
            remotePropertyName: property.name /* STRING */,
            timeout: 0 /* INTEGER */,
            pushType: "VALUE" /* STRING */,
            pushThreshold: 0 /* NUMBER */
        });
    }
    try {
        // If a property is not bound, this will throw an exception.
        var binding = remoteThing.GetRemotePropertyBinding({ propertyName: property.name });
        if (!!binding.rows.length) {
            result.AddRow(binding.rows[0]);
        }
    } catch (ex) { }
} //# for each property name

var locaThingName = remoteThingName.substr(7);
me.BindLocalProperties({
	remoteThingName: remoteThingName /* STRING */,
	localThingName: locaThingName /* STRING */
});


//Bind local thing properties with remote thing properties for SCM Filters, these filter values are coming from CRM/CCS
//me.BindLocalPropertiesForSCMFilters({
//		remoteThingName: remoteThingName /* STRING */ ,
//		localThingName: locaThingName /* STRING */
//	});
//
