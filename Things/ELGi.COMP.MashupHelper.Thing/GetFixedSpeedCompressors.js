try{

var queryObjects = new Array();
var utilisationFilterName, filter;

if( fabNumber !== undefined && fabNumber !== null && fabNumber.trim() !== '' ){
	                        
	 filter = {
    				"type": "LIKE",
    				"fieldName": "name",
    				"value": '*' + fabNumber + '*'
    				};
	queryObjects.push(filter);                       
}     
                        
if( utilisationFilter !== undefined && utilisationFilter !== null && utilisationFilter.trim() !== '' && utilisationFilter !== 'ALL'){
	 if( utilisationFilter === '100TO80FIXEDCOMPUTIL'){             
     	  utilisationFilterName = 'FixedCompUtil_100_to_80_per';                 
     } else if( utilisationFilter === '80TO60FIXEDCOMPUTIL'){ 
     	  utilisationFilterName = 'FixedCompUtil_80_to_60_per';                 
     } else if( utilisationFilter === 'LT60FIXEDCOMPUTIL'){
     	  utilisationFilterName = 'FixedCompUtil_Less_than_60_per';                 
     } 
                        
	 filter = {
    				"type": "EQ",
    				"fieldName": utilisationFilterName,
    				"value": true
    				};
	queryObjects.push(filter);                       
}  

if( warrantyFilter !== undefined && warrantyFilter !== null && warrantyFilter.trim() !== '' ){
	 
	 if( warrantyFilter === 'IN WARRANTY'){                        
     	  booleanValue = true;                 
     }  else{
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


filter = {
    				"type": "EQ",
    				"fieldName": "isVfd_Connected",
    				"value": false
    			};
queryObjects.push(filter);  

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

// dateValue:DATETIME
var dateValue = new Date();
var dateValue1 = new Date();
// dateAddDays(dateValue:DATETIME, amount:NUMBER):STRING
var calculatedDateValue = dateAddDays(dateValue, -1); 
var startdate = calculatedDateValue.setHours(0,0,0,0); 
var enddate = dateValue1;

var filter7 = {
	"type": "Between",
	"fieldName": "device_time",
	"from": startdate,
	"to": enddate
};
queryObjects.push(filter7);  

var params = {
    infoTableName : "InfoTable",
    dataShapeName : "ELGi.COMP.FixedSpeedCompressors.DS"
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
var queryResult =  ThingTemplates["ELGi.comp.ELGiMaster.TT"].QueryImplementingThingsWithData({
	maxItems: undefined /* NUMBER */,
	nameMask: undefined /* STRING */,
	query: query /* QUERY */,
	tags: undefined /* TAGS */
});

var tableLength = queryResult.rows.length;
for (var x=0; x < tableLength; x++) {
    var row = queryResult.rows[x];

    // ELGi.COMP.ConnectedCompressors.DS entry object
    var newEntry = new Object();
    newEntry.device_time = row.device_time; // DATETIME
    newEntry.Machine_variant = row.Machine_variant; // STRING
    newEntry.customer_name = row.customer_name; // STRING  
    newEntry.fabNo = row.name; // STRING
    newEntry.Product_group = row.machine_name; // STRING
    newEntry.utilization_percentage = row.utilization_percentage; // INTEGER
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
    if(faultStatus > 0){
    	newEntry.machine_status = 'TRIPPED';
    } else if( generalStatus === 32 || generalStatus === 128 ){
        newEntry.machine_status = 'STOPPED';      
    } else if( generalStatus === 1 ){
        newEntry.machine_status = 'READY';      
    } else if( generalStatus === 2 ){
        newEntry.machine_status = 'STAR';      
    } else if( generalStatus === 4 ){
        newEntry.machine_status = 'RUN';      
    } else if( generalStatus === 8 ){
        newEntry.machine_status = 'RUN LOAD';      
    } else if( generalStatus === 16 ){
        newEntry.machine_status = 'RUN UNLOAD';      
    } else if( generalStatus === 64 ){
        newEntry.machine_status = 'IDLE';      
    } else if( generalStatus === 256 ){
        newEntry.machine_status = 'START INHIBIT';      
    } else if( generalStatus === 512 ){
        newEntry.machine_status = 'START ACK WAIT';      
    } else if( generalStatus === 1024 ){
        newEntry.machine_status = 'STANDBY';      
    } else if( generalStatus === 2048 ){
        newEntry.machine_status = 'TEMP. INHIBIT';      
    }
     
//    if( row.FixedCompUtil_100_to_80_per === true ){
//    	newEntry.description = '100-80% UTIL.';
//    } else if( row.FixedCompUtil_80_to_60_per === true ){
//        newEntry.description = '80-60% UTIL.';      
//    } else if( row.FixedCompUtil_Less_than_60_per === true ){
//        newEntry.description = 'LESS THAN 60% UTIL.';
//	} else{
//        newEntry.machine_status = '--';
//	}               
    newEntry.isConnected = row.is_machine_connected; // BOOLEAN
    result.AddRow(newEntry);        
}
} catch(err){
	logger.error("Error : "+err);
}    
