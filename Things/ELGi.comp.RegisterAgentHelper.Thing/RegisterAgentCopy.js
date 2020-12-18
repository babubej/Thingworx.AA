//
// RegisterAgent service
// * fabNumber - STRING
// * imeiNumber - STRING
 
try {
    // #FIXME
    if (!fabNumber) {
        throw new Error("Input 'fabNumber' is required!");
    }
    if (!imeiNumber) {
        throw new Error("Input 'imeiNumber' is required!");
    }
    // test data
    var mappingInfo = me.RetrieveMappingInfo({
        fabNumber: fabNumber /* STRING */,
        imeiNumber: imeiNumber /* STRING */
    });
    // mappingInfo.success ??
    var thingIdentifier = fabNumber;
    var remoteThingName = me.remoteThingPrefix + "_" + fabNumber;
    me.PreCreateRemoteThing({
        thingName: remoteThingName,
        thingIdentifier: thingIdentifier,
        tags: []
    });
    logger.info(me.name + ": Successfully created and registered new Remote Thing '" + remoteThingName + "' with identifier '" + thingIdentifier + "'.");
    var result = {
        'thing_name': remoteThingName,
        'thing_identifier': thingIdentifier,
        'modbus_config': mappingInfo.modbus_config,
        'tag_parser': mappingInfo.tag_parser,
        'fab_no': fabNumber,
        'imei_no': imeiNumber,
        'success': true
    };
} catch (ex) {
    logger.error(me.name + ": Failed to create & register new Remote Thing with fabNumber='" + fabNumber + "', imeiNumber='" + imeiNumber + "': " + ex + " " + ex.stack);
    var result = {
        success: false,
        message: ex + ""
    };
}
