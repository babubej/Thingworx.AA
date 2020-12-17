logger.debug("INPUT JSON for ORG Service : " + input);

var result = false;
var orgName = me.ORG_NAME;
var arrayOfRegion, arrayOfArea, arrayOfServiceEngg, arrayOfDealer, arrayOfCustomer;
arrayOfRegion = arrayOfArea = arrayOfServiceEngg = arrayOfDealer = arrayOfCustomer = [];
var regionUnitName, regionUserName, rerionEmail, regionunitlevel, reqionUnitId, AreaUnitName, AreaUserName, AreaEmail, Areaunitlevel, AreaUnitId, DealerUnitName, DealerUserName, DealerEmail, Dealerunitlevel, DealerUnitId, CustomerUnitName, CustomerUserName, CustomerEmail, Customerunitlevel, CustomerUnitId, ServiceEnggOu, regionGroupName, ASMGroupName, ServiceEnggGroupName, DealerGroupName, CustomerGroupName;
var L3 = 'ELGi.COMP.LandingPageL3.MU';
var L2 = 'ELGi.COMP.LandingPageL2.MU';
var L1A = 'ELGi.COMP.LandingPageL1A.MU';
var L1B = 'ELGi.COMP.LandingPageL1B.MU';

var obj1 = new Object(input);
//try {

