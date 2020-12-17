var queryObjects;

// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.CompressorSettingReport.DS)
var result = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape({
	infoTableName: "InfoTable",
	dataShapeName: "ELGi.COMP.CompressorSettingReport.DS"
});

try {

	// result: INFOTABLE dataShape: ""
	var settingParameters = Things["ELGi.COMP.SettingParameters.DT"].GetDataTableEntries({
		maxItems: 150 /* NUMBER */
	});

	settingParameters.rows.toArray().forEach(row => {
		var changeDateProperty = row.ChangeDatePropertyName;
		var valueAtChangeDateProperty = row.ValueAtChangeDatePropertyName;
		var propertyName = row.PropertyName;
		queryObjects = new Array();
		var filter;

		if (Product_Group !== undefined && Product_Group !== null && Product_Group.trim() !== '' && Product_Group !== 'ALL') {
			filter = {
				"type": "EQ",
				"fieldName": "machine_group",
				"value": Product_Group
			};
			queryObjects.push(filter);
		}

		if (Model !== undefined && Model !== null && Model.trim() !== '' && Model !== 'All') {
			filter = {
				"type": "EQ",
				"fieldName": "Machine_variant",
				"value": Model
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

		filter = {
			"type": "Between",
			"fieldName": changeDateProperty,
			"from": startDate,
			"to": endDate
		};
		queryObjects.push(filter);

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
        
        logger.debug("QR Count : "+queryResult.rows.length);

		queryResult.rows.toArray().forEach(row1 => {
			if ( ( row1[propertyName] !== row1[valueAtChangeDateProperty] ) && (  row1[valueAtChangeDateProperty] !== 0 ) && (  row1[valueAtChangeDateProperty] !== -1 ) ) {
				var newEntry = new Object();
				newEntry.FabNo = row1.name; // STRING
				newEntry.Model = row1.Machine_variant; // STRING
				newEntry.TriggerDate = row1.device_time; // STRING
				newEntry.CustomerName = row1.customer_name; // STRING
                if( row1.customer_mobileNo === "0" || row1.customer_mobileNo === "0.0"){
                	newEntry.CustomerContact = "-"; // STRING
                } else {
                	newEntry.CustomerContact = row1.customer_mobileNo; // STRING
                }
				
				newEntry.Dealer = row1.dealer_name; // STRING                
                if( row1.dealer_mobileNo === "0" || row1.dealer_mobileNo === "0.0"){
                	newEntry.DealerContact = "-"; // STRING
                } else {
                	newEntry.DealerContact = row1.dealer_mobileNo; // STRING
                }
				
				newEntry.Area = row1.area; // STRING
				newEntry.Region = row1.region; // STRING
				newEntry.Country = row1.country; // STRING
				newEntry.Parameter = propertyName; // STRING 
				newEntry.CurrentValue = row1[propertyName]; // STRING                
				newEntry.PreviousValue = row1[valueAtChangeDateProperty]; // STRING
				result.AddRow(newEntry);
			}
		});
	});

} catch (err) {
	logger.error("Error occured in " + me.name + ":CompressorSettingReport service. " + err);
}

//infotableData.AddRow({
//	name: "set_AFCT"
//});
//infotableData.AddRow({
//	name: "set_OFCT"
//});
//infotableData.AddRow({
//	name: "set_OSCT"
//});
//infotableData.AddRow({
//	name: "set_OCT"
//});
//infotableData.AddRow({
//	name: "set_RGT"
//});
//infotableData.AddRow({
//	name: "control_mode"
//});
//infotableData.AddRow({
//	name: "unload_mode"
//});
//infotableData.AddRow({
//	name: "pr_unit"
//});
//infotableData.AddRow({
//	name: "tr_unit"
//});
//infotableData.AddRow({
//	name: "pr_schdl"
//});
//infotableData.AddRow({
//	name: "relay1_configuration"
//});
//infotableData.AddRow({
//	name: "relay2_configuration"
//});
//infotableData.AddRow({
//	name: "set_unload"
//});
//infotableData.AddRow({
//	name: "set_load_pressure"
//});
//infotableData.AddRow({
//	name: "trip_temp"
//});
//infotableData.AddRow({
//	name: "warn_temp"
//});
//infotableData.AddRow({
//	name: "fan_temp"
//});
//infotableData.AddRow({
//	name: "inhibit_temp"
//});
//infotableData.AddRow({
//	name: "maximum_unload_pressure"
//});
//infotableData.AddRow({
//	name: "Max_Sump_Pressure"
//});
//infotableData.AddRow({
//	name: "auto_restart"
//});
//infotableData.AddRow({
//	name: "star_delay"
//});
//infotableData.AddRow({
//	name: "DTR_delay"
//});
//infotableData.AddRow({
//	name: "RTS_delay"
//});
//infotableData.AddRow({
//	name: "max_noOfStart"
//});
//infotableData.AddRow({
//	name: "ADV_offTIme"
//});
//infotableData.AddRow({
//	name: "ADV_onTIme"
//});
//infotableData.AddRow({
//	name: "set_PFCT"
//});
//infotableData.AddRow({
//	name: "set_MPV"
//});
//infotableData.AddRow({
//	name: "set_BDV"
//});
//infotableData.AddRow({
//	name: "set_solenoid"
//});
//infotableData.AddRow({
//	name: "set_ADV"
//});
//infotableData.AddRow({
//	name: "set_oilSampleTest"
//});
//infotableData.AddRow({
//	name: "set_SPM"
//});
//infotableData.AddRow({
//	name: "set_PF_FF"
//});
//infotableData.AddRow({
//	name: "set_CF"
//});
////infotableData.AddRow({name : ""});
//var arr = ["set_AFCT", "set_OFCT", "set_OSCT", "set_OCT", "set_RGT", "control_mode", "unload_mode", "pr_unit", "tr_unit", "pr_schdl", "relay1_configuration", "relay2_configuration", "set_unload", "set_load_pressure", "trip_temp", "warn_temp", "fan_temp", "inhibit_temp", "maximum_unload_pressure", "Max_Sump_Pressure", "auto_restart", "star_delay", "DTR_delay", "RTS_delay",
//	"max_noOfStart", "ADV_offTIme", "ADV_onTIme", "set_PFCT", "set_MPV", "set_BDV", "set_solenoid", "set_ADV", "set_oilSampleTest", "set_SPM", "set_PF_FF", "set_CF"
//];
//
//if (Product_Group !== undefined && Product_Group !== null && Product_Group.trim() !== '' && Product_Group !== 'ALL') {
//	filter = {
//		"type": "EQ",
//		"fieldName": "machine_group",
//		"value": Product_Group
//	};
//	queryObjects.push(filter);
//}
//
//if (Model !== undefined && Model !== null && Model.trim() !== '' && Model !== 'All') {
//	filter = {
//		"type": "EQ",
//		"fieldName": "Model",
//		"value": Model
//	};
//	queryObjects.push(filter);
//}
//
//filter = {
//	"type": "Between",
//	"fieldName": "TriggerDate",
//	"from": startDate,
//	"to": endDate
//};
//queryObjects.push(filter);
//
//query = {
//	"filters": {
//		"type": "And",
//		"filters": queryObjects
//	}
//};
//
//var params = {
//	infoTableName: "InfoTable",
//	dataShapeName: "ELGi.COMP.CompressorSettingReport.DS"
//};
//// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.CompressorSettingReport.DS)
//var infotableResult = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);
//var propertyLoggedData;
//// result: INFOTABLE dataShape: "RootEntityList"
//var dataOfThings = ThingTemplates["ELGi.comp.ELGiMaster.TT"].GetImplementingThingsWithData();
//dataOfThings.rows.toArray().forEach(row => {
//	var thingName = row.name;
//	logger.debug(" thingName : " + thingName);
//	// ELGi.COMP.CompressorSettingReport.DS entry object
//
//	//newEntry.Parameter = row.; // STRING
//	//newEntry.PreviousValue = row.; // STRING
//	//newEntry.CurrentValue = row.; // STRING
//
//	var tableLength = arr.length;
//	logger.debug("ARR LENGTH : " + tableLength);
//	for (var x = 0; x < tableLength; x++) {
//		var row1 = arr[x];
//		// result: INFOTABLE dataShape: "NumberValueStream"
//		propertyLoggedData = Things[thingName].QueryNumberPropertyHistory({
//			oldestFirst: false /* BOOLEAN */ ,
//			maxItems: 1000 /* NUMBER */ ,
//			propertyName: row1 /* STRING */ ,
//			endDate: endDate /* DATETIME */ ,
//			query: undefined /* QUERY */ ,
//			startDate: startDate /* DATETIME */
//		});
//		logger.debug("propertyLoggedData LENGTH : " + propertyLoggedData.rows.length);
//		if (propertyLoggedData !== undefined && propertyLoggedData.rows.length > 0) {
//			var newEntry = new Object();
//			newEntry.FabNo = row.name; // STRING
//			newEntry.Model = row.Machine_variant; // STRING
//			newEntry.TriggerDate = row.device_time; // STRING
//			newEntry.CustomerName = row.customer_name; // STRING
//			newEntry.CustomerContact = row.customer_mobileNo; // STRING
//			newEntry.Dealer = row.dealer_name; // STRING
//			newEntry.DealerContact = row.dealer_mobileNo; // STRING
//			newEntry.Area = row.area; // STRING
//			newEntry.Region = row.region; // STRING
//			newEntry.Country = row.country; // STRING
//			newEntry.Parameter = row1; // STRING
//			newEntry.CurrentValue = Things[thingName][row1]; // STRING
//
//			logger.debug("INSIDE IF " + propertyLoggedData[0].value);
//			//newEntry.PreviousValue = 0;
//			if (propertyLoggedData[0].value === Things[thingName][row1]) {
//				logger.debug("INSIDE IF ");
//				newEntry.PreviousValue = propertyLoggedData[1].value; // STRING
//			} else {
//				logger.debug("INSIDE ELSE");
//				newEntry.PreviousValue = propertyLoggedData[0].value; // STRING
//			}
//			infotableResult.AddRow(newEntry);
//		}
//
//		//		propertyLoggedData = Things[thingName].QueryNamedPropertyHistory({
//		//			oldestFirst: undefined /* BOOLEAN */ ,
//		//			maxItems: undefined /* NUMBER */ ,
//		//			endDate: undefined /* DATETIME */ ,
//		//			propertyNames: infotableData /* INFOTABLE */ ,
//		//			query: undefined /* QUERY */ ,
//		//			startDate: undefined /* DATETIME */
//		//		});
//		//		var secondLast = propertyLoggedData.getRowCount() - 1;
//		//		newEntry.Parameter = row1; // STRING
//		//		newEntry.PreviousValue = propertyLoggedData.rows[secondLast][row1]; // STRING
//		//		newEntry.CurrentValue = Things[thingName][row1]; // STRING
//		// .getRow(rowIndex);
//		//var last = propertyLoggedData.getRowCount() - 1;		
//	}
//
//});
//// result: INFOTABLE
//var result = Resources["InfoTableFunctions"].Query({
//	t: infotableResult /* INFOTABLE */ ,
//	query: query /* QUERY */
//});
