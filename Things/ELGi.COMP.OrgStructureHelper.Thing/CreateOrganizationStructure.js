//CreateOrganizationHierarchy2 from helper thing this is main and first org service file
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
var DealerOu = Dealer + "_" + ServiceEngg + "_" + ASM + "_" + region + "_" + country_Manager_Name + "_OU";
var CustomerOu = Customer + "_" + Dealer + "_" + ServiceEngg + "_" + ASM + "_" + region + "_" + country_Manager_Name + "_OU";
var PlantOu = Plant + "_" + Customer + "_" + Dealer + "_" + ServiceEngg + "_" + ASM + "_" + region + "_" + country_Manager_Name + "_OU";

var PlantGroupName = PlantOu + "MaintainenceEngineer_UG";
var PlantUserName = PlantOu + "MaintainenceEngineer_User";
var CustomerGroupName = CustomerOu + "_UG";
var CustomerUserName = CustomerOu + "_User";
var ServiceEnggGroupName = ServiceEnggOu + "_UG";
//var ServiceEnggUserName = ServiceEnggOu + "ServiceEnggSalesManager_User";
var DealerGroupName = DealerOu + "_UG";
//var DealerUserName = DealerOu + "DealerMaharashtra6_User";
var ASMGroupName = ASMOu + "_UG"; //AreaGroupName ASMUserName
//var ASMUserName = ASMOu + "_ReginalSalesManager_User";
var regionGroupName = region + "_UG";
//var regionUserName = regionOu + "ReginalSalesManager_User";
var CountryManagerGroupName = country_Manager_NameOu + "_UG";
var CountryManagerUserName = country_Manager_NameOu + "_User";

