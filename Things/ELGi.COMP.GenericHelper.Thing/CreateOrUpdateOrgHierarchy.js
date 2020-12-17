try{
    // Check if Country Head user exists or not in TWX
    var params = {
    	maxItems: undefined /* NUMBER */ ,
    	nameMask: countryHeadUserId /* STRING */ ,
    	type: 'User' /* STRING */ ,
    	tags: undefined /* TAGS */
    };
    // result: INFOTABLE dataShape: RootEntityList
    var userList = Resources["EntityServices"].GetEntityList(params);
        
    if (userList !== undefined && userList !== null && userList.length > 0) {
    	//User Exists
        // result: INFOTABLE dataShape: "EntityReferenceWithDescription"
		var membersList =  Organizations["ORG001"].GetMembers({
			name: countryName /* STRING */
		});
        if(membersList !== undefined && membersList !== null && membersList.length > 0){
           // result: INFOTABLE dataShape: "GroupMember"
    		var result =  Groups[membersList.name].GetGroupMember({
    			name: countryHeadUserId /* STRING */
    		});
        } else{
        	//Create User Group as it does not exist
            var userGroupName = countryName+'_UG';            
            var params01 = {
				name: userGroupName /* STRING */ ,
				description: undefined /* STRING */ ,
				tags: undefined /* TAGS */
			};
			Resources["EntityServices"].CreateGroup(params01);
            
            //Add the created User Group into Org Unit
            Organizations["ORG001"].AddMember({
            	name: countryName /* STRING */,
            	member: userGroupName /* STRING */,
            	type: 'Group' /* STRING */
            });
        }
        
        
    } else {
    	throw ('Country Head User does not exist in Thingworx. Terminating Org Hierarchy creation');
    }
} catch(err){
	logger.error('ERROR : ' + err);
}    

// Check if REGION Name is sent from CRM

//if( regionName !== undefined && regionName !== null && regionName.trim() !== '' ){
//	//Check if Region Name OU is available in ORG
//    var CustomerNameOfOrganizationUnit_Third = Organizations["ORG001"].IsInOrganization({
//			name: CustomerOuAfterASM /* STRING */
//		});
//} else {
//	
//}
//
//
//
