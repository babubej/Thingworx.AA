var result;

var binaryAsString = Things["ELGI.COMP.ThingModelHelper.Thing"].ConvertDecToBinary({
	decimalNumber: fault_status /* INTEGER */
});

var query = {
	"sorts": [{
		"fieldName": "Bit_Position"
	}]
};

// result: INFOTABLE dataShape: ""
var statusBits = Things["ELGi.COMP.StatusBits.DT"].QueryDataTableEntries({
	maxItems: undefined /* NUMBER */ ,
	values: undefined /* INFOTABLE */ ,
	query: query /* QUERY */ ,
	source: undefined /* STRING */ ,
	tags: undefined /* TAGS */
});

var i;

for (i = 0; i < 14; i++) {
	if (binaryAsString.charAt(i + 2) === '1') {
		if (result === undefined || result === 'undefined' || result === null || result === '') {
			result = statusBits[i].Fault_Status;
		} else {
			result = result + ',' + statusBits[i].Fault_Status;
		}		
	}
}
