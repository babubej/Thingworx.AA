var result = '';
if(faultStatus > 0){
    	result = 'TRIPPED';
    } else if( generalStatus === 32 || generalStatus === 128 ){
        result = 'STOPPED';      
    } else if( generalStatus === 1 ){
        result = 'READY';      
    } else if( generalStatus === 2 ){
        result = 'STAR';      
    } else if( generalStatus === 4 ){
        result = 'RUN';      
    } else if( generalStatus === 8 ){
        result = 'RUN LOAD';      
    } else if( generalStatus === 16 ){
        result = 'RUN UNLOAD';      
    } else if( generalStatus === 64 ){
        result = 'IDLE';      
    } else if( generalStatus === 256 ){
        result = 'START INHIBIT';      
    } else if( generalStatus === 512 ){
        result = 'START ACK WAIT';      
    } else if( generalStatus === 1024 ){
        result = 'STANDBY';      
    } else if( generalStatus === 2048 ){
        result = 'TEMP. INHIBIT';      
    }
