/************* Service to bind SCM Filters related properties of Local thing with Remote Thing *************/

var propertyMapping = new Object();
propertyMapping.ProductGroup = 'machine_group';
propertyMapping.MachineVariant = 'Machine_variant';
propertyMapping.RatedPower = 'Rated_Power';
propertyMapping.RatedPressure = 'Rated_pressure';
propertyMapping.RatedCFM = 'Rated_CFM';
propertyMapping.OperatingVoltage = 'Operating_Voltage';
propertyMapping.OperatingFrequency = 'Operating_Frequency';
propertyMapping.CountryName = 'country';
propertyMapping.RegionName = 'region';
propertyMapping.AreaName = 'area';
propertyMapping.InWarranty = 'warranty_status';
propertyMapping.KeyCustomer = 'isKeyCustomer';

var keys = Object.keys(propertyMapping);
var tableLength = keys.length;
for (var x = 0; x < tableLength; x++) {
	// Binding each property locally
	Things[remoteThingName].SetLocalPropertyBinding({
		propertyName: keys[x] /* STRING */ ,
		aspects: undefined /* JSON */ ,
		sourceThingName: localThingName /* STRING */ ,
		sourcePropertyName: propertyMapping[keys[x]] /* STRING */
	});
}
