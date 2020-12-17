var OrgName = "acme.comp.ACMERoot3.ORG";
// ServiceEngg : AmanServiceEngg  serviceengg@gmail.com
// Dealer : TirinuvelamDealer Dealer4@gmail.com
// ASM : Tamilnadu  Surya@gmail.com
// Customer :CustomerRam pundlik@gmail.com
// Plant : PlantTriven PlantTriven@gmail.com

//To Send Values Into Code Variables
var countryOuName = country + "_OU"; //Country
var country_Manager_NameOu = country_Manager_Name + "_CM_OU";
var regionOu = region + "_" + country_Manager_Name + "_OU";

var regionGroupName = region + "_UG";
// Not Having ASM ,Service engg and Dealer Data	
	//Regional Sales Manager Code
try{
  
      var regionsNameOfOrganizationUnit_Fourth = Organizations[OrgName].IsInOrganization({
        name: regionOu /* STRING */
    });
    
    if (regionsNameOfOrganizationUnit_Fourth !== true) {

        try {
            //Region Not Found 
            Organizations[OrgName].AddOrganizationalUnit({
                parentName: country_Manager_NameOu /* STRING */ ,
                name: regionOu /* STRING */
            });
        } catch (err) {
            logger.warn("Region ou not created");
        }
        try {
            //var nameOfRegionGroupProvided;
            var UserGroupForRegion_Fourth = {
                name: regionGroupName /* STRING */ ,
                description: undefined /* STRING */ ,
                tags: undefined /* TAGS */
            };
            Resources["EntityServices"].CreateGroup(UserGroupForRegion_Fourth);
        } catch (err) {
            logger.warn("Region Group not created");
        }

        try {
            Organizations[OrgName].AddMember({
                name: regionOu /* STRING */ ,
                member: regionGroupName /* STRING */ ,
                type: "Group" /* STRING */
            });

        } catch (err) {
            logger.warn("Region Group not added in OU");
        }

        try {
            // result: INFOTABLE dataShape: "GroupMember"
            var dataOfregion_Fourth = Groups["Users"].GetGroupMembers();
            var tableLengthR_Fourth1 = dataOfregion_Fourth.rows.length;
            for (var xv = 0; xv < tableLengthR_Fourth1; xv++) {
                var regionUserName_Fourth = dataOfregion_Fourth.rows[xv].name;
                var regionUser_email_Fourth = Users[regionUserName_Fourth].emailAddress;
                if (RSM_email === regionUser_email_Fourth) {
                    Groups[regionGroupName].AddMember({
                        member: regionUserName_Fourth /* STRING */ ,
                        type: "User" /* STRING */
                    });
                    //break;
                }

            }
        } catch (err) {
            logger.warn("Region user not added in group");
        }

    } else

    {
        //regionOu Found Here

        try {
            var MembersOfregion_Fourth = Organizations[OrgName].GetMembers({
                name: regionOu /* STRING */
            });

            var tableLengthR_Fourth2 = MembersOfregion_Fourth.rows.length;
            for (var xw = 0; xw < tableLengthR_Fourth2; xw++) {
                var NameOfUnitGroups_Fourth = MembersOfregion_Fourth.rows[xw].name; 
                // result: INFOTABLE dataShape: "GroupMember"
                var dataOfregion_Fourth1 = Groups[NameOfUnitGroups_Fourth].GetGroupMembers();

                var tableLengthR_Fourth3 = dataOfregion_Fourth1.rows.length;
                for (var xy = 0; xy < tableLengthR_Fourth3; xy++) {
                    var regionUserName_Fourth1 = dataOfregion_Fourth1.rows[xy].name;
                    var regionUser_email_Fourth1 = Users[regionUserName_Fourth1].emailAddress;
                    // var result = user_email;
                    if (RSM_email === regionUser_email_Fourth1) {

                        Groups[NameOfUnitGroups_Fourth].AddMember({
                            member: regionUserName_Fourth1 /* STRING */ ,
                            type: "User" /* STRING */
                        });
                        //break;
                    }
                }
            }
        } catch (err) {
            logger.warn("Region user not added in group");
        }

        //            else {
        //
        //                Groups[NameOfUnitGroups].DeleteMember({
        //                    member: user_name /* STRING */ ,
        //                    type: "User" /* STRING */
        //                });
        //                var data = Groups["Users"].GetGroupMembers();
        //                //var result = data
        //                var abc = "";
        //                var tableLength = data.rows.length;
        //                for (var x = 0; x < tableLength; x++) {
        //                    var regionUserName = data.rows[x].name;
        //                    var user_email = Users[regionUserName].emailAddress;
        //                    if (RSM_email === user_email) {
        //                        Groups[regionGroupName].AddMember({
        //                            member: regionUserName /* STRING */ , // West_RSM_UG
        //                            type: "User" /* STRING */
        //                        });
        //                        //break;
        //                    }
        //                }}
        //

    }
  
  }catch(err){
  logger.warn("Ou Not Created");
  }


