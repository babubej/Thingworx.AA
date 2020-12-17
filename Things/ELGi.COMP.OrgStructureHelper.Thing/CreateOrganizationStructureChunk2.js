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
var ServiceEnggOu = ServiceEngg + "_" + ASM + "_" + region + "_" + country_Manager_Name + "_OU";
//var DealerOu = Dealer + "_" + ServiceEngg + "_" + ASM + "_" + region + "_" + country_Manager_Name + "_OU";
//var CustomerOu = Customer + "_" + Dealer + "_" + ServiceEngg + "_" + ASM + "_" + region + "_" + country_Manager_Name + "_OU";
//var PlantOu = Plant + "_" + Customer + "_" + Dealer + "_" + ServiceEngg + "_" + ASM + "_" + region + "_" + country_Manager_Name + "_OU";

//var PlantGroupName = PlantOu + "MaintainenceEngineer_UG";
//var PlantUserName = PlantOu + "MaintainenceEngineer_User";
//var CustomerGroupName = CustomerOu + "_UG";
//var CustomerUserName = CustomerOu + "_User";
var ServiceEnggGroupName = ServiceEnggOu + "_UG";
//var ServiceEnggUserName = ServiceEnggOu + "ServiceEnggSalesManager_User";
//var DealerGroupName = DealerOu + "_UG";
//var DealerUserName = DealerOu + "DealerMaharashtra6_User";
var ASMGroupName = ASMOu + "_UG"; //AreaGroupName ASMUserName
//var ASMUserName = ASMOu + "_ReginalSalesManager_User";
var regionGroupName = region + "_UG";
//var regionUserName = regionOu + "ReginalSalesManager_User";
var CountryManagerGroupName = country_Manager_NameOu + "_UG";
var CountryManagerUserName = country_Manager_NameOu + "_User";

