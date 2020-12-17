try {
	var orgName = me.ORG_NAME;
	var CustomerUnit = "";
	var result = "";
	//var leng = 7;
	var unitGroupNames = "",
		unitGroupUsers = "",
		OrgUnitName = "";
	var params = {
		infoTableName: "InfoTable",
		dataShapeName: "ELGI.COMP.ShowOrgnizationDataInTable.DS"
	};

	// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGI.COMP.ShowOrgnizationDataInTable.DS)
	var infotableData = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);
	var OrgTable = new Object();

	// result: INFOTABLE dataShape: "Permissions"
	var data = Things[thingName].GetVisibilityPermissions();
	var firstOrgUnitName = data.name;

	if (firstOrgUnitName.indexOf(':') !== -1) {
		//split and get
		CustomerUnit = firstOrgUnitName.split(':')[1];
		mainUnit = firstOrgUnitName.split(':')[0];
		//CustomerUnit = y;
		OrgUnitName = CustomerUnit;
	}
	// result: INFOTABLE dataShape: "OrganizationConnection"
	var mainUnitConnections = Organizations[mainUnit].GetOrganizationConnections({
		maxDepth: undefined /* NUMBER */
	});
	var tableLengthFor = mainUnitConnections.rows.length;
	for (var d = 0; d < tableLengthFor; d++) {

		unitGroupUsers = "";
		unitGroupNames = "";

		if (OrgUnitName !== "") {
			// result: STRING
			var descriptionData = Organizations[orgName].GetOrganizationalUnitDescription({
				name: OrgUnitName /* STRING */
			});
			OrgTable.Description = descriptionData;

			var MembersOfUnit = Organizations[orgName].GetMembers({
				name: OrgUnitName /* STRING */
			});
			OrgTable.OrgUnitName = OrgUnitName;

			//var result = MembersOfUnit;
			var tableLengthR_First2 = MembersOfUnit.rows.length;
			for (var y = 0; y < tableLengthR_First2; y++) {
				var NameOfUnitGroups_First = MembersOfUnit.rows[y].name;
				unitGroupNames = NameOfUnitGroups_First;

				var dataOfGroups_First = Groups[NameOfUnitGroups_First].GetGroupMembers();
				var tableLengthR_First1 = dataOfGroups_First.rows.length;
				for (var xunit = 0; xunit < tableLengthR_First1; xunit++) {
					var UserName_First = dataOfGroups_First.rows[xunit].name;

					var len = tableLengthR_First1 - 1;
					if (xunit === len) {
						unitGroupUsers = unitGroupUsers + UserName_First;
					} else {
						unitGroupUsers = unitGroupUsers + UserName_First + ",";
					}
				}
			}
			// result: STRING ELGI_ORG 
			var ParentName = Organizations[orgName].GetParentName({
				name: OrgUnitName /* STRING */
			});
			OrgUnitName = ParentName;

			OrgTable.GroupName = unitGroupNames;
			OrgTable.UsersInGroup = unitGroupUsers;
			infotableData.AddRow(OrgTable);
		}
	}

	result = infotableData;
} catch (err) {
	logger.warn("The Thing is wrong or Not found Org Unit Name :" + err.message);
}
