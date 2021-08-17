function afterSubmit(type) {
    var vacsetup = nlapiGetNewRecord();
    var empid = vacsetup.getFieldValue('custrecord_cst_fld_vac_req_emp');
    var emp = nlapiLoadRecord('employee', empid);
    var empTakVac = emp.getFieldValue('custentity_cst_fld_emp_tak_vac');
    var takVacDays = vacsetup.getFieldValue('custrecord_cst_fld_tak_vac_day');
    var totVacDays = vacsetup.getFieldValue('custrecord_cst_fld_tot_num_vac');
    var remVacDays = vacsetup.getFieldValue('custrecord_cst_fld_vac_req_rem_day');
    if (empTakVac != '') {
        var empTakRes = Number(empTakVac) + Number(takVacDays);
        emp.setFieldValue('custentity_cst_fld_emp_tak_vac', Number(empTakRes));
        emp.setFieldValue('custentity_cst_fld_emp_tot_no_vac', Number(totVacDays));
        emp.setFieldValue('custentity_cst_fld_emp_rem_vac', Number(remVacDays));
    }
    else {
        emp.setFieldValue('custentity_cst_fld_emp_tak_vac', Number(takVacDays));
        emp.setFieldValue('custentity_cst_fld_emp_tot_no_vac', Number(totVacDays));
        emp.setFieldValue('custentity_cst_fld_emp_rem_vac', Number(remVacDays));
    }
    nlapiSubmitRecord(emp);
}