// This Customer is for after Region
    var CustomerOuAfterRegion = Customer + "_" + region + "_" + country_Manager_Name + "_OU";
    var CustomerGroupNameAfterRegion = CustomerOuAfterRegion + "_UG";
    var CustomerUserNameAfterRegion = CustomerOuAfterRegion + "_User";
    // regionOu
try{
  
      var CustomerNameOfOrganizationUnit_Fourth = Organizations[OrgName].IsInOrganization({
        name: CustomerOuAfterRegion /* STRING */
    });
    //var CustomerNameOfOrganizationUnit1 = CustomerNameOfOrganizationUnit;

    if (CustomerNameOfOrganizationUnit_Fourth === false) {

        try {
            //Region Not Found 
            Organizations[OrgName].AddOrganizationalUnit({
                parentName: regionOu /* STRING */ ,
                name: CustomerOuAfterRegion /* STRING */
            });
        } catch (err) {
            logger.warn("Customer ou not created");
        }

        try {

            //var nameOfRegionGroupProvided;
            var UserGroupForCustomer_Fourth = {
                name: CustomerGroupNameAfterRegion /* STRING */ ,
                description: undefined /* STRING */ ,
                tags: undefined /* TAGS */
            };
            Resources["EntityServices"].CreateGroup(UserGroupForCustomer_Fourth);

        } catch (err) {
            logger.warn("Customer Group not created");
        }

        try {
            Organizations[OrgName].AddMember({
                name: CustomerOuAfterRegion /* STRING */ ,
                member: CustomerGroupNameAfterRegion /* STRING */ ,
                type: "Group" /* STRING */
            });
            // result: INFOTABLE dataShape: "GroupMember"
        } catch (err) {
            logger.warn("Customer Group not added in OU");
        }

        try {
            var UserForCustomer_Fourth = {
                password: undefined /* STRING */ ,
                name: CustomerUserNameAfterRegion /* STRING */ ,
                description: undefined /* STRING */ ,
                tags: undefined /* TAGS */
            };
            // no return
            Resources["EntityServices"].CreateUser(UserForCustomer_Fourth);
        } catch (err) {

            logger.warn("Customer user not created");
        }

        try {
            Users[CustomerUserNameAfterRegion].emailAddress = Customer_email;
            Groups[CustomerGroupNameAfterRegion].AddMember({
                member: CustomerUserNameAfterRegion /* STRING */ , // West_RSM_UG
                type: "User" /* STRING */
            });

        } catch (err) {
            logger.warn("Customer user not added in group");
        }
    }
  
  }catch(err){
  logger.warn("Ou Not Created");
  }

    // Plants Code After Region Or Customer 
	
	try{
  
    var PlantOuAfterRegionCustomer = Plant + "_" + Customer + "_" + country_Manager_Name + "_OU";
    var PlantGroupNameAfterRegionCustomer = PlantOuAfterRegionCustomer + "MaintainenceEngineer_UG";
    var PlantUserNameAfterRegionCustomer = PlantOuAfterRegionCustomer + "MaintainenceEngineer_User";
    // regionOu
    var PlantNameOfOrganizationUnit_Fourth = Organizations[OrgName].IsInOrganization({
        name: PlantOuAfterRegionCustomer /* STRING */
    });
    
    if (PlantNameOfOrganizationUnit_Fourth === false) {
        try {
            //Region Not Found 
            Organizations[OrgName].AddOrganizationalUnit({
                parentName: CustomerOuAfterRegion /* STRING */ ,
                name: PlantOuAfterRegionCustomer /* STRING */
            });
        } catch (err) {
            logger.warn("Plant ou not created");
        }
        
        try {
            
            //var nameOfRegionGroupProvided;
            var UserGroupForPlant_Fourth = {
                name: PlantGroupNameAfterRegionCustomer /* STRING */ ,
                description: undefined /* STRING */ ,
                tags: undefined /* TAGS */
            };
            Resources["EntityServices"].CreateGroup(UserGroupForPlant_Fourth);

        } catch (err) {
            logger.warn("Plant Group not created");
        }

        try {
            Organizations[OrgName].AddMember({
                name: PlantOuAfterRegionCustomer /* STRING */ ,
                member: PlantGroupNameAfterRegionCustomer /* STRING */ ,
                type: "Group" /* STRING */
            });
            // result: INFOTABLE dataShape: "GroupMember"
        } catch (err) {
            logger.warn("Plant Group not added in OU");
        }
        try {
            var UserForPlant_Fourth = {
                password: undefined /* STRING */ ,
                name: PlantUserNameAfterRegionCustomer /* STRING */ ,
                description: undefined /* STRING */ ,
                tags: undefined /* TAGS */
            };
            // no return
            Resources["EntityServices"].CreateUser(UserForPlant_Fourth);
        } catch (err) {
            logger.warn("Plant user not created");
        }
        try {
            Users[PlantUserNameAfterRegionCustomer].emailAddress = Plant_email;
            Groups[PlantGroupNameAfterRegionCustomer].AddMember({
                member: PlantUserNameAfterRegionCustomer /* STRING */ , // West_RSM_UG
                type: "User" /* STRING */
            });
        } catch (err) {
            logger.warn("Plant user not added in group");
        }
    }
  
  }catch(err){
  logger.warn("Ou Not Created");
  }
