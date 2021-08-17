/**
 *    Copyright (c) 2021, Oracle and/or its affiliates. All rights reserved.
 */

/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/ui/serverWidget'],
    /**
     * @param {serverWidget} serverWidget
     */
    function (serverWidget) {

        function beforeLoad(scriptContext) {
            if (scriptContext.type === scriptContext.UserEventType.VIEW) {
                let objNewRec = scriptContext.newRecord;
                let intRecId = Number(objNewRec.id);
                let strRecType = objNewRec.type;

                log.debug({ title: 'objNewRec', details: JSON.stringify(objNewRec) });
                log.debug({ title: 'intRecId', details: intRecId });
                log.debug({ title: 'strRecType', details: strRecType });

                let objForm = scriptContext.form;

                objForm.addButton({
                    id: 'custpage_printrept',
                    label: 'Print Report',
                    functionName: `inBoundShipment(${intRecId})`
                });

                // Internal ID of the Client Script File from File Cabinet
                objForm.clientScriptFileId = 454;

                // Please, verify especially this
                var sublist = objForm.getSublist({
                    id: 'landedcost'
                });

                sublist.addField({
                    id: 'custpage_cst_fld_vdr_name',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Vendor Name'
                });

                sublist.addField({
                    id: 'custpage_cst_fld_inv_no',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Invoice Number'
                });
            }
        }

        return {
            beforeLoad: beforeLoad
        };
    });
