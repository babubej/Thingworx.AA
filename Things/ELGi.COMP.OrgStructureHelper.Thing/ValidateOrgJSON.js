var status = true;
var message;
var count = 0;
var obj1 = new Object(input);
var orgUserDetailsData = input.orgUserDetails;
var fabNumberData = input.fabNumber;
var isCommisioningData = input.isCommisioning;
var fabNumber, isCommisioning, CRMorCCS, serviceDate, warrantyStatus, isRetrofitted, isKeyCustomer, commissioningDate;
// Here First Of all checking isCommisioning is there in input 
if (obj1.hasOwnProperty("isCommisioning") && (input.isCommisioning === true || input.isCommisioning === false)) {
	count++;
	// Here Checking fabNumber is in input or not
	if (!obj1.hasOwnProperty("fabNumber") || input.fabNumber === "" || input.fabNumber === undefined || input.fabNumber === null) {
		status = false;
		message = "Fab Number cannot be blank during commisioning. Details - FabNumber :" + fabNumber + ", isCommisioning :" + isCommisioning;

	} else if (obj1.hasOwnProperty("CRMorCCS") && obj1.hasOwnProperty("serviceDate") && obj1.hasOwnProperty("warrantyStatus") &&
		obj1.hasOwnProperty("isRetrofitted") && obj1.hasOwnProperty("isKeyCustomer") && obj1.hasOwnProperty("commissioningDate")) {
		status = true;
		message = "Successful";
	}
}

////if (obj1.hasOwnProperty("orgUnitDetails") && obj1.hasOwnProperty("serviceEngineerDetails") &&  && obj1.hasOwnProperty("orgUserDetails")) {
if (status === true) {
	if (obj1.hasOwnProperty("orgUnitDetails")) {
		count++;
		var orgUnitDetailsData = input.orgUnitDetails;
		var tableLength = orgUnitDetailsData.length;

		for (var x = 0; x < tableLength; x++) {
			var unitLevel = orgUnitDetailsData[x].unitLevel;
			var unitName = orgUnitDetailsData[x].unitName;
			var unit_id = orgUnitDetailsData[x].unit_id;
			var parent_id = orgUnitDetailsData[x].parent_id;
			try {
				if (unitLevel !== "" && unitName !== "" && unit_id !== "" && parent_id !== "") {
					status = true;
					message = "Successful";

				} else {
					throw new Error("Org Unit Details Block is incorrect -" + " unitLevel :" + unitLevel + ", unitName :" + unitName + ", unit_id :" + unit_id + ", parent_id :" + parent_id);
				}

			} catch (err) {
				status = false;
				message = err.message;
				break;
			}

		}
	}
}
if (status === true) {
	if (obj1.hasOwnProperty("serviceEngineerDetails")) {
		count++;
		var serviceEngineerDetailsData = input.serviceEngineerDetails;
		var serviceEnggObject = new Object(serviceEngineerDetailsData);
		var serviceengg_Name = serviceEngineerDetailsData.name;
		var serviceengg_email = serviceEngineerDetailsData.email;
		//var ServiceEngineerMobileNumber = serviceEngineerDetailsData.mobileNo;
		var ServiceEngineerMobileNumber = "";
		var parent_id1 = serviceEngineerDetailsData.parent_id;
		var child_id = serviceEngineerDetailsData.child_id;
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
		try {
			if (parent_id1 !== "" && child_id !== "") {
				status = true;
				message = "Successful";

			} else {
				throw new Error("Service Engineer Block is incorrect - " + "parent_id1 :" + parent_id1 + ", child_id :" + child_id);
			}
		} catch (err) {
			//var result = err.message;
			status = false;
			message = err.message;
		}
	}

}

if (status === true) {
	if (obj1.hasOwnProperty("orgUserDetails")) {
		count++;
		var tableLength2 = orgUserDetailsData.length;
		for (var xdj = 0; xdj < tableLength2; xdj++) {
			var userAction = orgUserDetailsData[xdj].userAction; //  name email unit_id
			var name = orgUserDetailsData[xdj].name;
			var email = orgUserDetailsData[xdj].email;
			var unit_id = orgUserDetailsData[xdj].unit_id;

			if ((userAction === "ADD" || userAction === "REMOVE") && name !== "" && email !== "" && email !== undefined && unit_id !== "") {
				status = true;
				message = "Successful";

				if (email.indexOf('@elgi.com') !== -1 && email !== "" && email !== undefined) {
					try {
						var description = Users[name].GetDescription();
						var usersemailAddress = Users[name].emailAddress;

						if (usersemailAddress !== email) {
							status = false;
							message = "Users Email Id does not match - " + "name :" + name + ", email :" + email;
							break;
						}
					} catch (err) {
						status = false;
						message = "ELGi User does not exist - " + "name :" + name + ", email :" + email;
						break;
					}
				}
			} else {
				status = false;
				message = "User Details Add Or Remove Block is incorrect - " + "User Action :" + userAction + ", name :" + name + ", email :" + email + ", unit_id :" + unit_id;
				break;
			}
		}
	}
}
if (count === 0) {
	message = "Incorrect Json";
	status = false;
}
var result = {
	message: message,
	status: status
};
