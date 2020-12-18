// result: INFOTABLE dataShape: "RootEntityList"
var qresult = ThingTemplates["ELGi.comp.ELGiMaster.TT"].QueryImplementingThings({
	maxItems: undefined /* NUMBER */ ,
	nameMask: undefined /* STRING */ ,
	query: undefined /* QUERY */ ,
	tags: undefined /* TAGS */
});

var tableLength = qresult.rows.length;
for (var x = 0; x < tableLength; x++) {
	var row = qresult.rows[x];
	var thingName = row.name;
	Things[thingName].AddRunTimePermission({
		principal: 'Users' /* STRING */ ,
		allow: 'true' /* BOOLEAN */ ,
		resource: 'machine_name' /* STRING */ ,
		type: 'PropertyWrite' /* STRING */ ,
		principalType: 'Group' /* STRING */
	});

}
