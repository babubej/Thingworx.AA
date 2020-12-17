var queryObjects = new Array();
//var queryObjects = [];
if (RetrofittedOrNot !== undefined && (RetrofittedOrNot === true || RetrofittedOrNot !== false)) {
var	filter1 = {
			"type": "EQ",
			"fieldName": "isRetrofitted",
			"value": RetrofittedOrNot
	};
	queryObjects.push(filter1);
}

if (CRMorCCSValue !== undefined && CRMorCCSValue !== null && CRMorCCSValue.trim() !== '' ) {
var	filter2 = {
			"type": "EQ",
			"fieldName": "CRMorCCS",
			"value": CRMorCCSValue
	};
	queryObjects.push(filter2);
}
if (Machine_Name !== undefined && Machine_Name  !== null && Machine_Name.trim() !== '' ) {
var	filter3 = {
			"type": "EQ",
			"fieldName": "machine_name",
			"value": Machine_Name
	};
	queryObjects.push(filter3);
}
if (Country !== undefined && Country !== null && Country.trim() !== '') {
var	filter4 = {
			"type": "EQ",
			"fieldName": "Country",
			"value": Country
	};
	queryObjects.push(filter4);
}

if (regionName !== undefined && regionName !== null && regionName.trim() !== '') {
var	filter5 = {
			"type": "EQ",
			"fieldName": "RM",
			"value": regionName
	};
	queryObjects.push(filter5);
}
if (AreaName !== undefined && AreaName !== null && AreaName.trim() !== '') {
var	filter6 = {
			"type": "EQ",
			"fieldName": "Area",
			"value": AreaName
	};
	queryObjects.push(filter6);
}

if (dealer_Name !== undefined && dealer_Name !== null && dealer_Name.trim() !== '') {
var	filter7 = {
			"type": "EQ",
			"fieldName": "Assigned_To",
			"value": dealer_Name
	};
	queryObjects.push(filter7);
}
if (AA_Health_isConnectedOrNot !== undefined && (AA_Health_isConnectedOrNot === true || AA_Health_isConnectedOrNot !== false)) {
var	filter8 = {
			"type": "EQ",
			"fieldName": "AA_Health_isConnected",
			"value": AA_Health_isConnectedOrNot
	};
	queryObjects.push(filter8);
}
if (is_Machine_ConnectedOrNot !== undefined && (is_Machine_ConnectedOrNot === true || is_Machine_ConnectedOrNot !== false)) {
var	filter9 = {
			"type": "EQ",
			"fieldName": "is_Machine_Connected",
			"value": is_Machine_ConnectedOrNot
	};
	queryObjects.push(filter9);
}

if (is_Sump_EnabledOrNot !== undefined && (is_Sump_EnabledOrNot === true || is_Sump_EnabledOrNot !== false)) {
var	filter10 = {
			"type": "EQ",
			"fieldName": "is_Sump_Enabled",
			"value": is_Sump_EnabledOrNot
	};
	queryObjects.push(filter10);
}

if (isManufacturedOrNot !== undefined && (isManufacturedOrNot === true || isManufacturedOrNot !== false)) {
var	filter11 = {
			"type": "EQ",
			"fieldName": "isManufactured",
			"value": isManufacturedOrNot
	};
	queryObjects.push(filter11);
}
if (isVfd_ConnectedOrNot !== undefined && (isVfd_ConnectedOrNot === true || isVfd_ConnectedOrNot !== false)) {
var	filter12 = {
			"type": "EQ",
			"fieldName": "isVfd_Connected",
			"value": isVfd_ConnectedOrNot
	};
	queryObjects.push(filter12);
}
if (Is_Key_Customer_OrNot !== undefined && (Is_Key_Customer_OrNot === true || Is_Key_Customer_OrNot !== false)) {
var	filter13 = {
			"type": "EQ",
			"fieldName": "Key_Customer",
			"value": Is_Key_Customer_OrNot
	};
	queryObjects.push(filter13);
}

var query = {
	"filters": {
		"type": "And",
		"filters": queryObjects
	}
};
logger.warn("All Array Value"+query);
// result: INFOTABLE dataShape: "RootEntityList"
var result = ThingTemplates["ELGi.comp.ELGiMaster.TT"].QueryImplementingThingsWithData({
	maxItems: undefined /* NUMBER */ ,
	nameMask: undefined /* STRING */ ,
	query: query /* QUERY */ ,
	tags: undefined /* TAGS */
});
