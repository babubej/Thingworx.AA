var query;

// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.comp.ELGiCRM.PLM.Parameters.DS)
var toShowFaultAlertStatus = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape({
	infoTableName: "InfoTable",
	dataShapeName: "ELGi.comp.ELGiCRM.PLM.Parameters.DS"
});
if ( productGroup !== "" && productGroup !== undefined && productGroup !== 'undefined' ) {
	query = {
		"filters": {
			"type": "EQ",
			"fieldName": "machine_group",
			"value": productGroup
		}
	};
}

// result: INFOTABLE dataShape: "RootEntityList"
var thingsList = ThingTemplates["ELGi.comp.ELGiMaster.TT"].QueryImplementingThingsWithData({
	maxItems: undefined /* NUMBER */ ,
	nameMask: undefined /* STRING */ ,
	query: query /* QUERY */ ,
	tags: undefined /* TAGS */
});

var currentDate = new Date();
var s;
var tableLength = thingsList.rows.length;
for (var x = 0; x < tableLength; x++) {
	var row = thingsList.rows[x];
	var fabNumber = row.name;	
	
    var query1 = {
		"filters": {
			"type": "GT",
			"fieldName": "value",
			"value": 0
		}
	};

	// result: INFOTABLE dataShape: "IntegerValueStream"
	var detectedFaults = Things[fabNumber].QueryIntegerPropertyHistory({
		oldestFirst: undefined /* BOOLEAN */ ,
		maxItems: undefined /* NUMBER */ ,
		propertyName: 'fault_status' /* STRING */ ,
		endDate: to /* DATETIME */ ,
		query: query1 /* QUERY */ ,
		startDate: from /* DATETIME */
	});	
    
	var query2 = {
		"filters": {
			"type": "And",
			"filters": [{
					"type": "EQ",
					"fieldName": "FabNumber",
					"value": fabNumber
				},
				{
					"type": "EQ",
					"fieldName": "AlertStatus",
					"value": "TRIGGERED"
				}
			]
		}
	};

	// result: INFOTABLE dataShape: ""
	var predictedAlerts = Things["ELGi.COMP.ExecutedRules.Stream"].QueryStreamData({
		oldestFirst: undefined /* BOOLEAN */ ,
		maxItems: undefined /* NUMBER */ ,
		sourceTags: undefined /* TAGS */ ,
		endDate: to /* DATETIME */ ,
		query: query2 /* QUERY */ ,
		source: undefined /* STRING */ ,
		startDate: from /* DATETIME */ ,
		tags: undefined /* TAGS */
	});
    
    logger.debug("predictedAlerts : "+predictedAlerts.rows.length);
    
	var tl1 = detectedFaults.rows.length;
	for (var y = 0; y < tl1; y++) {
		//s.SrNo = me.ids;
        s = new Object();
		s.Trigger_Date = detectedFaults[y].timestamp;
		s.FAB_No = fabNumber;
		s.Model = row.Machine_variant;
		s.Product = row.machine_group;
        s.Alert_type = 'Trip';
        // result: STRING
        var detectedFault =  me.GetDetectedFaults({
            fault_status: detectedFaults[y].value /* INTEGER */
        });
        s.Alert_description = detectedFault;
		// s.Warranty_status = thingsList.rows[x].Obligation;
		if (row.warranty_status === true) {
			s.Warranty_status = " In Warranty";
		} else {
			s.Warranty_status = "Warranty Expired";
		}
		s.Customer_name = row.customer_name; // cust name		
		s.Dealer_name = row.dealer_name;		
		s.Service_engineer = row.service_engineer_name;
		s.Service_engineer_contact = row.service_engineer_mobileNo;
		s.ASM_name = row.area_sales_manager_name;
		s.RSM = row.regional_sales_manager_name;
		if (row.isKeyCustomer === true) {
			s.Key_Customer = "Yes";
		} else {
			s.Key_Customer = "No";
		}
		s.AreaORLocation = row.area;
		s.Country = row.country;
		s.HMR = thingsList.rows[x].cum_run;
		toShowFaultAlertStatus.AddRow(s);
	}
    
    var tl2 = predictedAlerts.rows.length;
	for (var z = 0; z < tl2; z++) {
		//s.SrNo = me.ids;
        s = new Object();
		s.Trigger_Date = predictedAlerts[z].timestamp;
		s.FAB_No = fabNumber;
		s.Model = row.Machine_variant;
		s.Product = row.machine_group;
        s.Alert_type = 'Predicted';
        s.Alert_description = predictedAlerts[z].Symptom;
		// s.Warranty_status = thingsList.rows[x].Obligation;
		if (row.warranty_status === true) {
			s.Warranty_status = " In warranty";
		} else {
			s.Warranty_status = " Warranty Expired";
		}
		s.Customer_name = row.customer_name; // cust name
		s.contact = row.customer_mobileNo;
		s.Dealer_name = row.dealer_name;
		s.Dealer_contact = row.dealer_mobileNo;
		s.Service_engineer = row.service_engineer_name;
		s.Service_engineer_contact = row.service_engineer_mobileNo;
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
		s.HMR = thingsList.rows[x].cum_run;
		//s.AMC_Customer = "Yes";
		//s.Next_AMC_date = thingsList.rows[x].amc_startDate;
		//s.Call_status = "Open";
		toShowFaultAlertStatus.AddRow(s);
	}
	//var result = toShowFaultAlertStatus;
}

var sort = new Object();
sort.name = 'Trigger_Date';
sort.ascending = false;
toShowFaultAlertStatus.Sort(sort);

result = toShowFaultAlertStatus;
