// MachineGroup EPSAC    MachineType CVD20 IsSumpPressure T IsVfdOrNot T FabNumber FABFForSimlaHouseS  NeuronType Neuron4
//=====================Query Logic================================

    var tagOfProject = "ELGi.comp.ELGiEcosystem.MTag:ELGiEcosystem";
    var ProjectName = "ELGi.comp.ELGiEcosystem.Project";
    
	var params = {
    	infoTableName: "InfoTable",
    	dataShapeName: "PropertyDefinition"
    };

    // CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.ThingShapeList.DS)
    var shape = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);
    shape.AddRow({
    	name: "ShapeList"
    });

	//In below query we check input with our real data matching
    var query = {
    	"filters": {
    		"type": "And",
    		"filters": [{
    				"type": "EQ",
    				"fieldName": "MachineGroup",
    				"value": MachineGroup
    			},
    			{
    				"type": "EQ",
    				"fieldName": "MachineType",
    				"value": MachineType
    			},
    			{
    				"type": "EQ",
    				"fieldName": "IsSumpAvailable",
    				"value": IsSumpPressure
    			},
    			{
    				"type": "EQ",
    				"fieldName": "IsVfdOrNot",
    				"value": IsVfdOrNot
    			},
    			{
    				"type": "EQ",
    				"fieldName": "NeuronType",
    				"value": NeuronType
    			}
    		]
    	}
    };

	// After query we ask data table to give this perticulater data for furture results
    // result: INFOTABLE dataShape: ""
    var queryResult = Things["CreateThingDataTable.DT"].QueryDataTableEntries({
    	maxItems: undefined /* NUMBER */ ,
    	values: undefined /* INFOTABLE */ ,
    	query: query /* QUERY */ ,
    	source: undefined /* STRING */ ,
    	tags: undefined /* TAGS */
    });
	//here we get all the required data from data table
	// And we takes template name for furture thing creation operations
    var templateName = queryResult.ThingTemplateName;
    var shape1 = queryResult.ShapeList;
   

    if (templateName !== undefined && templateName !== null && templateName.length > 0) {
    	
    	try {
            // In this function we create thing here we get template name and we are creatiing thing
    		var params1 = {
    			name: FabNumber /* STRING */ ,
    			description: undefined /* STRING */ ,
    			thingTemplateName: templateName /* THINGTEMPLATENAME */ ,
    			tags: tagOfProject /* TAGS */
    		};
    		// no return
    		Resources["EntityServices"].CreateThing(params1);

    		//Enable Thing before adding project name because programatically created thing is not enable for further operations
    		Things[FabNumber].EnableThing();

    		//Restart Thing
    		Things[FabNumber].RestartThing();
			
    		// here we get shapes one by one through this iteration
    		var tableLength = shape1.rows.length;
    		for (var x = 0; x < tableLength; x++) {
    			var thingShape = shape1.rows[x].ShapeName;
                // here got shape and we are adding into thing through Add ThingShape method
    			var params7 = {
    				name: FabNumber /* THINGNAME */ ,
    				thingShapeName: thingShape /* THINGSHAPENAME */
    			};

    			// no return
    			Resources["EntityServices"].AddShapeToThing(params7);

    		}

    		//Assign Project to thing
    		Things[FabNumber].SetProjectName({
    			projectName: ProjectName /* PROJECTNAME */
    		});
    		logger.info(FabNumber + " Thing created successfully !!");
    	} catch (e) {
    		logger.error("Thing cannot be created due to some error");
    		//Delete Ghost Thing   
    		var params2 = {
    			name: FabNumber /* THINGNAME */
    		};
    		// no return
    		Resources["EntityServices"].DeleteThing(params2);
    	}
    }
