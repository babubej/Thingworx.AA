//
// CreateThing Service
// * fabNumber - STRING
// * template_name - TEMPLATENAME
// * shapes_list - INFOTABLE

//Service to Create Local Thing and Add Shapes to it
if (template_name !== undefined && template_name !== null) {
	try {
		var _splits = ("" + me.EntityTag).split(":");
		var _vocabulary = _splits[0];
		var _vocabularyTerm = _splits[1];
		var splitTags = [{
			type: "ModelTagVocabulary",
			vocabulary: _vocabulary,
			vocabularyTerm: _vocabularyTerm
		}];
		var params = {
			name: fabNumber /* STRING */ ,
			description: "" /* STRING */ ,
			thingTemplateName: template_name /* THINGTEMPLATENAME */ ,
			tags: splitTags /* TAGS */
		};
		// no return
		if (!Things[params.name]) {
			logger.warn("Calling with:" + JSON.stringify(params));
			// try to create only if does not exist
			Resources["EntityServices"].CreateThing(params);
		}
		// Add Thing Shapes to thing
		if (shapes_list !== undefined && shapes_list !== null && shapes_list.rows.length > 0) {
			var tableLength = shapes_list.rows.length;
			for (var x = 0; x < tableLength; x++) {
				// Get the shape we need to add to Thing
				var thingShape = shapes_list.rows[x].ShapeName;
				var params1 = {
					name: fabNumber /* THINGNAME */ ,
					thingShapeName: thingShape /* THINGSHAPENAME */
				};
				// no return
				try {
					Resources["EntityServices"].AddShapeToThing(params1);
				} catch (ex) {
					// this will fail when thing shape is already implemented
					// can be ignored
				}
			}
		}

		Things[fabNumber].EnableThing(); //Enable Thing
		Things[fabNumber].RestartThing(); //Restart Thing				
		//Assign Project
		Things[fabNumber].SetProjectName({
			projectName: me.ProjectName /* PROJECTNAME */
		});

		// Set Value Stream for the Thing
		Things[fabNumber].SetValueStream({
			name: me.LocalThingValueSream /* THINGNAME */
		});

		Things[fabNumber].AddRunTimePermission({
			principal: 'Users' /* STRING */ ,
			allow: 'true' /* BOOLEAN */ ,
			resource: 'machine_name' /* STRING */ ,
			type: 'PropertyWrite' /* STRING */ ,
			principalType: 'Group' /* STRING */
		});

		var result = fabNumber;
		logger.info(fabNumber + " Thing created successfully !!");

	} catch (ex) {
		logger.error("Failed to create and init Thing '" + fabNumber + "'" + ex + " " + ex.stack);
		//Delete Ghost Thing   
		var params2 = {
			name: fabNumber /* THINGNAME */
		};
		// no return
		try {
			if (!!Things[fabNumber])
				Resources["EntityServices"].DeleteThing(params2);
		} catch (ex2) {
			logger.error("Failed to Delete Thing: " + ex2);
		}
	}
} //? got template name
