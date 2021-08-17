function afterSubmit() {
    var recId = nlapiGetRecordId();
    var paycheckgenerationrecord = nlapiLoadRecord('customrecord_cst_rec_pychk_gen', recId);
    var SalarySheetItems = paycheckgenerationrecord.getLineItemCount('recmachcustrecord_cst_fld_paychk_gen_lnk');
    var account = paycheckgenerationrecord.getFieldValue('custrecord_cst_fld_pay_acc');
    var currency = paycheckgenerationrecord.getFieldValue('custrecord_cst_fld_pay_curr');
    var exchangerate = paycheckgenerationrecord.getFieldValue('custrecord_cst_fld_pay_ex_rate');
    var trandate = paycheckgenerationrecord.getFieldValue('custrecord_cst_fld_pay_date');
    paycheckgenerationrecord.setFieldText('custrecord_cst_fld_pay_aprv_st', 'Approved');
    for (var i = 1; i <= SalarySheetItems; i++) {
        var paycheckjounralrecord = '';
        var dopayement = paycheckgenerationrecord.getLineItemValue('recmachcustrecord_cst_fld_paychk_gen_lnk', 'custrecord_cst_fld_sal_sheet_pay', i);
        var empid = paycheckgenerationrecord.getLineItemValue('recmachcustrecord_cst_fld_paychk_gen_lnk', 'custrecord_cst_fld_sal_sheet_emp', i);
        if (dopayement == "T" && empid != null) {
            var department = paycheckgenerationrecord.getLineItemValue('recmachcustrecord_cst_fld_paychk_gen_lnk', 'custrecord_cst_fld_sal_sheet_dept', i);
            var subsidiary = paycheckgenerationrecord.getLineItemValue('recmachcustrecord_cst_fld_paychk_gen_lnk', 'custrecord_cst_fld_sal_sheet_subs', i);
            var BasicSalary = paycheckgenerationrecord.getLineItemValue('recmachcustrecord_cst_fld_paychk_gen_lnk', 'custrecord_cst_fld_sal_sheet_bsal', i);
            var Housing = paycheckgenerationrecord.getLineItemValue('recmachcustrecord_cst_fld_paychk_gen_lnk', 'custrecord_cst_fld_sal_sheet_hsal', i);
            var Transporation = paycheckgenerationrecord.getLineItemValue('recmachcustrecord_cst_fld_paychk_gen_lnk', 'custrecord_cst_fld_sal_sheet_tsal', i);
            var OtherAllowances = paycheckgenerationrecord.getLineItemValue('recmachcustrecord_cst_fld_paychk_gen_lnk', 'custrecord_cst_fld_sal_sheet_oallow', i);
            var Goasi = paycheckgenerationrecord.getLineItemValue('recmachcustrecord_cst_fld_paychk_gen_lnk', 'custrecord_cst_fld_sal_sheet_gosi', i);
            var OtherDeduction = paycheckgenerationrecord.getLineItemValue('recmachcustrecord_cst_fld_paychk_gen_lnk', 'custrecord_cst_fld_sal_sheet_oded', i);
            if (BasicSalary != 0) {
                paycheckjounralrecord = nlapiCreateRecord('paycheckjournal');
                paycheckjounralrecord.setFieldValue('employee', empid);
                paycheckjounralrecord.setFieldValue('department', department);
                paycheckjounralrecord.setFieldValue('subsidiary', subsidiary);
                paycheckjounralrecord.setFieldValue('account', account);
                paycheckjounralrecord.setFieldValue('currency', currency);
                paycheckjounralrecord.setFieldValue('exchangerate', exchangerate);
                paycheckjounralrecord.setFieldValue('trandate', trandate);
                paycheckjounralrecord.selectNewLineItem('earning');
                paycheckjounralrecord.setCurrentLineItemValue('earning', 'payrollitem', 13);
                paycheckjounralrecord.setCurrentLineItemValue('earning', 'amount', BasicSalary);
                paycheckjounralrecord.commitLineItem('earning');

            }
            if (Housing != 0) {
                if (paycheckjounralrecord == null) {
                    paycheckjounralrecord = nlapiCreateRecord('paycheckjournal');
                    paycheckjounralrecord.setFieldValue('employee', empid);
                    paycheckjounralrecord.setFieldValue('department', department);
                    paycheckjounralrecord.setFieldValue('subsidiary', subsidiary);
                    paycheckjounralrecord.setFieldValue('account', account);
                    paycheckjounralrecord.setFieldValue('currency', currency);
                    paycheckjounralrecord.setFieldValue('exchangerate', exchangerate);
                    paycheckjounralrecord.setFieldValue('trandate', trandate);
                    paycheckjounralrecord.selectNewLineItem('earning');
                    paycheckjounralrecord.setCurrentLineItemValue('earning', 'payrollitem', 14);
                    paycheckjounralrecord.setCurrentLineItemValue('earning', 'amount', Housing);
                    paycheckjounralrecord.commitLineItem('earning');
                }
                else {
                    paycheckjounralrecord.selectNewLineItem('earning');
                    paycheckjounralrecord.setCurrentLineItemValue('earning', 'payrollitem', 14);
                    paycheckjounralrecord.setCurrentLineItemValue('earning', 'amount', Housing);
                    paycheckjounralrecord.commitLineItem('earning');
                }
            }
            if (Transporation != 0) {
                if (paycheckjounralrecord == null) {
                    paycheckjounralrecord = nlapiCreateRecord('paycheckjournal');
                    paycheckjounralrecord.setFieldValue('employee', empid);
                    paycheckjounralrecord.setFieldValue('department', department);
                    paycheckjounralrecord.setFieldValue('subsidiary', subsidiary);
                    paycheckjounralrecord.setFieldValue('account', account);
                    paycheckjounralrecord.setFieldValue('currency', currency);
                    paycheckjounralrecord.setFieldValue('exchangerate', exchangerate);
                    paycheckjounralrecord.setFieldValue('trandate', trandate);
                    paycheckjounralrecord.selectNewLineItem('earning');
                    paycheckjounralrecord.setCurrentLineItemValue('earning', 'payrollitem', 15);
                    paycheckjounralrecord.setCurrentLineItemValue('earning', 'amount', Transporation);
                    paycheckjounralrecord.commitLineItem('earning');
                }
                else {
                    paycheckjounralrecord.selectNewLineItem('earning');
                    paycheckjounralrecord.setCurrentLineItemValue('earning', 'payrollitem', 15);
                    paycheckjounralrecord.setCurrentLineItemValue('earning', 'amount', Transporation);
                    paycheckjounralrecord.commitLineItem('earning');
                }
            }
            if (OtherAllowances != 0) {
                if (paycheckjounralrecord == null) {
                    paycheckjounralrecord = nlapiCreateRecord('paycheckjournal');
                    paycheckjounralrecord.setFieldValue('employee', empid);
                    paycheckjounralrecord.setFieldValue('department', department);
                    paycheckjounralrecord.setFieldValue('subsidiary', subsidiary);
                    paycheckjounralrecord.setFieldValue('account', account);
                    paycheckjounralrecord.setFieldValue('currency', currency);
                    paycheckjounralrecord.setFieldValue('exchangerate', exchangerate);
                    paycheckjounralrecord.setFieldValue('trandate', trandate);
                    paycheckjounralrecord.selectNewLineItem('earning');
                    paycheckjounralrecord.setCurrentLineItemValue('earning', 'payrollitem', 16);
                    paycheckjounralrecord.setCurrentLineItemValue('earning', 'amount', OtherAllowances);
                    paycheckjounralrecord.commitLineItem('earning');
                }
                else {
                    paycheckjounralrecord.selectNewLineItem('earning');
                    paycheckjounralrecord.setCurrentLineItemValue('earning', 'payrollitem', 16);
                    paycheckjounralrecord.setCurrentLineItemValue('earning', 'amount', OtherAllowances);
                    paycheckjounralrecord.commitLineItem('earning');
                }
            }
            if (Goasi != 0) {
                if (paycheckjounralrecord == null) {
                    paycheckjounralrecord = nlapiCreateRecord('paycheckjournal');
                    paycheckjounralrecord.setFieldValue('employee', empid);
                    paycheckjounralrecord.setFieldValue('department', department);
                    paycheckjounralrecord.setFieldValue('subsidiary', subsidiary);
                    paycheckjounralrecord.setFieldValue('account', account);
                    paycheckjounralrecord.setFieldValue('currency', currency);
                    paycheckjounralrecord.setFieldValue('exchangerate', exchangerate);
                    paycheckjounralrecord.setFieldValue('trandate', trandate);
                    paycheckjounralrecord.selectNewLineItem('deduction');
                    paycheckjounralrecord.setCurrentLineItemValue('deduction', 'payrollitem', 17);
                    paycheckjounralrecord.setCurrentLineItemValue('deduction', 'amount', Goasi);
                    paycheckjounralrecord.commitLineItem('deduction');
                }
                else {
                    paycheckjounralrecord.selectNewLineItem('deduction');
                    paycheckjounralrecord.setCurrentLineItemValue('deduction', 'payrollitem', 17);
                    paycheckjounralrecord.setCurrentLineItemValue('deduction', 'amount', Goasi);
                    paycheckjounralrecord.commitLineItem('deduction');
                }
            }
            if (OtherDeduction != 0) {
                if (paycheckjounralrecord == null) {
                    paycheckjounralrecord = nlapiCreateRecord('paycheckjournal');
                    paycheckjounralrecord.setFieldValue('employee', empid);
                    paycheckjounralrecord.setFieldValue('department', department);
                    paycheckjounralrecord.setFieldValue('subsidiary', subsidiary);
                    paycheckjounralrecord.setFieldValue('account', account);
                    paycheckjounralrecord.setFieldValue('currency', currency);
                    paycheckjounralrecord.setFieldValue('exchangerate', exchangerate);
                    paycheckjounralrecord.setFieldValue('trandate', trandate);
                    paycheckjounralrecord.selectNewLineItem('deduction');
                    paycheckjounralrecord.setCurrentLineItemValue('deduction', 'payrollitem', 18);
                    paycheckjounralrecord.setCurrentLineItemValue('deduction', 'amount', OtherDeduction);
                    paycheckjounralrecord.commitLineItem('deduction');
                }
                else {
                    paycheckjounralrecord.selectNewLineItem('deduction');
                    paycheckjounralrecord.setCurrentLineItemValue('deduction', 'payrollitem', 18);
                    paycheckjounralrecord.setCurrentLineItemValue('deduction', 'amount', OtherDeduction);
                    paycheckjounralrecord.commitLineItem('deduction');
                }

            }
            if (paycheckjounralrecord != null)
                nlapiSubmitRecord(paycheckjounralrecord);
        }
    }
    nlapiSubmitRecord(paycheckgenerationrecord);
}