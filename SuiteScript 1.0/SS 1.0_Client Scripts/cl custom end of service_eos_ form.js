function fieldchanged(type, name) {
    debugger;
    if (name == 'custrecord_cst_fld_eos_emp') {

        var col = new Array();
        var filExp = [
            ['internalid', 'is', nlapiGetFieldValue('custrecord_cst_fld_eos_emp')],
            'and',
            ['isinactive', 'is', 'F']
        ];

        col[0] = new nlobjSearchColumn('internalid');
        col[1] = new nlobjSearchColumn('custentity_cst_fld_emp_netsal');
        col[2] = new nlobjSearchColumn('subsidiary');
        col[3] = new nlobjSearchColumn('custentity_cst_fld_emp_st_date');
        col[4] = new nlobjSearchColumn('custentity_cst_fld_emp_anynotes');
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
                var anynotes = empSrch[i].getValue('custentity_cst_fld_emp_anynotes');

                nlapiSetFieldValue('custrecord_cst_fld_eos_dept', deptId);
                nlapiSetFieldValue('custrecord_cst_fld_eos_sal', Number(netrchRes));
                nlapiSetFieldValue('custrecord_cst_fld_eos_subs', subsidiary);
                nlapiSetFieldValue('custrecord_cst_fld_eos_st_date', stDate);
                nlapiSetFieldValue('custrecord_cst_fld_eos_note', anynotes);
            }
        }
    }

    if (name == 'custrecord_cst_fld_eos_end_date') {
        var startdate = nlapiGetFieldValue('custrecord_cst_fld_eos_st_date');
        var enddate = nlapiGetFieldValue('custrecord_cst_fld_eos_end_date');
        if (startdate == enddate) {
            nlapiSetFieldValue('custrecord_cst_fld_eos_year', 0, false);
            nlapiSetFieldValue('custrecord_cst_fld_eos_month', 0, false);
            nlapiSetFieldValue('custrecord_cst_fld_eos_day', 0, false);
            return;
        }
        var salary = nlapiGetFieldValue('custrecord_cst_fld_eos_sal');
        var totalsalary = 0;
        var temp = 0;
        if ((startdate != '') && (enddate != '')) {
            var [days, months, years] = startdate.split('/');
            months = months - 1;
            var startofperiod = new Date(years, months, days);
            var [y1, y2, y3] = enddate.split('/');
            y2 = y2 - 1;
            var endofperiod = new Date(y3, y2, y1);
            var Difference_In_Time = endofperiod.getTime() - startofperiod.getTime();
            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            if (Difference_In_Days < 0) {
                nlapiSetFieldValue('custrecord_cst_fld_eos_day', 0, false);
                nlapiSetFieldValue('custrecord_cst_fld_eos_year', 0, false);
                nlapiSetFieldValue('custrecord_cst_fld_eos_month', 0, false);
                nlapiSetFieldValue('custrecord_cst_fld_eos_gra', '', false);
                return;
            }
            else if (Difference_In_Days < 31) {
                nlapiSetFieldValue('custrecord_cst_fld_eos_day', (Difference_In_Days + 1), false);
                nlapiSetFieldValue('custrecord_cst_fld_eos_year', 0, false);
                nlapiSetFieldValue('custrecord_cst_fld_eos_month', 0, false);
                nlapiSetFieldValue('custrecord_cst_fld_eos_gra', '', false);
                return;
            }
            var month = 0;
            if (y3 == years) {
                month = (y2 + 1) - (months + 2);
            }
            else {
                month = (11 - months) + y2;

            }
            var year = y3 - years - 1;
            if (year < 0)
                year = 0;
            if ((months + 1) == "1" || (months + 1) == "3" || (months + 1) == "5" || (months + 1) == "7" || (months + 1) == "10" || (months + 1) == "12") {
                if (days == 1) {
                    month = month + 1
                    temp = Number(y1);
                }
                else
                    temp = 32 - Number(days) + Number(y1);
            }
            else if ((months + 1) == "4" || (months + 1) == "6" || (months + 1) == "8" || (months + 1) == "9" || (months + 1) == "11") {
                if (days == 1) {
                    month = month + 1
                    temp = Number(y1);
                }
                else
                    temp = 31 - Number(days) + Number(y1);
            }
            else {
                if (days == 1) {
                    month = month + 1
                    temp = Number(y1);
                }
                else {
                    temp = 29 - Number(days) + Number(y1);
                }
            }
            if (temp == 30 || temp == 31 || temp == 28 || temp == 29) {
                if (temp == 30 && y1 == 30) {

                    if ((y2 + 1) == "4" || (y2 + 1) == "6" || (y2 + 1) == "8" || (y2 + 1) == "9" || (y2 + 1) == "11") {
                        temp = temp - 30;
                        month = month + 1;
                    }
                }
                else if (temp == 31 && y1 == 31) {
                    if ((y2 + 1) == "1" || (y2 + 1) == "3" || (y2 + 1) == "5" || (y2 + 1) == "7" || (y2 + 1) == "8" || (y2 + 1) == "10" || (y2 + 1) == "12") {
                        temp = temp - 31;
                        month = month + 1;
                    }
                }
                else if (temp == endofperiod.getDaysInMonth() && y1 == endofperiod.getDaysInMonth() && (y2 + 1) == "2") {
                    month = month + 1;
                    temp = 0;
                }
            }
            if (temp == 30 && y1 != 30) {
                temp = temp - 30;
                month = month + 1;
            }
            if (temp > 30 && temp < 60) {
                temp = temp - 30;
                month = month + 1;
            }
            else if (temp >= 60) {
                temp = temp - 60;
                month = month + 2;
            }
            if (month >= 12) {
                year = year + 1;
                month = month - 12;
            }

            if (Difference_In_Days <= 730) {
                nlapiSetFieldValue('custrecord_cst_fld_eos_gra', '', false);
                nlapiSetFieldValue('custrecord_cst_fld_eos_year', year, false);
                nlapiSetFieldValue('custrecord_cst_fld_eos_month', month, false);
                nlapiSetFieldValue('custrecord_cst_fld_eos_day', temp, false);
            }
            else if (Difference_In_Days > 730 && Difference_In_Days < 1825) {
                totalsalary = ((Number(salary) * 0.5) / 365) * Difference_In_Days;
                nlapiSetFieldValue('custrecord_cst_fld_eos_gra', totalsalary, false);
                nlapiSetFieldValue('custrecord_cst_fld_eos_year', year, false);
                nlapiSetFieldValue('custrecord_cst_fld_eos_month', month, false);
                nlapiSetFieldValue('custrecord_cst_fld_eos_day', temp, false);
            }
            else {
                totalsalary = (Number(salary) / 365) * Difference_In_Days;
                nlapiSetFieldValue('custrecord_cst_fld_eos_gra', totalsalary, false);
                nlapiSetFieldValue('custrecord_cst_fld_eos_year', year, false);
                nlapiSetFieldValue('custrecord_cst_fld_eos_month', month, false);
                nlapiSetFieldValue('custrecord_cst_fld_eos_day', temp, false);
            }
        }
        return;
    }
}