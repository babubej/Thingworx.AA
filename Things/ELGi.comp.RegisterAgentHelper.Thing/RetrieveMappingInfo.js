//
// RetrieveMappingInfo service
// * fabNumber - STRING
// * imeiNumber - STRING

// test FIXME
var modbus_config = "<ComPort:RS485,19200,8,N,1>\n";
modbus_config += "<Query_1:1@1,3,4113,105,123>\n";
modbus_config += "<Query_2:2@2,3,4171,50,133>\n";
modbus_config += "<mod_conf_T1:5,60@1*3,8,2,1,1&7,8,2,0,1&11,8,2,4,1|2*3,8,2,1,0.1&5,8,2,1,1&7,8,2,1,1&9,8,2,1,0.1>\n";

modbus_config = "<ComPort:RS485,19200,8,N,1>\n";
modbus_config += "<Query_1:1@1,3,4113,105,123>\n";
modbus_config += "<mod_conf_T1:5,60@1*3,8,2,1,1&7,8,2,0,1&11,8,2,4,1&119,6,2,1,0.1&121,5,2,1,1&123,5,2,1,1&125,6,2,1,0.1>\n";

modbus_config = "<Version:EPSAC_C,1>\n";
modbus_config += "<ComPort:RS485,9600,8,N,1>\n";
modbus_config += "<Query_1:1@1,3,4113,105,8657>\n";
modbus_config += "<mod_conf_T1:5,60@1*3,8,2,1&7,8,2,1&11,8,2,1&15,8,2,1&19,8,2,1&23,8,2,1&27,8,2,1&31,8,2,1&35,6,2,1&53,5,2,1&55,6,2,1&57,5,2,1&59,6,2,1&61,5,2,1&63,6,2,1&65,5,2,1&67,6,2,1&69,5,2,1&71,6,2,1&99,6,2,1&101,6,2,1&103,6,2,1&105,6,2,1&107,6,2,1&109,6,2,1&111,6,2,1&113,6,2,1&119,6,2,0.1&121,5,2,1&129,6,2,0.1&131,6,2,0.1&135,6,2,1&137,6,2,1&143,6,2,1&145,5,2,1&147,6,2,0.1&165,6,2,1&167,6,2,1&169,6,2,1&171,6,2,1&173,6,2,1&175,6,2,1&177,6,2,1&183,6,2,1&185,6,2,1&187,6,2,1&189,6,2,1&191,6,2,1&193,6,2,1&195,6,2,1&197,6,2,1&199,6,2,1&201,6,2,1&203,6,2,1&205,6,2,1>";

var success = true; // Found the mapping info

var tag_parser = {
    "slave_id": [
        {
            "1": "Cum_Load",
            "2": "Cum_Unload",
            "3": "Cum_Run",
            "id": "1"
        },
        {
            "1": "Dis.Pr",
            "2": "Dis.Tr",
            "3": "Dew_Point_Temp",
            "4": "Sump Pr",
            "id": "2"
        }
    ]
};

var tag_parser_2 = {
    "slave_id": [{
        "1": "Cum_Load",
        "2": "Cum_Unload",
        "3": "Cum_Run",
        "4": "Dis.Pr",
        "5": "Dis.Tr",
        "6": "Dew_Point_Temp",
        "7": "Sump Pr",
        "id": "1"
    }]
};

var tag_parser_3 = {
    "slave_id": [{
        "1": {
            "name": "Cum_Load",
            "type": "NUMBER",
            "frequency": 5,
            "publish": "OnChange"
        },
        "2": {
            "name": "Cum_Unload",
            "type": "NUMBER",
            "frequency": 5,
            "publish": "OnChange"
        },
        "3": {
            "name": "Cum_Run",
            "type": "NUMBER",
            "frequency": 5,
            "publish": "OnChange"
        },
        "4": {
            "name": "Dis.Pr",
            "type": "NUMBER",
            "frequency": 5,
            "publish": "OnChange"
        },
        "5": {
            "name": "Dis.Tr",
            "type": "NUMBER",
            "frequency": 15,
            "publish": "OnChange"
        },
        "6": {
            "name": "Dew_Point_Temp",
            "type": "NUMBER",
            "frequency": 15,
            "publish": "OnChange"
        },
        "7": {
            "name": "Sump Pr",
            "type": "NUMBER",
            "frequency": 15,
            "publish": "OnChange"
        },
        "id": "1"
    }]
};

