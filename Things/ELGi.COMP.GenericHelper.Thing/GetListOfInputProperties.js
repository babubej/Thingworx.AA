// result: INFOTABLE dataShape: "PropertyDefinition"
var propList =  ThingTemplates["ELGi.comp.ELGiMaster.TT"].GetNumericLoggedProperties();

propList.AddRow({"name":"device_time"});

var result = propList;

//if (ThingName !== "" && ThingName !== undefined){
//var NameOfProperty =  Things[ThingName].GetNumericLoggedProperties();
//
//var result = NameOfProperty; 
//}
//

//ThingTemplatesName = "ELGi.comp.ELGiMaster.TT";
//if(ThingName !== " " && ThingTemplatesName === " " && ThingTemplatesName === undefined){
// NameOfProperty =  Things[ThingName].GetNumericLoggedProperties();
//
////var result = NameOfProperty;
//}else if (ThingTemplatesName !== " " && ThingName === " " && ThingName === undefined){
//// result: INFOTABLE dataShape: "PropertyDefinition" ELGi.comp.ELGiMaster.TT
//NameOfProperty =  ThingTemplates[ThingTemplatesName].GetNumericLoggedProperties();
////ThingTemplatesName
//}
//var result = NameOfProperty;
//
