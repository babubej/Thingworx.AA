// result: STRING
var unitLevel =  me.GetUnitLevel({
	input: input /* JSON */,
	unit_id: unit_id /* STRING */
});

if( unitLevel === 'COUNTRY' ){
	result = 'ELGi.COMP.LandingPageL3.MU_v2'; 
} else if( unitLevel === 'REGION' || unitLevel === 'AREA' || unitLevel === 'DEALER' ){
	result = 'ELGi.COMP.LandingPageL2.MU_v2'; 
} else if( unitLevel === 'CUSTOMER' ){
	result = 'ELGi.COMP.LandingPageL1B.MU'; 
}
