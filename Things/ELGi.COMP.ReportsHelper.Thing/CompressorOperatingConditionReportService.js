var query, filter;
var queryObjects = new Array();

var params = {
	infoTableName: "InfoTable",
	dataShapeName: "ELGi.comp.ELGiCRM.PLM.ParametersFor_CompressorOperatingConditionReport.DS"
};

// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.comp.ELGiCRM.PLM.Parameters.DS)
var toShowFaultAlertStatus = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);

if (inWarranty !== undefined && inWarranty !== null && inWarranty !== '' && inWarranty !== false && inWarranty !== 'false') {
	filter = {
		"type": "EQ",
		"fieldName": "warranty_status",
		"value": true
	};
	queryObjects.push(filter);
}

if (isKeyCustomer !== undefined && isKeyCustomer !== null && isKeyCustomer !== '' && isKeyCustomer !== false && isKeyCustomer !== 'false') {
	filter = {
		"type": "EQ",
		"fieldName": "isKeyCustomer",
		"value": true
	};
	queryObjects.push(filter);
}

if (productGroup !== undefined && productGroup !== null && productGroup.trim() !== '' && productGroup !== 'ALL') {
	filter = {
		"type": "EQ",
		"fieldName": "machine_group",
		"value": productGroup
	};
	queryObjects.push(filter);
}

if (machineVariant !== undefined && machineVariant !== null && machineVariant.trim() !== '' && machineVariant !== 'All') {
	filter = {
		"type": "EQ",
		"fieldName": "Machine_variant",
		"value": machineVariant
	};
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

query = {
	"filters": {
		"type": "And",
		"filters": queryObjects
	}
};

// result: INFOTABLE dataShape: "RootEntityList"
var thingsList = ThingTemplates["ELGi.comp.ELGiMaster.TT"].QueryImplementingThingsWithData({
	maxItems: undefined /* NUMBER */ ,
	nameMask: undefined /* STRING */ ,
	query: query /* QUERY */ ,
	tags: undefined /* TAGS */
});

var currentDate = new Date();
var newEntry;
var tableLength = thingsList.rows.length;

for (var x = 0; x < tableLength; x++) {
	var row = thingsList.rows[x];

	// ELGi.comp.ELGiCRM.PLM.ParametersFor_CompressorOperatingConditionReport.DS entry object
	newEntry = new Object();
	newEntry.FAB_No = row.name; // STRING
	newEntry.Model = row.Machine_variant; // STRING
	newEntry.Product = row.machine_group;
    if( row.Avg_Util_Percent === 0  ){
    	newEntry.AvgUtilizationPecentage = ""; // NUMBER
    } else {
    	newEntry.AvgUtilizationPecentage = row.Avg_Util_Percent; // NUMBER
    }
    
    if( row.Median_Discharge_Pressure === 0  ){
    	newEntry.Discharge_Pressure_Median = ""; // NUMBER
    } else {
    	newEntry.Discharge_Pressure_Median = row.Median_Discharge_Pressure; // NUMBER
    }
    
    if( row.Max_Discharge_Pressure === 0  ){
    	newEntry.Discharge_Pressure_Max = ""; // NUMBER
    } else {
    	newEntry.Discharge_Pressure_Max = row.Max_Discharge_Pressure; // NUMBER
    }
    
    if( row.Median_Discharge_Temperature === 0  ){
    	newEntry.Discharge_Temp_Median = ""; // NUMBER
    } else {
    	newEntry.Discharge_Temp_Median = row.Median_Discharge_Temperature; // NUMBER
    }
	
    if( row.Max_Discharge_Temperature === 0  ){
    	newEntry.Discharge_Temp_Max = ""; // NUMBER
    } else {
    	newEntry.Discharge_Temp_Max = row.Max_Discharge_Temperature; // NUMBER
    }
    
    if( row.Median_Sump_Pressure === 0  ){
    	newEntry.Sump_Pressure_Median = ""; // NUMBER
    } else {
    	newEntry.Sump_Pressure_Median = row.Median_Sump_Pressure; // NUMBER
    }
	
    if( row.Max_Sump_Pressure === 0  ){
    	newEntry.Sump_Pressure_Max = ""; // NUMBER
    } else {
    	newEntry.Sump_Pressure_Max = row.Max_Sump_Pressure; // NUMBER
    }
    
    if( row.Max_CFM === 0  ){
    	newEntry.CFM_Max = ""; // NUMBER
    } else {
    	newEntry.CFM_Max = row.Max_CFM; // NUMBER
    }
    
    if( row.Median_CFM === 0  ){
    	newEntry.CFM_Median = ""; // NUMBER
    } else {
    	newEntry.CFM_Median = row.Median_CFM; // NUMBER
    }
    
    if( row.Median_VFD_Speed_Per === 0  ){
    	newEntry.VFD_Speed_Median = ""; // NUMBER
    } else {
    	newEntry.VFD_Speed_Median = row.Median_VFD_Speed_Per; // NUMBER
    }
	
    if( row.Max_VFD_Speed_Per === 0  ){
    	newEntry.VFD_Speed_Max = ""; // NUMBER
    } else {
    	newEntry.VFD_Speed_Max = row.Max_VFD_Speed_Per; // NUMBER
    }
    
    if( row.Median_Ambient_Temperature === 0  ){
    	newEntry.Ambient_Temp_Median = ""; // NUMBER
    } else {
    	newEntry.Ambient_Temp_Median = row.Median_Ambient_Temperature; // NUMBER
    }
    
    if( row.Max_Ambient_Temperature === 0  ){
    	newEntry.Ambient_Temp_Max = ""; // NUMBER
    } else {
    	newEntry.Ambient_Temp_Max = row.Max_Ambient_Temperature; // NUMBER
    }
    
    if( row.cum_load === 0  ){
    	newEntry.Cum_Load_hrs = ""; // NUMBER
    } else {
    	newEntry.Cum_Load_hrs = row.cum_load; // NUMBER
    }
    
    if( row.cum_unload === 0  ){
    	newEntry.Cum_Unload_hours = ""; // NUMBER
    } else {
    	newEntry.Cum_Unload_hours = row.cum_unload; // NUMBER
    }
    
    if( row.cum_unload === 0  ){
    	newEntry.Cum_Unload_hours = ""; // NUMBER
    } else {
    	newEntry.Cum_Unload_hours = row.cum_unload; // NUMBER
    }
    
    if( row.cum_run === 0  ){
    	newEntry.Cumulative_HMR = ""; // NUMBER
    } else {
    	newEntry.Cumulative_HMR = row.cum_run; // NUMBER
    }
    
	newEntry.Cum_Power_consumed = undefined; // NUMBER			
	newEntry.Customer = row.customer_name; // STRING
	if (row.isKeyCustomer === true) {
		newEntry.Key_Customer = "Yes";
	} else {
		newEntry.Key_Customer = "No";
	}
	if (row.warranty_status === true) {
		newEntry.Warranty_Status = "In warranty";
	} else {
		newEntry.Warranty_Status = "Warranty Expired";
	}
	newEntry.Dealer_name = row.dealer_name; // STRING
	newEntry.Area = row.area; // STRING
	//newEntry.Dealer_contact = undefined; // STRING
	toShowFaultAlertStatus.AddRow(newEntry);
}
var result = toShowFaultAlertStatus;
