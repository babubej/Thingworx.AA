var queryObjects = new Array();
var queryObjects1 = new Array();
var serviceFilterName;
var filter, filter1;
var flag = false;

if (fabNumber !== undefined && fabNumber !== null && fabNumber.trim() !== '') {

	filter = {
		"type": "LIKE",
		"fieldName": "name",
		"value": '*' + fabNumber + '*'
	};
	queryObjects.push(filter);
}

if (serviceDueFilter !== null && serviceDueFilter !== '') {
	if (serviceDueFilter === 'OVERDUE') {
		serviceFilterName = 'IsServiceOverdue';
	} else if (serviceDueFilter === 'DUE') {
		serviceFilterName = 'IsServiceDue';
	} else if (serviceDueFilter === 'DUESOON') {
		serviceFilterName = 'IsServiceDueSoon';
	}
	if (serviceDueFilter === 'ALL' || serviceDueFilter === undefined) {

		filter1 = {
			"type": "EQ",
			"fieldName": 'IsServiceOverdue',
			"value": true
		};
		queryObjects1.push(filter1);

		filter1 = {
			"type": "EQ",
			"fieldName": 'IsServiceDue',
			"value": true
		};
		queryObjects1.push(filter1);

		filter1 = {
			"type": "EQ",
			"fieldName": 'IsServiceDueSoon',
			"value": true
		};
		queryObjects1.push(filter1);

		flag = true;

	} else {

		filter = {
			"type": "EQ",
			"fieldName": serviceFilterName,
			"value": true
		};
		queryObjects.push(filter);
	}

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

//var filter4 = {
//    				"type": "EQ",
//    				"fieldName": "is_Machine_Connected",
//    				"value": true
//    			};
//
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
	dataShapeName: "ELGi.COMP.ServiceOfCompressors.DS"
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

if (flag) {
	var query1 = {
		"filters": {
			"type": "Or",
			"filters": queryObjects1
		}
	};

	var params1 = {
		t: queryResult /* INFOTABLE */ ,
		query: query1 /* QUERY */
	};

	// result: INFOTABLE
	queryResult = Resources["InfoTableFunctions"].Query(params1);
}

// result: INFOTABLE dataShape: "ELGi.COMP.ConsumablesPropertyMapping.DS"
var consumablesList = me.GetConsumablesList();

var tableLength = queryResult.rows.length;
for (var x = 0; x < tableLength; x++) {
	var row = queryResult.rows[x];
	var consumableName = row["MinValueConsumableName"];
	var queryResult1;
	if (consumableName !== undefined && consumableName.trim() !== "") {
		var consumableQuery = {
			"filters": {
				"type": "EQ",
				"fieldName": "actualPropertyName",
				"value": consumableName
			}
		};

		// result: INFOTABLE
		queryResult1 = Resources["InfoTableFunctions"].Query({
			t: consumablesList /* INFOTABLE */ ,
			query: consumableQuery /* QUERY */
		});
	}


	// ELGi.COMP.ConnectedCompressors.DS entry object    
	var newEntry = new Object();
	newEntry.device_time = row.device_time; // DATETIME
	newEntry.Machine_variant = row.Machine_variant; // STRING
	//newEntry.customer_name = row.customer_name; // STRING    
	newEntry.fabNo = row.name; // STRING
	newEntry.Product_group = row.Product_group; // STRING
	newEntry.Customer = row.customer_name; // INTEGER
	newEntry.Dealer = row.dealer_name; // INTEGER
	newEntry.ServiceEngg = row.service_engineer_name; // INTEGER
	newEntry.ASM = row.area_sales_manager_name; // INTEGER
	newEntry.RSM = row.regional_sales_manager_name; // INTEGER
	newEntry.Area = row.area; // INTEGER
	newEntry.Region = row.region; // INTEGER
	newEntry.Country = row.country; // INTEGER
	//Customer : customer_name, Dealer : dealer_name, ServiceEngg : service_engineer_name, ASM : area_sales_manager_name, RSM : regional_sales_manager_name, Area : area, Region : region, Country : country       
	var faultStatus = row.fault_status;
	var generalStatus = row.general_status;
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
	if( queryResult1 !== undefined && queryResult1.rows.length > 0 ){
    	newEntry.description = queryResult1[0].propertyDisplayName;
		newEntry.ConsumableValue = row[consumableName];
    } else {
    	newEntry.description = "--";
		newEntry.ConsumableValue = null;
    }
	

	//ELGi.COMP.ServiceOfCompressorsDetailsL3.MU
	//	if (row.IsServiceOverdue === true) {
	//		newEntry.description = queryResult1[0].propertyDisplayName;
	//		newEntry.description = 'OVERDUE';
	//	} else if (row.IsServiceDue === true) {
	//		newEntry.description = 'DUE';
	//	} else if (row.IsServiceDueSoon === true) {
	//		newEntry.description = 'DUE SOON';
	//	} else {
	//		newEntry.description = '--';
	//	}
	newEntry.isConnected = row.is_machine_connected; // BOOLEAN
	result.AddRow(newEntry);

}
