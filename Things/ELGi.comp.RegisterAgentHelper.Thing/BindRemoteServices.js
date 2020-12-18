//
// BindRemoteServices service
// * remoteThingName - STRING

var remoteThing = Things[remoteThingName];
if (!remoteThing) {
    var thingIdentifier = "" + remoteThingName;
    if (thingIdentifier.indexOf("*") === 0) {
        thingIdentifier = thingIdentifier.substr(1);
    }
    var thingNameForIdentifier = Resources["EntityServices"].GetThingNameForIdentifier({
        identifier: thingIdentifier
    });
    if (!thingNameForIdentifier) {
        throw Error("Input Remote Thing '" + thingIdentifier + "' does not exist!");
    } else {
        remoteThing = Things[thingNameForIdentifier];
        if (!remoteThing) {
            // extremely unlikely, however... missing visibility permissions?
            throw Error("Input Remote Thing '" + thingNameForIdentifier + "'/'" + thingIdentifier + "' does not exist!");
        } else {
            remoteThingName = thingNameForIdentifier;
        }
    }
} //? got remote thing
var result = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape({
    infoTableName: "result",
    dataShapeName: "RemoteServiceBinding"
});
var remoteMetadata = remoteThing.GetRemoteMetadata();
// Get all remote properties from the Edge device
var services = remoteMetadata.serviceDefinitions;
var serviceNames = Object.keys(services);
// Iterate through each property returned by the Remote device
for (var idx = 0; idx < serviceNames.length; idx++) {
    var service = services[serviceNames[idx]];
    var bound = true;
    // Check Binding	
    try {
        // If a property is not bound, this will throw an exception.
        var binding = remoteThing.GetRemoteServiceBinding({ serviceName: service.name });
        if (!!binding.rows.length) {
            result.AddRow(binding.rows[0]);
        }
        // No exception thrown, so this property is already bound. Onward.
        logger.debug(remoteThingName + ": Service {} is already bound on {}. Skipping.", service.name, remoteThingName);
        continue;
    } catch (ex) {
        // Property is not bound. 
        bound = false;
        logger.debug(remoteThingName + ": Service {} is not bound on {}. Binding.", service.name, remoteThingName);
    }
    var isLogged = true;
    var isPersistent = true;
    // Create Property (if it doesn't exist)
    try {
        var definition = remoteThing.GetServiceDefinition({ name: service.name });
    } catch (ex) {
        // Exception thrown, service does not exist. Create service.
        logger.debug(remoteThingName + ": Local service for {} not found, creating.", service.name);

        var parametersIt = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape({
            dataShapeName: "FieldDefinition"
        });
        var inputNames = [];
        if (!!service.Inputs && !!service.Inputs.fieldDefinitions)
            inputNames = Object.keys(service.Inputs.fieldDefinitions);
        for (var iIdx = 0; iIdx < inputNames.length; iIdx++) {
            var inputParam = service.Inputs.fieldDefinitions[inputNames[iIdx]];
            parametersIt.AddRow({
                name: inputParam.name,
                baseType: !!inputParam.baseType ? inputParam.baseType : "NOTHING",
                description: inputParam.description,
                isPrimaryKey: false,
                dataShape: (!!inputParam.aspects && !!inputParam.aspects.dataShape) ? inputParam.aspects.dataShape : ""
            });
        }
        var resultTypeIt = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape({
            dataShapeName: "FieldDefinition"
        });
        var resultBaseType = "NOTHING";
        if (!!service.Outputs && !!service.Outputs.name)
            resultBaseType = service.Outputs.baseType;
        var resultDataShape = (!!service.Outputs.aspects && !!service.Outputs.aspects.dataShape) ? service.Outputs.aspects.dataShape : "";
        if (!!resultDataShape && !DataShapes[resultDataShape]) {
            var dsFields = service.Outputs.fieldDefinitions;
            var dsFieldNames = Object.keys(dsFields);
            var dsFieldsIt = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape({
                dataShapeName: "FieldDefinition"
            });
            for (var fIdx = 0; fIdx < dsFieldNames.length; fIdx++) {
                var fieldInfo = dsFields[dsFieldNames[fIdx]];
                dsFieldsIt.AddRow({
                    name: fieldInfo.name,
                    baseType: fieldInfo.baseType,
                    description: fieldInfo.description,
                    dataShape: (!!fieldInfo.aspects && !!fieldInfo.aspects.dataShape) ? fieldInfo.aspects.dataShape : ""
                });
            }
            //# create data shape on demand
            Resources["EntityServices"].CreateDataShape({
                name: resultDataShape,
                description: "",
                fields: dsFieldsIt,
                tags: ""
            });
        } //? missing data shape
        resultTypeIt.AddRow({
            name: "result",
            baseType: resultBaseType,
            description: "",
            isPrimaryKey: false,
            dataShape: resultDataShape
        });

        remoteThing.AddServiceDefinition({
            name: service.name,
            category: "",
            description: service.description,
            remote: true,
            remoteServiceName: service.name,
            timeout: 0,
            parameters: parametersIt,
            resultType: resultTypeIt
        });
    }
    try {
        // If a property is not bound, this will throw an exception.
        var _binding = remoteThing.GetRemoteServiceBinding({ serviceName: service.name });
        if (!!_binding.rows.length) {
            result.AddRow(_binding.rows[0]);
        }
    } catch (ex) { }
} //# for each property name