var tag_parser_4 = {
  "slave_id": [
    {
      "1": {
        "name": "cum_load",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "2": {
        "name": "cum_unload",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "3": {
        "name": "cum_run",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "4": {
        "name": "cum_stop",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "5": {
        "name": "cum_fault",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "6": {
        "name": "cum_standby",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "7": {
        "name": "cum_STC",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "8": {
        "name": "cum_LDC",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "9": {
        "name": "utilization",
        "type": "INTEGER",
        "frequency": 5,
        "publish": "onChange"
      },
      "10": {
        "name": "rem_AFCT",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "11": {
        "name": "set_AFCT",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "12": {
        "name": "rem_OFCT",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "13": {
        "name": "set_OFCT",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "14": {
        "name": "rem_OSCT",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "15": {
        "name": "set_OSCT",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "16": {
        "name": "rem_OCT",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "17": {
        "name": "set_OCT",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "18": {
        "name": "rem_RGT",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "19": {
        "name": "set_RGT",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "20": {
        "name": "control_mode",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "21": {
        "name": "unload_mode",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "22": {
        "name": "auto_restart",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "23": {
        "name": "pr_unit",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "24": {
        "name": "tr_unit",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "25": {
        "name": "pr_schdl",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "26": {
        "name": "relay1_configuration",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "27": {
        "name": "relay2_configuration",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "28": {
        "name": "dis_pressure",
        "type": "NUMBER",
        "frequency": 5,
        "publish": "Always"
      },
      "29": {
        "name": "dis_temperature",
        "type": "INTEGER",
        "frequency": 5,
        "publish": "Always"
      },
      "30": {
        "name": "set_unload",
        "type": "NUMBER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "31": {
        "name": "set_load_pressure",
        "type": "NUMBER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "32": {
        "name": "trip_temp",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "33": {
        "name": "warn_temp",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "34": {
        "name": "fan_temp",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "35": {
        "name": "inhibit_temp",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "36": {
        "name": "maximum_unload_pressure",
        "type": "NUMBER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "37": {
        "name": "star_delay",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "38": {
        "name": "DTR_delay",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "39": {
        "name": "RTS_delay",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "40": {
        "name": "standby_time",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "41": {
        "name": "max_noOfStart",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "42": {
        "name": "ADV_offTIme",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "43": {
        "name": "ADV_onTIme",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "44": {
        "name": "hour",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "45": {
        "name": "minutes",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "46": {
        "name": "seconds",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "47": {
        "name": "date",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "48": {
        "name": "month",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "49": {
        "name": "year",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "50": {
        "name": "day",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "51": {
        "name": "general_status",
        "type": "INTEGER",
        "frequency": 5,
        "publish": "Always"
      },
      "52": {
        "name": "warn_status",
        "type": "INTEGER",
        "frequency": 5,
        "publish": "Always"
      },
      "53": {
        "name": "fault_status",
        "type": "INTEGER",
        "frequency": 5,
        "publish": "Always"
      },
      "54": {
        "name": "rem_valveKit",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "55": {
        "name": "set_valveKit",
        "type": "INTEGER",
        "frequency": 3600,
        "publish": "onChange"
      },
      "56": {
        "name": "device_time",
        "type": "DATETIME",
        "frequency": 5,
        "publish": "Always"
      },
      "id": "1"
    }
  ]
};


var result = {
    'success': success,
    'modbus_config': modbus_config,
    'tag_parser': tag_parser_4
};
