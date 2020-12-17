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
var ASMOu = ASM + "_" + region + "_" + country_Manager_Name + "_OU";

var ASMGroupName = ASMOu + "_UG";
var regionGroupName = region + "_UG";

// Not Having Service engg ang Dealer Data	
//Regional Sales Manager Code

try{
  
      var regionsNameOfOrganizationUnit_Third = Organizations[OrgName].IsInOrganization({
        name: regionOu /* STRING */
    });

    if (regionsNameOfOrganizationUnit_Third !== true) {

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
            var UserGroupForRegion_Third = {
                name: regionGroupName /* STRING */ ,
                description: undefined /* STRING */ ,
                tags: undefined /* TAGS */
            };
            Resources["EntityServices"].CreateGroup(UserGroupForRegion_Third);
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
            var dataOfregion_Third = Groups["Users"].GetGroupMembers();
            
            var tableLengthR_Third1 = dataOfregion_Third.rows.length;
            for (var xp = 0; xp < tableLengthR_Third1; xp++) {
                var regionUserName_Third = dataOfregion_Third.rows[xp].name;
                var regionUser_email_Third = Users[regionUserName_Third].emailAddress;
                if (RSM_email === regionUser_email_Third) {
                    Groups[regionGroupName].AddMember({
                        member: regionUserName_Third /* STRING */ ,
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
            var MembersOfregion_Third = Organizations[OrgName].GetMembers({
                name: regionOu /* STRING */
            });
           
            var tableLengthR_Third2 = MembersOfregion_Third.rows.length;
            for (var xq = 0; xq < tableLengthR_Third2; xq++) {
                var NameOfUnitGroupsregion_Third = MembersOfregion_Third.rows[xq].name; 
                
                // result: INFOTABLE dataShape: "GroupMember"
                var dataOfregion_Third1 = Groups[NameOfUnitGroupsregion_Third].GetGroupMembers();

                var tableLengthR_Third3 = dataOfregion_Third1.rows.length;
                for (var xr = 0; xr < tableLengthR_Third3; xr++) {
                    var regionUserName_Third1 = data14.rows[xr].name;
                    var regionUser_email_Third1 = Users[regionUserName_Third1].emailAddress;
                    // var result = user_email;
                    if (RSM_email === regionUser_email_Third1) {
                        //abc=user_name;
                        Groups[NameOfUnitGroupsregion_Third].AddMember({
                            member: regionUserName_Third1 /* STRING */ ,
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

    // ASM Code

	try{
  
      var ASMNameOfOrganizationUnit_Third = Organizations[OrgName].IsInOrganization({
        name: ASMOu /* STRING */
    });
    
    if (ASMNameOfOrganizationUnit_Third !== true) {

        try {
            //Region Not Found 
            Organizations[OrgName].AddOrganizationalUnit({
                parentName: regionOu /* STRING */ ,
                name: ASMOu /* STRING */
            });
        } catch (err) {
            logger.warn("ASM ou not created");
        }
        
        try {
            //var nameOfRegionGroupProvided;
            var UserGroupForASM_Third = {
                name: ASMGroupName /* STRING */ ,
                description: undefined /* STRING */ ,
                tags: undefined /* TAGS */
            };
            Resources["EntityServices"].CreateGroup(UserGroupForASM_Third);

        } catch (err) {
            logger.warn("ASM Group not created");
        }
        
        try {
            Organizations[OrgName].AddMember({
                name: ASMOu /* STRING */ ,
                member: ASMGroupName /* STRING */ ,
                type: "Group" /* STRING */
            });
        } catch (err) {
            logger.warn("ASM Group not added in OU");

        }

        try {
            // result: INFOTABLE dataShape: "GroupMember"
            var dataOfASM_Third = Groups["Users"].GetGroupMembers();
           
            var tableLengthA_Third1 = dataOfASM_Third.rows.length;
            for (var xs = 0; xs < tableLengthA_Third1; xs++) {
                var ASMUserName_Third = dataOfASM_Third.rows[xs].name;
                var ASMUser_email_Third = Users[ASMUserName_Third].emailAddress;
                if (ASM_email === ASMUser_email_Third) {
                    Groups[ASMGroupName].AddMember({
                        member: ASMUserName_Third /* STRING */ ,
                        type: "User" /* STRING */
                    });
                   // break;
                }

            }
        } catch (err) {
            logger.warn("ASM user not added in group");
        }
        
    } else

    {
        try {
            //regionOu Found Here
            var MembersOfASM_Third = Organizations[OrgName].GetMembers({
                name: ASMOu /* STRING */
            });
            var tableLengthA_Third2 = MembersOfASM_Third.rows.length;
            for (var xt = 0; xt < tableLengthA_Third2; xt++) {
                var ASMNameOfUnitGroupsThird = MembersOfASM_Third.rows[xt].name; 
                // result: INFOTABLE dataShape: "GroupMember"
                var dataOfASM_Third1 = Groups[ASMNameOfUnitGroupsThird].GetGroupMembers();

                var tableLengthA_Third3 = dataOfASM_Third1.rows.length;
                for (var xu = 0; xu < tableLengthA_Third3; xu++) {
                    var ASMUserName_Third1 = dataOfASM_Third1.rows[xu].name;
                    var ASMUser_email_Third1 = Users[ASMUserName_Third1].emailAddress;
                    // var result = user_email;
                    if (ASM_email === ASMUser_email_Third1) {
                 
                        Groups[ASMNameOfUnitGroupsThird].AddMember({
                            member: ASMUserName_Third1 /* STRING */ ,
                            type: "User" /* STRING */
                        });
                        //break;
                    }
                }
            }
        } catch (err) {

            logger.warn("ASM user not added in group");
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
        //                    var ASMUserName = data.rows[x].name;
        //                    var user_email = Users[ASMUserName].emailAddress;
        //                    if (ASM_email === user_email) {
        //                        Groups[ASMGroupName].AddMember({
        //                            member: ASMUserName /* STRING */ , // West_RSM_UG
        //                            type: "User" /* STRING */
        //                        });
        //                        //break;
        //                    }
        //                }}
    }
  
  }catch(err){
  logger.warn("Ou Not Created");
  }
    
    // This Customer is for after ASM
	
    var CustomerOuAfterASM = Customer + "_" + ASM + "_" + region + "_" + country_Manager_Name + "_OU";
    var CustomerGroupNameAfterASM = CustomerOuAfterASM + "_UG";
    var CustomerUserNameAfterASM = CustomerOuAfterASM + "_User";
    // ASMOu

	try{
  
      var CustomerNameOfOrganizationUnit_Third = Organizations[OrgName].IsInOrganization({
        name: CustomerOuAfterASM /* STRING */
    });
    
    if (CustomerNameOfOrganizationUnit_Third === false) {

        try {
            //Region Not Found 
            Organizations[OrgName].AddOrganizationalUnit({
                parentName: ASMOu /* STRING */ ,
                name: CustomerOuAfterASM /* STRING */
            });
        } catch (err) {
            logger.warn("Customer ou not created");
        }
        try {
            var UserGroupForCustomer_Third = {
                name: CustomerGroupNameAfterASM /* STRING */ ,
                description: undefined /* STRING */ ,
                tags: undefined /* TAGS */
            };
            Resources["EntityServices"].CreateGroup(UserGroupForCustomer_Third);

        } catch (err) {
            logger.warn("Customer Group not created");
        }

        try {
            Organizations[OrgName].AddMember({
                name: CustomerOuAfterASM /* STRING */ ,
                member: CustomerGroupNameAfterASM /* STRING */ ,
                type: "Group" /* STRING */
            });
            // result: INFOTABLE dataShape: "GroupMember"
        } catch (err) {
            logger.warn("Customer member not added in group");
        }
        try {
            var UserForCustomer_Third = {
                password: undefined /* STRING */ ,
                name: CustomerUserNameAfterASM /* STRING */ ,
                description: undefined /* STRING */ ,
                tags: undefined /* TAGS */
            };
            // no return
            Resources["EntityServices"].CreateUser(UserForCustomer_Third);

        } catch (err) {
            logger.warn("Customer user not created");
        }

        try {
            Users[CustomerUserNameAfterASM].emailAddress = Customer_email;
            Groups[CustomerGroupNameAfterASM].AddMember({
                member: CustomerUserNameAfterASM /* STRING */ ,
                type: "User" /* STRING */
            });

        } catch (err) {
            logger.warn("Customer user not added in group");
        }

    }
  
  }catch(err){
  logger.warn("Ou Not Created");
  }

    // This Plant is for after ASM Or Customer

	try{
  
      var PlantOuAfterASMCustomer = Plant + "_" + Customer + "_" + country_Manager_Name + "_OU";
    var PlantGroupNameAfterASMCustomer = PlantOuAfterASMCustomer + "MaintainenceEngineer_UG";
    var PlantUserNameAfterASMCustomer = PlantOuAfterASMCustomer + "MaintainenceEngineer_User";

    var PlantNameOfOrganizationUnit_Third = Organizations[OrgName].IsInOrganization({
        name: PlantOuAfterASMCustomer /* STRING */
    });

    if (PlantNameOfOrganizationUnit_Third === false) {

        try {
            //Region Not Found 
            Organizations[OrgName].AddOrganizationalUnit({
                parentName: CustomerOuAfterASM /* STRING */ ,
                name: PlantOuAfterASMCustomer /* STRING */
            });
        } catch (err) {
            logger.warn("Plant ou not created");
        }

        try {
            //var nameOfRegionGroupProvided;
            var UserGroupForPlant_Third = {
                name: PlantGroupNameAfterASMCustomer /* STRING */ ,
                description: undefined /* STRING */ ,
                tags: undefined /* TAGS */
            };
            Resources["EntityServices"].CreateGroup(UserGroupForPlant_Third);

        } catch (err) {

            logger.warn("Plant Group not created");
        }

        try {
            Organizations[OrgName].AddMember({
                name: PlantOuAfterASMCustomer /* STRING */ ,
                member: PlantGroupNameAfterASMCustomer /* STRING */ ,
                type: "Group" /* STRING */
            });
            // result: INFOTABLE dataShape: "GroupMember"
        } catch (err) {

            logger.warn("Plant member not added in group");
        }

        try {
            var UserForPlant_Third = {
                password: undefined /* STRING */ ,
                name: PlantUserNameAfterASMCustomer /* STRING */ ,
                description: undefined /* STRING */ ,
                tags: undefined /* TAGS */
            };
            // no return
            Resources["EntityServices"].CreateUser(UserForPlant_Third);

        } catch (err) {

            logger.warn("Plant user not created");
        }

        try {
            Users[PlantUserNameAfterASMCustomer].emailAddress = Plant_email;
            Groups[PlantGroupNameAfterASMCustomer].AddMember({
                member: PlantUserNameAfterASMCustomer /* STRING */ ,
                type: "User" /* STRING */
            });

        } catch (err) {
            logger.warn("Plant user not added in group");
        }

    }
  
  }catch(err){
  logger.warn("Ou Not Created");
  }
