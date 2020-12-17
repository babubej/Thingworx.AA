var query,filter;
var queryObjects = new Array();
var params = {
	infoTableName: "InfoTable",
	dataShapeName: "ELGi.comp.ELGiCRM.PLM.ParametersFor_AirAlertCommunicationStatusReport.DS"
};
//ELGi.comp.ELGiCRM.PLM.Parameters.DS ELGi.comp.ELGiCRM.PLM.ParametersFor_AlertStatusReport.DS
// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.comp.ELGiCRM.PLM.Parameters.DS)
var infotableData = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);


if (inWarranty !== undefined && inWarranty !== null && inWarranty !== '' && inWarranty !== false && inWarranty !== 'false') {
	filter = {
		"type": "EQ",
		"fieldName": "warranty_status",
		"value": true
	};
	queryObjects.push(filter);
}

if (IsKey_Customer !== undefined && IsKey_Customer !== null && IsKey_Customer !== '' && IsKey_Customer !== false && IsKey_Customer !== 'false') {
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
var data = ThingTemplates["ELGi.comp.ELGiMaster.TT"].QueryImplementingThingsWithData({
	maxItems: undefined /* NUMBER */ ,
	nameMask: undefined /* STRING */ ,
	query: query /* QUERY */ ,
	tags: undefined /* TAGS */
});

var currentDate = new Date();
var s = new Object();
var tableLength = data.rows.length;
for (var x = 0; x < tableLength; x++) {
	var row = data.rows[x];
	
		s.FAB_No = row.name;    	
    	if (row.is_Machine_Connected === true) {
        	s.Status = 'Connected';
        } else {
        	s.Status = 'Not Connected';
        }
		s.Last_comm_date_time = row.device_time;
		s.Model = row.Machine_variant;
		s.Product = row.machine_group;
        
		if (row.warranty_status === true) {
			s.Warranty_status = " In Warranty";
		} else {
			s.Warranty_status = "Warranty Expired";
		}
		s.Customer_name = row.customer_name; // cust name
		//s.contact = row.customer_mobileNo;
		s.Dealer_name = row.dealer_name;
		//s.Dealer_contact = row.dealer_mobileNo;
		s.Service_engineer = row.service_engineer_name;
		//s.Service_engineer_contact = row.service_engineer_mobileNo;
		s.ASM_name = row.area_sales_manager_name;
		//s.ASM_contact = thingsList.rows[x].ASM_contact;
		s.RSM = row.regional_sales_manager_name;
		if (row.isKeyCustomer === true) {
			s.Key_Customer = "Yes";
		} else {
			s.Key_Customer = "No";
		}
		s.AreaORLocation = row.area;
		s.Country = row.country;

	infotableData.AddRow(s);    
	
}
//ELGi.comp.ELGiCRM.PLM.ParametersFor_AirAlertCommunicationStatusReport.DS

var result = infotableData;
