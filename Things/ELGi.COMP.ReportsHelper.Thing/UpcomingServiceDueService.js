try {
	var params = {
		infoTableName: "InfoTable",
		dataShapeName: "ELGi.comp.ELGiCRM.PLM.ParametersFor_AlertStatusReport.DS"
	};
	//ELGi.comp.ELGiCRM.PLM.Parameters.DS
	// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.comp.ELGiCRM.PLM.Parameters.DS)
	var toShowFaultAlertStatus = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);
	var queryObjects = new Array();
	var fabNumber, filter;

	if (productGroup !== "" && productGroup !== undefined && productGroup !== 'undefined') {

		filter = {
			"type": "EQ",
			"fieldName": "machine_group",
			"value": productGroup
		};
		queryObjects.push(filter);
	}

	//
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

	filter = {
		"type": "EQ",
		"fieldName": 'IsServiceDue',
		"value": true
	};
	queryObjects.push(filter);

	var query = {
		"filters": {
			"type": "And",
			"filters": queryObjects
		}
	};
	// result: INFOTABLE dataShape: "RootEntityList"
	var data1 = ThingTemplates["ELGi.comp.ELGiMaster.TT"].QueryImplementingThingsWithData({
		maxItems: undefined /* NUMBER */ ,
		nameMask: undefined /* STRING */ ,
		query: query /* QUERY */ ,
		tags: undefined /* TAGS */
	});

	queryObjects.pop();

	filter = {
		"type": "EQ",
		"fieldName": 'IsServiceOverdue',
		"value": true
	};
	queryObjects.push(filter);

	query = {
		"filters": {
			"type": "And",
			"filters": queryObjects
		}
	};
	// result: INFOTABLE dataShape: "RootEntityList"
	var data2 = ThingTemplates["ELGi.comp.ELGiMaster.TT"].QueryImplementingThingsWithData({
		maxItems: undefined /* NUMBER */ ,
		nameMask: undefined /* STRING */ ,
		query: query /* QUERY */ ,
		tags: undefined /* TAGS */
	});

	queryObjects.pop();

	filter = {
		"type": "EQ",
		"fieldName": 'IsServiceDueSoon',
		"value": true
	};
	queryObjects.push(filter);

	query = {
		"filters": {
			"type": "And",
			"filters": queryObjects
		}
	};
	// result: INFOTABLE dataShape: "RootEntityList"
	var data3 = ThingTemplates["ELGi.comp.ELGiMaster.TT"].QueryImplementingThingsWithData({
		maxItems: undefined /* NUMBER */ ,
		nameMask: undefined /* STRING */ ,
		query: query /* QUERY */ ,
		tags: undefined /* TAGS */
	});

	params = {
		t1: data1 /* INFOTABLE */ ,
		t2: data2 /* INFOTABLE */
	};
	// result: INFOTABLE
	var combinedData = Resources["InfoTableFunctions"].Union(params);

	params = {
		t1: combinedData /* INFOTABLE */ ,
		t2: data3 /* INFOTABLE */
	};
	// result: INFOTABLE
	var data = Resources["InfoTableFunctions"].Union(params);

	var currentDate = new Date();
	var s = new Object();
	var tableLength = data.rows.length;
	for (var x = 0; x < tableLength; x++) {
		var row = data.rows[x];
		fabNumber = row.name;				
		s.FAB_No = fabNumber;
		s.Model = row.Machine_variant;
		s.Product = row.machine_group;

		s.Pre_filter_Setting = data.rows[x].set_PFCT;
		s.Pre_filter_Actual = data.rows[x].rem_PFCT; 
        s.PF_FF_Setting = data.rows[x].set_PF_FF;
		s.PF_FF_Actual = data.rows[x].remaining_PF_FF; // Make it PFCT, add another column for PF/FF rem_PFCT
		s.Air_filter_Setting = data.rows[x].set_AFCT;
		s.Air_filter_Actual = data.rows[x].rem_AFCT;
		s.Oil_filter_Setting = data.rows[x].set_OFCT;
		s.Oil_filter_Actual = data.rows[x].rem_OFCT;
		s.Oil_Setting = data.rows[x].set_OCT;
		s.Oil_Actual = data.rows[x].rem_OCT;
		s.Valve_kits_Setting = data.rows[x].set_valveKit;
		s.Valve_kits_Actual = data.rows[x].rem_valveKit;
		s.Motor_Re_grease_Setting = data.rows[x].set_RGT;
		s.Motor_Re_grease_Actual = data.rows[x].rem_RGT; // RGT : DONE

		s.Air_oil_separator_Setting = data.rows[x].set_OSCT;
		s.Air_oil_separator_Actual = data.rows[x].rem_OSCT; // OSCT : DONE
		s.BDV_Setting = data.rows[x].set_BDV; 
		s.BDV_Actual = data.rows[x].rem_BDV; // CHange Column Name to BDV : DONE
		s.Solenoid_Setting = data.rows[x].set_solenoid;
		s.Solenoid_Actual = data.rows[x].rem_solenoid; // CHange Column Name to Solenoid
		s.ADV_Setting = data.rows[x].set_ADV;
		s.ADV_Actual = data.rows[x].rem_ADV; // CHange Column Name to ADV : DONE

		if (row.warranty_status === true) {
			s.Warranty_status = " In Warranty";
		} else {
			s.Warranty_status = "Warranty Expired";
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
		s.HMR = row.cum_run;

		toShowFaultAlertStatus.AddRow(s);
	}
	var result = toShowFaultAlertStatus;
} catch (err) {
	logger.error("Error in UpcomingServiceDueService Service. Error : "+err);
}
