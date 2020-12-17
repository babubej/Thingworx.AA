var queryObjects = new Array();
var utilisationFilterName = 'ALL';
var filter;

if (fabNumber !== undefined && fabNumber !== null && fabNumber.trim() !== '') {

	filter = {
		"type": "LIKE",
		"fieldName": "name",
		"value": '*' + fabNumber + '*'
	};
	queryObjects.push(filter);
}

if (ontimeFilter !== undefined && ontimeFilter !== null && ontimeFilter.trim() !== '' && ontimeFilter !== 'ALL') {
	if (ontimeFilter === 'ONTIME') {
		ontimeFilter = 'ONTIME';
	} else if (ontimeFilter === 'LT200OVERDUE') {
		ontimeFilter = 'LT200OVERDUE';
	} else if (ontimeFilter === 'GT200OVERDUE') {
		ontimeFilter = 'GT200OVERDUE';
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
//	"type": "EQ",
//	"fieldName": "isVfd_Connected",
//	"value": false
//};
//queryObjects.push(filter4);
//
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
	dataShapeName: "ELGi.COMP.OnTimeCompressors.DS"
};
// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.OnTimeCompressors.DS)
var result = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);

var query = {
	"filters": {
		"type": "And",
		"filters": queryObjects
	}
};

// result: INFOTABLE dataShape: "RootEntityList"
var queryResult1 = ThingTemplates["ELGi.comp.ELGiMaster.TT"].QueryImplementingThingsWithData({
	maxItems: undefined /* NUMBER */ ,
	nameMask: undefined /* STRING */ ,
	query: query /* QUERY */ ,
	tags: undefined /* TAGS */
});

var currentDate = new Date();
var startDate = dateAddDays(currentDate, -90);

