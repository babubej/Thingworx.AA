var result;

if( prevMashup === 'ELGi.COMP.OnTimeServiceCompressorDetailsL3.MU' || prevMashup === 'ELGi.COMP.OnTimeServiceCompressorDetailsL2.MU' ){
    result = me.MachineDetailsCollection1;
} else if( prevMashup === 'ELGi.COMP.CompressorHealthDetailsL3.MU' || prevMashup === 'ELGi.COMP.CompressorHealthDetailsL2.MU' ) {
	result = me.MachineDetailsCollection2;
} else {
	result = me.MachineDetailsCollection;
}
