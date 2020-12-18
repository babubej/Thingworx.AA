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

	var machineDetails_1 = 4160;
	var machineDetails_2 = 0;
    
    // test data
    var mappingInfo = me.RetrieveMappingInfo({
        fabNumber: fabNumber /* STRING */,
        imeiNumber: imeiNumber /* STRING */
    });   
    
    var thingIdentifier = fabNumber;
	var remoteThingName = me.remoteThingPrefix + "_" + fabNumber;
	me.PreCreateRemoteThing({
		thingName: remoteThingName,
		thingIdentifier: thingIdentifier,
		tags: []
	});

	// Get Template Name, Shapes, Modbus Config and Tag Parser from ELGI.COMP.CreateOrUpdateThingMappings.DT Data Table
	// result: INFOTABLE dataShape: "ELGI.COMP.CreateOrUpdateThingMappings.DS"
	var queryResult = Things["ELGI.COMP.ThingModelHelper.Thing"].QueryDataTableForThingCreationOrUpdation({
		machine_details_1: machineDetails_1 /* INTEGER */ ,
		machine_details_2: machineDetails_2 /* INTEGER */
	});

	if (!Things[fabNumber]) {
		// Create Local thing using the template and shapes from queryResult 
		// result: THINGNAME
		var thingName = Things["ELGI.COMP.ThingModelHelper.Thing"].CreateThing({
			template_name: queryResult.template_name /* THINGTEMPLATENAME */ ,
			fabNumber: fabNumber /* STRING */ ,
			shapes_list: queryResult.shapes_list /* INFOTABLE */
		});

		if (!!Things[thingName]) {
			Things[thingName].is_Sump_Enabled = queryResult.sump_available;
			Things[thingName].isVfd_Connected = queryResult.vfd_available;
			Things[thingName].machine_group = queryResult.machine_group;
			Things[thingName].imeiNo = imeiNumber;
			Things[thingName].fabNo = fabNumber;
		}
	}
	
	var tagParserJSON = JSON.parse(queryResult.tag_parser_config);

	//Things[thingName].imeiNo = imeiNumber;
	//Things[thingName].fabNo = fabNumber;

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
	logger.debug("BEFORE EVENT TRIGGER : RegisterAgent");
	//Trigger Event to call APIs related to fetching machine details from CCS and sending Fab Number to CRM/CCS
	Things["ELGI.COMP.ThirdPartyIntegrationHelper.Thing"].ThingOnboarded({
		ThingName: thingName /* THINGNAME */
	});
	logger.debug("After EVENT TRIGGER : RegisterAgent");
} catch (ex) {
	logger.error(me.name + ": Failed to create & register new Remote Thing with fabNumber='" + fabNumber + "', imeiNumber='" + imeiNumber + "': " + ex + " " + ex.stack);
	var result = {
		success: false,
		message: ex + ""
	};
}
