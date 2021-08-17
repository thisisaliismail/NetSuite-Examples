function onFieldChanged(type, name) {
    debugger;
    if (name == 'custrecord_cst_fld_pay_all_subs') {
        var col = new Array();
        var subsArr = [];
        col[0] = new nlobjSearchColumn('internalid');
        var subsVal = nlapiSearchRecord('subsidiary', null, null, col);
        for (var i = 0; subsVal != '' && i < subsVal.length; i++) {
            var srRes = subsVal[i];
            subsArr.push(srRes.getValue('internalid'));
        }
        if (nlapiGetFieldValue('custrecord_cst_fld_pay_all_subs') == 'F') {
            nlapiSetFieldValue('custrecord_cst_fld_pay_subs', '', false);
        }
        if (nlapiGetFieldValue('custrecord_cst_fld_pay_all_subs') == 'T') {
            nlapiSetFieldValues('custrecord_cst_fld_pay_subs', subsArr, false);
        }
    }
    if (name == 'custrecord_cst_fld_pay_subs') {
        var col = new Array();
        var subsArr = [];
        col[0] = new nlobjSearchColumn('internalid');
        var subsVal = nlapiSearchRecord('subsidiary', null, null, col);
        for (var i = 0; subsVal != '' && i < subsVal.length; i++) {
            var srRes = subsVal[i];
            subsArr.push(srRes.getValue('internalid'));
        }
        var subsidiary = nlapiGetFieldValues('custrecord_cst_fld_pay_subs');
        if (subsidiary.length < subsArr.length) {
            nlapiSetFieldValue('custrecord_cst_fld_pay_all_subs', 'F', false);
        }
        else {
            nlapiSetFieldValue('custrecord_cst_fld_pay_all_subs', 'T', false);
        }
    }
    if (name == 'custrecord_cst_fld_pay_all_dept') {
        var col = new Array();
        var deptArr = [];
        col[0] = new nlobjSearchColumn('internalid');
        var deptVal = nlapiSearchRecord('department', null, null, col);
        for (var i = 0; deptVal != '' && i < deptVal.length; i++) {
            var srRes = deptVal[i];
            deptArr.push(srRes.getValue('internalid'));
        }
        if (nlapiGetFieldValue('custrecord_cst_fld_pay_all_dept') == 'F') {
            nlapiSetFieldValue('custrecord_cst_fld_pay_dept', '', false);
        }
        if (nlapiGetFieldValue('custrecord_cst_fld_pay_all_dept') == 'T') {
            nlapiSetFieldValues('custrecord_cst_fld_pay_dept', deptArr, false);
        }
    }
    if (name == 'custrecord_cst_fld_pay_dept') {
        var col = new Array();
        var deptArr = [];
        col[0] = new nlobjSearchColumn('internalid');
        var deptVal = nlapiSearchRecord('department', null, null, col);
        for (var i = 0; deptVal != '' && i < deptVal.length; i++) {
            var srRes = deptVal[i];
            deptArr.push(srRes.getValue('internalid'));
        }
        var dept = nlapiGetFieldValues('custrecord_cst_fld_pay_dept');
        if (dept.length < deptArr.length) {
            nlapiSetFieldValue('custrecord_cst_fld_pay_all_dept', 'F', false);
        }
        else {
            nlapiSetFieldValue('custrecord_cst_fld_pay_all_dept', 'T', false);
        }
    }
    if (name == 'custrecord_cst_fld_pay_run_payroll') {
        if (nlapiGetFieldValue('custrecord_cst_fld_pay_run_payroll') == 'F') {
            var salSheetCount = nlapiGetLineItemCount('recmachcustrecord_cst_fld_paychk_gen_lnk');
            var salprs = parseInt(salSheetCount);
            for (var i = 1; i <= salprs; i++) {
                nlapiSetLineItemValue('recmachcustrecord_cst_fld_paychk_gen_lnk', 'custrecord_cst_fld_sal_sheet_pay', i, 'F');
            }
        }
        if (nlapiGetFieldValue('custrecord_cst_fld_pay_run_payroll') == 'T') {
            var salSheetCount = nlapiGetLineItemCount('recmachcustrecord_cst_fld_paychk_gen_lnk');
            var salprs = parseInt(salSheetCount);
            for (var i = 1; i <= salprs; i++) {
                nlapiSetLineItemValue('recmachcustrecord_cst_fld_paychk_gen_lnk', 'custrecord_cst_fld_sal_sheet_pay', i, 'T');
            }
        }
    }
    if (name == 'custrecord_cst_fld_sal_sheet_pay') {
        var pay = nlapiGetCurrentLineItemValue('recmachcustrecord_cst_fld_paychk_gen_lnk', 'custrecord_cst_fld_sal_sheet_pay');
        var index = nlapiGetCurrentLineItemIndex('recmachcustrecord_cst_fld_paychk_gen_lnk');
        var counter = 0;
        var salSheetCount = nlapiGetLineItemCount('recmachcustrecord_cst_fld_paychk_gen_lnk');
        var salprs = parseInt(salSheetCount);
        for (var i = 1; i <= salprs; i++) {
            var butt = nlapiGetLineItemValue('recmachcustrecord_cst_fld_paychk_gen_lnk', 'custrecord_cst_fld_sal_sheet_pay', i);
            if (i == index && pay == 'T' && butt == 'F') {
                counter++;
            }
            if (butt == 'T') {
                counter++;
            }
        }
        if (counter == salprs && pay == 'T') {
            nlapiSetFieldValue('custrecord_cst_fld_pay_run_payroll', 'T', false);
        }
        else if (counter == salprs && pay == 'F') {
            nlapiSetFieldValue('custrecord_cst_fld_pay_run_payroll', 'F', false);
        }
        else {
            nlapiSetFieldValue('custrecord_cst_fld_pay_run_payroll', 'F', false);
        }
    }

    if (nlapiGetFieldValue('custrecord_cst_fld_pay_dept') == '' || nlapiGetFieldValue('custrecord_cst_fld_pay_subs') == '' || nlapiGetFieldValue('custrecord_cst_fld_pay_all_dept') == '' || nlapiGetFieldValue('custrecord_cst_fld_pay_all_subs') == '') {
        return;
    }
    if ((name == 'custrecord_cst_fld_pay_dept') || (name == 'custrecord_cst_fld_pay_subs') || (name == 'custrecord_cst_fld_pay_all_dept') || (name == 'custrecord_cst_fld_pay_all_subs')) {

        var salSheetCount = nlapiGetLineItemCount('recmachcustrecord_cst_fld_paychk_gen_lnk');
        var salprs = parseInt(salSheetCount);
        for (var i = 1; i <= salprs; i++) {
            nlapiRemoveLineItem('recmachcustrecord_cst_fld_paychk_gen_lnk', i);
        }

        var col = new Array();
        var filExp = [
            ['department', 'anyof', nlapiGetFieldValues('custrecord_cst_fld_pay_dept')],
            'and',
            ['subsidiary', 'anyof', nlapiGetFieldValues('custrecord_cst_fld_pay_subs')],
            'and',
            ['isinactive', 'is', 'F']
        ];

        col[0] = new nlobjSearchColumn('internalid');
        col[1] = new nlobjSearchColumn('custentity_cst_fld_emp_bassal');
        col[2] = new nlobjSearchColumn('custentity_cst_fld_emp_hossal');
        col[3] = new nlobjSearchColumn('custentity_cst_fld_emp_transal');
        col[4] = new nlobjSearchColumn('custentity_cst_fld_emp_oallow');
        col[5] = new nlobjSearchColumn('custentity_cst_fld_emp_gosi');
        col[6] = new nlobjSearchColumn('custentity_cst_fld_emp_oded');
        col[7] = new nlobjSearchColumn('custentity_cst_fld_emp_grssal');
        col[8] = new nlobjSearchColumn('custentity_cst_fld_emp_netsal');
        col[9] = new nlobjSearchColumn('subsidiary');
        var empSrch = nlapiSearchRecord('employee', null, filExp, col);

        if (empSrch != null && empSrch != "") {
            for (var i = 0; empSrch != null && i < empSrch.length; i++) {
                var searchResult = empSrch[i];
                var empSrchRes = searchResult.getValue('internalid');
                var deptId = "";
                if (empSrchRes != "") {
                    deptId = nlapiLookupField("employee", empSrchRes, "department");
                }
                var basSrchRes = empSrch[i].getValue('custentity_cst_fld_emp_bassal');
                var hosSrchRes = empSrch[i].getValue('custentity_cst_fld_emp_hossal');
                var tranSrchRes = empSrch[i].getValue('custentity_cst_fld_emp_transal');
                var oAllSrchRes = empSrch[i].getValue('custentity_cst_fld_emp_oallow');
                var gosiSrchRes = empSrch[i].getValue('custentity_cst_fld_emp_gosi');
                var oDedSrchRes = empSrch[i].getValue('custentity_cst_fld_emp_oded');
                var grssSrchRes = empSrch[i].getValue('custentity_cst_fld_emp_grssal');
                var netrchRes = empSrch[i].getValue('custentity_cst_fld_emp_netsal');
                var subsidiary = empSrch[i].getValue('subsidiary');

                nlapiSetCurrentLineItemValue('recmachcustrecord_cst_fld_paychk_gen_lnk', 'custrecord_cst_fld_sal_sheet_emp', empSrchRes);
                nlapiSetCurrentLineItemValue('recmachcustrecord_cst_fld_paychk_gen_lnk', 'custrecord_cst_fld_sal_sheet_dept', deptId);
                nlapiSetCurrentLineItemValue('recmachcustrecord_cst_fld_paychk_gen_lnk', 'custrecord_cst_fld_sal_sheet_bsal', Number(basSrchRes));
                nlapiSetCurrentLineItemValue('recmachcustrecord_cst_fld_paychk_gen_lnk', 'custrecord_cst_fld_sal_sheet_hsal', Number(hosSrchRes));
                nlapiSetCurrentLineItemValue('recmachcustrecord_cst_fld_paychk_gen_lnk', 'custrecord_cst_fld_sal_sheet_tsal', Number(tranSrchRes));
                nlapiSetCurrentLineItemValue('recmachcustrecord_cst_fld_paychk_gen_lnk', 'custrecord_cst_fld_sal_sheet_oallow', Number(oAllSrchRes));
                nlapiSetCurrentLineItemValue('recmachcustrecord_cst_fld_paychk_gen_lnk', 'custrecord_cst_fld_sal_sheet_gosi', Number(gosiSrchRes));
                nlapiSetCurrentLineItemValue('recmachcustrecord_cst_fld_paychk_gen_lnk', 'custrecord_cst_fld_sal_sheet_oded', Number(oDedSrchRes));
                nlapiSetCurrentLineItemValue('recmachcustrecord_cst_fld_paychk_gen_lnk', 'custrecord_cst_fld_sal_sheet_grssal', Number(grssSrchRes));
                nlapiSetCurrentLineItemValue('recmachcustrecord_cst_fld_paychk_gen_lnk', 'custrecord_cst_fld_sal_sheet_netsal', Number(netrchRes));
                nlapiSetCurrentLineItemValue('recmachcustrecord_cst_fld_paychk_gen_lnk', 'custrecord_cst_fld_sal_sheet_subs', subsidiary);
                nlapiCommitLineItem('recmachcustrecord_cst_fld_paychk_gen_lnk');
            }
        }
    }

    if ((name == 'custrecord_cst_fld_sal_sheet_bsal') || (name == 'custrecord_cst_fld_sal_sheet_hsal') || (name == 'custrecord_cst_fld_sal_sheet_tsal') || (name == 'custrecord_cst_fld_sal_sheet_oallow') || (name == 'custrecord_cst_fld_sal_sheet_gosi') || (name == 'custrecord_cst_fld_sal_sheet_oded')) {
        var basSal = nlapiGetCurrentLineItemValue('recmachcustrecord_cst_fld_paychk_gen_lnk', 'custrecord_cst_fld_sal_sheet_bsal');
        var hos = nlapiGetCurrentLineItemValue('recmachcustrecord_cst_fld_paychk_gen_lnk', 'custrecord_cst_fld_sal_sheet_hsal');
        var trans = nlapiGetCurrentLineItemValue('recmachcustrecord_cst_fld_paychk_gen_lnk', 'custrecord_cst_fld_sal_sheet_tsal');
        var otherAlow = nlapiGetCurrentLineItemValue('recmachcustrecord_cst_fld_paychk_gen_lnk', 'custrecord_cst_fld_sal_sheet_oallow');

        var totalGross = Number(basSal) + Number(hos) + Number(trans) + Number(otherAlow);
        nlapiSetCurrentLineItemValue('recmachcustrecord_cst_fld_paychk_gen_lnk', 'custrecord_cst_fld_sal_sheet_grssal', totalGross, false);

        var gosiSal = nlapiGetCurrentLineItemValue('recmachcustrecord_cst_fld_paychk_gen_lnk', 'custrecord_cst_fld_sal_sheet_gosi');
        var otherSal = nlapiGetCurrentLineItemValue('recmachcustrecord_cst_fld_paychk_gen_lnk', 'custrecord_cst_fld_sal_sheet_oded');

        var dedSal = Number(gosiSal) + Number(otherSal);
        var netSal = Number(totalGross) - Number(dedSal);
        nlapiSetCurrentLineItemValue('recmachcustrecord_cst_fld_paychk_gen_lnk', 'custrecord_cst_fld_sal_sheet_netsal', netSal, false);
    }
}