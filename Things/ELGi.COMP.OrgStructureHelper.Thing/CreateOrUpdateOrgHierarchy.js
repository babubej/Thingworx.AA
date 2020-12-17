try {
    
    /********************Country Level Logic***************************/
	// Check if Country OU is present
	var isOUPresent = Organizations[me.ORG_NAME].IsInOrganization({
		name: countryName /* STRING */
	});

	if (isOUPresent) {
		//User Exists
		// result: INFOTABLE dataShape: "EntityReferenceWithDescription"
		var membersList = Organizations[me.ORG_NAME].GetMembers({
			name: countryName /* STRING */
		});
		if (membersList !== undefined && membersList !== null && membersList.length > 0) {
			// result: INFOTABLE dataShape: "GroupMember"
			var groupMemberList = Groups[membersList.name].GetGroupMember({
				name: countryHeadUserId /* STRING */
			});

			// Check if Country Head user coming from CRM exists or not in TWX
			var params = {
				maxItems: undefined /* NUMBER */ ,
				nameMask: countryHeadUserId /* STRING */ ,
				type: 'User' /* STRING */ ,
				tags: undefined /* TAGS */
			};
			// result: INFOTABLE dataShape: RootEntityList
			var userList = Resources["EntityServices"].GetEntityList(params);

			if (userList !== undefined && userList !== null && userList.length > 0) {

				if (groupMemberList !== undefined && groupMemberList !== null && groupMemberList.length > 0) {
					//If User is already present	
					//Add User to Group
					Groups[groupMemberList.name].AddMember({
						member: countryHeadUserId /* STRING */ ,
						type: 'User' /* STRING */
					});
				} else {
					//If no User is present	
					//Add User to Group
					Groups[groupMemberList.name].AddMember({
						member: countryHeadUserId /* STRING */ ,
						type: 'User' /* STRING */
					});
				}
			} else {
				throw ('Country Head User does not exist in Thingworx. Terminating Org Hierarchy creation');
			}
		} else {
			//Create User Group as it does not exist and add it to respective Org Unit
			var userGroupName = countryName + '_UG';
			me.CreateAndAddOUMember({
				userGroupName: userGroupName /* STRING */ ,
				userId: countryHeadUserId /* STRING */ ,
				orgUnitName: countryName /* STRING */
			});
		}

	} else {
		throw ('Country Org Unit does not exist in Thingworx. Terminating Org Hierarchy creation');
	}
} catch (err) {
	logger.error('ERROR : ' + err);
}

	/********************Region Level Logic***************************/

    // Check if REGION Name is sent from CRM

    if( regionName !== undefined && regionName !== null && regionName.trim() !== '' ){
    	//Check if Region Name OU is available in ORG
        var CustomerNameOfOrganizationUnit_Third = Organizations["ORG001"].IsInOrganization({
    			name: CustomerOuAfterASM /* STRING */
    		});
    } else {
    	
    }
