var queryObjects = new Array();
var booleanValue;

if (fabNumber !== undefined && fabNumber !== null && fabNumber.trim() !== '') {

	var filter1 = {
		"type": "LIKE",
		"fieldName": "name",
		"value": '*' + fabNumber + '*'
	};
	queryObjects.push(filter1);
}

if (commisioningFilter !== undefined && commisioningFilter !== null && commisioningFilter.trim() !== '' && commisioningFilter !== 'ALL') {
	if (commisioningFilter === 'FACTORY FIT') {
		booleanValue = false;
	} else {
		booleanValue = true;
	}

	var filter2 = {
		"type": "EQ",
		"fieldName": "isRetrofitted",
		"value": booleanValue
	};
	queryObjects.push(filter2);
}

if (warrantyFilter !== undefined && warrantyFilter !== null && warrantyFilter.trim() !== '') {

	if (warrantyFilter === 'IN WARRANTY') {
		booleanValue = true;
	} else {
		booleanValue = false;
	}

	var filter3 = {
		"type": "EQ",
		"fieldName": "warranty_status",
		"value": booleanValue
	};
	queryObjects.push(filter3);
}
var filter;
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
var filter5 = {
	"type": "NotMissingValue",
	"fieldName": "CRMorCCS"
};
queryObjects.push(filter5);

var filter6 = {
	"type": "NE",
	"fieldName": "Rated_pressure",
	"value": 0
};
queryObjects.push(filter6);

var params = {
	infoTableName: "InfoTable",
	dataShapeName: "ELGi.COMP.ConnectedCompressors.DS"
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
    
	if (row.is_Machine_Connected === true) {
        newEntry.utilization = row.utilization; // INTEGER
        newEntry.dis_pressure = row.dis_pressure; // INTEGER
    	newEntry.dis_temp = row.dis_temperature; // INTEGER
		newEntry.description = 'CONNECTED';
		var generalStatus = row.general_status;
		var faultStatus = row.fault_status;
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
        newEntry.dis_pressure = null; // INTEGER
    	newEntry.dis_temp = null; // INTEGER
		newEntry.description = 'NOT CONNECTED';
		newEntry.machine_status = '--';
	} else {
        newEntry.utilization = null; // INTEGER
        newEntry.dis_pressure = null; // INTEGER
    	newEntry.dis_temp = null; // INTEGER
		newEntry.machine_status = '--';
	}

	result.AddRow(newEntry);
}

logger.debug("**********END**********");
