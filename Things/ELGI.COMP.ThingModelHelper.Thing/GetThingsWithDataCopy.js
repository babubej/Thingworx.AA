// --------------------------------------------------------------------------------------
// DESCRIPTION
// This service fetches the list of Things
//---------------------------------------------------------------------------------------
// Revision	Date        Who               What
// 1.0	2020-11-5  		Prasoon 		  Performance Improvement
// --------------------------------------------------------------------------------------

//********************* DEFINE YOUR SERVICE INPUTS/OUTPUT HERE **************************
/** @type {infotable} */
var result;
/** @type {string} */
var machine;
/** @type {string} */
var region;
/** @type {string} */
var nameMask;

//******************************* SERVICE CODE STARTS HERE *******************************
(function() {
	"use strict";
	// TODO: Write your service with try/catch
	try {
		logger.debug("GETTHINGSWITHDATA START");

		// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.ThingDetailsWithData.DS)
		result = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape({
			infoTableName: "InfoTable",
			dataShapeName: "RootEntityList"
		});
        
        var dsTable = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape({
			infoTableName: "InfoTable",
			dataShapeName: "ELGi.COMP.ThingDetailsWithData.DS"
		});

		// CreateInfoTableFromDataShape
		var propInfoTable = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape({
			infoTableName: "InfoTable",
			dataShapeName: "EntityList"
		});
        
        // CreateInfoTableFromDataShape
		var basicpropInfoTable = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape({
			infoTableName: "InfoTable",
			dataShapeName: "EntityList"
		});

		// Will be used in TWX 8.5    
        var columnName;
        var newEntry;
		// infotable datashape iteration
		var dataShapeFields = dsTable.dataShape.fields;
		for (var fieldName in dataShapeFields) {
			columnName = dataShapeFields[fieldName].name;
			if (columnName !== 'name') {
				newEntry = new Object();
				newEntry.name = columnName; // STRING [Primary Key]
				newEntry.description = undefined; // STRING
				propInfoTable.AddRow(newEntry);
			}
		}
        
        // EntityList entry object
        newEntry = new Object();
        newEntry.name = "name"; // STRING [Primary Key]
        newEntry.description = undefined; // STRING
        basicpropInfoTable.AddRow(newEntry);

		var queryObjects = new Array();
		var filter;

		if (machine !== undefined && machine !== null && machine.trim() !== '' && machine !== 'ALL') {
			filter = {
				"type": "EQ",
				"fieldName": "machine_group",
				"value": machine
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

		var query = {
			"filters": {
				"type": "And",
				"filters": queryObjects
			}
		};

		result = ThingTemplates["ELGi.comp.ELGiMaster.TT"].QueryImplementingThingsWithNamedData({
			maxItems: undefined /* NUMBER */ ,
			nameMask: undefined /* STRING */ ,
			propertyNames: propInfoTable,
			basicPropertyNames: basicpropInfoTable,
			query: query /* QUERY */ ,
			tags: undefined /* TAGS */
		});
       

		// result: INFOTABLE dataShape: "RootEntityList"
		//	var result = ThingTemplates["ELGi.comp.ELGiMaster.TT"].QueryImplementingThingsWithData({
		//		maxItems: undefined /* NUMBER */ ,
		//		nameMask: undefined /* STRING */ ,
		//		query: query /* QUERY */ ,
		//		tags: undefined /* TAGS */
		//	});

		logger.debug("Total Machine Count :: " + result.rows.length);

		//var tableLength = queryResult.rows.length;
		//for (var x=0; x < tableLength; x++) {
		//    var row = queryResult.rows[x];
		//    // ELGi.COMP.ThingDetailsWithData.DS entry object
		//    newEntry = new Object();
		//    newEntry.name = row.name; // STRING [Primary Key]
		//    newEntry.is_Machine_Connected = row.is_Machine_Connected; // BOOLEAN    
		//	result.AddRow(newEntry);
		//}
	} catch (err) {
		logger.error("Error occured : " + err.message);
	}
	logger.debug("GETTHINGSWITHDATA END");
}());
