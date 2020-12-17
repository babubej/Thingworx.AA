var queryObjects = new Array();
var filter;

try {

	if (fabNumber !== undefined && fabNumber !== null && fabNumber.trim() !== '') {

		filter = {
			"type": "LIKE",
			"fieldName": "name",
			"value": '*' + fabNumber + '*'
		};
		queryObjects.push(filter);
	}

	if (healthFilter !== undefined && healthFilter !== null && healthFilter.trim() !== '' && healthFilter !== 'ALL') {
		//var filter2;
		if (healthFilter === 'HEALTHY') {
			//	var filter2_1, filter2_2, filter2_3;
			filter = {
				"type": "EQ",
				"fieldName": "fault_status",
				"value": 0
			};
			queryObjects.push(filter);

			filter = {
				"type": "EQ",
				"fieldName": "predicted_alert_count",
				"value": 0
			};
			queryObjects.push(filter);

			//		filter2_3 = {
			//					"type": "EQ",
			//					"fieldName": "is_Machine_Connected",
			//					"value": true
			//				};
			//     	queryObjects.push(filter2_3);  

		} else if (healthFilter === 'PREDICTED') {
			filter = {
				"type": "GT",
				"fieldName": "predicted_alert_count",
				"value": 0
			};
			queryObjects.push(filter);

		} else if (healthFilter === 'DETECTED') {
			filter = {
				"type": "GT",
				"fieldName": "fault_status",
				"value": 0
			};
			queryObjects.push(filter);
		}
		//queryObjects.push(filter2);                       
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

	if (model !== undefined && model !== null && model.trim() !== '' && model !== 'ALL') {
		filter = {
			"type": "EQ",
			"fieldName": "Machine_variant",
			"value": model
		};
		queryObjects.push(filter);
	}

	if (status !== null && status !== -1 && status !== 0) {
		if (status === -2) {
			filter = {
				"type": "GT",
				"fieldName": "fault_status",
				"value": 0
			};
		} else {
			filter = {
				"type": "EQ",
				"fieldName": "general_status",
				"value": status
			};
		}
		queryObjects.push(filter);
	}

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

	logger.debug("QUERY : " + queryObjects);

	var params = {
		infoTableName: "InfoTable",
		dataShapeName: "ELGi.COMP.HealthOfCompressors.DS"
	};
	// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.FirmwareStausOfCompressors.DS)
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

	var tableLength = queryResult.rows.length;
	for (var x = 0; x < tableLength; x++) {
		var row = queryResult.rows[x];

		// ELGi.COMP.ConnectedCompressors.DS entry object
		var newEntry = new Object();
		newEntry.fabNo = row.name; // STRING    
		newEntry.isConnected = row.is_machine_connected; // BOOLEAN
		newEntry.fault_status = row.fault_status; // INTEGER    
		newEntry.Machine_variant = row.Machine_variant; // STRING
		newEntry.customer_name = row.customer_name; // STRING    
		newEntry.machine_name = row.machine_name; // STRING
		newEntry.device_time = row.device_time; // DATETIME  
		newEntry.general_status = row.general_status; // INTEGER
		newEntry.warn_status = row.warn_status; // INTEGER
		newEntry.rated_pressure = row.Rated_pressure; // INTEGER
		newEntry.rated_power = row.Rated_Power; // INTEGER
		newEntry.rated_cfm = row.Rated_CFM; // INTEGER
		newEntry.operating_frequency = row.Operating_Frequency; // INTEGER
		newEntry.operating_voltage = row.Operating_Voltage; // INTEGER
		newEntry.Customer = row.customer_name; // INTEGER
		newEntry.Dealer = row.dealer_name; // INTEGER
		newEntry.ServiceEngg = row.service_engineer_name; // INTEGER
		newEntry.ASM = row.area_sales_manager_name; // INTEGER
		newEntry.RSM = row.regional_sales_manager_name; // INTEGER
		newEntry.Area = row.area; // INTEGER
		newEntry.Region = row.region; // INTEGER
		newEntry.Country = row.country; // INTEGER
		//Customer : customer_name, Dealer : dealer_name, ServiceEngg : service_engineer_name, ASM : area_sales_manager_name, RSM : regional_sales_manager_name, Area : area, Region : region, Country : country       
		var generalStatus = row.general_status;
		var faultStatus = row.fault_status;
		if (row.is_Machine_Connected === true) {
			newEntry.utilization = row.utilization; // INTEGER
			newEntry.description = 'CONNECTED';

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
		} else if (row.is_Machine_Connected === false) {
			newEntry.utilization = null; // INTEGER		
			newEntry.machine_status = '--';
		} else {
			newEntry.utilization = null; // INTEGER
			newEntry.machine_status = '--';
		}

		if (faultStatus > 0) {
			var detectedFault = Things["ELGi.COMP.ReportsHelper.Thing"].GetDetectedFaults({
				fault_status: faultStatus /* INTEGER */
			});
			newEntry.description = detectedFault;
		} else if (row.predicted_alert_count > 0) {

			// dateValue:DATETIME
			var currentDate = new Date();

			// dateAddDays(dateValue:DATETIME, amount:NUMBER):STRING
			var startDate = dateAddDays(currentDate, -15);

			var streamQuery1 = {
				"filters": {
					"type": "And",
					"filters": [{
							"type": "EQ",
							"fieldName": "FabNumber",
							"value": row.name
						}
						//,
						//					{
						//						"type": "EQ",
						//						"fieldName": "RuleResult",
						//						"value": true
						//					}
					]
				}
			};
			// result: INFOTABLE dataShape: ""
			var streamQueryResult1 = Things["ELGi.COMP.ExecutedRules.Stream"].QueryStreamData({
				oldestFirst: false /* BOOLEAN */ ,
				maxItems: undefined /* NUMBER */ ,
				sourceTags: undefined /* TAGS */ ,
				endDate: currentDate /* DATETIME */ ,
				query: streamQuery1 /* QUERY */ ,
				source: undefined /* STRING */ ,
				startDate: startDate /* DATETIME */ ,
				tags: undefined /* TAGS */
			});

			var streamQuery2 = {
				"filters": {
					"type": "Or",
					"filters": [{
							"type": "EQ",
							"fieldName": "AlertStatus",
							"value": 'TRIGGERED'
						},
						{
							"type": "EQ",
							"fieldName": "AlertStatus",
							"value": 'RESET'
						}
					]
				}
			};

			var params1 = {
				t: streamQueryResult1 /* INFOTABLE */ ,
				query: streamQuery2 /* QUERY */
			};
			// result: INFOTABLE
			var streamQueryResult2 = Resources["InfoTableFunctions"].Query(params1);

			var symptomsToIgnore = new Array();
			var symptomsToConsider = new Array();
			var tableLength1 = streamQueryResult2.rows.length;
			for (var z = 0; z < tableLength1; z++) {
				var row1 = streamQueryResult2.rows[z];
				if (row1.AlertStatus === 'RESET') {
					symptomsToIgnore.push(row1.Symptom);
				} else if (row1.AlertStatus === 'TRIGGERED') {
					symptomsToConsider.push(row1.Symptom);
				}
			}

			var uniqueSymp = symptomsToConsider.filter(function(c, index) {
				return symptomsToConsider.indexOf(c) === index;
			});

			logger.debug("Array Length : " + symptomsToConsider.length + ' ' + symptomsToIgnore.length);
			var sym = '';
			var arrlength = uniqueSymp.length; // [a,b,c] [b,c]
			var arrlength1 = symptomsToIgnore.length;
			for (var a = 0; a < arrlength; a++) {
				var flag = 0;
				for (var b = 0; b < arrlength1; b++) {
					if (uniqueSymp[a] === symptomsToIgnore[b]) {
						flag = 1;
						break;
					} else {
						flag = 2;
					}
				}
				if (a === 0) {
					sym = sym + uniqueSymp[a];
				} else {
					if (flag !== 1) {
						sym = sym + ',' + uniqueSymp[a];
					}
				}
			}

			newEntry.description = sym;

			//		if (faultStatus > 0) {
			//			newEntry.description = 'DETECTED WITH FAULT';
			//		} else if (row.predicted_alert_count > 0) {
			//			newEntry.description = 'PREDICTED WITH FAULT';
			//		}
		} else {
			newEntry.description = 'HEALTHY';
		}
		result.AddRow(newEntry);
	}
} catch (err) {
	logger.error("Error : " + err);
}
