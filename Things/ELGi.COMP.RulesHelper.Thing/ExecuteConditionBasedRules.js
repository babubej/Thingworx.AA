var result;
if( condition === 'A > B' ){
	result = property01 > property02;
} else if( condition === 'A > B + C' ){
	result = property01 > ( property02 + property03 );
} else if( condition === 'A < B' ){
	result = property01 < property02;
} else if( condition === 'A > B - C' ){
	result = property01 > ( property02 - property03 );
} else{
	throw new Error('None of the condition matches. Please contact Administrator. ');
}
logger.debug("condition rule result : "+ result + " , CONDITION : "+condition);
