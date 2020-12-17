try{

    //Create User Group as it does not exist         
    var params = {
    			name: userGroupName /* STRING */ ,
    			description: undefined /* STRING */ ,
    			tags: undefined /* TAGS */
    };
    Resources["EntityServices"].CreateGroup(params);
    
    //Add User to Group
    Groups[userGroupName].AddMember({
    	member: userId /* STRING */,
    	type: 'User' /* STRING */
    });
    
    //Add the created User Group into Org Unit
    Organizations[me.ORG_NAME].AddMember({
    	name: orgUnitName /* STRING */,
    	member: userGroupName /* STRING */,
    	type: 'Group' /* STRING */
    });        
} catch(err){
	logger.error('Error :: '+err);
}
