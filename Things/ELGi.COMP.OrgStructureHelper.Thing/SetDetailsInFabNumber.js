if (input.isCommissioning === true || input.isCommissioning === "true") {
	var thingName = input.fabNumber;
	logger.debug("SETTING PROPERTIES FOR " + thingName);
	Things[thingName].CRMorCCS = input.CRMorCCS;
	Things[thingName].isRetrofitted = input.isRetrofitted;
	Things[thingName].warranty_status = input.warrantyStatus;
	Things[thingName].region = input.regionUnitName;
	Things[thingName].area = input.AreaUnitName;
	Things[thingName].dealer_name = input.DealerUnitName;
	Things[thingName].customer_name = input.CustomerUnitName;
	Things[thingName].service_engineer_name = input.serviceEngineerName;
	Things[thingName].isKeyCustomer = input.isKeyCustomer;
	Things[thingName].country = input.CountryName;
	Things[thingName].regional_sales_manager_name = input.regionUserName;
	Things[thingName].area_sales_manager_name = input.AreaUserName;
	//Things[thingName].dealer_name = input.DealerUserName;	
}
