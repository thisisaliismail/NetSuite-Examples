/**
*    Copyright (c) 2021, Oracle and/or its affiliates. All rights reserved.
*/

/**
* @NApiVersion 2.1
* @NScriptType ClientScript
*/
define(['N/url'],
    /**
     *
     * @param {url} url
     */

    function (url) {

        function pageInit(scriptContext) {
            // Empty Page Init (or other regular trigger) is a must
        }

        function inBoundShipment(rec_id) {
            let currentUrl = document.location.href;
            let domain = currentUrl.split('.');
            let suiteletURL = url.resolveScript({
                scriptId: 'customscript_sl_inbound_shipment',
                deploymentId: 'customdeploy_sl_inbound_shipment'
            });

            let get_suitelet_url = `${domain[0]}.${domain[1]}.netsuite.com${suiteletURL}`;
            get_suitelet_url = `${get_suitelet_url}&rec_id=${rec_id}`;
            window.open(get_suitelet_url);
        }

        return {
            pageInit: pageInit,
            inBoundShipment: inBoundShipment
        };

    });