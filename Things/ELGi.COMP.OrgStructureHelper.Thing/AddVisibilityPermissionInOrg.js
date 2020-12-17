try {

	// result: INFOTABLE dataShape: "Permissions"
	var existingPermissions = Things[thingName].GetVisibilityPermissions();

	var tableLength = existingPermissions.rows.length;
	for (var x = 0; x < tableLength; x++) {
		var row = existingPermissions.rows[x];
		//Delete Existing Visibility Permissions
		Things[thingName].DeleteVisibilityPermission({
			principal: row.name /* STRING */ ,
			principalType: "OrganizationalUnit" /* STRING */
		});
	}

	var principal = "ELGI_ORG:" + OrgnizationUnitName;
	Things[thingName].AddVisibilityPermission({
		principal: principal /* STRING */ ,
		principalType: "OrganizationalUnit" /* STRING */
	});
} catch (err) {
	logger.error("Error occured while setting Visibility permission on Thing " + thingName);
}
