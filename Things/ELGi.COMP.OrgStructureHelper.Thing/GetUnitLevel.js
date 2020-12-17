var result = '';

var orgUnitDetailsData = input.orgUnitDetails;
var tableLength = orgUnitDetailsData.length;
var flag = 0;
if (tableLength > 0) {
	for (var x = 0; x < tableLength; x++) {
		if (unit_id === orgUnitDetailsData[x].unit_id) {
			result = orgUnitDetailsData[x].unitLevel;
			flag = 1;
			break;
		}
	}
	if (flag === 0) {
		var isParent = Organizations[me.ORG_NAME].IsParent({
			parentName: me.ORG_NAME /* STRING */ ,
			name: unit_id /* STRING */
		});
		if (isParent) {
			result = "COUNTRY";
		}
	}
}
