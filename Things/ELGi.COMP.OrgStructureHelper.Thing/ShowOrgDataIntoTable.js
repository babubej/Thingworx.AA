var orgName = me.ORG_NAME;
// result: INFOTABLE dataShape: "OrganizationConnection"
try {
	var DataOfOrgnization = Organizations[orgName].GetOrganizationConnections({
		maxDepth: undefined /* NUMBER */
	});
	var params = {
		infoTableName: "InfoTable",
		dataShapeName: "ELGI.COMP.ShowOrgnizationDataInTable.DS"
	};

	// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGI.COMP.ShowOrgnizationDataInTable.DS)
	var Orginfotable = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);
	var OrgTable = new Object();
	var tableLength = DataOfOrgnization.rows.length;
    logger.debug("Total Connections : "+tableLength);
	for (var x = 0; x < tableLength; x++) {
		var Unit_Id = DataOfOrgnization.rows[x].to;
		OrgTable.OrgUnitName = Unit_Id;
		var unitsChilds = "";
		var unitGroupUsers = "";
		var unitGroupNames = "";
		var MembersOfUnit = Organizations[orgName].GetMembers({
			name: Unit_Id /* STRING */
		});
		//var result = MembersOfUnit;
		var tableLengthR_First2 = MembersOfUnit.rows.length;
        logger.debug("Total tableLengthR_First2 : "+tableLengthR_First2);
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
		OrgTable.GroupName = unitGroupNames;
		OrgTable.UsersInGroup = unitGroupUsers;

		// result: STRING
		var descriptionData = Organizations[orgName].GetOrganizationalUnitDescription({
			name: Unit_Id /* STRING */
		});
		OrgTable.Description = descriptionData;

		// result: STRING
		var unitParentName = Organizations[orgName].GetParentName({
			name: Unit_Id /* STRING */
		});
		// Unit_Id === "Country.OU" || Unit_Id === "ELGI_ORG"
		if (unitParentName === "") {
			OrgTable.ParentOfOrgUnit = "/";
		} else {
			OrgTable.ParentOfOrgUnit = unitParentName;
		}
		// result: INFOTABLE dataShape: "OrganizationConnection"
		var UnitChildNames = Organizations[orgName].GetChildConnections({
			name: Unit_Id /* STRING */
		});

		var tableLength4 = UnitChildNames.rows.length;
		for (var z = 0; z < tableLength4; z++) {

			var childsNamefrom = UnitChildNames.rows[z].from;
			var childsName = UnitChildNames.rows[z].to;

			if (childsNamefrom === Unit_Id && childsName !== Unit_Id) {

				var length = tableLength4 - 1;
				if (z === length) {
					unitsChilds = unitsChilds + childsName;
				} else {
					unitsChilds = unitsChilds + childsName + ",";
				}

				if (unitsChilds !== " ") {
					OrgTable.HasChild = true;
				} else {
					OrgTable.HasChild = false;
				}
			}

			OrgTable.ChildOfOrgUnit = unitsChilds;
		}

		if (OrgTable.ChildOfOrgUnit === OrgTable.OrgUnitName) {
			OrgTable.ChildOfOrgUnit = "";
			OrgTable.HasChild = false;
		}
		// directly changing from object where unit name and child name is same
		Orginfotable.AddRow(OrgTable);
	}

	var result = Orginfotable;
} catch (err) {
	logger.error("Error in ELGi.COMP.OrgStructureHelper.Thing ShowOrgDataIntoTable. Message : "+err);
}
