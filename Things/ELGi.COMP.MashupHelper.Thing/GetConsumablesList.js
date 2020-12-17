
// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.ConsumablesPropertyMapping.DS)
var result = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape({
    infoTableName : "InfoTable",
    dataShapeName : "ELGi.COMP.ConsumablesPropertyMapping.DS"
});

result = Things["ELGi.COMP.CalculationsHelper.Thing"].ConsumablesMapping;
