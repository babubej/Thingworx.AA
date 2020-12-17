// result: JSON
var validationResult = me.ValidateOrgJSON({
	input: input /* JSON */
});

if (validationResult.status === true || validationResult.status === "true") {

	//var result = false;

	//var a = "acme.comp.ACMERoot1.ORG";
	//var a = "ELGI_ORG";
	var orgName = me.ORG_NAME;
	//orgName = a.trim();

	var arrayOfRegion = [];
	var arrayOfArea = [];
	var arrayOfServiceEngg = [];
	var arrayOfDealer = [];
	var arrayOfCustomer = [];
	var regionUnitName, regionUserName, rerionEmail, regionunitlevel, reqionUnitId;
	var AreaUnitName, AreaUserName, AreaEmail, Areaunitlevel, AreaUnitId;
	var DealerUnitName, DealerUserName, DealerEmail, Dealerunitlevel, DealerUnitId;
	var CustomerUnitName, CustomerUserName, CustomerEmail, Customerunitlevel, CustomerUnitId;
	var ServiceEnggOu;
	var regionGroupName;
	var ASMGroupName;
	var ServiceEnggGroupName;
	var DealerGroupName;
	var CustomerGroupName;
	var CountryName;
	var parent_id1 = "";
	var L3 = 'ELGi.COMP.LandingPageL3.MU_v2';
	var L2 = 'ELGi.COMP.LandingPageL2.MU_v2';
	var L1A = 'ELGi.COMP.LandingPageL1A.MU';
	var L1B = 'ELGi.COMP.LandingPageL1B.MU';


	var obj1 = new Object(input);

	if (obj1.hasOwnProperty("orgUnitDetails") || obj1.hasOwnProperty("serviceEngineerDetails")) {

		var orgUnitDetailsData = input.orgUnitDetails;
		try {
			var tableLength = orgUnitDetailsData.length;
		} catch (err) {
			logger.warn("Length Not Found");
		}
		//REGION BLOCK
		for (var x = 0; x < tableLength; x++) {
			var unitLevel = orgUnitDetailsData[x].unitLevel;
			var unitName = orgUnitDetailsData[x].unitName;
			var unit_id = orgUnitDetailsData[x].unit_id;
			var parent_id = orgUnitDetailsData[x].parent_id;
			if (unitLevel !== "" && unitName !== "" && unit_id !== "" && parent_id !== "") {
				if (unitLevel === "REGION" && unit_id !== "" && parent_id !== "" && unitName !== "") {
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
								logger.warn("After region creation " + unit_id + " " + unitName);
								Organizations[orgName].SetOrganizationalUnitDescription({
									name: unit_id /* STRING */ ,
									description: unitName /* STRING */
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
								// set Description 
								Organizations[orgName].SetOrganizationalUnitDescription({
									name: unit_id /* STRING */ ,
									description: unitName /* STRING */
								});
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
									Organizations[orgName].MoveOrganizationalUnit({
										parentName: parent_id /* STRING */ ,
										name: unit_id /* STRING */
									});
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
			} else {
				//throw new Error('None of the condition matches. Please contact Administrator. ');
				logger.error("Region not Available");
			}
		}

		//AREA BLOCK					
		for (var x = 0; x < tableLength; x++) {
			var unitLevel = orgUnitDetailsData[x].unitLevel;
			var unitName = orgUnitDetailsData[x].unitName;
			var unit_id = orgUnitDetailsData[x].unit_id;
			var parent_id = orgUnitDetailsData[x].parent_id;
			if (unitLevel !== "" && unitName !== "" && unit_id !== "" && parent_id !== "") {
				if (unitLevel === "AREA" && unit_id !== "" && parent_id !== "" && unitName !== "") {
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
							// set description
							try {
								//Organizations[orgName].
								Organizations[orgName].SetOrganizationalUnitDescription({
									name: unit_id /* STRING */ ,
									description: unitName /* STRING */
								});

							} catch (err) {
								logger.warn("Description not set to the org unit" + err.message);
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
								// set Description 
								Organizations[orgName].SetOrganizationalUnitDescription({
									name: unit_id /* STRING */ ,
									description: unitName /* STRING */
								});
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
									Organizations[orgName].MoveOrganizationalUnit({
										parentName: parent_id /* STRING */ ,
										name: unit_id /* STRING */
									});
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
			} else {
				//throw new Error('None of the condition matches. Please contact Administrator. ');
				logger.error("Area not Available");
			}
		}

		// Here Service Engg Unit started
		var obj2 = new Object(input);
		if (obj2.hasOwnProperty("serviceEngineerDetails")) {

			var serviceEngineerDetailsData = input.serviceEngineerDetails;
			//var serviceEnggObject = new Object(serviceEngineerDetailsData);

			var serviceengg_Name = serviceEngineerDetailsData.name;
			var serviceengg_email = serviceEngineerDetailsData.email;
			var ServiceEngineerMobileNumber = serviceEngineerDetailsData.mobileNo;
			var area_id = serviceEngineerDetailsData.area_id;
			var region_id = serviceEngineerDetailsData.region_id;
			var dealer_id = serviceEngineerDetailsData.dealer_id;
			var customer_id = serviceEngineerDetailsData.customer_id;
			// name email mobileNo area_id region_id dealer_id customer_id
			//var parent_id1 = serviceEngineerDetailsData.parent_id;
			//var child_id = serviceEngineerDetailsData.child_id;

			var parent_id1 = "";
			var child_id = "";
			//var serviceEnggObject = new Object(serviceEngineerDetailsData);
			if ((serviceEngineerDetailsData.area_id).trim() !== "") {
				parent_id1 = serviceEngineerDetailsData.area_id;
			} else if ((serviceEngineerDetailsData.region_id).trim() !== "") {
				parent_id1 = serviceEngineerDetailsData.region_id;
			}
			if ((serviceEngineerDetailsData.dealer_id).trim() !== "") {
				child_id = serviceEngineerDetailsData.dealer_id;
			} else if ((serviceEngineerDetailsData.customer_id).trim() !== "") {
				child_id = serviceEngineerDetailsData.customer_id;
			}

			if (parent_id1 !== "" && child_id !== "" && serviceengg_Name !== "") {
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

						// set description
						try {
							Organizations[orgName].SetOrganizationalUnitDescription({
								name: ServiceEnggOu /* STRING */ ,
								description: serviceengg_Name /* STRING */
							});
							throw new Error("Not Set Description");
						} catch (err) {
							logger.warn("Description not set to the org unit" + err.message);
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

						//					try {
						//						// result: INFOTABLE dataShape: "GroupMember"
						//						var dataOfServiceEnggGroups_First = Groups["Users"].GetGroupMembers();
						//
						//						var tableLengthS_First1 = dataOfServiceEnggGroups_First.rows.length;
						//						for (var c = 0; c < tableLengthS_First1; c++) {
						//							var ServiceEnggUserName_First = dataOfServiceEnggGroups_First.rows[c].name;
						//							var ServiceEnggUser_email_First = Users[ServiceEnggUserName_First].emailAddress;
						//							Users[ServiceEnggUserName_First].mobilePhone = ServiceEngineerMobileNumber;
						//							if (serviceengg_email === ServiceEnggUser_email_First) {
						//								Groups[ServiceEnggGroupName].AddMember({
						//									member: ServiceEnggUserName_First /* STRING */ ,
						//									type: "User" /* STRING */
						//								});
						//								//break;
						//							}
						//
						//						}
						//					} catch (err) {
						//						logger.warn("ServiceEngg user not added in group");
						//					}
					} else {
						//ServiceEnggOu Found Here
						try {

							// set description
							Organizations[orgName].SetOrganizationalUnitDescription({
								name: ServiceEnggOu /* STRING */ ,
								description: serviceengg_Name /* STRING */
							});

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
									Users[ServiceEnggUserName_First1].mobilePhone = ServiceEngineerMobileNumber;
									if (serviceengg_email !== ServiceEnggUser_email_First1) {
										Groups[NameOfUnitGroupsServiceEngg_First].DeleteMember({
											member: ServiceEnggUserName_First1 /* STRING */ ,
											type: "User" /* STRING */
										});
									}
									//								var dataOfServiceEnggGroups_Firstc = Groups["Users"].GetGroupMembers();
									//								var tableLengthS_First1c = dataOfServiceEnggGroups_Firstc.rows.length;
									//								for (var xtsty = 0; xtsty < tableLengthS_First1c; xtsty++) {
									//									var ServiceEnggUserName_Firstt = dataOfServiceEnggGroups_Firstc.rows[xtsty].name;
									//									var ServiceEnggUser_email_Firstt = Users[ServiceEnggUserName_Firstt].emailAddress;
									//									Users[ServiceEnggUserName_Firstt].mobilePhone = ServiceEngineerMobileNumber;
									//									if (serviceengg_email === ServiceEnggUser_email_Firstt) {
									//										Groups[NameOfUnitGroupsServiceEngg_First].AddMember({
									//											member: ServiceEnggUserName_Firstt /* STRING */ ,
									//											type: "User" /* STRING */
									//										});
									//									}
									//								}
								}

								try {
									var userDescription = Users[serviceengg_Name].GetDescription();
									Users[serviceengg_Name].mobilePhone = ServiceEngineerMobileNumber;
									logger.debug("Service Engg User Added" + serviceengg_Name);
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

								//}
							}
						} catch (err) {
							logger.warn("ServiceEngg user not added in group");
						}

					}

				} catch (err) {
					logger.warn("Ou Not Created");
				}

			} // Service Engg Closed
			else {
				//throw new Error('None of the condition matches. Please contact Administrator. ');
				logger.error("Service Engineer not Available");
			}
		}


		//Dealer BLOCK					
		for (var x = 0; x < tableLength; x++) {
			var unitLevel = orgUnitDetailsData[x].unitLevel;
			var unitName = orgUnitDetailsData[x].unitName;
			var unit_id = orgUnitDetailsData[x].unit_id;
			var parent_id = orgUnitDetailsData[x].parent_id;
			if (unitLevel !== "" && unitName !== "" && unit_id !== "" && parent_id !== "") {
				if (unitLevel === "DEALER" && unit_id !== "" && parent_id !== "" && unitName !== "" || parent_id === parent_id1) {
					DealerGroupName = unit_id + "_" + "UG";
					var dealer_parent_id = parent_id + "_" + unit_id;
					// Checking parent is Available Or Not
					var dealer_parent_idOfOrganizationUnit_First = Organizations[orgName].IsInOrganization({
						name: dealer_parent_id /* STRING */
					});
					if (dealer_parent_idOfOrganizationUnit_First !== true) {
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
								//Dealer Not Found 
								Organizations[orgName].AddOrganizationalUnit({
									parentName: dealer_parent_id /* STRING */ ,
									name: unit_id /* STRING */
								});
							} catch (err) {
								logger.warn("Dealer ou not created");
							}

							// set description
							try {
								Organizations[orgName].SetOrganizationalUnitDescription({
									name: unit_id /* STRING */ ,
									description: unitName /* STRING */
								});
							} catch (err) {
								logger.warn("Description not set to the org unit" + err.message);
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
								logger.warn("Dealer Group not added in OrgUnit");
							}
						} else {
							try {
								//DealerOu Found Here
								// set Description 
								Organizations[orgName].SetOrganizationalUnitDescription({
									name: unit_id /* STRING */ ,
									description: unitName /* STRING */
								});
								var IsDelersParent1 = Organizations[orgName].IsParent({
									parentName: dealer_parent_id /* STRING */ ,
									name: unit_id /* STRING */
								});
								if (IsDelersParent1 === true) {
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
									Organizations[orgName].MoveOrganizationalUnit({
										parentName: dealer_parent_id /* STRING */ ,
										name: unit_id /* STRING */
									});
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
			} else {
				//throw new Error('None of the condition matches. Please contact Administrator. ');
				logger.error("Dealer not Available");
			}
		}

		//CUSTOMER BLOCK1					
		for (var x = 0; x < tableLength; x++) {
			var unitLevel = orgUnitDetailsData[x].unitLevel;
			var unitName = orgUnitDetailsData[x].unitName;
			var unit_id = orgUnitDetailsData[x].unit_id;
			var parent_id = orgUnitDetailsData[x].parent_id;
			if (unitLevel !== "" && unitName !== "" && unit_id !== "" && parent_id !== "") {
				if (unitLevel === "CUSTOMER" && unit_id !== "" && parent_id !== "" && parent_id !== parent_id1 && unitName !== "") {					
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

							// set description
							try {
								//Organizations[orgName].
								Organizations[orgName].SetOrganizationalUnitDescription({
									name: unit_id /* STRING */ ,
									description: unitName /* STRING */
								});

							} catch (err) {
								logger.warn("Description not set to the org unit" + err.message);
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
							//try {
							// set Description 
							Organizations[orgName].SetOrganizationalUnitDescription({
								name: unit_id /* STRING */ ,
								description: unitName /* STRING */
							});
							//CustomerOu Found Here
							var IsCustomerParent = Organizations[orgName].IsParent({
								parentName: parent_id /* STRING */ ,
								name: unit_id /* STRING */
							});
							logger.info("In Custoer block :" + IsCustomerParent);
							if (IsCustomerParent === true) {
								// result: INFOTABLE dataShape: "EntityReferenceWithDescription"
								var MembersOfCustomer_First = Organizations[orgName].GetMembers({
									name: unit_id /* STRING */
								});
								logger.info("In Custoer block :" + MembersOfCustomer_First);
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
								Organizations[orgName].MoveOrganizationalUnit({
									parentName: parent_id /* STRING */ ,
									name: unit_id /* STRING */
								});
							}
							//                            } catch (err) {
							//                                logger.warn("Customer user not Moves in Required Parent");
							//                            }
							if (input.fabNumber !== undefined && input.fabNumber !== null && input.fabNumber !== '') {
								// Add Visibility Permissions
								me.AddVisibilityPermissionInOrg({
									OrgnizationUnitName: unit_id /* STRING */ ,
									thingName: input.fabNumber /* STRING */
								});
							}
						}

					} catch (err) {
						logger.warn("Ou Not Created");
					}
					break;
				}
			} else {
				//throw new Error('None of the condition matches. Please contact Administrator. ');
				logger.error("Customer not Available");
			}
		}

		//CUSTOMER BLOCK2					
		for (var x = 0; x < tableLength; x++) {
			var unitLevel = orgUnitDetailsData[x].unitLevel;
			var unitName = orgUnitDetailsData[x].unitName;
			var unit_id = orgUnitDetailsData[x].unit_id;
			var parent_id = orgUnitDetailsData[x].parent_id;


			if (unitLevel !== "" && unitName !== "" && unit_id !== "" && parent_id !== "") {
				if (unitLevel === "CUSTOMER" && unit_id !== "" && parent_id !== "" && unitName !== "" && parent_id === parent_id1) {
					
					//This is for Customer after Service engg
					CustomerGroupName = unit_id + "_" + "UG";
					var customer_parent_id = parent_id + "_" + unit_id;
					// Checking parent is Available Or Not
					var customer_parent_idOfOrganizationUnit_First = Organizations[orgName].IsInOrganization({
						name: customer_parent_id /* STRING */
					});
					if (customer_parent_idOfOrganizationUnit_First !== true) {
						customer_parent_id = parent_id;
					}
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

							// set description
							try {
								//Organizations[orgName].
								Organizations[orgName].SetOrganizationalUnitDescription({
									name: unit_id /* STRING */ ,
									description: unitName /* STRING */
								});

							} catch (err) {
								logger.warn("Description not set to the org unit" + err.message);
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
								//CustomerOu Found Here

								// set Description 
								Organizations[orgName].SetOrganizationalUnitDescription({
									name: unit_id /* STRING */ ,
									description: unitName /* STRING */
								});

								var IsCustomerParent1 = Organizations[orgName].IsParent({
									parentName: customer_parent_id /* STRING */ ,
									name: unit_id /* STRING */
								});
								if (IsCustomerParent1 === true) {
									// result: INFOTABLE dataShape: "EntityReferenceWithDescription"
									var MembersOfCustomer_First1 = Organizations[orgName].GetMembers({
										name: unit_id /* STRING */
									});
									logger.info("Customer block" + MembersOfCustomer_First1);
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

									} else {
										throw new Error('If member of group found then not required to create');
									}
								} else if (IsCustomerParent1 === false) {
									Organizations[orgName].MoveOrganizationalUnit({
										parentName: customer_parent_id /* STRING */ ,
										name: unit_id /* STRING */
									});
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
			} else {
				//throw new Error('None of the condition matches. Please contact Administrator. ');
				logger.error("Customer not Available");
			}
		}
	} else {
		//throw new Error('None of the condition matches. Please contact Administrator. ');
		logger.error("Org Block Not Available After OrgMain Block");
	}


	// Add Or Remove Users Logic Code Started
	var arrayOfAddUsers = [];
	var arrayOfRemoveUsers = [];
	try {
		var obj = new Object(input);
		if (obj.hasOwnProperty("orgUserDetails")) {

			var orgUserDetailsData = input.orgUserDetails;
			try {
				var serviceEngineerDetailsDataUser = input.serviceEngineerDetails; //this is for create users
				var dealer_idUser = serviceEngineerDetailsDataUser.dealer_id; // from service engg block
				var customer_idUser = serviceEngineerDetailsDataUser.customer_id; // from service engg block
			} catch (err) {
				logger.error(" Not Found serviceEngineerDetailsDataUser, dealer_idUser, customer_idUser");
			}
			var tableLength2 = orgUserDetailsData.length;
			if (tableLength2 === undefined) {
				tableLength2 = 1;
			}
			for (var xdj = 0; xdj < tableLength2; xdj++) {
				try {
					var userAction = orgUserDetailsData[xdj].userAction; //  name email unit_id
					var name = orgUserDetailsData[xdj].name;
					var email = orgUserDetailsData[xdj].email;
					var unit_id = orgUserDetailsData[xdj].unit_id;
				} catch (err) {
					logger.warn("Not Found Array");
				}
				if (userAction === undefined) {
					var userAction = orgUserDetailsData.userAction; //  name email unit_id
					var name = orgUserDetailsData.name;
					var email = orgUserDetailsData.email;
					var unit_id = orgUserDetailsData.unit_id;
				}
				if (userAction === "ADD" && name !== "" && email !== "" && unit_id !== "") {
					arrayOfAddUsers.push({
						"userAction": userAction,
						"name": name,
						"email": email,
						"unit_id": unit_id
					});
					try {
						var NameOfOrganizationUnit_UserAdd = Organizations[orgName].IsInOrganization({
							name: unit_id /* STRING */
						});

						if (NameOfOrganizationUnit_UserAdd !== false) {

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
									//logger.debug("DEALER ID : " + dealer_idUser + ", Cust ID: " + customer_idUser + ", ID : " + unit_id);
									//if (dealer_idUser === unit_id || customer_idUser === unit_id || (dealer_idUser === undefined && customer_idUser === undefined)) {
									if (email.indexOf('@elgi.com') === -1) {
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
										if (obj.hasOwnProperty("orgUnitDetails")) {
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

					} catch (err) {
						logger.warn("Orgnization and group not Found");
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
				} else {
					//throw new Error('None of the condition matches. Please contact Administrator. ');
					logger.warn("User Not Added In the group");
				}
			}
		}
	} catch (err) {
		logger.warn("user Add Or Remove in group Not Completed" + err.message);
	}

	if (obj1.hasOwnProperty("fabNumber") && input.fabNumber !== undefined && input.fabNumber !== null && input.fabNumber !== "") {

		try {
			var data = arrayOfAddUsers;
			var tableLengthuyi = data.length;
			for (var xtyu = 0; xtyu < tableLengthuyi; xtyu++) {
				var userAction1 = data[xtyu].userAction;
				var name1 = data[xtyu].name;
				var unit_id1 = data[xtyu].unit_id;
				var email1 = data[xtyu].email;
				if (unit_id1 === arrayOfRegion[0].unit_id) {
					regionUnitName = arrayOfRegion[0].unitName, // unitName 
						regionUserName = name1,
						rerionEmail = email1,
						regionunitlevel = arrayOfRegion[0].unitLevel, // unitLevel
						reqionUnitId1 = unit_id1;
					CountryName = arrayOfRegion[0].parent_id;
				}
				if (unit_id1 === arrayOfArea[0].unit_id) { // arrayOfArea AreaUnitName 
					AreaUnitName = arrayOfArea[0].unitName, // unitName 
						AreaUserName = name1,
						AreaEmail = email1,
						Areaunitlevel = arrayOfArea[0].unitLevel, // unitLevel
						AreaUnitId1 = unit_id1;

				}
				if (unit_id1 === arrayOfDealer[0].unit_id) { // arrayOfDealer DealerUnitName
					DealerUnitName = arrayOfDealer[0].unitName, // unitName 
						DealerUserName = name1,
						DealerEmail = email1,
						Dealerunitlevel = arrayOfDealer[0].unitLevel, // unitLevel
						DealerUnitId = unit_id1;
				}
				if (unit_id1 === arrayOfCustomer[0].unit_id) { // arrayOfCustomer CustomerUnitName

					CustomerUnitName = arrayOfCustomer[0].unitName, // unitName 
						CustomerUserName = name1,
						CustomerEmail = email1,
						Customerunitlevel = arrayOfCustomer[0].unitLevel, // unitLevel
						CustomerUnitId = unit_id1;
				}
			}
			var serviceEngineerDetailsData1, serviceEngineerName1;
			var obj6 = new Object(input);
			if (obj6.hasOwnProperty("serviceEngineerDetails")) {
				serviceEngineerName1 = arrayOfServiceEngg[0].serviceengg_Name;
			}
		} catch (err) {
			logger.warn("Some Properties Not Found");
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
			"warrantyStatus": input.warrantyStatus,
			"CountryName": CountryName,
			"regionUserName": regionUserName,
			"AreaUserName": AreaUserName,
			"DealerUserName": DealerUserName,
			"CustomerUserName": CustomerUserName
		};
		//var result = input1; area
		me.SetDetailsInFabNumber({
			input: input1 /* JSON */
		});

	}
	var result = {
		success: validationResult.status,
		message: "Service completed successfully"
	};
} else {
	result = validationResult;
}