if(obj1.hasOwnProperty("orgUnitDetails")) {

	var orgUnitDetailsData = input.orgUnitDetails;
	var tableLength = orgUnitDetailsData.length;

	//REGION BLOCK
	for (var x = 0; x < tableLength; x++) {
		var unitLevel = orgUnitDetailsData[x].unitLevel;
		var unitName = orgUnitDetailsData[x].unitName;
		var unit_id = orgUnitDetailsData[x].unit_id;
		var parent_id = orgUnitDetailsData[x].parent_id;
		if (unitLevel !== "" && unitName !== "" && unit_id !== "" && parent_id !== "") {
			if (unitLevel === "REGION" && unit_id !== "" && parent_id !== "") {
				arrayOfRegion.push({
					"unitLevel": unitLevel,
					"unitName": unitName,
					"unit_id": unit_id,
					"parent_id": parent_id
				});
				regionGroupName = unit_id + "_UG";
				try {
					//Organization: acme.comp.ACMERoot4.ORG
					var regionsNameOfOrganizationUnit_First = Organizations[orgName].IsInOrganization({
						name: unit_id /* STRING */
					});

					if (regionsNameOfOrganizationUnit_First !== true) {

						try {
							//Region Not Found 
							Organizations[orgName].AddOrganizationalUnit({
								parentName: parent_id /* STRING */ ,
								name: unit_id /* STRING */
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
							Organizations[orgName].AddMember({
								name: unit_id /* STRING */ ,
								member: regionGroupName /* STRING */ ,
								type: "Group" /* STRING */
							});

						} catch (err) {
							logger.warn("Region Group not added in OU");
						}

					} else {
						//regionOu Found Here
						try {
							// result: STRING
							var IsRegionsParent = Organizations[orgName].IsParent({
								parentName: parent_id /* STRING */ ,
								name: unit_id /* STRING */
							});
							if (IsRegionsParent === true) {
								// result: INFOTABLE dataShape: "EntityReferenceWithDescription"
								var RegionMembers = Organizations[orgName].GetMembers({
									name: unit_id /* STRING */
								});
								if (RegionMembers.name === "") {
									var RegionMembersparams = {
										name: regionGroupName /* STRING */ ,
										description: undefined /* STRING */ ,
										tags: undefined /* TAGS */
									};
									Resources["EntityServices"].CreateGroup(RegionMembersparams);
									Organizations[orgName].AddMember({
										name: unit_id /* STRING */ ,
										member: regionGroupName /* STRING */ ,
										type: "Group" /* STRING */
									});

								}
							} else if (IsRegionsParent === false) {
								if (parent_id !== unit_id) {
									Organizations[orgName].MoveOrganizationalUnit({
										parentName: parent_id /* STRING */ ,
										name: unit_id /* STRING */
									});
								}
							}

						} catch (err) {
							logger.warn("Region user not added in group");
						}
					}

				} catch (err) {
					logger.warn("Ou Not Created");
				}
				break;
			}
		}
	}

	//AREA BLOCK					
	for (var x = 0; x < tableLength; x++) {
		var unitLevel = orgUnitDetailsData[x].unitLevel;
		var unitName = orgUnitDetailsData[x].unitName;
		var unit_id = orgUnitDetailsData[x].unit_id;
		var parent_id = orgUnitDetailsData[x].parent_id;
		if (unitLevel !== "" && unitName !== "" && unit_id !== "" && parent_id !== "") {
			if (unitLevel === "AREA" && unit_id !== "" && parent_id !== "") {
				ASMGroupName = unit_id + "_" + "UG";
				arrayOfArea.push({
					"unitLevel": unitLevel,
					"unitName": unitName,
					"unit_id": unit_id,
					"parent_id": parent_id
				});

				// ASM Code
				try {
					var ASMNameOfOrganizationUnit_First = Organizations[orgName].IsInOrganization({
						name: unit_id /* STRING */
					});

					if (ASMNameOfOrganizationUnit_First !== true) {

						try {
							//Region Not Found 
							Organizations[orgName].AddOrganizationalUnit({
								parentName: parent_id /* STRING */ ,
								name: unit_id /* STRING */
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
							Organizations[orgName].AddMember({
								name: unit_id /* STRING */ ,
								member: ASMGroupName /* STRING */ ,
								type: "Group" /* STRING */
							});
						} catch (err) {
							logger.warn("ASM Group not added in OU");
						}

					} else {
						// Area Ou Found Here
						try {
							var IsAreaHaveSameParent = Organizations[orgName].IsParent({
								parentName: parent_id /* STRING */ ,
								name: unit_id /* STRING */
							});
							if (IsAreaHaveSameParent === true) {
								// result: INFOTABLE dataShape: "EntityReferenceWithDescription"
								var MembersOfASM_First = Organizations[orgName].GetMembers({
									name: unit_id /* STRING */
								});
								if (MembersOfASM_First.name === "") {
									var AreaMembersparams = {
										name: ASMGroupName /* STRING */ ,
										description: undefined /* STRING */ ,
										tags: undefined /* TAGS */
									};
									Resources["EntityServices"].CreateGroup(AreaMembersparams);
									Organizations[orgName].AddMember({
										name: unit_id /* STRING */ ,
										member: ASMGroupName /* STRING */ ,
										type: "Group" /* STRING */
									});

								}
							} else if (IsAreaHaveSameParent === false) {

								if (parent_id !== unit_id) {
									Organizations[orgName].MoveOrganizationalUnit({
										parentName: parent_id /* STRING */ ,
										name: unit_id /* STRING */
									});
								}
							}
						} catch (err) {
							logger.warn("ASM user not added in group");
						}

					}

				} catch (err) {
					logger.warn("Ou Not Created");
				}
				break;
			}
		}
	}
}
	// Here Service Engg Unit started
	var obj2 = new Object(input);
	if (obj2.hasOwnProperty("serviceEngineerDetails")) {
		logger.debug("Inside Service Engg Block");
		var serviceEngineerDetailsData = input.serviceEngineerDetails;
		var serviceEnggObject = new Object(serviceEngineerDetailsData);
		logger.debug("Service Engg Name :" + serviceEngineerDetailsData.name);
		var serviceengg_Name = serviceEngineerDetailsData.name;
		var serviceengg_email = serviceEngineerDetailsData.email;
		var ServiceEngineerMobileNumber = serviceEngineerDetailsData.mobileNo;
		var ServiceEngineerMobileNumber = "";
		//var parent_id1 = serviceEngineerDetailsData.parent_id;
		//var child_id = serviceEngineerDetailsData.child_id;                
		var parent_id1 = "";
		var child_id = "";

		if (serviceEnggObject.hasOwnProperty("area_id") && (serviceEngineerDetailsData.area_id).trim() !== "") {
			parent_id1 = serviceEngineerDetailsData.area_id;
		} else if (serviceEnggObject.hasOwnProperty("region_id") && (serviceEngineerDetailsData.region_id).trim() !== "") {
			parent_id1 = serviceEngineerDetailsData.region_id;
		}
		if (serviceEnggObject.hasOwnProperty("dealer_id") && (serviceEngineerDetailsData.dealer_id).trim() !== "") {
			child_id = serviceEngineerDetailsData.dealer_id;
		} else if (serviceEnggObject.hasOwnProperty("customer_id") && (serviceEngineerDetailsData.customer_id).trim() !== "") {
			child_id = serviceEngineerDetailsData.customer_id;
		}

		if (parent_id1 !== "" && child_id !== "") {
			ServiceEnggOu = parent_id1 + "_" + child_id;
			ServiceEnggGroupName = ServiceEnggOu + "_" + "UG";

			arrayOfServiceEngg.push({
				"serviceengg_Name": serviceengg_Name,
				"serviceengg_email": serviceengg_email,
				"ServiceEngineerMobileNumber": ServiceEngineerMobileNumber,
				"parent_id1": parent_id1,
				"child_id": child_id
			});
			// No Parent Set 
			// Service engineer after asm 
			try {

				var ServiceEnggNameOfOrganizationUnit_First = Organizations[orgName].IsInOrganization({
					name: ServiceEnggOu /* STRING */
				});

				if (ServiceEnggNameOfOrganizationUnit_First !== true) {

					try {
						//Region Not Found 
						Organizations[orgName].AddOrganizationalUnit({
							parentName: parent_id1 /* STRING */ ,
							name: ServiceEnggOu /* STRING */
						});
					} catch (err) {
						logger.warn("ServiceEngg ou not created");
					}
					try {
						var UserGroupForServiceEngg_First = {
							name: ServiceEnggGroupName /* STRING */ ,
							description: undefined /* STRING */ ,
							tags: undefined /* TAGS */
						};
						Resources["EntityServices"].CreateGroup(UserGroupForServiceEngg_First);
					} catch (err) {
						logger.warn("ServiceEngg Group not created");
					}
					try {
						Organizations[orgName].AddMember({
							name: ServiceEnggOu /* STRING */ ,
							member: ServiceEnggGroupName /* STRING */ ,
							type: "Group" /* STRING */
						});

					} catch (err) {
						logger.warn("ServiceEngg Group not added in OU");
					}
					try {
						var userDescription = Users[serviceengg_Name].GetDescription();
						Users[serviceengg_Name].mobilePhone = ServiceEngineerMobileNumber;
						Groups[ServiceEnggGroupName].AddMember({
							member: serviceengg_Name /* STRING */ ,
							type: "User" /* STRING */
						});
						me.SetUserHomeMashup({
							username: serviceengg_Name /* USERNAME */ ,
							mashupname: L2 /* MASHUPNAME */
						});

					} catch (err) {
						throw new Error("Service Engg not found in System. Please Contact Administrator.");
					}
				} else {
                    logger.debug("Service Engg Unit Already present");
					//ServiceEnggOu Found Here
					try {
						var MembersOfServiceEngg_First = Organizations[orgName].GetMembers({
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
								//Users[ServiceEnggUserName_First1].mobilePhone = ServiceEngineerMobileNumber;
								if (serviceengg_email !== ServiceEnggUser_email_First1) {
									Groups[NameOfUnitGroupsServiceEngg_First].DeleteMember({
										member: ServiceEnggUserName_First1 /* STRING */ ,
										type: "User" /* STRING */
									});
                                  logger.debug("Service Engg User Removed"); 
								}
							}
                            
							try {
								var userDescription = Users[serviceengg_Name].GetDescription();
								Users[serviceengg_Name].mobilePhone = ServiceEngineerMobileNumber;
                                logger.debug("Service Engg User Added"); 
								Groups[NameOfUnitGroupsServiceEngg_First].AddMember({
									member: serviceengg_Name /* STRING */ ,
									type: "User" /* STRING */
								});
								me.SetUserHomeMashup({
									username: serviceengg_Name /* USERNAME */ ,
									mashupname: L2 /* MASHUPNAME */
								});

							} catch (err) {
								throw new Error("Service Engg not found in System. Please Contact Administrator.");
							}
						}
					} catch (err) {
						logger.warn("ServiceEngg user not added in group");
					}

				}

			} catch (err) {
				logger.warn("Ou Not Created");
			}

		} // Service Engg Closed
	}
    
	//DEALER & CUSTOMER BLOCK					
	if(obj1.hasOwnProperty("orgUnitDetails")) {

	var orgUnitDetailsData = input.orgUnitDetails;
	var tableLength = orgUnitDetailsData.length;
	//DEALER BLOCK					
	for (var x = 0; x < tableLength; x++) {
		var unitLevel = orgUnitDetailsData[x].unitLevel;
		var unitName = orgUnitDetailsData[x].unitName;
		var unit_id = orgUnitDetailsData[x].unit_id;
		var parent_id = orgUnitDetailsData[x].parent_id;
		if (unitLevel !== "" && unitName !== "" && unit_id !== "" && parent_id !== "") {
			if (unitLevel === "DEALER" && unit_id !== "" && parent_id !== "" && parent_id === parent_id1) {
				DealerGroupName = unit_id + "_" + "UG";
				var dealer_parent_id;
				if (obj2.hasOwnProperty("serviceEngineerDetails")) {
					dealer_parent_id = parent_id + "_" + unit_id;
				} else {
					dealer_parent_id = parent_id;
				}
				arrayOfDealer.push({
					"unitLevel": unitLevel,
					"unitName": unitName,
					"unit_id": unit_id,
					"parent_id": dealer_parent_id
				});
				//Dealer after service engineer 
				try {

					var DealerNameOfOrganizationUnit_First = Organizations[orgName].IsInOrganization({
						name: unit_id /* STRING */
					});

					if (DealerNameOfOrganizationUnit_First !== true) {

						try {
							//Region Not Found 
							Organizations[orgName].AddOrganizationalUnit({
								parentName: dealer_parent_id /* STRING */ ,
								name: unit_id /* STRING */
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
							Organizations[orgName].AddMember({
								name: unit_id /* STRING */ ,
								member: DealerGroupName /* STRING */ ,
								type: "Group" /* STRING */
							});

						} catch (err) {
							logger.warn("Dealer user not added in group");
						}

					} else {
						try {
							//DealerOu Found Here
							var IsDelersParent1 = Organizations[orgName].IsParent({
								parentName: dealer_parent_id /* STRING */ ,
								name: unit_id /* STRING */
							});

							if (IsDelersParent1 === true) {
								// result: INFOTABLE dataShape: "EntityReferenceWithDescription"
								var MembersOfDealer_First = Organizations[orgName].GetMembers({
									name: unit_id /* STRING */
								});
								if (MembersOfDealer_First.name === "") {
									var DealerMembersparams = {
										name: DealerGroupName /* STRING */ ,
										description: undefined /* STRING */ ,
										tags: undefined /* TAGS */
									};
									Resources["EntityServices"].CreateGroup(DealerMembersparams);
									Organizations[orgName].AddMember({
										name: unit_id /* STRING */ ,
										member: DealerGroupName /* STRING */ ,
										type: "Group" /* STRING */
									});

								}
							} else if (IsDelersParent1 === false) {
								if (dealer_parent_id !== unit_id) {
									Organizations[orgName].MoveOrganizationalUnit({
										parentName: dealer_parent_id /* STRING */ ,
										name: unit_id /* STRING */
									});
								}
							}
						} catch (err) {
							logger.warn("Dealer user not added in group");
						}

					}

				} catch (err) {
					logger.warn("Ou Not Created");
				}
				break;
			}
		}
	}

	//CUSTOMER BLOCK1					
	for (var x = 0; x < tableLength; x++) {
		var unitLevel = orgUnitDetailsData[x].unitLevel;
		var unitName = orgUnitDetailsData[x].unitName;
		var unit_id = orgUnitDetailsData[x].unit_id;
		var parent_id = orgUnitDetailsData[x].parent_id;
		if (unitLevel !== "" && unitName !== "" && unit_id !== "" && parent_id !== "") {
			if (unitLevel === "CUSTOMER" && unit_id !== "" && parent_id !== "" && parent_id !== parent_id1) {
				//This is for Customer after Service engg
				CustomerGroupName = unit_id + "_" + "UG";
				arrayOfCustomer.push({
					"unitLevel": unitLevel,
					"unitName": unitName,
					"unit_id": unit_id,
					"parent_id": parent_id
				});
				try {

					var CustomerNameOfOrganizationUnit_First = Organizations[orgName].IsInOrganization({
						name: unit_id /* STRING */
					});

					if (CustomerNameOfOrganizationUnit_First === false) {

						try {
							//Region Not Found 
							Organizations[orgName].AddOrganizationalUnit({
								parentName: parent_id /* STRING */ ,
								name: unit_id /* STRING */
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
							Organizations[orgName].AddMember({
								name: unit_id /* STRING */ ,
								member: CustomerGroupName /* STRING */ ,
								type: "Group" /* STRING */
							});
						} catch (err) {
							logger.warn("Customer member not added in group");
						}
					} else {
						try {
							//DealerOu Found Here
							var IsCustomerParent = Organizations[orgName].IsParent({
								parentName: parent_id /* STRING */ ,
								name: unit_id /* STRING */
							});
							if (IsCustomerParent === true) {
								// result: INFOTABLE dataShape: "EntityReferenceWithDescription"
								var MembersOfCustomer_First = Organizations[orgName].GetMembers({
									name: unit_id /* STRING */
								});
								if (MembersOfCustomer_First.name === "") {
									var CustomerMembersparams = {
										name: CustomerGroupName /* STRING */ ,
										description: undefined /* STRING */ ,
										tags: undefined /* TAGS */
									};
									Resources["EntityServices"].CreateGroup(CustomerMembersparams);
									Organizations[orgName].AddMember({
										name: unit_id /* STRING */ ,
										member: CustomerGroupName /* STRING */ ,
										type: "Group" /* STRING */
									});

								}
							} else if (IsCustomerParent === false) {
								if (parent_id !== unit_id) {
									Organizations[orgName].MoveOrganizationalUnit({
										parentName: parent_id /* STRING */ ,
										name: unit_id /* STRING */
									});
								}
							}
						} catch (err) {
							logger.warn("Customer user not Moves in Required Parent");
						}

					}
					if (input.fabNumber !== undefined && input.fabNumber !== null && input.fabNumber !== '') {
						// Add Visibility Permissions
						me.AddVisibilityPermissionInOrg({
							OrgnizationUnitName: unit_id /* STRING */ ,
							thingName: input.fabNumber /* STRING */
						});
					}
				} catch (err) {
					logger.warn("Ou Not Created");
				}
				break;
			}
		}
	}


	//CUSTOMER BLOCK1					
	for (var x = 0; x < tableLength; x++) {
		var unitLevel = orgUnitDetailsData[x].unitLevel;
		var unitName = orgUnitDetailsData[x].unitName;
		var unit_id = orgUnitDetailsData[x].unit_id;
		var parent_id = orgUnitDetailsData[x].parent_id;
		if (unitLevel !== "" && unitName !== "" && unit_id !== "" && parent_id !== "") {
			if (unitLevel === "CUSTOMER" && unit_id !== "" && parent_id !== "" && parent_id === parent_id1) {
				//This is for Customer after Service engg
				CustomerGroupName = unit_id + "_" + "UG";
				var customer_parent_id = parent_id + "_" + unit_id;
				arrayOfCustomer.push({
					"unitLevel": unitLevel,
					"unitName": unitName,
					"unit_id": unit_id,
					"parent_id": customer_parent_id
				});
				try {

					var CustomerNameOfOrganizationUnit_First1 = Organizations[orgName].IsInOrganization({
						name: unit_id /* STRING */
					});

					if (CustomerNameOfOrganizationUnit_First1 === false) {

						try {
							//Region Not Found 
							Organizations[orgName].AddOrganizationalUnit({
								parentName: customer_parent_id /* STRING */ ,
								name: unit_id /* STRING */
							});
						} catch (err) {
							logger.warn("Customer ou not created");
						}

						try {
							var UserGroupForCustomer_FirstYY = {
								name: CustomerGroupName /* STRING */ ,
								description: undefined /* STRING */ ,
								tags: undefined /* TAGS */
							};
							Resources["EntityServices"].CreateGroup(UserGroupForCustomer_FirstYY);
						} catch (err) {
							logger.warn("Customer Group not created");
						}

						try {
							Organizations[orgName].AddMember({
								name: unit_id /* STRING */ ,
								member: CustomerGroupName /* STRING */ ,
								type: "Group" /* STRING */
							});
						} catch (err) {
							logger.warn("Customer member not added in group");
						}
					} else {
						try {
							//DealerOu Found Here
							var IsCustomerParent1 = Organizations[orgName].IsParent({
								parentName: customer_parent_id /* STRING */ ,
								name: unit_id /* STRING */
							});
							if (IsCustomerParent1 === true) {
								// result: INFOTABLE dataShape: "EntityReferenceWithDescription"
								var MembersOfCustomer_First1 = Organizations[orgName].GetMembers({
									name: unit_id /* STRING */
								});
								if (MembersOfCustomer_First1.name === "") {
									var CustomerMembersparams1 = {
										name: CustomerGroupName /* STRING */ ,
										description: undefined /* STRING */ ,
										tags: undefined /* TAGS */
									};
									Resources["EntityServices"].CreateGroup(CustomerMembersparams1);
									Organizations[orgName].AddMember({
										name: unit_id /* STRING */ ,
										member: CustomerGroupName /* STRING */ ,
										type: "Group" /* STRING */
									});

								}
							} else if (IsCustomerParent1 === false) {
								if (customer_parent_id !== unit_id) {
									Organizations[orgName].MoveOrganizationalUnit({
										parentName: customer_parent_id /* STRING */ ,
										name: unit_id /* STRING */
									});
								}
							}
						} catch (err) {
							logger.warn("Customer user not Moves in Required Parent");
						}

					}

					if (input.fabNumber !== undefined || input.fabNumber !== null || input.fabNumber !== '') {
						// Add Visibility Permissions
						me.AddVisibilityPermissionInOrg({
							OrgnizationUnitName: unit_id /* STRING */ ,
							thingName: input.fabNumber /* STRING */
						});
					}

				} catch (err) {
					logger.warn("Ou Not Created");
				}
				break;
			}
		}
	}
}

// Add Or Remove Users Logic Code Started
var arrayOfAddUsers = [];
var arrayOfRemoveUsers = [];
var orgUnitDetailsData, serviceEngineerDetailsDataUser, dealer_idUser, customer_idUser;
try {
	var obj = new Object(input);
	if (obj.hasOwnProperty("orgUserDetails")) {
		logger.debug("Inside orgUserDetails 740");
		var orgUserDetailsData = input.orgUserDetails;
		if (obj.hasOwnProperty("orgUnitDetails")) {
			orgUnitDetailsData = input.orgUnitDetails;
		}
		if (obj.hasOwnProperty("serviceEngineerDetails")) {
			serviceEngineerDetailsDataUser = input.serviceEngineerDetails; //this is for create users
			dealer_idUser = serviceEngineerDetailsDataUser.dealer_id; // Get Dealer Unit Id from service engg block
			customer_idUser = serviceEngineerDetailsDataUser.customer_id; // Get Customer Unit Id from service engg block
		}
		var tableLength2 = orgUserDetailsData.length;
		for (var xdj = 0; xdj < tableLength2; xdj++) {
			var userAction = orgUserDetailsData[xdj].userAction; //  name email unit_id
			var name = orgUserDetailsData[xdj].name;
			var email = orgUserDetailsData[xdj].email;
			var unit_id = orgUserDetailsData[xdj].unit_id;
			if (userAction === "ADD" && name !== "" && email !== "" && unit_id !== "") {
				logger.debug("Inside userAction ADD 755");
				arrayOfAddUsers.push({
					"userAction": userAction,
					"name": name,
					"email": email,
					"unit_id": unit_id
				});

				var NameOfOrganizationUnit_UserAdd = Organizations[orgName].IsInOrganization({
					name: unit_id /* STRING */
				});

				if (NameOfOrganizationUnit_UserAdd) {
					logger.debug("Inside NameOfOrganizationUnit_UserAdd ADD 768");
					// Get Groups of Org Unit
					var MembersOfUnit_UserAdd = Organizations[orgName].GetMembers({
						name: unit_id /* STRING */
					});

					var tableLengthR_First2 = MembersOfUnit_UserAdd.rows.length;
					// Iterate the user groups in the Org Unit
					for (var y = 0; y < tableLengthR_First2; y++) {
						var NameOfUnitGroups_First = MembersOfUnit_UserAdd.rows[y].name;
						try {
							logger.debug("Inside Check if User exists 779");
							var userDescription;
							// Check if User exists
							logger.debug("DEALER ID : " + dealer_idUser + ", Cust ID: " + customer_idUser + ", ID : " + unit_id);
							if (dealer_idUser === unit_id || customer_idUser === unit_id || (dealer_idUser === undefined && customer_idUser === undefined)) {
								logger.debug("Dealer or Customer Unit");
								userDescription = Users[email].GetDescription();
								logger.debug("After Get Description");
								//Add user into Group 
								Groups[NameOfUnitGroups_First].AddMember({
									member: email /* STRING */ ,
									type: "User" /* STRING */
								});

								// result: MASHUPNAME
								var mashupName = me.GetMashupFromUnitLevel({
									input: {
										"orgUnitDetails": orgUnitDetailsData
									} /* JSON */ ,
									unit_id: unit_id /* STRING */
								});
								me.SetUserHomeMashup({
									username: email /* USERNAME */ ,
									mashupname: mashupName /* MASHUPNAME */
								});
							} else {
								logger.debug("ELGI UNit");
								userDescription = Users[name].GetDescription();
								//Add user into Group 
								Groups[NameOfUnitGroups_First].AddMember({
									member: name /* STRING */ ,
									type: "User" /* STRING */
								});

								// result: MASHUPNAME
								var mashupName = me.GetMashupFromUnitLevel({
									input: {
										"orgUnitDetails": orgUnitDetailsData
									} /* JSON */ ,
									unit_id: unit_id /* STRING */
								});
								me.SetUserHomeMashup({
									username: name /* USERNAME */ ,
									mashupname: mashupName /* MASHUPNAME */
								});
							}

						} catch (ex) {
							logger.debug(email + " User will be created as it does not exist");
							if (dealer_idUser === unit_id || customer_idUser === unit_id || (dealer_idUser === undefined && customer_idUser === undefined)) {
								// Generate random password
								var randompass = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
								//create user if not found user in TWX
								var params4 = {
									password: randompass /* STRING */ ,
									name: email /* STRING */ ,
									description: undefined /* STRING */ ,
									tags: undefined /* TAGS */
								};
								// no return
								Resources["EntityServices"].CreateUser(params4);
								Users[email].emailAddress = email;
								//var crmorccs = undefined;
								//if(input.isCommissioning){
								//   crmorccs = input.CRMorCCS; 
								//}
								Things["ELGI.COMP.ThirdPartyIntegrationHelper.Thing"].UserCreated({
									password: randompass /* STRING */ ,
									crmorccs: undefined /* STRING */ ,
									username: email /* STRING */
								});

								//Add user into Group 
								Groups[NameOfUnitGroups_First].AddMember({
									member: email /* STRING */ ,
									type: "User" /* STRING */
								});
								try {
									// result: MASHUPNAME
									var mashupName = me.GetMashupFromUnitLevel({
										input: {
											"orgUnitDetails": orgUnitDetailsData
										} /* JSON */ ,
										unit_id: unit_id /* STRING */
									});
									me.SetUserHomeMashup({
										username: email /* USERNAME */ ,
										mashupname: mashupName /* MASHUPNAME */
									});
								} catch (ex1) {
									logger.debug("Org Unit Details not available");
								}
							} else {
								throw new Exception("ELGi User does not exist in the system");
							}
						}
					}
				}
			} else if (userAction === "REMOVE" && name !== "" && email !== "" && unit_id !== "") {
				arrayOfRemoveUsers.push(userAction);
				arrayOfRemoveUsers.push(name);
				arrayOfRemoveUsers.push(email);
				arrayOfRemoveUsers.push(unit_id);
				try {
					var NameOfOrganizationUnit_UserRemove = Organizations[orgName].IsInOrganization({
						name: unit_id /* STRING */
					});

					if (NameOfOrganizationUnit_UserRemove !== false) {
						var MembersOfUnit_UserRemove = Organizations[orgName].GetMembers({
							name: unit_id /* STRING */
						});

						var tableLengthRemove_First2 = MembersOfUnit_UserRemove.rows.length;
						for (var yUnit = 0; yUnit < tableLengthRemove_First2; yUnit++) {
							var NameOfUnitGroups_First1 = MembersOfUnit_UserRemove.rows[yUnit].name;

							// result: INFOTABLE dataShape: "GroupMember"
							var dataOfUnitGroups_First1 = Groups[NameOfUnitGroups_First1].GetGroupMembers();

							var tableLengthRemove_First3 = dataOfUnitGroups_First1.rows.length;
							for (var zUnitR = 0; zUnitR < tableLengthRemove_First3; zUnitR++) {
								var UserName_First1 = dataOfUnitGroups_First1.rows[zUnitR].name;
								var User_email_First1 = Users[UserName_First1].emailAddress;

								if (email === User_email_First1) {
									Groups[NameOfUnitGroups_First1].DeleteMember({
										member: UserName_First1 /* STRING */ ,
										type: "User" /* STRING */
									});
								}
							}
						}
					}
				} catch (err) {
					logger.warn("user not Remove in group");
				}
			}
		}
	}
} catch (err) {
	logger.warn("user Add Or Remove in group Not Completed" + err);
}

if (obj1.hasOwnProperty("fabNumber") && input.fabNumber !== undefined && input.fabNumber !== null && input.fabNumber !== "") {
	var data = arrayOfAddUsers;
	var tableLengthuyi = data.length;
	for (var xtyu = 0; xtyu < tableLengthuyi; xtyu++) {
		var userAction1 = data[xtyu].userAction;
		var name1 = data[xtyu].name;
		var unit_id1 = data[xtyu].unit_id;
		var email1 = data[xtyu].email;
		if (arrayOfRegion.length > 0) {
			if (unit_id1 === arrayOfRegion[0].unit_id) {
				regionUnitName = arrayOfRegion[0].unitName, // unitName 
					regionUserName = name1,
					rerionEmail = email1,
					regionunitlevel = arrayOfRegion[0].unitLevel, // unitLevel
					reqionUnitId1 = unit_id1;
			}
		}
		if (arrayOfArea.length > 0) {
			if (unit_id1 === arrayOfArea[0].unit_id) {
				AreaUnitName = arrayOfArea[0].unitName, // unitName 
					AreaUserName = name1,
					AreaEmail = email1,
					Areaunitlevel = arrayOfArea[0].unitLevel, // unitLevel
					AreaUnitId1 = unit_id1;
			}
		}
		if (arrayOfDealer.length > 0) {
			if (unit_id1 === arrayOfDealer[0].unit_id) {
				DealerUnitName = arrayOfDealer[0].unitName, // unitName 
					DealerUserName = name1,
					DealerEmail = email1,
					Dealerunitlevel = arrayOfDealer[0].unitLevel, // unitLevel
					DealerUnitId = unit_id1;
			}
		}
		if (arrayOfCustomer.length > 0) {
			if (unit_id1 === arrayOfCustomer[0].unit_id) {

				CustomerUnitName = arrayOfCustomer[0].unitName, // unitName 
					CustomerUserName = name1,
					CustomerEmail = email1,
					Customerunitlevel = arrayOfCustomer[0].unitLevel, // unitLevel
					CustomerUnitId = unit_id1;
			}
		}
	}
	if (obj1.hasOwnProperty("serviceEngineerDetails")) {
		var serviceEngineerName1 = arrayOfServiceEngg[0].serviceengg_Name;
	} else {
		var serviceEngineerName1 = '';
	}
	var isCommissioning;
	if (obj1.hasOwnProperty("isCommisioning")) {
		isCommissioning = input.isCommisioning;
	} else if (obj1.hasOwnProperty("isCommissioning")) {
		isCommissioning = input.isCommissioning;
	}

	var input1 = {
		"regionUnitName": regionUnitName,
		"AreaUnitName": AreaUnitName,
		"DealerUnitName": DealerUnitName,
		"CustomerUnitName": CustomerUnitName,
		"serviceEngineerName": serviceEngineerName1,
		"isCommissioning": isCommissioning,
		"isRetrofitted": input.isRetrofitted,
		"fabNumber": input.fabNumber,
		"CRMorCCS": input.CRMorCCS,
		"isKeyCustomer": input.isKeyCustomer,
		"warrantyStatus": input.warrantyStatus
	};
	//var result = input1;
	me.SetDetailsInFabNumber({
		input: input1 /* JSON */
	});
}

result = true;

//} catch (ex) {
//	logger.error("Error in ELGi.COMP.OrgStructureHelper.Thing : CreateOrgStructure ");
//	result = false;
//}
