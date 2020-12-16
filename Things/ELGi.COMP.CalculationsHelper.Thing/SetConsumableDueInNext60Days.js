// result: INFOTABLE dataShape: "RootEntityList"
var thingsList = ThingTemplates["ELGi.comp.ELGiMaster.TT"].QueryImplementingThingsWithData({
	maxItems: undefined /* NUMBER */ ,
	nameMask: undefined /* STRING */ ,
	query: undefined /* QUERY */ ,
	tags: undefined /* TAGS */
});
var result = thingsList;
var tableLength = thingsList.rows.length;
for (var x = 0; x < tableLength; x++) {
	var ThingName = thingsList.rows[x].name;

	var AFCT_remaining_days1 = Things[ThingName].rem_AFCT/24;
	var OFCT_remaining_days1 = Things[ThingName].rem_OFCT/24;
	var OSCT_remaining_days1 = Things[ThingName].rem_OSCT/24;
	var OCT_remaining_days1 = Things[ThingName].rem_OCT/24;
	var RGT_remaining_days1 = Things[ThingName].rem_RGT/24;
	var PFCT_remaining_days1 = Things[ThingName].rem_PFCT/24;
	var MPV_remaining_days1 = Things[ThingName].rem_MPV/24;
	var BDV_remaining_days1 = Things[ThingName].rem_BDV/24;
	var solenoid_remaining_days1 = Things[ThingName].rem_solenoid/24;
	var ADV_remaining_days1 = Things[ThingName].rem_ADV/24;
	var oilsampletest_remaining_days1 = Things[ThingName].rem_oilsampletest/24;
	var SPM_remaining_days1 = Things[ThingName].rem_SPM/24;
	var PF_FF_remaining_days1 = Things[ThingName].remaining_PF_FF/24;
	var CF_remaining_days1 = Things[ThingName].rem_CF/24;

	if (AFCT_remaining_days1 > 30 && AFCT_remaining_days1 < 60) {
		Things[ThingName].cons_AFCT_Due_Now = false;
        Things[ThingName].cons_AFCT_Due_30_Days = false;
        Things[ThingName].cons_AFCT_Due_60_Days = true;
	} else {
		Things[ThingName].cons_AFCT_Due_60_Days = false;
	}

	if (OFCT_remaining_days1 > 30 && OFCT_remaining_days1 < 30) {
		Things[ThingName].cons_OFCT_Due_Now = false;
        Things[ThingName].cons_OFCT_Due_30_Days = false;
        Things[ThingName].cons_OFCT_Due_60_Days = true;
	} else {
		Things[ThingName].cons_OFCT_Due_60_Days = false;
	}

	if (OSCT_remaining_days1 > 30 && OSCT_remaining_days1 < 60) {
		Things[ThingName].cons_OSCT_Due_Now = false;
        Things[ThingName].cons_OSCT_Due_30_Days = false;
        Things[ThingName].cons_OSCT_Due_60_Days = true;
	} else {
		Things[ThingName].cons_OSCT_Due_60_Days = false;
	}

	if (OCT_remaining_days1 > 30 && OCT_remaining_days1 < 60) {
		Things[ThingName].cons_OCT_Due_Now = false;
        Things[ThingName].cons_OCT_Due_30_Days = false;
        Things[ThingName].cons_OCT_Due_60_Days = true;
	} else {
		Things[ThingName].cons_OCT_Due_60_Days = false;
	}

	if (RGT_remaining_days1 > 30 && RGT_remaining_days1 < 60) {
		Things[ThingName].cons_RGT_Due_Now = false;
        Things[ThingName].cons_RGT_Due_30_Days = false;
        Things[ThingName].cons_RGT_Due_60_Days = true;
	} else {
		Things[ThingName].cons_RGT_Due_60_Days = false;
	}

	if (PFCT_remaining_days1 > 30 && PFCT_remaining_days1 < 60) {
		Things[ThingName].cons_PFCT_Due_Now = false;
        Things[ThingName].cons_PFCT_Due_30_Days = false;
        Things[ThingName].cons_PFCT_Due_60_Days = true;
	} else {
		Things[ThingName].cons_PFCT_Due_60_Days = false;
	}

	if (MPV_remaining_days1 > 30 && MPV_remaining_days1 < 60) {
		Things[ThingName].cons_MPV_Due_Now = false;
        Things[ThingName].cons_MPV_Due_30_Days = false;
        Things[ThingName].cons_MPV_Due_60_Days = true;
	} else {
		Things[ThingName].cons_MPV_Due_60_Days = false;
	}

	if (BDV_remaining_days1 > 30 && BDV_remaining_days1 < 60) {
		Things[ThingName].cons_BDV_Due_Now = false;
        Things[ThingName].cons_BDV_Due_30_Days = false;
        Things[ThingName].cons_BDV_Due_60_Days = true;
	} else {
		Things[ThingName].cons_BDV_Due_60_Days = false;
	}

	if (solenoid_remaining_days1 > 30 && solenoid_remaining_days1 < 60) {
		Things[ThingName].cons_solenoid_Due_Now = false;
        Things[ThingName].cons_solenoid_Due_30_Days = false;
        Things[ThingName].cons_solenoid_Due_60_Days = true;
	} else {
		Things[ThingName].cons_solenoid_Due_60_Days = false;
	}

	if (ADV_remaining_days1 > 30 && ADV_remaining_days1 < 60) {
		Things[ThingName].cons_ADV_Due_Now = false;
        Things[ThingName].cons_ADV_Due_30_Days = false;
        Things[ThingName].cons_ADV_Due_60_Days = true;
	} else {
		Things[ThingName].cons_ADV_Due_60_Days = false;
	}

	if (oilsampletest_remaining_days1 > 30 && oilsampletest_remaining_days1 < 60) {
		Things[ThingName].cons_oilsampletest_Due_Now = false;
        Things[ThingName].cons_oilsampletest_Due_30_Days = false;
        Things[ThingName].cons_oilsampletest_Due_60_Days = true;
	} else {
		Things[ThingName].cons_oilsampletest_Due_60_Days = false;
	}

	if (SPM_remaining_days1 > 30 && SPM_remaining_days1 < 60) {
		Things[ThingName].cons_SPM_Due_Now = false;
        Things[ThingName].cons_SPM_Due_30_Days = false;
        Things[ThingName].cons_SPM_Due_60_Days = true;
	} else {
		Things[ThingName].cons_SPM_Due_60_Days = false;
	}

	if (PF_FF_remaining_days1 > 30 && PF_FF_remaining_days1 < 60) {
		Things[ThingName].cons_PF_FF_Due_Now = false;
        Things[ThingName].cons_PF_FF_Due_30_Days = false;
        Things[ThingName].cons_PF_FF_Due_60_Days = true;
	} else {
		Things[ThingName].cons_PF_FF_Due_60_Days = false;
	}

	if (CF_remaining_days1 > 30 && CF_remaining_days1 < 60) {
		Things[ThingName].cons_CF_Due_Now = false;
        Things[ThingName].cons_CF_Due_30_Days = false;
        Things[ThingName].cons_CF_Due_60_Days = true;
	} else {
		Things[ThingName].cons_CF_Due_60_Days = false;
	}
}
