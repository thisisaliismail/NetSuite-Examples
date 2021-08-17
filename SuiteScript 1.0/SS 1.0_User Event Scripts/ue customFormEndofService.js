function afterSubmit(type) {
    var eos = nlapiGetNewRecord();
    var empId = eos.getFieldValue('custrecord_cst_fld_eos_emp');
    var enddate = eos.getFieldValue('custrecord_cst_fld_eos_end_date');
    var years = eos.getFieldValue('custrecord_cst_fld_eos_year');
    var months = eos.getFieldValue('custrecord_cst_fld_eos_month');
    var days = eos.getFieldValue('custrecord_cst_fld_eos_day');
  	var grat = eos.getFieldValue('custrecord_cst_fld_eos_gra');
    var employee = nlapiLoadRecord('employee', empId);
    employee.setFieldValue('isinactive', "T");
    employee.setFieldValue('custentity_cst_fld_emp_end_date', enddate);
    employee.setFieldValue('custentity_cst_fld_emp_ctr_year', years);
    employee.setFieldValue('custentity_cst_fld_emp_ctr_month', months);
    employee.setFieldValue('custentity_cst_fld_emp_ctr_day', days);
  	employee.setFieldValue('custentity_cst_fld_emp_eos_grat', grat);
    nlapiSubmitRecord(employee, true);
}