//Sets the metadata properties coming from LN
try {
	Things[thingName].Rated_Power = Rated_Power;
	Things[thingName].Rated_pressure = Rated_Pressure;
	Things[thingName].Rated_CFM = Rated_CFM;
	Things[thingName].Operating_Voltage = Operating_Voltage;
	Things[thingName].Operating_Frequency = Operating_Frequency;
	Things[thingName].Machine_variant = Machine_variant;
	//Things[thingName].Manufacture_date = Manufacture_date;
	Things[thingName].TPL_No = TPL_No;
	result = true;
} catch (ex) {
	result = false;
    logger.error("Error setting LN Parameters for "+thingName);
}
