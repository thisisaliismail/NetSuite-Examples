function fieldchanged(type, name) {
    debugger;
    if (name == 'custentity_cst_fld_emp_st_date' || name == 'custentity_cst_fld_emp_end_date') {
        var startdate = nlapiGetFieldValue('custentity_cst_fld_emp_st_date');
        var enddate = nlapiGetFieldValue('custentity_cst_fld_emp_end_date');

        var hireDate = nlapiGetFieldValue('custentity_cst_fld_emp_st_date');
      	var hireDateRes = hireDate.split('/');
        var hireDay = hireDateRes[0];
        var hireMonth = hireDateRes[1];
        var hireYear = hireDateRes[2];
        var currentDate = new Date();
        var currentDay = currentDate.getDate();
        var currentMonth = currentDate.getMonth() + 1;
        var currentYear = currentDate.getFullYear();
        var fullCurrentDate = currentDay + '/' + currentMonth + '/' + currentYear;

        var diffMonth = currentMonth - hireMonth;
        if (diffMonth < 0) {
            diffMonth = diffMonth * -1;
        }

        var totalVac = 0;
        var nextYear = currentDate.getFullYear() + 1;
        if (nextYear != currentYear && currentMonth > hireMonth && currentYear == hireYear) {
            totalVac = diffMonth * 2.5;
            nlapiSetFieldValue('custentity_cst_fld_emp_tot_no_vac', totalVac);
            nlapiSetFieldValue('custentity_cst_fld_emp_rem_vac', totalVac);
        }
        else if (nextYear != currentYear && currentMonth < hireMonth && currentYear > hireYear) {
            totalVac = diffMonth * 2.5;
            nlapiSetFieldValue('custentity_cst_fld_emp_tot_no_vac', totalVac);
            nlapiSetFieldValue('custentity_cst_fld_emp_rem_vac', totalVac);
        }
        else if (nextYear != currentYear && currentMonth > hireMonth && currentYear > hireYear) {
            totalVac = diffMonth * 2.5;
            nlapiSetFieldValue('custentity_cst_fld_emp_tot_no_vac', totalVac);
            nlapiSetFieldValue('custentity_cst_fld_emp_rem_vac', totalVac);
        }
        else if (nextYear == currentYear) {
            nlapiSetFieldValue('custentity_cst_fld_emp_tot_no_vac', '');
            nlapiSetFieldValue('custentity_cst_fld_emp_tak_vac', '');
            nlapiSetFieldValue('custentity_cst_fld_emp_rem_vac', '');
        }
        if (startdate == enddate) {
            nlapiSetFieldValue('custentity_cst_fld_emp_ctr_year', 0, false);
            nlapiSetFieldValue('custentity_cst_fld_emp_ctr_month', 0, false);
            nlapiSetFieldValue('custentity_cst_fld_emp_ctr_day', 0, false);
            return;
        }
        if (startdate == '' || enddate == '') {
            nlapiSetFieldValue('custentity_cst_fld_emp_ctr_year', '', false);
            nlapiSetFieldValue('custentity_cst_fld_emp_ctr_month', '', false);
            nlapiSetFieldValue('custentity_cst_fld_emp_ctr_day', '', false);
            nlapiSetFieldValue('custentity_cst_fld_emp_eos_grat', '', false);
            nlapiSetFieldValue('isinactive', 'F', false);
        }
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
                nlapiSetFieldValue('custentity_cst_fld_emp_ctr_day', 0, false);
                nlapiSetFieldValue('custentity_cst_fld_emp_ctr_year', 0, false);
                nlapiSetFieldValue('custentity_cst_fld_emp_ctr_month', 0, false);
                return;
            }
            else if (Difference_In_Days < 31) {
                nlapiSetFieldValue('custentity_cst_fld_emp_ctr_year', 0, false);
                nlapiSetFieldValue('custentity_cst_fld_emp_ctr_month', 0, false);
                nlapiSetFieldValue('custentity_cst_fld_emp_ctr_day', (Difference_In_Days + 1), false);
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

            nlapiSetFieldValue('custentity_cst_fld_emp_ctr_year', year, false);
            nlapiSetFieldValue('custentity_cst_fld_emp_ctr_month', month, false);
            nlapiSetFieldValue('custentity_cst_fld_emp_ctr_day', temp, false);
        }
        return;
    }

    if (name == 'custentity_cst_fld_emp_bassal' || name == 'custentity_cst_fld_emp_transal' || name == 'custentity_cst_fld_emp_oallow' || name == 'custentity_cst_fld_emp_oded' || name == 'custentity_cst_fld_emp_nation') {
        var basSal = nlapiGetFieldValue('custentity_cst_fld_emp_bassal');
        var hosSal = Number(basSal) * 0.2;
        nlapiSetFieldValue('custentity_cst_fld_emp_hossal', hosSal, false);
        var tranSal = Number(basSal) * 0.1;;
        nlapiSetFieldValue('custentity_cst_fld_emp_transal', tranSal, false);
        var oAllow = nlapiGetFieldValue('custentity_cst_fld_emp_oallow');

        var grsSal = Number(basSal) + Number(hosSal) + Number(tranSal) + Number(oAllow);
        nlapiSetFieldValue('custentity_cst_fld_emp_grssal', grsSal);
        var gosi = '';
        var gosiEmpr = '';
        var gosiEmprNonSa = '';
        if (nlapiGetFieldText('custentity_cst_fld_emp_nation') == "SA") {
            gosi = (Number(basSal) + Number(hosSal)) * 0.1;
            gosiEmpr = (Number(basSal) + Number(hosSal)) * 0.12;
        }
        else if (nlapiGetFieldText('custentity_cst_fld_emp_nation') != "SA" && nlapiGetFieldText('custentity_cst_fld_emp_nation') != "") {
            gosiEmprNonSa = (Number(basSal) + Number(hosSal)) * 0.02;
        }
        nlapiSetFieldValue('custentity_cst_fld_emp_gosi', gosi, false);
        nlapiSetFieldValue('custentity_cst_fld_emp_gosi_empr', gosiEmpr, false);
        nlapiSetFieldValue('custentity_cst_fld_emp_gosi_empr_non_sa', gosiEmprNonSa, false);
        var oDed = nlapiGetFieldValue('custentity_cst_fld_emp_oded');
        var allDed = Number(gosi) + Number(oDed);

        var netSal = Number(grsSal) - Number(allDed);
        nlapiSetFieldValue('custentity_cst_fld_emp_netsal', netSal, false);
    }
}