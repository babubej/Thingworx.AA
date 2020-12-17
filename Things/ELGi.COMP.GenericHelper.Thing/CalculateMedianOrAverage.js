//ELGi.COMP.24HrScheduler.Thing
// Name Type Thing_OR_ThingTemplates INPUT_Properties OUTPUT_Properties Frequency Interval 
var query = {
	"filters": {
		"type": "EQ",
		"fieldName": "Frequency",
		"value": "ELGi.COMP.24HrScheduler.Thing"
	}
};

// result: INFOTABLE dataShape: ""
var propertyList = Things["ELGi.COMP.CalculationsServiceDataTable.DT"].QueryDataTableEntries({
	maxItems: undefined /* NUMBER */ ,
	values: undefined /* INFOTABLE */ ,
	query: query /* QUERY */ ,
	source: undefined /* STRING */ ,
	tags: undefined /* TAGS */
});

var tableLength = propertyList.rows.length;
for (var x = 0; x < tableLength; x++) {
	var things;
	var rowObj = propertyList.rows[x];

	var Intervals = rowObj.Interval;
	var INPUT_Properties = rowObj.INPUT_Properties;
	var OUTPUT_Properties = rowObj.OUTPUT_Properties;
	var Thing_OR_ThingTemplates = rowObj.Thing_OR_ThingTemplates;
	var Type = rowObj.Type;
	var MachineStatus = rowObj.MachineStatus;
	var thingTemplate = rowObj.ThingTemplates;
	if (rowObj.Things !== undefined && rowObj.Things !== "") {
		things = rowObj.Things;
	} else {
		things = "";
	}
	var Start, end;
	var medianOf;

	if (Type === 'MEDIAN' && Intervals === "24Hours" && Intervals !== undefined && ((MachineStatus === "Load") || (MachineStatus === "Unload") || (MachineStatus === "Running Status"))) {

		if (thingTemplate !== undefined && thingTemplate !== null && thingTemplate.length > 0) {
			// result: INFOTABLE dataShape: "RootEntityList"
			var thingsList = ThingTemplates["ELGi.comp.ELGiMaster.TT"].GetImplementingThings();
			var tableLength1 = thingsList.rows.length;
			for (var y = 0; y < tableLength1; y++) {

				var row = thingsList.rows[y];
				//if (row.name === 'BPBL060056') {
				// dateValue:DATETIME
				var dateValue = new Date();

				Start = dateAddDays(dateValue, -1);
				Start.setHours(0, 0, 0, 0);
				end = dateAddDays(dateValue, -1);
				end.setHours(23, 59, 59, 0);
				logger.debug("INPUT for " + row.name + " : " + INPUT_Properties);
				logger.debug("OUTPUT for " + row.name + " : " + OUTPUT_Properties);
				if (MachineStatus === "Running Status") {
					MachineStatus = "RunningStatus";
				}
				logger.debug("MachineStatus : " + MachineStatus);
				logger.debug("INPUT_Properties : " + INPUT_Properties);
				logger.debug("Start : " + Start);
				logger.debug("end : " + end);
				medianOf = me.CalcMedian({
					propertyName: INPUT_Properties /* STRING */ ,
					MachineStatus: MachineStatus /* STRING */ ,
					thingNames: row.name /* STRING */ ,
					startDate: Start /* STRING */ ,
					endDate: end /* STRING */
				});
				logger.debug("MEDIAN value of " + row.name + " :" + medianOf);
				try {
					Things[row.name][OUTPUT_Properties] = medianOf;
				} catch (err) {
					logger.error(" Error in setting Median Value as Output Property not found for Thing " + row.name);
				}

			}
		} else if (things !== undefined && things !== null && things.length > 0) {
			var thingsArr = things.split(",");
			var tableLength2 = thingsArr.length;
			for (var y = 0; y < tableLength2; y++) {
				var row = thingsArr[y];

				Start = new Date();
				Start.setDate(Start.getDate() - 1);
				Start.setHours(0, 0, 0, 0);
				end = new Date();
				end.setDate(end.getDate() - 1);
				end.setHours(23, 59, 59, 0);

				medianOf = me.CalcMedian({
					propertyName: INPUT_Properties /* STRING */ ,
					MachineStatus: MachineStatus /* STRING */ ,
					thingNames: row /* STRING */ ,
					startDate: Start /* STRING */ ,
					endDate: end /* STRING */
				});
				Things[row][OUTPUT_Properties] = medianOf;
			}
		} else {
			logger.error("Error : Thing or Template must be added");
		}
		//var result = Things[Thing_OR_ThingTemplates][OUTPUT_Properties];   
		//logger.debug("After 24 Hours Block" + result);
	} else if (Type === 'MEDIAN' && Intervals === "48Hours" && Intervals !== undefined && ((MachineStatus === "Load") || (MachineStatus === "Unload") || (MachineStatus === "Running Status"))) {
		if (thingTemplate !== undefined || thingTemplate !== null || thingTemplate.length > 0) {
			// result: INFOTABLE dataShape: "RootEntityList"
			var thingsList = ThingTemplates["ELGi.comp.ELGiMasterEPSAC.TT"].GetImplementingThings();
			var tableLength1 = thingsList.rows.length;
			for (var y = 0; y < tableLength1; y++) {
				var row = thingsList.rows[y];

				Start = new Date();
				Start.setDate(Start.getDate() - 2);
				Start.setHours(0, 0, 0, 0);
				end = new Date();
				end.setDate(end.getDate() - 1);
				end.setHours(23, 59, 59, 0);

				medianOf = me.CalcMedian({
					propertyName: INPUT_Properties /* STRING */ ,
					MachineStatus: MachineStatus /* STRING */ ,
					thingNames: row.name /* STRING */ ,
					startDate: Start /* STRING */ ,
					endDate: end /* STRING */
				});
				Things[row.name][OUTPUT_Properties] = medianOf;
			}
		} else if (things !== undefined || things !== null || things.length > 0) {
			var thingsArr = things.split(",");
			var tableLength2 = thingsArr.length;
			for (var y = 0; y < tableLength2; y++) {
				var row = thingsArr[y];

				Start = new Date();
				Start.setDate(Start.getDate() - 2);
				Start.setHours(0, 0, 0, 0);
				end = new Date();
				end.setDate(end.getDate() - 1);
				end.setHours(23, 59, 59, 0);

				medianOf = me.CalcMedian({
					propertyName: INPUT_Properties /* STRING */ ,
					MachineStatus: MachineStatus /* STRING */ ,
					thingNames: row /* STRING */ ,
					startDate: Start /* STRING */ ,
					endDate: end /* STRING */
				});
				Things[row][OUTPUT_Properties] = medianOf;
			}
		} else {
			logger.error("Error : Thing or Template must be added");
		}
	} else if (Type === 'MEDIAN' && Intervals === "7Days" && Intervals !== undefined && ((MachineStatus === "Load") || (MachineStatus === "Unload") || (MachineStatus === "Running Status"))) {
		if (thingTemplate !== undefined || thingTemplate !== null || thingTemplate.length > 0) {
			// result: INFOTABLE dataShape: "RootEntityList"
			var thingsList = ThingTemplates["ELGi.comp.ELGiMasterEPSAC.TT"].GetImplementingThings();
			var tableLength1 = thingsList.rows.length;
			for (var y = 0; y < tableLength1; y++) {
				var row = thingsList.rows[y];

				var beforeOneWeek = new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000);
				day = beforeOneWeek.getDay();
				diffToMonday = beforeOneWeek.getDate() - day + (day === 0 ? -6 : 1);
				lastMonday = new Date(beforeOneWeek.setDate(diffToMonday));
				lastSunday = new Date(beforeOneWeek.setDate(diffToMonday + 6));

				medianOf = me.CalcMedian({
					propertyName: INPUT_Properties /* STRING */ ,
					MachineStatus: MachineStatus /* STRING */ ,
					thingNames: row.name /* STRING */ ,
					startDate: Start /* STRING */ ,
					endDate: end /* STRING */
				});
				Things[row.name][OUTPUT_Properties] = medianOf;
			}
		} else if (things !== undefined || things !== null || things.length > 0) {
			var thingsArr = things.split(",");
			var tableLength2 = thingsArr.length;
			for (var y = 0; y < tableLength2; y++) {
				var row = thingsArr[y];

				var beforeOneWeek = new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000);
				day = beforeOneWeek.getDay();
				diffToMonday = beforeOneWeek.getDate() - day + (day === 0 ? -6 : 1);
				lastMonday = new Date(beforeOneWeek.setDate(diffToMonday));
				lastSunday = new Date(beforeOneWeek.setDate(diffToMonday + 6));

				medianOf = me.CalcMedian({
					propertyName: INPUT_Properties /* STRING */ ,
					MachineStatus: MachineStatus /* STRING */ ,
					thingNames: row /* STRING */ ,
					startDate: Start /* STRING */ ,
					endDate: end /* STRING */
				});
				Things[row][OUTPUT_Properties] = medianOf;
			}
		} else {
			logger.error("Error : Thing or Template must be added");
		}
	} else if (Intervals === "24Hours" && Intervals !== undefined && Type === "Load/Unload Count") {

		if (thingTemplate !== undefined || thingTemplate !== null || thingTemplate.length > 0) {
			// result: INFOTABLE dataShape: "RootEntityList"
			var thingsList = ThingTemplates["ELGi.comp.ELGiMasterEPSAC.TT"].GetImplementingThings();
			var tableLength1 = thingsList.rows.length;
			for (var y = 0; y < tableLength1; y++) {
				var row = thingsList.rows[y];

				var setdata = me.SetDailyLoadCount({
					propertyToCalculate: INPUT_Properties /* STRING */ ,
					thingName: row.name /* STRING */
				});
				Things[row.name].daily_load_count = setdata;
				Things[row].load_count_per_day = setdata;
			}
		} else if (things !== undefined || things !== null || things.length > 0) {
			var thingsArr = things.split(",");
			var tableLength2 = thingsArr.length;
			for (var y = 0; y < tableLength2; y++) {
				var row = thingsArr[x];
				var setdata = me.SetDailyLoadCount({
					propertyToCalculate: INPUT_Properties /* STRING */ ,
					thingName: row /* STRING */
				});
				Things[row].daily_load_count = setdata;
				Things[row].load_count_per_day = setdata;
			}
		} else {
			logger.error("Error : Thing or Template must be added");
		}
	} else if (Intervals === "24Hours" && Intervals !== undefined && Type === "MAX") {
		logger.debug("START MAX");
		if (thingTemplate !== undefined || thingTemplate !== null || thingTemplate.length > 0) {
			logger.debug("MAX INSIDE TEMPLATE");
			// result: INFOTABLE dataShape: "RootEntityList"
			var thingsList = ThingTemplates["ELGi.comp.ELGiMasterEPSAC.TT"].GetImplementingThings();
			var tableLength1 = thingsList.rows.length;
			logger.debug("MAX Things COUNT : " + tableLength1);
			for (var y = 0; y < tableLength1; y++) {
				var row = thingsList.rows[y];
				Start = new Date();
				Start.setDate(Start.getDate() - 1);
				Start.setHours(0, 0, 0, 0);
				end = new Date();
				end.setDate(end.getDate() - 1);
				end.setHours(23, 59, 59, 0);

				var generalStatus = Things[row.name].general_status;
				// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.CalculationPurpose.DS)
				var dataTemp = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape({
					infoTableName: "InfoTable",
					dataShapeName: "EntityList"
				});

				dataTemp.AddRow({
					name: INPUT_Properties
				});

				if (generalStatus !== undefined && generalStatus > 0) {

					logger.debug("MAX INSIDE GENERAL STATUS IF");
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

					try {

						// result: INFOTABLE dataShape: "NumberValueStream"
						//						var qresult = Things[row.name].QueryNumberPropertyHistory({
						//							oldestFirst: undefined /* BOOLEAN */ ,
						//							maxItems: 20000 /* NUMBER */ ,
						//							propertyName: dataTemp /* STRING */ ,
						//							endDate: end /* DATETIME */ ,
						//							query: query /* QUERY */ ,
						//							startDate: Start /* DATETIME */
						//						});
						logger.debug("query : " + JSON.stringify(query));
						var qresult = Things[row.name].QueryNamedPropertyHistory({
							propertyNames: dataTemp /* INFOTABLE */ ,
							maxItems: 20000 /* NUMBER */ ,
							startDate: Start /* DATETIME */ ,
							endDate: end /* DATETIME */ ,
							oldestFirst: undefined /* BOOLEAN */ ,
							query: query /* QUERY */
						});
						logger.debug("qresult BADS030510 : " + qresult.rows.length);
						var query1 = {
							"filters": {
								"type": "NotMissingValue",
								"fieldName": INPUT_Properties
							}
						};

						// result: INFOTABLE
						var data1 = Resources["InfoTableFunctions"].Query({
							t: qresult /* INFOTABLE */ ,
							query: query1 /* QUERY */
						});
						//logger.debug("data1 BADS030510 : " + data1.rows.length);
						if (data1 !== undefined && data1.rows.length > 0) {

							// result: INFOTABLE
							var max = Resources["InfoTableFunctions"].Aggregate({
								t: data1 /* INFOTABLE */ ,
								columns: INPUT_Properties /* STRING */ ,
								aggregates: 'MAX' /* STRING */ ,
								groupByColumns: undefined /* STRING */
							});

							var maxVar = "MAX_" + INPUT_Properties;
							if (max[maxVar] === null) {
								Things[row.name][OUTPUT_Properties] = 0;
							} else {
								Things[row.name][OUTPUT_Properties] = max[maxVar];
							}
						} else {
							Things[row.name][OUTPUT_Properties] = 0;
						}

					} catch (err) {
						logger.error(err);
						Things[row.name][OUTPUT_Properties] = 0;
					}
				} else {
					Things[row.name][OUTPUT_Properties] = 0;
				}
			}
		} else if (things !== undefined || things !== null || things.length > 0) {
			var thingsArr = things.split(",");
			var tableLength2 = thingsArr.length;
			for (var y = 0; y < tableLength2; y++) {
				var row = thingsArr[x];
				Start = new Date();
				Start.setDate(Start.getDate() - 1);
				Start.setHours(0, 0, 0, 0);
				end = new Date();
				end.setDate(end.getDate() - 1);
				end.setHours(23, 59, 59, 0);

				var generalStatus = Things[row].general_status;
				// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.CalculationPurpose.DS)
				var dataTemp = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape({
					infoTableName: "InfoTable",
					dataShapeName: "EntityList"
				});

				dataTemp.AddRow({
					name: INPUT_Properties
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

					try {

						// result: INFOTABLE dataShape: "NumberValueStream"
						var qresult = Things[row].QueryNumberPropertyHistory({
							oldestFirst: undefined /* BOOLEAN */ ,
							maxItems: 20000 /* NUMBER */ ,
							propertyName: INPUT_Properties /* STRING */ ,
							endDate: end /* DATETIME */ ,
							query: query /* QUERY */ ,
							startDate: Start /* DATETIME */
						});

						var query1 = {
							"filters": {
								"type": "NotMissingValue",
								"fieldName": INPUT_Properties
							}
						};

						// result: INFOTABLE
						var data1 = Resources["InfoTableFunctions"].Query({
							t: qresult /* INFOTABLE */ ,
							query: query1 /* QUERY */
						});
						//logger.debug("data1 BPLS030066 : " + data1.rows.length);
						if (data1 !== undefined && data1.rows.length > 0) {

							// result: INFOTABLE
							var max = Resources["InfoTableFunctions"].Aggregate({
								t: data1 /* INFOTABLE */ ,
								columns: INPUT_Properties /* STRING */ ,
								aggregates: 'MAX' /* STRING */ ,
								groupByColumns: undefined /* STRING */
							});

							var maxVar = "MAX_" + INPUT_Properties;
							if (max[maxVar] === null) {
								Things[row.name][OUTPUT_Properties] = 0;
							} else {
								Things[row.name][OUTPUT_Properties] = max[maxVar];
							}
						} else {
							Things[row][OUTPUT_Properties] = 0;
						}
					} catch (err) {
						logger.error(err);
						Things[row][OUTPUT_Properties] = 0;
					}

				} else {
					Things[row][OUTPUT_Properties] = 0;
				}
			}
		} else {
			logger.error("Error : Thing or Template must be added");
		}
	}
}
