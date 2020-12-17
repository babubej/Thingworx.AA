var margin = max / 8;
var params = {
    infoTableName : "InfoTable",
    dataShapeName : "ELGi.COMP.ChartMarkers.DS"
};

// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(ELGi.COMP.ChartMarkers.DS)
var result = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);

// ELGi.COMP.ChartMarkers.DS entry object
var newEntry = new Object();
newEntry.value01 = min; // NUMBER
newEntry.value02 = margin; // NUMBER
newEntry.value03 = margin*2; // NUMBER
newEntry.value04 = margin*3; // NUMBER
newEntry.value05 = margin*4; // NUMBER
newEntry.value06 = margin*5; // NUMBER
newEntry.value07 = margin*6; // NUMBER
newEntry.value08 = margin*7; // NUMBER
newEntry.value09 = margin*8; // NUMBER
result.AddRow(newEntry);
