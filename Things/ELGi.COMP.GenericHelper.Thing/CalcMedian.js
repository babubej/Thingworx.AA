try {
	var medianOfProperty = 0;
	var result = 0;
	var generalStatus = Things[thingNames].general_status;
	// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.CalculationPurpose.DS)
	var dataTemp = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape({
		infoTableName: "InfoTable",
		dataShapeName: "EntityList"
	});

	dataTemp.AddRow({
		name: propertyName
	});

	if (generalStatus !== undefined && generalStatus > 0) {

		dataTemp.AddRow({
			name: "general_status"
		});

		var MachineStatusValue, MachineStatusValue1;
		if (MachineStatus === "Load") {
			MachineStatusValue = 8;
		} else if (MachineStatus === "Unload") {
			MachineStatusValue = 16;
		} else if (MachineStatus === "Running Status") {
			MachineStatusValue = 8;
			MachineStatusValue1 = 16;
		}

		var query;
		if (MachineStatusValue === 8 && MachineStatusValue1 === 16) {
			query = {
				"filters": {
					"type": "OR",
					"filters": [{
							"type": "EQ",
							"fieldName": "general_status",
							"value": MachineStatusValue
						},
						{
							"type": "EQ",
							"fieldName": "general_status",
							"value": MachineStatusValue1
						}
					]
				}
			};
		} else if (MachineStatusValue === 8) {
			query = {
				"filters": {
					"type": "EQ",
					"fieldName": "general_status",
					"value": MachineStatusValue
				}
			};
		} else if (MachineStatusValue === 16) {
			query = {
				"filters": {
					"type": "EQ",
					"fieldName": "general_status",
					"value": MachineStatusValue
				}
			};
		}

		var data = Things[thingNames].QueryNamedPropertyHistory({
			propertyNames: dataTemp /* INFOTABLE */ ,
			maxItems: undefined /* NUMBER */ ,
			startDate: startDate /* DATETIME */ ,
			endDate: endDate /* DATETIME */ ,
			oldestFirst: undefined /* BOOLEAN */ ,
			query: query /* QUERY */
		});

		var query1 = {
			"filters": {
				"type": "NotMissingValue",
				"fieldName": propertyName
			}
		};

		// result: INFOTABLE
		var data1 = Resources["InfoTableFunctions"].Query({
			t: data /* INFOTABLE */ ,
			query: query1 /* QUERY */
		});



		logger.debug("History Result : " + data1.rows.length);

		if (data1 !== undefined && data1.rows.length > 0) {

			var sortPropertyDataOfpropertyName1 = Resources["InfoTableFunctions"].Sort({
				t: data1 /* INFOTABLE */ ,
				sortColumn: propertyName /* STRING */ ,
				ascending: true /* BOOLEAN */
			});

			countOfpropertyName = sortPropertyDataOfpropertyName1.rows.length; // odd even

			logger.debug("countOfpropertyName Result : " + countOfpropertyName);

			if (countOfpropertyName % 2 === 0) {
				//even 
				medianOfProperty = sortPropertyDataOfpropertyName1.rows[countOfpropertyName / 2][propertyName];
			} else {
				medianOfProperty = sortPropertyDataOfpropertyName1.rows[(countOfpropertyName - 1) / 2][propertyName];
			}

			if (medianOfProperty !== undefined && medianOfProperty !== null) {
				result = medianOfProperty;
			} else {
				result = 0;
			}

		}
	}
} catch (err) {
	logger.error("Error while calculating Median : " + err);
}
//var result = Things[thingNames][outputProperties];
