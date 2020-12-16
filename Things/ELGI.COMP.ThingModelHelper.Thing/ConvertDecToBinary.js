var binaryNum = (decimalNumber >>> 0).toString(2);

var length = binaryNum.length;
var iterationCount = 16 - length;
var prefix = '';
for(var x = 0 ; x < iterationCount ; x++ ){
	prefix += '0'; 
}

var result = prefix + '' + binaryNum;