// Not Having Dealer Data
       // Region Code
		try{
  
  	   var regionsNameOfOrganizationUnit_Second = Organizations[OrgName].IsInOrganization({
        name: regionOu /* STRING */
    });
    if (regionsNameOfOrganizationUnit_Second !== true) {

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
    
            var UserGroupForRegion_Second = {
                name: regionGroupName /* STRING */ ,
                description: undefined /* STRING */ ,
                tags: undefined /* TAGS */
            };
            Resources["EntityServices"].CreateGroup(UserGroupForRegion_Second);
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
            var dataOfregion_Second = Groups["Users"].GetGroupMembers();
            
            var tableLengthR_Second1 = dataOfregion_Second.rows.length;
            for (var xn = 0; xn < tableLengthR_Second1; xn++) {
                var regionsUserName_Second = dataOfregion_Second.rows[xn].name;
                var regionsUser_email_Second = Users[regionsUserName_Second].emailAddress;
                if (RSM_email === regionsUser_email_Second) {
                    Groups[regionGroupName].AddMember({
                        member: regionsUserName_Second /* STRING */ ,
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
            var MembersOfRegion_Second = Organizations[OrgName].GetMembers({
                name: regionOu /* STRING */
            });
           
            var tableLengthR_Second2 = MembersOfRegion_Second.rows.length;
            for (var j = 0; j < tableLengthR_Second2; j++) {
                var RegionsNameOfUnitGroups_Second = MembersOfRegion_Second.rows[j].name; 
                
                // result: INFOTABLE dataShape: "GroupMember"
                var dataOfregion_Second1 = Groups[RegionsNameOfUnitGroups_Second].GetGroupMembers();

                var tableLengthR_Second3 = dataOfregion_Second1.rows.length;
                for (var xm = 0; xm < tableLengthR_Second3; xm++) {
                    var regionsUserName_Second1 = dataOfregion_Second1.rows[xm].name;
                    var regionsUser_email_Second1 = Users[regionsUserName_Second1].emailAddress;
                    // var result = user_email;
                    if (RSM_email === regionsUser_email_Second1) {
                        //abc=user_name;
                        Groups[RegionsNameOfUnitGroups_Second].AddMember({
                            member: regionsUserName_Second1 /* STRING */ , // West_RSM_UG
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
  
      var ASMNameOfOrganizationUnit_Second = Organizations[OrgName].IsInOrganization({
        name: ASMOu /* STRING */
    });
    
    if (ASMNameOfOrganizationUnit_Second !== true) {

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
            var UserGroupForASM_Second = {
                name: ASMGroupName /* STRING */ ,
                description: undefined /* STRING */ ,
                tags: undefined /* TAGS */
            };
            Resources["EntityServices"].CreateGroup(UserGroupForASM_Second);
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
            var dataOfASM_Second = Groups["Users"].GetGroupMembers();
           
            var tableLengthA_Second1 = dataOfASM_Second.rows.length;
            for (var i = 0; i < tableLengthA_Second1; i++) {
                var ASMUserName_Second = dataOfASM_Second.rows[i].name;
                var ASMuser_email_Second = Users[ASMUserName_Second].emailAddress;
                if (ASM_email === ASMuser_email_Second) {
                    Groups[ASMGroupName].AddMember({
                        member: ASMUserName_Second /* STRING */ , // West_RSM_UG
                        type: "User" /* STRING */
                    });
                    //break;
                }

            }
        } catch (err) {
            logger.warn("ASM user not added in group");
        }

    } else

    {

        try {
            //regionOu Found Here

            var MembersOfASM_Second = Organizations[OrgName].GetMembers({
                name: ASMOu /* STRING */
            });
      
            var tableLengthA_Second2 = MembersOfASM_Second.rows.length;
            for (var xl = 0; xl < tableLengthA_Second2; xl++) {
                var ASMNameOfUnitGroups_Second = MembersOfASM_Second.rows[xl].name; 
                
                // result: INFOTABLE dataShape: "GroupMember"
                var dataOfASM_Second1 = Groups[ASMNameOfUnitGroups_Second].GetGroupMembers();

                var tableLengthA_Second3 = dataOfASM_Second1.rows.length;
                for (var xo = 0; xo < tableLengthA_Second3; xo++) {
                    var ASMUserName_Second1 = dataOfASM_Second1.rows[xo].name;
                    var ASMuser_email_Second1 = Users[ASMUserName_Second1].emailAddress;
                 
                    if (ASM_email === ASMuser_email_Second1) {
                  
                        Groups[ASMNameOfUnitGroups_Second].AddMember({
                            member: ASMUserName_Second1 /* STRING */ ,
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
        //

    }
  
  }catch(err){
  logger.warn("Ou Not Created");
  }


    // ServiceEngg Code 
	
	try{
  
      var ServiceEnggNameOfOrganizationUnit_Second = Organizations[OrgName].IsInOrganization({
        name: ServiceEnggOu /* STRING */
    });

    if (ServiceEnggNameOfOrganizationUnit_Second !== true) {

        try {
            //Region Not Found 
            Organizations[OrgName].AddOrganizationalUnit({
                parentName: ASMOu /* STRING */ ,
                name: ServiceEnggOu /* STRING */
            });
        } catch (err) {
            logger.warn("ServiceEngg ou not created");
        }
        try {
            //var nameOfRegionGroupProvided;
            var UserGroupForServiceEngg_Second = {
                name: ServiceEnggGroupName /* STRING */ ,
                description: undefined /* STRING */ ,
                tags: undefined /* TAGS */
            };
            Resources["EntityServices"].CreateGroup(UserGroupForServiceEngg_Second);

        } catch (err) {
            logger.warn("ServiceEngg Group not created");
        }
        try {
            Organizations[OrgName].AddMember({
                name: ServiceEnggOu /* STRING */ ,
                member: ServiceEnggGroupName /* STRING */ ,
                type: "Group" /* STRING */
            });
            // result: INFOTABLE dataShape: "GroupMember"
            var dataOfServiceEngg_Second = Groups["Users"].GetGroupMembers();
           
            var tableLengthS_Second1 = dataOfServiceEngg_Second.rows.length;
            for (var k = 0; k < tableLengthS_Second1; k++) {
                var ServiceEnggUserName_Second = dataOfServiceEngg_Second.rows[k].name;
                var ServiceEnggUser_email_Second = Users[ServiceEnggUserName_Second].emailAddress;
                if (ServiceEngg_email === ServiceEnggUser_email_Second) {
                    Groups[ServiceEnggGroupName].AddMember({
                        member: ServiceEnggUserName_Second /* STRING */ ,
                        type: "User" /* STRING */
                    });
                    //break;
                }

            }
        } catch (err) {
            logger.warn("ServiceEngg user not added in group");
        }

    } else

    {
        
        try {
            //regionOu Found Here

            var MembersOfServiceEngg_Second = Organizations[OrgName].GetMembers({
                name: ServiceEnggOu /* STRING */
            });
            
            var tableLengthS_Second2 = MembersOfServiceEngg_Second.rows.length;
            for (var l = 0; l < tableLengthS_Second2; l++) {
                var ServiceEnggNameOfUnitGroupsSecond = MembersOfServiceEngg_Second.rows[l].name; 
                // result: INFOTABLE dataShape: "GroupMember"
                var dataOfServiceEngg_Second1 = Groups[ServiceEnggNameOfUnitGroupsSecond].GetGroupMembers();

                var tableLengthS_Second3 = dataOfServiceEngg_Second1.rows.length;
                for (var m = 0; m < tableLengthS_Second3; m++) {
                    var ServiceEnggUserName_Second1 = dataOfServiceEngg_Second1.rows[m].name;
                    var ServiceEnggUser_email_Second1 = Users[ServiceEnggUserName_Second1].emailAddress;
                
                    if (ServiceEngg_email === ServiceEnggUser_email_Second1) {
                  
                        Groups[ServiceEnggNameOfUnitGroupsSecond].AddMember({
                            member: ServiceEnggUserName_Second1 /* STRING */ ,
                            type: "User" /* STRING */
                        });
                        //break;
                    }
                }
            }
        } catch (err) {
            logger.warn("ServiceEngg user not added in group");
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
	
	
    // This is for after ServiceEngg
    var CustomerOuAfterServiceEngg = Customer + "_" + ServiceEngg + "_" + ASM + "_" + region + "_" + country_Manager_Name + "_OU";
    var CustomerGroupNameAfterServiceEngg = CustomerOuAfterServiceEngg + "_UG";
    var CustomerUserNameAfterServiceEngg = CustomerOuAfterServiceEngg + "_User";

	try{

    var CustomerNameOfOrganizationUnit_Second = Organizations[OrgName].IsInOrganization({
        name: CustomerOuAfterServiceEngg /* STRING */
    });

    if (CustomerNameOfOrganizationUnit_Second === false) {

        try {
            //Region Not Found 
            Organizations[OrgName].AddOrganizationalUnit({
                parentName: ServiceEnggOu /* STRING */ ,
                name: CustomerOuAfterServiceEngg /* STRING */
            });
        } catch (err) {
            logger.warn("Customer ou not created");
        }
        try {
            //var nameOfRegionGroupProvided;
            var UserGroupForCustomer_Second = {
                name: CustomerGroupNameAfterServiceEngg /* STRING */ ,
                description: undefined /* STRING */ ,
                tags: undefined /* TAGS */
            };            
            Resources["EntityServices"].CreateGroup(UserGroupForCustomer_Second);
            
        } catch (err) {
            logger.warn("Customer Group not created");
        }

        try {
            Organizations[OrgName].AddMember({
                name: CustomerOuAfterServiceEngg /* STRING */ ,
                member: CustomerGroupNameAfterServiceEngg /* STRING */ ,
                type: "Group" /* STRING */
            });
        } catch (err) {
            logger.warn("Customer member not added in group");
        }
        try {
            var UserForCustomer_Second = {
                password: undefined /* STRING */ ,
                name: CustomerUserNameAfterServiceEngg /* STRING */ ,
                description: undefined /* STRING */ ,
                tags: undefined /* TAGS */
            };
            // no return
            Resources["EntityServices"].CreateUser(UserForCustomer_Second);
        } catch (err) {
            logger.warn("Customer user not created");
        }

        try {
            Users[CustomerUserNameAfterServiceEngg].emailAddress = Customer_email;
            Groups[CustomerGroupNameAfterServiceEngg].AddMember({
                member: CustomerUserNameAfterServiceEngg /* STRING */ ,
                type: "User" /* STRING */
            });
        } catch (err) {
            logger.warn("Customer user not added in group");
        }

    }
  
  }catch(err){
  logger.warn("Ou Not Created");
  }
	
    // This plant is for after dealer or customer  
try{
  
    var PlantOuAfterServiceEnggCustomer = Plant + "_" + Customer + "_" + ServiceEngg + "_" + ASM + "_" + region + "_" + country_Manager_Name + "_OU";
    var PlantGroupNameAfterDServiceEnggCustomer = PlantOuAfterServiceEnggCustomer + "MaintainenceEngineer_UG";
    var PlantUserNameAfterServiceEnggCustomer = PlantOuAfterServiceEnggCustomer + "MaintainenceEngineer_User";

    var PlantNameOfOrganizationUnit_Second = Organizations[OrgName].IsInOrganization({
        name: PlantOuAfterServiceEnggCustomer /* STRING */
    });
    if (PlantNameOfOrganizationUnit_Second === false) {

        try {
            //Region Not Found 
            Organizations[OrgName].AddOrganizationalUnit({
                parentName: CustomerOuAfterServiceEngg /* STRING */ ,
                name: PlantOuAfterServiceEnggCustomer /* STRING */
            });
        } catch (err) {
            logger.warn("Plant ou not created");
        }
        
        try {
            var UserGroupForPlant_Second = {
                name: PlantGroupNameAfterDServiceEnggCustomer /* STRING */ ,
                description: undefined /* STRING */ ,
                tags: undefined /* TAGS */
            };
            Resources["EntityServices"].CreateGroup(UserGroupForPlant_Second);
        } catch (err) {
            logger.warn("Plant Group not created");
        }

        try {
            Organizations[OrgName].AddMember({
                name: PlantOuAfterServiceEnggCustomer /* STRING */ ,
                member: PlantGroupNameAfterDServiceEnggCustomer /* STRING */ ,
                type: "Group" /* STRING */
            });
            
        } catch (err) {
            logger.warn("Plant member not added in group");
        }
        try {
            var UserForPlant_Second = {
                password: undefined /* STRING */ ,
                name: PlantUserNameAfterServiceEnggCustomer /* STRING */ ,
                description: undefined /* STRING */ ,
                tags: undefined /* TAGS */
            };
            // no return
            Resources["EntityServices"].CreateUser(UserForPlant_Second);
        } catch (err) {
            logger.warn("Plant user not created");
        }

        try {
            Users[PlantUserNameAfterServiceEnggCustomer].emailAddress = Plant_email;
            Groups[PlantGroupNameAfterDServiceEnggCustomer].AddMember({
                member: PlantUserNameAfterServiceEnggCustomer /* STRING */ ,
                type: "User" /* STRING */
            });
        } catch (err) {
            logger.warn("Plant user not added in group");
        }
    }
  
  }catch(err){
  logger.warn("Ou Not Created");
  }