var propertyList = Things['ELGi.COMP.CalculationsHelper.Thing'].ConsumablesMapping;
var newEntry;
var tableLength = propertyList.rows.length;
for (var x = 0; x < tableLength; x++) {
	var row = propertyList.rows[x];
	var eventDatePropertyName = row.eventPropertyName;
	var valueAtEventPropertyName = row.valueAtEventPropertyName;

	var tableLength1 = queryResult1.rows.length;
	for (var y = 0; y < tableLength1; y++) {
		thingName = queryResult1.rows[y].name;
		// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(EntityList)
		var propList = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape({
			infoTableName: "InfoTable",
			dataShapeName: "EntityList"
		});
		// EntityList entry object
		newEntry = new Object();
		newEntry.name = eventDatePropertyName; // STRING [Primary Key]
		newEntry.description = undefined; // STRING
		propList.AddRow(newEntry);
		// EntityList entry object
		newEntry = new Object();
		newEntry.name = valueAtEventPropertyName; // STRING [Primary Key]
		newEntry.description = undefined; // STRING
		propList.AddRow(newEntry);

		// result: INFOTABLE dataShape: ""
		var history = Things[thingName].QueryNamedPropertyHistory({
			oldestFirst: undefined /* BOOLEAN */ ,
			maxItems: 500 /* NUMBER */ ,
			endDate: currentDate /* DATETIME */ ,
			propertyNames: propList /* INFOTABLE */ ,
			query: undefined /* QUERY */ ,
			startDate: startDate /* DATETIME */
		});

		//Iterate History
		var tableLength2 = history.rows.length;
		for (var z = 0; z < tableLength2; z++) {
			var row1 = history.rows[z];
			if (ontimeFilter === 'ONTIME' && row1[valueAtEventPropertyName] >= 0) {
				if (row1[valueAtEventPropertyName] >= 0) {
					//On Time
					// ELGi.COMP.ConnectedCompressors.DS entry object
					var newEntry = new Object();
					newEntry.device_time = Things[thingName].device_time; // DATETIME
					newEntry.Machine_variant = Things[thingName].Machine_variant; // STRING
					//newEntry.customer_name = Things[thingName].customer_name; // STRING    
					newEntry.fabNo = Things[thingName].name; // STRING
					newEntry.Product_group = Things[thingName].Product_group; // STRING
					newEntry.consumable_name = row.propertyDisplayName;
					newEntry.isConnected = Things[thingName].is_machine_connected;
                    newEntry.Customer = Things[thingName].customer_name;
                    newEntry.Dealer = Things[thingName].Dealer;
                    newEntry.ServiceEngg = Things[thingName].service_engineer_name;
                    newEntry.ASM = Things[thingName].area_sales_manager_name;
                    newEntry.RSM = Things[thingName].regional_sales_manager_name;
                    newEntry.Area = Things[thingName].area;
                    newEntry.Region = Things[thingName].region;
                    newEntry.Country = Things[thingName].country;           
                    newEntry.ServiceDate = row1[eventDatePropertyName];           
                    newEntry.ConsumableValueBeforeService = row1[valueAtEventPropertyName];    
                    logger.debug("SERVICE DATE :"+row1[valueAtEventPropertyName]);
                 
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
					newEntry.description = 'On Time';
					result.AddRow(newEntry);
				}
			} else if (ontimeFilter === 'LT200OVERDUE' && (row1[valueAtEventPropertyName] < 0 && row1[valueAtEventPropertyName] >= -200)) {
				if (row1[valueAtEventPropertyName] < 0 && row1[valueAtEventPropertyName] >= -200) {
					//Over Due LT 200 Hrs
					// ELGi.COMP.ConnectedCompressors.DS entry object
					var newEntry = new Object();
					newEntry.device_time = Things[thingName].device_time; // DATETIME
					newEntry.Machine_variant = Things[thingName].Machine_variant; // STRING
					newEntry.customer_name = Things[thingName].customer_name; // STRING    
					newEntry.fabNo = Things[thingName].name; // STRING
					newEntry.Product_group = Things[thingName].Product_group; // STRING
					newEntry.consumable_name = row.propertyDisplayName;
					newEntry.isConnected = Things[thingName].is_machine_connected;
                    newEntry.Customer = Things[thingName].customer_name;
                    newEntry.Dealer = Things[thingName].dealer_name;
                    newEntry.ServiceEngg = Things[thingName].service_engineer_name;
                    newEntry.ASM = Things[thingName].area_sales_manager_name;
                    newEntry.RSM = Things[thingName].regional_sales_manager_name;
                    newEntry.Area = Things[thingName].area;
                    newEntry.Region = Things[thingName].region;
                    newEntry.Country = Things[thingName].country;    
                    newEntry.ServiceDate = row1[eventDatePropertyName];           
                    newEntry.ConsumableValueBeforeService = row1[valueAtEventPropertyName];           
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
					newEntry.description = 'Over Due < 200 Hrs';
					result.AddRow(newEntry);
				}
			} else if (ontimeFilter === 'GT200OVERDUE' && row1[valueAtEventPropertyName] < -200) {
				if (row1[valueAtEventPropertyName] < -200) {
					//Over Due GT 200 Hrs
					// ELGi.COMP.ConnectedCompressors.DS entry object
					var newEntry = new Object();
					newEntry.device_time = Things[thingName].device_time; // DATETIME
					newEntry.Machine_variant = Things[thingName].Machine_variant; // STRING
					newEntry.customer_name = Things[thingName].customer_name; // STRING    
					newEntry.fabNo = Things[thingName].name; // STRING
					newEntry.Product_group = Things[thingName].Product_group; // STRING
					newEntry.consumable_name = row.propertyDisplayName;
					newEntry.isConnected = Things[thingName].is_machine_connected;
                    newEntry.Customer = Things[thingName].customer_name;
                    newEntry.Dealer = Things[thingName].dealer_name;
                    newEntry.ServiceEngg = Things[thingName].service_engineer_name;
                    newEntry.ASM = Things[thingName].area_sales_manager_name;
                    newEntry.RSM = Things[thingName].regional_sales_manager_name;
                    newEntry.Area = Things[thingName].area;
                    newEntry.Region = Things[thingName].region;
                    newEntry.Country = Things[thingName].country;   
                    newEntry.ServiceDate = row1[eventDatePropertyName];           
                    newEntry.ConsumableValueBeforeService = row1[valueAtEventPropertyName];           
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
					newEntry.description = 'Over Due > 200 Hrs';
					result.AddRow(newEntry);
				}
			} else if (ontimeFilter === 'ALL') {
				if ((row1[valueAtEventPropertyName] >= 0) || (row1[valueAtEventPropertyName] < 0 && row1[valueAtEventPropertyName] >= -200) || (row1[valueAtEventPropertyName] < -200)) {
					// ELGi.COMP.ConnectedCompressors.DS entry object
					newEntry = new Object();
					newEntry.device_time = Things[thingName].device_time; // DATETIME
					newEntry.Machine_variant = Things[thingName].Machine_variant; // STRING
					newEntry.customer_name = Things[thingName].customer_name; // STRING    
					newEntry.fabNo = Things[thingName].name; // STRING
					newEntry.Product_group = Things[thingName].Product_group; // STRING
					newEntry.consumable_name = row.propertyDisplayName;
					newEntry.isConnected = Things[thingName].is_machine_connected;
                    newEntry.Customer = Things[thingName].customer_name;
                    newEntry.Dealer = Things[thingName].dealer_name;
                    newEntry.ServiceEngg = Things[thingName].service_engineer_name;
                    newEntry.ASM = Things[thingName].area_sales_manager_name;
                    newEntry.RSM = Things[thingName].regional_sales_manager_name;
                    newEntry.Area = Things[thingName].area;
                    newEntry.Region = Things[thingName].region;
                    newEntry.Country = Things[thingName].country; 
                    newEntry.ServiceDate = row1[eventDatePropertyName];           
                    newEntry.ConsumableValueBeforeService = row1[valueAtEventPropertyName];           
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

					if (row1[valueAtEventPropertyName] >= 0) {
						//On Time
						newEntry.description = 'On Time';
					} else if (row1[valueAtEventPropertyName] < 0 && row1[valueAtEventPropertyName] >= -200) {
						//Over Due LT 200 Hrs
						newEntry.description = 'Over Due < 200 Hrs';
					} else if (row1[valueAtEventPropertyName] < -200) {
						//Over Due GT 200 Hrs
						newEntry.description = 'Over Due > 200 Hrs';
					}
					result.AddRow(newEntry);
				}
			}
		}
		//if (Things[thingName][eventDatePropertyName] >= startDate && Things[thingName][eventDatePropertyName] <= currentDate) {

		//result.AddRow(newEntry);

	}
}
