function fieldchanged(type, name) {
    debugger;
    if (name == 'custrecord_cst_fld_vac_req_emp') {

        var col = new Array();
        var filExp = [
            ['internalid', 'is', nlapiGetFieldValue('custrecord_cst_fld_vac_req_emp')],
            'and',
            ['isinactive', 'is', 'F']
        ];

        col[0] = new nlobjSearchColumn('internalid');
        col[1] = new nlobjSearchColumn('custentity_cst_fld_emp_netsal');
        col[2] = new nlobjSearchColumn('subsidiary');
        col[3] = new nlobjSearchColumn('custentity_cst_fld_emp_st_date');
        col[4] = new nlobjSearchColumn('custentity_cst_fld_emp_tot_no_vac');
        col[5] = new nlobjSearchColumn('custentity_cst_fld_emp_rem_vac');

        var empSrch = nlapiSearchRecord('employee', null, filExp, col);

        if (empSrch != null && empSrch != "") {
            for (var i = 0; empSrch != null && i < empSrch.length; i++) {
                var searchResult = empSrch[i];
                var empSrchRes = searchResult.getValue('internalid');
                var deptId = "";
                if (empSrchRes != "") {
                    deptId = nlapiLookupField("employee", empSrchRes, "department");
                }
                var netrchRes = empSrch[i].getValue('custentity_cst_fld_emp_netsal');
                var subsidiary = empSrch[i].getValue('subsidiary');
                var stDate = empSrch[i].getValue('custentity_cst_fld_emp_st_date');
                var ttVac = empSrch[i].getValue('custentity_cst_fld_emp_tot_no_vac');
                var rmVac = empSrch[i].getValue('custentity_cst_fld_emp_rem_vac');

                nlapiSetFieldValue('custrecord_cst_fld_vac_req_dept', deptId);
                nlapiSetFieldValue('custrecord_cst_fld_vac_req_sal', Number(netrchRes));
                nlapiSetFieldValue('custrecord_cst_fld_vac_req_subs', subsidiary);
                nlapiSetFieldValue('custrecord_cst_fld_vac_req_st_wrk_date', stDate);
                nlapiSetFieldValue('custrecord_cst_fld_tot_num_vac', ttVac);
                nlapiSetFieldValue('custrecord_cst_fld_vac_req_rem_day', rmVac);
            }
        }
    }

    if (name == 'custrecord_cst_fld_st_vac_date' || name == 'custrecord_cst_fld_end_vac_date' || name == 'custrecord_cst_fld_vac_req_vac_type') {
        var startdate = nlapiGetFieldValue('custrecord_cst_fld_st_vac_date');
        var enddate = nlapiGetFieldValue('custrecord_cst_fld_end_vac_date');
        var vacType = nlapiGetFieldValue('custrecord_cst_fld_vac_req_vac_type');

        if (startdate != '' && enddate != '' && vacType != '') {
            var [days, months, years] = startdate.split('/');
            months = months - 1;
            var startofperiod = new Date(years, months, days);
            var [y1, y2, y3] = enddate.split('/');
            y2 = y2 - 1;
            var endofperiod = new Date(y3, y2, y1);
            var Difference_In_Time = endofperiod.getTime() - startofperiod.getTime();
            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            if (Difference_In_Days < 0 && Difference_In_Days < 30) {
                alert('End Date must be after Start Date / greater than 30 days.');
                nlapiSetFieldValue('custrecord_cst_fld_end_vac_date', '', false);
                return;
            }

            var totVac = nlapiGetFieldValue('custrecord_cst_fld_tot_num_vac');
            var remVac = nlapiGetFieldValue('custrecord_cst_fld_vac_req_rem_day');
            var takVac = nlapiGetFieldValue('custrecord_cst_fld_tak_vac_day');

            if (vacType == 1 || vacType == 2) {
                nlapiSetFieldValue('custrecord_cst_fld_vac_req_amtpaid', '');
                nlapiSetFieldValue('custrecord_cst_fld_tak_paid_vac', '');

                if (remVac != '') {
                    if (startdate != enddate && Difference_In_Days <= totVac) {
                        remVac = Number(remVac) + Number(takVac) - Number(Difference_In_Days);
                        nlapiSetFieldValue('custrecord_cst_fld_tak_vac_day', Number(Difference_In_Days), false);
                        nlapiSetFieldValue('custrecord_cst_fld_vac_req_rem_day', Number(remVac), false);
                    }
                    else if (Difference_In_Days > totVac) {
                        alert('You have exceeded the limit.');
                        nlapiSetFieldValue('custrecord_cst_fld_end_vac_date', '', false);
                    }
                    else if (startdate == enddate && Difference_In_Days == 0) {
                        remVac = Number(remVac) + Number(takVac) - 0.5;
                        Difference_In_Days = Number(Difference_In_Days) + 0.5;
                        nlapiSetFieldValue('custrecord_cst_fld_tak_vac_day', Number(Difference_In_Days), false);
                        nlapiSetFieldValue('custrecord_cst_fld_vac_req_rem_day', Number(remVac), false);
                    }
                }
                else if (remVac == '' || remVac == null || remVac == 0) {
                    alert('No Remaining Vacation Days');
                    nlapiSetFieldValue('custrecord_cst_fld_vac_req_rem_day', 0);
                }
            }

            else if (vacType == 3) {
                remVac = Number(remVac) + Number(takVac);
                nlapiSetFieldValue('custrecord_cst_fld_tak_vac_day', '', false);
                nlapiSetFieldValue('custrecord_cst_fld_vac_req_rem_day', Number(remVac), false);
                var salary = nlapiGetFieldValue('custrecord_cst_fld_vac_req_sal');
                var formatSal = nlapiFormatCurrency(salary);
                var remSal = 0;
                var amtPaid = 0;

                if (formatSal != '' && formatSal > 0) {
                    remSal = nlapiFormatCurrency(formatSal) / 30;
                    amtPaid = nlapiFormatCurrency(remSal) * Number(Difference_In_Days);
                    nlapiSetFieldValue('custrecord_cst_fld_vac_req_amtpaid', nlapiFormatCurrency(amtPaid), false);
                    nlapiSetFieldValue('custrecord_cst_fld_tak_paid_vac', Number(Difference_In_Days), false);
                }
            }
        }
    }
}