if (country !== "" && country_Manager_Name !== "" && region !== "" &&
    RSM_email !== "" && ASM !== "" && ASM_email !== "" && ServiceEngg !== "" &&
    ServiceEngg_email !== "" && Dealer !== "" && Dealer_email !== "" &&
    Customer !== "" && Customer_email !== "" && Plant !== "" && Plant_email !== "") {
    // Having Every Variable Data
    try {

        var regionsNameOfOrganizationUnit_First = Organizations[OrgName].IsInOrganization({
            name: regionOu /* STRING */
        });

        if (regionsNameOfOrganizationUnit_First !== true) {

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
                var UserGroupForRegion_First = {
                    name: regionGroupName /* STRING */ ,
                    description: undefined /* STRING */ ,
                    tags: undefined /* TAGS */
                };
                Resources["EntityServices"].CreateGroup(UserGroupForRegion_First);
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
                var dataOfRegionGroups_First = Groups["Users"].GetGroupMembers();

                var tableLengthR_First1 = dataOfRegionGroups_First.rows.length;
                for (var x = 0; x < tableLengthR_First1; x++) {
                    var regionUserName_First = dataOfRegionGroups_First.rows[x].name;
                    var user_email_First = Users[regionUserName_First].emailAddress;
                    if (RSM_email === user_email_First) {
                        Groups[regionGroupName].AddMember({
                            member: regionUserName_First /* STRING */ ,
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
                var MembersOfRegion_First = Organizations[OrgName].GetMembers({
                    name: regionOu /* STRING */
                });

                var tableLengthR_First2 = MembersOfRegion_First.rows.length;
                for (var y = 0; y < tableLengthR_First2; y++) {
                    var NameOfUnitGroupsRegion_First = MembersOfRegion_First.rows[y].name;

                    // result: INFOTABLE dataShape: "GroupMember"
                    var dataOfRegionGroups_First1 = Groups[NameOfUnitGroupsRegion_First].GetGroupMembers();

                    var tableLengthR_First3 = dataOfRegionGroups_First1.rows.length;
                    for (var z = 0; z < tableLengthR_First3; z++) {
                        var regionUserName_First1 = dataOfRegionGroups_First1.rows[z].name;
                        var regionsUser_email_First1 = Users[regionUserName_First1].emailAddress;

                        if (RSM_email === regionsUser_email_First1) {

                            Groups[NameOfUnitGroupsRegion_First].AddMember({
                                member: regionUserName_First1 /* STRING */ ,
                                type: "User" /* STRING */
                            });
                            //break;
                        }
                    }
                }
            } catch (err) {
                logger.warn("Region user not added in group");
            }
        }

    } catch (err) {
        logger.warn("Ou Not Created");
    }


    // ASM Code
    try {

        var ASMNameOfOrganizationUnit_First = Organizations[OrgName].IsInOrganization({
            name: ASMOu /* STRING */
        });

        if (ASMNameOfOrganizationUnit_First !== true) {

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
                var UserGroupForASM_First = {
                    name: ASMGroupName /* STRING */ ,
                    description: undefined /* STRING */ ,
                    tags: undefined /* TAGS */
                };
                Resources["EntityServices"].CreateGroup(UserGroupForASM_First);

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
                var dataOfASMGroups_First = Groups["Users"].GetGroupMembers();

                var tableLengthA_First1 = dataOfASMGroups_First.rows.length;
                for (var z1 = 0; z1 < tableLengthA_First1; z1++) {
                    var ASMUserName_First = dataOfASMGroups_First.rows[z1].name;
                    var ASMUser_email_First = Users[ASMUserName_First].emailAddress;
                    if (ASM_email === ASMUser_email_First) {
                        Groups[ASMGroupName].AddMember({
                            member: ASMUserName_First /* STRING */ ,
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

                var MembersOfASM_First = Organizations[OrgName].GetMembers({
                    name: ASMOu /* STRING */
                });

                var tableLengthA_First2 = MembersOfASM_First.rows.length;
                for (var a = 0; a < tableLengthA_First2; a++) {
                    var NameOfUnitGroupsOfASM_First = MembersOfASM_First.rows[a].name;

                    // result: INFOTABLE dataShape: "GroupMember"
                    var dataOfASMGroups_First1 = Groups[NameOfUnitGroupsOfASM_First].GetGroupMembers();

                    var tableLengthA_First3 = dataOfASMGroups_First1.rows.length;
                    for (var b = 0; b < tableLengthA_First3; b++) {
                        var ASMUserName_First1 = dataOfASMGroups_First1.rows[b].name;
                        var ASMUser_email_First1 = Users[ASMUserName_First1].emailAddress;

                        if (ASM_email === ASMUser_email_First1) {

                            Groups[NameOfUnitGroupsOfASM_First].AddMember({
                                member: ASMUserName_First1 /* STRING */ ,
                                type: "User" /* STRING */
                            });
                            //break;
                        }
                    }
                }
            } catch (err) {
                logger.warn("ASM user not added in group");
            }

        }

    } catch (err) {
        logger.warn("Ou Not Created");
    }


    // Service engineer after asm

    try {

        var ServiceEnggNameOfOrganizationUnit_First = Organizations[OrgName].IsInOrganization({
            name: ServiceEnggOu /* STRING */
        });

        if (ServiceEnggNameOfOrganizationUnit_First !== true) {

            try {
                //Region Not Found 
                Organizations[OrgName].AddOrganizationalUnit({
                    parentName: ASMOu /* STRING */ ,
                    name: ServiceEnggOu /* STRING */
                });
            } catch (err) {
                logger.warn("ASM ou not created");
            }
            try {

                var UserGroupForServiceEngg_First = {
                    name: ServiceEnggGroupName /* STRING */ ,
                    description: undefined /* STRING */ ,
                    tags: undefined /* TAGS */
                };
                Resources["EntityServices"].CreateGroup(UserGroupForServiceEngg_First);
            } catch (err) {
                logger.warn("ASM Group not created");
            }
            try {
                Organizations[OrgName].AddMember({
                    name: ServiceEnggOu /* STRING */ ,
                    member: ServiceEnggGroupName /* STRING */ ,
                    type: "Group" /* STRING */
                });

            } catch (err) {
                logger.warn("ASM Group not added in OU");
            }

            try {
                // result: INFOTABLE dataShape: "GroupMember"
                var dataOfServiceEnggGroups_First = Groups["Users"].GetGroupMembers();

                var tableLengthS_First1 = dataOfServiceEnggGroups_First.rows.length;
                for (var c = 0; c < tableLengthS_First1; c++) {
                    var ServiceEnggUserName_First = dataOfServiceEnggGroups_First.rows[c].name;
                    var ServiceEnggUser_email_First = Users[ServiceEnggUserName_First].emailAddress;
                    if (Dealer_email === ServiceEnggUser_email_First) {
                        Groups[ServiceEnggGroupName].AddMember({
                            member: ServiceEnggUserName_First /* STRING */ ,
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

            //regionOu Found Here
            try {
                var MembersOfServiceEngg_First = Organizations[OrgName].GetMembers({
                    name: ServiceEnggOu /* STRING */
                });

                var tableLengthS_First2 = MembersOfServiceEngg_First.rows.length;
                for (var d = 0; d < tableLengthS_First2; d++) {

                    var NameOfUnitGroupsServiceEngg_First = MembersOfServiceEngg_First.rows[d].name;

                    // result: INFOTABLE dataShape: "GroupMember"
                    var dataOfServiceEnggGroups_First1 = Groups[NameOfUnitGroupsServiceEngg_First].GetGroupMembers();

                    var tableLengthS_First3 = dataOfServiceEnggGroups_First1.rows.length;
                    for (var e = 0; e < tableLengthS_First3; e++) {
                        var ServiceEnggUserName_First1 = dataOfServiceEnggGroups_First1.rows[e].name;
                        var ServiceEnggUser_email_First1 = Users[ServiceEnggUserName_First1].emailAddress;

                        if (ServiceEngg_email === ServiceEnggUser_email_First1) {

                            Groups[NameOfUnitGroupsServiceEngg_First].AddMember({
                                member: ServiceEnggUserName_First1 /* STRING */ ,
                                type: "User" /* STRING */
                            });
                            //break;
                        }
                    }
                }
            } catch (err) {
                logger.warn("ServiceEngg user not added in group");
            }

        }

    } catch (err) {
        logger.warn("Ou Not Created");
    }

    //Dealer after service engineer 

    try {

        var DealerNameOfOrganizationUnit_First = Organizations[OrgName].IsInOrganization({
            name: DealerOu /* STRING */
        });

        if (DealerNameOfOrganizationUnit_First !== true) {

            try {
                //Region Not Found 
                Organizations[OrgName].AddOrganizationalUnit({
                    parentName: ServiceEnggOu /* STRING */ ,
                    name: DealerOu /* STRING */
                });
            } catch (err) {
                logger.warn("Dealer ou not created");
            }
            try {

                var UserGroupForDealer_First = {
                    name: DealerGroupName /* STRING */ ,
                    description: undefined /* STRING */ ,
                    tags: undefined /* TAGS */
                };
                Resources["EntityServices"].CreateGroup(UserGroupForDealer_First);

            } catch (err) {
                logger.warn("Dealer Group not created");
            }
            try {
                Organizations[OrgName].AddMember({
                    name: DealerOu /* STRING */ ,
                    member: DealerGroupName /* STRING */ ,
                    type: "Group" /* STRING */
                });

                // result: INFOTABLE dataShape: "GroupMember"
                var dataOfDealerGroups_First = Groups["Users"].GetGroupMembers();

                var tableLengthD_First1 = dataOfDealerGroups_First.rows.length;
                for (var f = 0; f < tableLengthD_First1; f++) {
                    var DealerUserName_First = dataOfDealerGroups_First.rows[f].name;
                    var DealerUser_email_First = Users[DealerUserName_First].emailAddress;
                    if (Dealer_email === DealerUser_email_First) {
                        Groups[DealerGroupName].AddMember({
                            member: DealerUserName_First /* STRING */ ,
                            type: "User" /* STRING */
                        });
                        //break;
                    }

                }
            } catch (err) {
                logger.warn("Dealer user not added in group");
            }

        } else

        {

            try {
                //regionOu Found Here

                var MembersOfDealer_First = Organizations[OrgName].GetMembers({
                    name: DealerOu /* STRING */
                });

                var tableLengthD_First2 = MembersOfDealer_First.rows.length;
                for (var g = 0; g < tableLengthD_First2; g++) {
                    var DealerNameOfUnitGroups_First = MembersOfDealer_First.rows[g].name;

                    // result: INFOTABLE dataShape: "GroupMember"
                    var dataOfDealerGroups_First1 = Groups[DealerNameOfUnitGroups_First].GetGroupMembers();

                    var tableLengthD_First3 = dataOfDealerGroups_First1.rows.length;
                    for (var h = 0; h < tableLengthD_First3; h++) {
                        var Dealersuser_name_First1 = dataOfDealerGroups_First1.rows[h].name;
                        var Dealersuser_email_First1 = Users[Dealersuser_name_First1].emailAddress;

                        if (Dealer_email === Dealersuser_email_First1) {

                            Groups[DealerNameOfUnitGroups_First].AddMember({
                                member: Dealersuser_name_First1 /* STRING */ ,
                                type: "User" /* STRING */
                            });
                            //break;
                        }
                    }
                }
            } catch (err) {
                logger.warn("Dealer user not added in group");
            }

        }

    } catch (err) {
        logger.warn("Ou Not Created");
    }


    //This is for after Dealer engg

    try {

        var CustomerNameOfOrganizationUnit_First = Organizations[OrgName].IsInOrganization({
            name: CustomerOu /* STRING */
        });

        if (CustomerNameOfOrganizationUnit_First === false) {

            try {
                //Region Not Found 
                Organizations[OrgName].AddOrganizationalUnit({
                    parentName: DealerOu /* STRING */ ,
                    name: CustomerOu /* STRING */
                });
            } catch (err) {
                logger.warn("Customer ou not created");
            }

            try {
                var UserGroupForCustomer_First = {
                    name: CustomerGroupName /* STRING */ ,
                    description: undefined /* STRING */ ,
                    tags: undefined /* TAGS */
                };
                Resources["EntityServices"].CreateGroup(UserGroupForCustomer_First);
            } catch (err) {
                logger.warn("Customer Group not created");
            }

            try {
                Organizations[OrgName].AddMember({
                    name: CustomerOu /* STRING */ ,
                    member: CustomerGroupName /* STRING */ ,
                    type: "Group" /* STRING */
                });
            } catch (err) {
                logger.warn("Customer member not added in group");
            }

            try {
                var UserForCustomer_First = {
                    password: undefined /* STRING */ ,
                    name: CustomerUserName /* STRING */ ,
                    description: undefined /* STRING */ ,
                    tags: undefined /* TAGS */
                };
                // no return
                Resources["EntityServices"].CreateUser(UserForCustomer_First);
            } catch (err) {
                logger.warn("Customer user not created");
            }

            try {
                Users[CustomerUserName].emailAddress = Customer_email;
                Groups[CustomerGroupName].AddMember({
                    member: CustomerUserName /* STRING */ ,
                    type: "User" /* STRING */
                });
            } catch (err) {
                logger.warn("Customer user not added in group");
            }

        }

    } catch (err) {
        logger.warn("Ou Not Created");
    }

    // This plant is for after dealer or customer 

    try {

        var PlantNameOfOrganizationUnit_First = Organizations[OrgName].IsInOrganization({
            name: PlantOu /* STRING */
        });

        if (PlantNameOfOrganizationUnit_First === false) {

            try {
                //Region Not Found 
                Organizations[OrgName].AddOrganizationalUnit({
                    parentName: CustomerOu /* STRING */ ,
                    name: PlantOu /* STRING */
                });
            } catch (err) {
                logger.warn("Plant ou not created");
            }

            try {

                var UserGroupForPlant_First = {
                    name: PlantGroupName /* STRING */ ,
                    description: undefined /* STRING */ ,
                    tags: undefined /* TAGS */
                };
                Resources["EntityServices"].CreateGroup(UserGroupForPlant_First);

            } catch (err) {
                logger.warn("Plant Group not created");
            }

            try {
                Organizations[OrgName].AddMember({
                    name: PlantOu /* STRING */ ,
                    member: PlantGroupName /* STRING */ ,
                    type: "Group" /* STRING */
                });

            } catch (err) {
                logger.warn("Plant member not added in group");
            }

            try {
                var UserForPlant_First = {
                    password: undefined /* STRING */ ,
                    name: PlantUserName /* STRING */ ,
                    description: undefined /* STRING */ ,
                    tags: undefined /* TAGS */
                };
                // no return
                Resources["EntityServices"].CreateUser(UserForPlant_First);
            } catch (err) {
                logger.warn("Plant user not created");
            }

            try {

                Users[PlantUserName].emailAddress = Plant_email;
                Groups[PlantGroupName].AddMember({
                    member: PlantUserName /* STRING */ ,
                    type: "User" /* STRING */
                });
            } catch (err) {
                logger.warn("Plant user not added in group");
            }

        }

    } catch (err) {
        logger.warn("Ou Not Created");
    }

} 
 else if (country !== "" && country_Manager_Name !== "" && region !== "" &&
    RSM_email !== "" && ASM !== "" && ASM_email !== "" && ServiceEngg !== "" &&
    ServiceEngg_email !== "" && Dealer === "" && Dealer_email === "" &&
    Customer !== "" && Customer_email !== "" && Plant !== "" && Plant_email !== "") {
     // chunk2 no dealer
     //  Things["HelperThingTest.Thing"].
     
     var result = me.CreateOrganizationChunk2({
	country: country /* STRING */,
	RSM_email: RSM_email /* STRING */,
	Customer: Customer /* STRING */,
	Customer_email: Customer_email /* STRING */,
	ServiceEngg: ServiceEngg /* STRING */,
	country_Manager_Name: country_Manager_Name /* STRING */,
	Plant: Plant /* STRING */,
	ASM_email: ASM_email /* STRING */,
	ASM: ASM /* STRING */,
	Plant_email: Plant_email /* STRING */,
	region: region /* STRING */,
	ServiceEngg_email: ServiceEngg_email /* STRING */,
});
    
 }
else if (country !== "" && country_Manager_Name !== "" && region !== "" &&
    RSM_email !== "" && ASM !== "" && ASM_email !== "" && ServiceEngg === "" &&
    ServiceEngg_email === "" && Dealer === "" && Dealer_email === "" &&
    Customer !== "" && Customer_email !== "" && Plant !== "" && Plant_email !== "") {
    // chunk 3 n service engg or dealer
    //  Things["HelperThingTest.Thing"].    runs properly
    
    var result = me.CreateOrganizationChunk3({
	country: country /* STRING */,
	RSM_email: RSM_email /* STRING */,
	Customer: Customer /* STRING */,
	Customer_email: Customer_email /* STRING */,
	country_Manager_Name: country_Manager_Name /* STRING */,
	Plant: Plant /* STRING */,
	ASM_email: ASM_email /* STRING */,
	ASM: ASM /* STRING */,
	Plant_email: Plant_email /* STRING */,
	region: region /* STRING */,
});
    
}
else if (country !== "" && country_Manager_Name !== "" && region !== "" &&
    RSM_email !== "" && ASM === "" && ASM_email === "" && ServiceEngg === "" &&
    ServiceEngg_email === "" && Dealer === "" && Dealer_email === "" &&
    Customer !== "" && Customer_email !== "" && Plant !== "" && Plant_email !== "") {
    // chunk 4 no asm,service engg and dealer
    // Things["HelperThingTest.Thing"].   runs properly
    var result = me.CreateOrganizationChunk4({
	country: country /* STRING */,
	RSM_email: RSM_email /* STRING */,
	Customer: Customer /* STRING */,
	Customer_email: Customer_email /* STRING */,
	country_Manager_Name: country_Manager_Name /* STRING */,
	Plant: Plant /* STRING */,
	Plant_email: Plant_email /* STRING */,
	region: region /* STRING */
});
   
}
