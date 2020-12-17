try {
	var queryObjects = new Array();
	var booleanValue, filter;
	var consumableFilterValue = 'ALL';

	if (fabNumber !== undefined && fabNumber !== null && fabNumber.trim() !== '') {

		filter = {
			"type": "LIKE",
			"fieldName": "name",
			"value": '*' + fabNumber + '*'
		};
		queryObjects.push(filter);
	}

	if (consumableFilter !== undefined && consumableFilter !== null && consumableFilter.trim() !== '' && consumableFilter !== 'ALL') {
		if (consumableFilter === 'CURRENT') {
			consumableFilterValue = 'CURRENT';
		} else if (consumableFilter === 'NEXT30DAYS') {
			consumableFilterValue = 'NEXT30DAYS';
		} else if (consumableFilter === 'NEXT60DAYS') {
			consumableFilterValue = 'NEXT60DAYS';
		}
	}

	if (warrantyFilter !== undefined && warrantyFilter !== null && warrantyFilter.trim() !== '') {

		if (warrantyFilter === 'IN WARRANTY') {
			booleanValue = true;
		} else {
			booleanValue = false;
		}

		filter = {
			"type": "EQ",
			"fieldName": "warranty_status",
			"value": booleanValue
		};
		queryObjects.push(filter);
	}

	if (country !== undefined && country !== null && country.trim() !== '' && country !== 'All') {
		filter = {
			"type": "EQ",
			"fieldName": "country",
			"value": country
		};
		queryObjects.push(filter);
	}

	if (region !== undefined && region !== null && region.trim() !== '' && region !== 'All') {
		filter = {
			"type": "EQ",
			"fieldName": "region",
			"value": region
		};
		queryObjects.push(filter);
	}
	if (area !== undefined && area !== null && area.trim() !== '' && area !== 'All') {
		filter = {
			"type": "EQ",
			"fieldName": "area",
			"value": area
		};
		queryObjects.push(filter);
	}
	if (dealer !== undefined && dealer !== null && dealer.trim() !== '' && dealer !== 'All') {
		filter = {
			"type": "EQ",
			"fieldName": "dealer_name",
			"value": dealer
		};
		queryObjects.push(filter);
	}
	if (customer !== undefined && customer !== null && customer.trim() !== '' && customer !== 'All') {
		filter = {
			"type": "EQ",
			"fieldName": "customer_name",
			"value": customer
		};
		queryObjects.push(filter);
	}

	if (machineGroup !== undefined && machineGroup !== null && machineGroup.trim() !== '' && machineGroup !== 'ALL') {
		filter = {
			"type": "EQ",
			"fieldName": "machine_group",
			"value": machineGroup
		};
		queryObjects.push(filter);
	}

	if (model !== undefined && model !== null && model.trim() !== '' && model !== 'All') {
		filter = {
			"type": "EQ",
			"fieldName": "Machine_variant",
			"value": model
		};
		queryObjects.push(filter);
	}

	//var filter4 = {
	//    				"type": "EQ",
	//    				"fieldName": "is_Machine_Connected",
	//    				"value": true
	//    			};
	//queryObjects.push(filter4);  
	filter = {
		"type": "NotMissingValue",
		"fieldName": "CRMorCCS"
	};
	queryObjects.push(filter);

	filter = {
		"type": "NE",
		"fieldName": "Rated_pressure",
		"value": 0
	};
	queryObjects.push(filter);

	var params = {
		infoTableName: "InfoTable",
		dataShapeName: "ELGi.COMP.FixedSpeedCompressors.DS"
	};
	// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.ConnectedCompressors.DS)
	var result = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);

	var query = {
		"filters": {
			"type": "And",
			"filters": queryObjects
		}
	};

	// result: INFOTABLE dataShape: "RootEntityList"
	var queryResult = ThingTemplates["ELGi.comp.ELGiMaster.TT"].QueryImplementingThingsWithData({
		maxItems: undefined /* NUMBER */ ,
		nameMask: undefined /* STRING */ ,
		query: query /* QUERY */ ,
		tags: undefined /* TAGS */
	});

	// result: INFOTABLE dataShape: "ELGi.COMP.ConsumablesPropertyMapping.DS"
	var consumablesList = me.GetConsumablesList();

	var tableLength = queryResult.rows.length;
	for (var x = 0; x < tableLength; x++) {
		var row = queryResult.rows[x];
		var thingName = row.name;
		var consumableQuery = {
			"filters": {
				"type": "EQ",
				"fieldName": "propertyDisplayName",
				"value": consumableName
			}
		};

		// result: INFOTABLE
		var queryResult1 = Resources["InfoTableFunctions"].Query({
			t: consumablesList /* INFOTABLE */ ,
			query: consumableQuery /* QUERY */
		});

		var currentProperty = queryResult1.consumablesDueNowPropertyName;
		var next30DaysProperty = queryResult1.consumablesDue30DaysPropertyName;
		var next60DaysProperty = queryResult1.consumablesDue60DaysPropertyName;
        var remConsumablePropertyName = Things[thingName][queryResult1.actualPropertyName];

		if (consumableFilterValue === 'CURRENT') {
			if (Things[thingName][currentProperty] === true) {
				// ELGi.COMP.FixedSpeedCompressors.DS entry object
				var newEntry = new Object();
				newEntry.device_time = Things[thingName].device_time; // DATETIME
				newEntry.Machine_variant = Things[thingName].Machine_variant; // STRING
				//newEntry.customer_name = Things[thingName].customer_name; // STRING    
				newEntry.fabNo = Things[thingName].name; // STRING
				newEntry.Product_group = Things[thingName].Product_group; // STRING
				newEntry.consumable_name = consumableName;
				newEntry.isConnected = Things[thingName].is_machine_connected;

				newEntry.Customer = Things[thingName].customer_name; // INTEGER
				newEntry.Dealer = Things[thingName].dealer_name; // INTEGER
				newEntry.ServiceEngg = Things[thingName].service_engineer_name; // INTEGER
				newEntry.ASM = Things[thingName].area_sales_manager_name; // INTEGER
				newEntry.RSM = Things[thingName].regional_sales_manager_name; // INTEGER
				newEntry.Area = Things[thingName].area; // INTEGER
				newEntry.Region = Things[thingName].region; // INTEGER
				newEntry.Country = Things[thingName].country; // INTEGER
				//Customer : customer_name, Dealer : dealer_name, ServiceEngg : service_engineer_name, ASM : area_sales_manager_name, RSM : regional_sales_manager_name, Area : area, Region : region, Country : country       

				var faultStatus = Things[thingName].fault_status;
				var generalStatus = Things[thingName].general_status;
				if (faultStatus > 0) {
					newEntry.machine_status = 'TRIPPED';
				} else if (generalStatus === 32 || generalStatus === 128) {
					newEntry.machine_status = 'STOPPED';
				} else if (generalStatus === 1) {
					newEntry.machine_status = 'READY';
				} else if (generalStatus === 2) {
					newEntry.machine_status = 'STAR';
				} else if (generalStatus === 4) {
					newEntry.machine_status = 'RUN';
				} else if (generalStatus === 8) {
					newEntry.machine_status = 'RUN LOAD';
				} else if (generalStatus === 16) {
					newEntry.machine_status = 'RUN UNLOAD';
				} else if (generalStatus === 64) {
					newEntry.machine_status = 'IDLE';
				} else if (generalStatus === 256) {
					newEntry.machine_status = 'START INHIBIT';
				} else if (generalStatus === 512) {
					newEntry.machine_status = 'START ACK WAIT';
				} else if (generalStatus === 1024) {
					newEntry.machine_status = 'STANDBY';
				} else if (generalStatus === 2048) {
					newEntry.machine_status = 'TEMP. INHIBIT';
				}
				newEntry.description = remConsumablePropertyName;
				result.AddRow(newEntry);
			}
		} else if (consumableFilterValue === 'NEXT30DAYS') {
			if (Things[thingName][next30DaysProperty] === true) {
				// ELGi.COMP.FixedSpeedCompressors.DS entry object
				var newEntry = new Object();
				newEntry.device_time = Things[thingName].device_time; // DATETIME
				newEntry.Machine_variant = Things[thingName].Machine_variant; // STRING
				newEntry.customer_name = Things[thingName].customer_name; // STRING    
				newEntry.fabNo = Things[thingName].name; // STRING
				newEntry.Product_group = Things[thingName].Product_group; // STRING
				newEntry.consumable_name = consumableName;
				newEntry.isConnected = Things[thingName].is_machine_connected;
                
				newEntry.Customer = Things[thingName].customer_name; // INTEGER
				newEntry.Dealer = Things[thingName].dealer_name; // INTEGER
				newEntry.ServiceEngg = Things[thingName].service_engineer_name; // INTEGER
				newEntry.ASM = Things[thingName].area_sales_manager_name; // INTEGER
				newEntry.RSM = Things[thingName].regional_sales_manager_name; // INTEGER
				newEntry.Area = Things[thingName].area; // INTEGER
				newEntry.Region = Things[thingName].region; // INTEGER
				newEntry.Country = Things[thingName].country; // INTEGER
				//Customer : customer_name, Dealer : dealer_name, ServiceEngg : service_engineer_name, ASM : area_sales_manager_name, RSM : regional_sales_manager_name, Area : area, Region : region, Country : country       

				var faultStatus = Things[thingName].fault_status;
				var generalStatus = Things[thingName].general_status;
				if (faultStatus > 0) {
					newEntry.machine_status = 'TRIPPED';
				} else if (generalStatus === 32 || generalStatus === 128) {
					newEntry.machine_status = 'STOPPED';
				} else if (generalStatus === 1) {
					newEntry.machine_status = 'READY';
				} else if (generalStatus === 2) {
					newEntry.machine_status = 'STAR';
				} else if (generalStatus === 4) {
					newEntry.machine_status = 'RUN';
				} else if (generalStatus === 8) {
					newEntry.machine_status = 'RUN LOAD';
				} else if (generalStatus === 16) {
					newEntry.machine_status = 'RUN UNLOAD';
				} else if (generalStatus === 64) {
					newEntry.machine_status = 'IDLE';
				} else if (generalStatus === 256) {
					newEntry.machine_status = 'START INHIBIT';
				} else if (generalStatus === 512) {
					newEntry.machine_status = 'START ACK WAIT';
				} else if (generalStatus === 1024) {
					newEntry.machine_status = 'STANDBY';
				} else if (generalStatus === 2048) {
					newEntry.machine_status = 'TEMP. INHIBIT';
				}
				newEntry.description = remConsumablePropertyName;
				result.AddRow(newEntry);
			}
		} else if (consumableFilterValue === 'NEXT60DAYS') {
			if (Things[thingName][next60DaysProperty] === true) {
				// ELGi.COMP.FixedSpeedCompressors.DS entry object
				var newEntry = new Object();
				newEntry.device_time = Things[thingName].device_time; // DATETIME
				newEntry.Machine_variant = Things[thingName].Machine_variant; // STRING
				newEntry.customer_name = Things[thingName].customer_name; // STRING    
				newEntry.fabNo = Things[thingName].name; // STRING
				newEntry.Product_group = Things[thingName].Product_group; // STRING
				newEntry.consumable_name = consumableName;
				newEntry.isConnected = Things[thingName].is_machine_connected;
                
				newEntry.Customer = Things[thingName].customer_name; // INTEGER
				newEntry.Dealer = Things[thingName].dealer_name; // INTEGER
				newEntry.ServiceEngg = Things[thingName].service_engineer_name; // INTEGER
				newEntry.ASM = Things[thingName].area_sales_manager_name; // INTEGER
				newEntry.RSM = Things[thingName].regional_sales_manager_name; // INTEGER
				newEntry.Area = Things[thingName].area; // INTEGER
				newEntry.Region = Things[thingName].region; // INTEGER
				newEntry.Country = Things[thingName].country; // INTEGER
				//Customer : customer_name, Dealer : dealer_name, ServiceEngg : service_engineer_name, ASM : area_sales_manager_name, RSM : regional_sales_manager_name, Area : area, Region : region, Country : country       

				var faultStatus = Things[thingName].fault_status;
				var generalStatus = Things[thingName].general_status;
				if (faultStatus > 0) {
					newEntry.machine_status = 'TRIPPED';
				} else if (generalStatus === 32 || generalStatus === 128) {
					newEntry.machine_status = 'STOPPED';
				} else if (generalStatus === 1) {
					newEntry.machine_status = 'READY';
				} else if (generalStatus === 2) {
					newEntry.machine_status = 'STAR';
				} else if (generalStatus === 4) {
					newEntry.machine_status = 'RUN';
				} else if (generalStatus === 8) {
					newEntry.machine_status = 'RUN LOAD';
				} else if (generalStatus === 16) {
					newEntry.machine_status = 'RUN UNLOAD';
				} else if (generalStatus === 64) {
					newEntry.machine_status = 'IDLE';
				} else if (generalStatus === 256) {
					newEntry.machine_status = 'START INHIBIT';
				} else if (generalStatus === 512) {
					newEntry.machine_status = 'START ACK WAIT';
				} else if (generalStatus === 1024) {
					newEntry.machine_status = 'STANDBY';
				} else if (generalStatus === 2048) {
					newEntry.machine_status = 'TEMP. INHIBIT';
				}
				newEntry.description = remConsumablePropertyName;
				result.AddRow(newEntry);
			}
		} else if (consumableFilterValue === 'ALL') {
			if (Things[thingName][currentProperty] === true || Things[thingName][next30DaysProperty] === true || Things[thingName][next60DaysProperty] === true) {
				// ELGi.COMP.FixedSpeedCompressors.DS entry object
				var newEntry = new Object();
				newEntry.device_time = Things[thingName].device_time; // DATETIME
				newEntry.Machine_variant = Things[thingName].Machine_variant; // STRING
				newEntry.customer_name = Things[thingName].customer_name; // STRING    
				newEntry.fabNo = Things[thingName].name; // STRING
				newEntry.Product_group = Things[thingName].Product_group; // STRING
				newEntry.consumable_name = consumableName;
				newEntry.isConnected = Things[thingName].is_machine_connected;
                
				newEntry.Customer = Things[thingName].customer_name; // INTEGER
				newEntry.Dealer = Things[thingName].dealer_name; // INTEGER
				newEntry.ServiceEngg = Things[thingName].service_engineer_name; // INTEGER
				newEntry.ASM = Things[thingName].area_sales_manager_name; // INTEGER
				newEntry.RSM = Things[thingName].regional_sales_manager_name; // INTEGER
				newEntry.Area = Things[thingName].area; // INTEGER
				newEntry.Region = Things[thingName].region; // INTEGER
				newEntry.Country = Things[thingName].country; // INTEGER
				//Customer : customer_name, Dealer : dealer_name, ServiceEngg : service_engineer_name, ASM : area_sales_manager_name, RSM : regional_sales_manager_name, Area : area, Region : region, Country : country       

				var faultStatus = Things[thingName].fault_status;
				var generalStatus = Things[thingName].general_status;
				if (faultStatus > 0) {
					newEntry.machine_status = 'TRIPPED';
				} else if (generalStatus === 32 || generalStatus === 128) {
					newEntry.machine_status = 'STOPPED';
				} else if (generalStatus === 1) {
					newEntry.machine_status = 'READY';
				} else if (generalStatus === 2) {
					newEntry.machine_status = 'STAR';
				} else if (generalStatus === 4) {
					newEntry.machine_status = 'RUN';
				} else if (generalStatus === 8) {
					newEntry.machine_status = 'RUN LOAD';
				} else if (generalStatus === 16) {
					newEntry.machine_status = 'RUN UNLOAD';
				} else if (generalStatus === 64) {
					newEntry.machine_status = 'IDLE';
				} else if (generalStatus === 256) {
					newEntry.machine_status = 'START INHIBIT';
				} else if (generalStatus === 512) {
					newEntry.machine_status = 'START ACK WAIT';
				} else if (generalStatus === 1024) {
					newEntry.machine_status = 'STANDBY';
				} else if (generalStatus === 2048) {
					newEntry.machine_status = 'TEMP. INHIBIT';
				}
                newEntry.description = remConsumablePropertyName;
//				if (Things[thingName][next60DaysProperty] === true) {
//					newEntry.description = remConsumablePropertyName;
//				} else if (Things[thingName][next30DaysProperty] === true) {
//					newEntry.description = 'Next 30 Days';
//				} else {
//					newEntry.description = 'Current';
//				}
				result.AddRow(newEntry);
			}
		}
	}

	logger.debug("**********END**********");

} catch (err) {
	logger.error("Error123 : " + err);
}
