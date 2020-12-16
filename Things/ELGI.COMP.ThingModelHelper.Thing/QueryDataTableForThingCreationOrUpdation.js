try {

	if ( machine_details_1 === 0 ) {
		throw new Error("Machine Details 1 cannot be ZERO. Thing cannot be created !!");
	}
	// Queries data table to get Template Name, Shapes List, Modbus Config and Tag Parser
	// Query Logic	
	var query = {
		"filters": {
			"type": "And",
			"filters": [{
					"type": "EQ",
					"fieldName": "machine_details_1",
					"value": machine_details_1
				},
				{
					"type": "EQ",
					"fieldName": "machine_details_2",
					"value": machine_details_2
				}
			]
		}
	};


	// result: INFOTABLE dataShape: ""
	var queryResult = Things["ELGI.COMP.CreateOrUpdateThingMappings.DT"].QueryDataTableEntries({
		maxItems: undefined /* NUMBER */ ,
		values: undefined /* INFOTABLE */ ,
		query: query /* QUERY */ ,
		source: undefined /* STRING */ ,
		tags: undefined /* TAGS */
	});
	if (queryResult === undefined || queryResult === null || queryResult.length === 0) {
		throw new Error("No data available for the provided input. Thing cannot be created !!");
	}
	var result = queryResult;

} catch (err) {
	throw err;
}
