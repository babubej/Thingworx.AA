var result;
if( condition === 'A > B' ){
	result = property01 + ' > ' + property02;
} else if( condition === 'A > B + C' ){
	result = property01 + ' > ( '+ property02 + ' + ' + property03 + ')';
} else if( condition === 'A < B' ){
	result = property01 + ' < ' + property02;
} else if( condition === 'A > B - C' ){
	result = property01 + ' > ( '+ property02 + ' - ' + property03 + ')';
} else if( id === 6 ){
	result = 'Rated_pressure > '+property01+' > Rated_pressure/1.2';
} else if( id === 7 ){
	result = 'Rated_pressure1.2 > '+property01+' > Rated_pressure/1.4';
} else if( id === 8 ){
	result = property01+' < Rated_pressure/1.4';
} else{
	throw new Error('None of the condition matches. Please contact Administrator. ');
}
