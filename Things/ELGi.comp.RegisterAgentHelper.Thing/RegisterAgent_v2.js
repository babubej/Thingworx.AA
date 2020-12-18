//
// RegisterAgent_v2 service
// * fabNumber - STRING
// * imeiNumber - STRING
// * machineDetails_1 - INTEGER
// * machineDetails_2 - INTEGER
var result = {
	success: false,
	message: ""
};
var remoteThingName = "";
var thingIdentifier = fabNumber;
var input;
var remoteThingExists = false;
var localThingExists = false;

try {

	remoteThingName = me.remoteThingPrefix + "_" + fabNumber;

	remoteThingExists = !!Things[remoteThingName];
	localThingExists = !!Things[fabNumber];

	if (fabNumber === undefined || fabNumber === null || fabNumber.trim() === '') {
		throw new Error("Input 'fabNumber' is required!");
	}
	if (imeiNumber === undefined || imeiNumber === null || imeiNumber.trim() === '') {
		throw new Error("Input 'imeiNumber' is required!");
	}

	if (machineDetails_1 === undefined || machineDetails_1 === null) {
		throw new Error("Input 'machineDetails_1' is required!");
	}

	if (machineDetails_2 === undefined || machineDetails_2 === null) {
		throw new Error("Input 'machineDetails_2' is required!");
	}

	// Get Template Name, Shapes, Modbus Config and Tag Parser from ELGI.COMP.CreateOrUpdateThingMappings.DT Data Table
	// result: INFOTABLE dataShape: "ELGI.COMP.CreateOrUpdateThingMappings.DS"
	var queryResult = Things["ELGI.COMP.ThingModelHelper.Thing"].QueryDataTableForThingCreationOrUpdation({
		machine_details_1: machineDetails_1 /* INTEGER */ ,
		machine_details_2: machineDetails_2 /* INTEGER */
	});

	if (queryResult !== undefined && queryResult.rows.length > 0) {

		//remoteThingName = me.remoteThingPrefix + "_" + fabNumber;
		me.PreCreateRemoteThing({
			thingName: remoteThingName,
			thingIdentifier: thingIdentifier,
			tags: []
		});

		// Create Local thing using the template and shapes from queryResult 
		// result: THINGNAME
		var thingName = Things["ELGI.COMP.ThingModelHelper.Thing"].CreateThing({
			template_name: queryResult.template_name /* THINGTEMPLATENAME */ ,
			fabNumber: fabNumber /* STRING */ ,
			shapes_list: queryResult.shapes_list /* INFOTABLE */
		});

		Things[thingName].is_Sump_Enabled = queryResult.sump_available;
		Things[thingName].isVfd_Connected = queryResult.vfd_available;
		Things[thingName].machine_group = queryResult.machine_group;
		Things[thingName].imeiNo = imeiNumber;
		Things[thingName].fabNo = fabNumber;

		var tagParserJSON = JSON.parse(queryResult.tag_parser_config);

		Things[thingName].imeiNo = imeiNumber;
		Things[thingName].fabNo = fabNumber;

		logger.info(me.name + ": Successfully created and registered new Remote Thing '" + remoteThingName + "' with identifier '" + thingIdentifier + "'.");
		result = {
			'thing_name': remoteThingName,
			'thing_identifier': thingIdentifier,
			'modbus_config': queryResult.modbus_config,
			'tag_parser': tagParserJSON,
			'fab_no': fabNumber,
			'imei_no': imeiNumber,
			'success': true
		};
		if (!!Things["ELGI.COMP.ThirdPartyIntegrationHelper.Thing"].ThingOnboarded) {
			logger.debug("BEFORE EVENT TRIGGER : RegisterAgent");
			//Trigger Event to call APIs related to fetching machine details from CCS and sending Fab Number to CRM/CCS
			Things["ELGI.COMP.ThirdPartyIntegrationHelper.Thing"].ThingOnboarded({
				ThingName: thingName /* THINGNAME */
			});
			logger.debug("After EVENT TRIGGER : RegisterAgent");
		}

		input = "fabNumber :" + fabNumber + "," + "imeiNumber :" + imeiNumber + "," + "remoteThingName :" + remoteThingName + "," + "machineDetails_1 :" + machineDetails_1 + "," + "machineDetails_2 :" + machineDetails_2;

		Things["ELGI.COMP.AgentRegistrationFailureOrExecution.DT"].AgentRegistrationServiceExecutionAndException({
			Success_Status: "true" /* STRING */ ,
			Input: input /* STRING */ ,
			ServiceName: "RegisterAgent_v2" /* STRING */ ,
			Thing_Name: fabNumber /* STRING */ ,
			Exception: "--" /* STRING */ ,
			Result: result /* STRING */
		});

	} else {
		throw new Error(me.name + ": Failed to create & register new Remote Thing with fabNumber='" + fabNumber + " : Incorrect Machine Details sent from Agent. Machine Details 1: " + machineDetails_1 + ", Machine Details 2: " + machineDetails_2);
	}
} catch (ex) {
	logger.error(me.name + ": Failed to create & register new Remote Thing with fabNumber='" + fabNumber + "', imeiNumber='" + imeiNumber + "': " + ex + " " + ex.stack);

	if (!localThingExists) {
		//Delete Local Thing   
		// no return    
		Resources["EntityServices"].DeleteThing({
			name: fabNumber /* THINGNAME */
		});
	}

	if (!remoteThingExists) {
		//Delete Remote Thing   
		// no return
		Resources["EntityServices"].DeleteThing({
			name: remoteThingName /* THINGNAME */
		});
	}
	result = {
		success: false,
		message: ex.message + ""
	};

	input = "fabNumber :" + fabNumber + "," + "imeiNumber :" + imeiNumber + "," + "remoteThingName :" + remoteThingName + "," + "machineDetails_1 :" + machineDetails_1 + "," + "machineDetails_2 :" + machineDetails_2;

	Things["ELGI.COMP.AgentRegistrationFailureOrExecution.DT"].AgentRegistrationServiceExecutionAndException({
		Success_Status: "false" /* STRING */ ,
		Input: input /* STRING */ ,
		ServiceName: "RegisterAgent_v2" /* STRING */ ,
		Thing_Name: fabNumber /* STRING */ ,
		Exception: ex.message /* STRING */ ,
		Result: result /* STRING */
	});
}
