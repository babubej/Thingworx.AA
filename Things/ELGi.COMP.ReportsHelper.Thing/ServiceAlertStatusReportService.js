var query = "";

// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.comp.ELGiCRM.PLM.Parameters.DS)
var infotableData = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape({
	infoTableName: "InfoTable",
	dataShapeName: "ELGi.comp.ServiceAlertStatusReport.DS"
});

try {
	if (ProductGroupName !== "" && ProductGroupName !== undefined && ProductGroupName !== 'undefined') {
		query = {
			"filters": {
				"type": "EQ",
				"fieldName": "machine_group",
				"value": ProductGroupName
			}
		};
	}

	// result: INFOTABLE dataShape: "RootEntityList"
	var data = ThingTemplates["ELGi.comp.ELGiMaster.TT"].QueryImplementingThingsWithData({
		maxItems: undefined /* NUMBER */ ,
		nameMask: undefined /* STRING */ ,
		query: query /* QUERY */ ,
		tags: undefined /* TAGS */
	});

	var consumablesList = Things["ELGi.COMP.CalculationsHelper.Thing"].ConsumablesMapping;
	var currentDate = new Date();
	var s;
	var newEntry;
	var tableLength = data.rows.length;
	var propName, actualPropName;
	for (var x = 0; x < tableLength; x++) {
		var row = data.rows[x];
		var fabNumber = row.name;
		s = new Object();
		s.FAB_No = fabNumber;
		s.Model = row.Machine_variant;
		s.Product = row.machine_group;
		if (row.warranty_status === true) {
			s.Warranty_status = " In Warranty";
		} else {
			s.Warranty_status = "Warranty Expired";
		}
		s.Customer_name = row.customer_name; // cust name
		s.contact = row.customer_mobileNo;
		s.Dealer_name = row.dealer_name;
		s.Service_engineer = row.service_engineer_name;
		s.ASM = row.area_sales_manager_name;
		s.RSM = row.regional_sales_manager_name;
		if (row.isKeyCustomer === true) {
			s.Key_Customer = "Yes";
		} else {
			s.Key_Customer = "No";
		}
		s.AreaORLocation = row.area;
		s.Country = row.country;
		var flag = 0;
		consumablesList.rows.toArray().forEach(row1 => {

			var eventDatePropertyName = row1.eventPropertyName;
			var valueAtEventPropertyName = row1.valueAtEventPropertyName;

			// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(EntityList)
			var propertyList = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape({
				infoTableName: "InfoTable",
				dataShapeName: "EntityList"
			});

			propName = row1.propertyDisplayName;
			actualPropName = row1.actualPropertyName;

			newEntry = new Object();
			newEntry.name = row1.eventPropertyName; // STRING [Primary Key]        	
			propertyList.AddRow(newEntry);

			newEntry = new Object();
			newEntry.name = row1.valueAtEventPropertyName; // STRING [Primary Key]        	
			propertyList.AddRow(newEntry);

			// result: INFOTABLE dataShape: ""
			var queryResult = Things[fabNumber].QueryNamedPropertyHistory({
				oldestFirst: false /* BOOLEAN */ ,
				maxItems: 1000 /* NUMBER */ ,
				endDate: to /* DATETIME */ ,
				propertyNames: propertyList /* INFOTABLE */ ,
				query: undefined /* QUERY */ ,
				startDate: from /* DATETIME */
			});
			var tableLength1 = queryResult.rows.length;
			if (tableLength1 !== undefined && tableLength1 !== null && tableLength1 > 0) {
				var row2 = queryResult.rows[0];
				//for (var y = 0; y < tableLength1; y++) {			
				if (row2[eventDatePropertyName] >= from && row2[eventDatePropertyName] <= to && row2[valueAtEventPropertyName] !== 20000 && row2[valueAtEventPropertyName] !== undefined && row2[valueAtEventPropertyName] !== null) {
					//s.Trigger_Date = row2.timestamp;			               
					if (actualPropName === 'rem_PFCT') {
						s.Pre_filter_Setting = row.set_PFCT;
						s.Pre_filter_Actual = row2[row1.valueAtEventPropertyName];
						s.PreFilter_ServiceDate = row2.timestamp;
						flag = 1;
					}
					//                    else {
					//						s.Pre_filter_Setting = row.set_PFCT;
					//						s.Pre_filter_Actual = data.rows[x].rem_PFCT;
					//						s.PreFilter_ServiceDate = null;
					//					}

					if (actualPropName === 'remaining_PF_FF') {
						s.PF_FF_Setting = row.set_PF_FF;
						s.PF_FF_Actual = row2[row1.valueAtEventPropertyName];
						s.PF_FF_ServiceDate = row2.timestamp;
						flag = 1;
					}
					//                    else {
					//						s.PF_FF_Setting = row.set_PF_FF;
					//						s.PF_FF_Actual = data.rows[x].remaining_PF_FF;
					//						s.PF_FF_ServiceDate = null;
					//					}

					if (actualPropName === 'rem_AFCT') {
						s.Air_filter_Setting = data.rows[x].set_AFCT;
						s.Air_filter_Actual = row2[row1.valueAtEventPropertyName];
						s.AirFilter_ServiceDate = row2.timestamp;
						flag = 1;
					}
					//                    else {
					//						s.Air_filter_Setting = data.rows[x].set_AFCT;
					//						s.Air_filter_Actual = data.rows[x].rem_AFCT;
					//						s.AirFilter_ServiceDate = null;
					//					}

					if (actualPropName === 'rem_OFCT') {
						s.Oil_filter_Setting = data.rows[x].set_OFCT;
						s.Oil_filter_Actual = row2[row1.valueAtEventPropertyName];
						s.OilFilter_ServiceDate = row2.timestamp;
                        logger.debug(".Oil_filter : "+row2.timestamp);
						flag = 1;
					}
					//                    else {
					//						s.Oil_filter_Setting = data.rows[x].set_OFCT;
					//						s.Oil_filter_Actual = data.rows[x].rem_OFCT;
					//						s.OilFilter_ServiceDate = row2.timestamp;
					//					}

					if (actualPropName === 'rem_OCT') {
						s.Oil_Setting = data.rows[x].set_OCT;
						s.Oil_Actual = row2[row1.valueAtEventPropertyName];
						s.Oil_ServiceDate = row2.timestamp;
						flag = 1;
					}
					//                    else {
					//						s.Oil_Setting = data.rows[x].set_OCT;
					//						s.Oil_Actual = data.rows[x].rem_OCT;
					//						s.Oil_ServiceDate = null;
					//					}

					if (actualPropName === 'rem_OCT') {
						s.Air_oil_separator_Setting = data.rows[x].set_OSCT;
						s.Air_oil_separator_Actual = row2[row1.valueAtEventPropertyName];
						s.AirOilSeparator_ServiceDate = row2.timestamp;
						flag = 1;
					}
					//                    else {
					//						s.Air_oil_separator_Setting = data.rows[x].set_OSCT;
					//						s.Air_oil_separator_Actual = data.rows[x].rem_OSCT;
					//						s.AirOilSeparator_ServiceDate = null;
					//					}

					if (actualPropName === 'rem_valveKit') {
						s.Valve_kits_Setting = data.rows[x].set_valveKit;
						s.Valve_kits_Actual = row2[row1.valueAtEventPropertyName];
						s.ValveKit_ServiceDate = row2.timestamp;
						flag = 1;
					}
					//                    else {
					//						s.Valve_kits_Setting = data.rows[x].set_valveKit;
					//						s.Valve_kits_Actual = data.rows[x].rem_valveKit;
					//						s.ValveKit_ServiceDate = null;
					//					}

					if (actualPropName === 'rem_RGT') {
						s.Motor_Re_grease_Setting = data.rows[x].set_RGT;
						s.Motor_Re_grease_Actual = row2[row1.valueAtEventPropertyName];
						s.RGT_ServiceDate = row2.timestamp;
						flag = 1;
					}
					//                    else {
					//						s.Motor_Re_grease_Setting = data.rows[x].set_RGT;
					//						s.Motor_Re_grease_Actual = data.rows[x].rem_RGT;
					//						s.RGT_ServiceDate = null;
					//					}

					if (actualPropName === 'rem_BDV') {
						s.BDV_Setting = data.rows[x].set_BDV;
						s.BDV_Actual = row2[row1.valueAtEventPropertyName];
						s.BDV_ServiceDate = row2.timestamp;
						flag = 1;
					}
					//                    else {
					//						s.BDV_Setting = data.rows[x].set_BDV;
					//						s.BDV_Actual = data.rows[x].rem_BDV;
					//						s.BDV_ServiceDate = null;
					//					}

					if (actualPropName === 'rem_solenoid') {
						s.Solenoid_Setting = data.rows[x].set_solenoid;
						s.Solenoid_Actual = row2[row1.valueAtEventPropertyName];
						s.Solenoid_ServiceDate = row2.timestamp;
						flag = 1;
					}
					//                    else {
					//						s.Solenoid_Setting = data.rows[x].set_solenoid;
					//						s.Solenoid_Actual = data.rows[x].rem_solenoid;
					//						s.Solenoid_ServiceDate = null;
					//					}

					if (actualPropName === 'rem_ADV') {
						s.ADV_Setting = data.rows[x].set_ADV;
						s.ADV_Actual = row2[row1.valueAtEventPropertyName];
						s.ADV_ServiceDate = row2.timestamp;
						flag = 1;
					}
					//                    else {
					//						s.ADV_Setting = data.rows[x].set_ADV;
					//						s.ADV_Actual = data.rows[x].rem_ADV;
					//						s.ADV_ServiceDate = null;
					//					}

				}
			}
			//}            
		});
		if (flag === 1) {
			infotableData.AddRow(s);
		}
	}
	var sort = new Object();
	sort.name = 'FAB_No';
	sort.ascending = true;
	infotableData.Sort(sort);
	var result = infotableData;
} catch (err) {
	logger.error("Service Failure Not Getting The Actual Input" + err);
}
