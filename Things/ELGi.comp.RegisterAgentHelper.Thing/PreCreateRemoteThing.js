//
// PreCreateRemoteThing service
// * thingName - STRING
// * thingIdentifier - STRING
// * tags - TAGS

var result = null;
var template = me.remoteThingTemplate;
if (!template) {
	template = "RemoteThingWithFileTransfer";
}
var description = "Remote '" + thingIdentifier + "'";
if (!thingIdentifier) {
	description = "Remote";
}
var existThing = false;
// check if thing exists
try {
	existThing = !!Things[thingName].name;
	// If Thing exists, no exception will be thrown
	throw new Error("Error creating " + thingName + ". Error: \"" + thingName + "\" already exists");
} catch (err) {
	// Thing does not exist, does the requested template exist
	try {
		var exist = ThingTemplates[template].name;
	} catch (err) {
		throw new Error("Error creating " + thingName + ". Error: ThingTemplate \"" + template + "\" doesn't exist");
	}
	// Test is see if thingName meets name rules
	// Does it start with a letter
	var code = thingName.charCodeAt(0);
	if (!(((code >= 65) && (code <= 90)) || // lower case letters
			((code >= 97) && (code <= 122)) || // upper case letters
			(code == 95) // underscore
		)) {
		throw new Error("Error creating " + thingName + ". Error: \"" + thingName + "\" is not a valid name for a Thing");
	} else {
		for (var i = 1; i < thingName.length; i++) {
			var code = thingName.charCodeAt(i);
			if (!(((code >= 65) && (code <= 90)) || // lower case letters
					((code >= 97) && (code <= 122)) || // upper case letters
					(code == 95) || // underscore
					(code == 46) || // period
					((code >= 48) && (code <= 57)) // numbers
				)) {
				throw new Error("Error creating " + thingName + ". Error: \"" + thingName + "\" is not a valid name for a Thing");
			}
		}
	}
	if (!existThing) {
		try {
			// no return
			Resources["EntityServices"].CreateThing({
				tags: undefined /* TAGS */ ,
				thingTemplateName: template /* THINGTEMPLATENAME */ ,
				description: description /* STRING */ ,
				name: thingName /* STRING */
			});
		} catch (err) {
			throw ("Error creating " + thingName + ". Error:" + err.message);
		}
	}
	var remoteThing = Things[thingName];
	remoteThing.EnableThing();
	remoteThing.RestartThing();
	remoteThing.SetIdentifier({
		identifier: thingIdentifier /* STRING */
	});

    // Add SCM related Shapes to Remote Thing
	// no return
//	Resources["EntityServices"].AddShapeToThing({
//		name: thingName /* THINGNAME */ ,
//		thingShapeName: 'PTC.Asset.ManagedAsset' /* THINGSHAPENAME */
//	});
//
//	// no return
//	Resources["EntityServices"].AddShapeToThing({
//		name: thingName /* THINGNAME */ ,
//		thingShapeName: 'TW.RSM.SFW.ThingShape.Updateable' /* THINGSHAPENAME */
//	});
//
//	// no return
//	Resources["EntityServices"].AddShapeToThing({
//		name: thingName /* THINGNAME */ ,
//		thingShapeName: 'PTC.Resource.Asset.SCMResourceThingShape' /* THINGSHAPENAME */
//	});
//    
//    // no return
//	Resources["EntityServices"].AddShapeToThing({
//		name: thingName /* THINGNAME */ ,
//		thingShapeName: 'ELGi.COMP.SCMFilters.TS' /* THINGSHAPENAME */
//	});


	if (!!tags) {
		remoteThing.AddTags({
			tags: tags
		});
	}
	result = thingName;
}
