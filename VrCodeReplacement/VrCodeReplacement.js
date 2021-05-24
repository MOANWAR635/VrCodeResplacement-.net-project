(function ($) {
    $(document).ready(function () {

        $('#ControlAlertBox').SR({ width: 450, height: 100, isModal: true, draggable: false, resizable: false, autoOpen: false });

        $('#BtnSelect').SBT({ width: '100' });
        $('#BtnSaveReplace').SBT({ width: '100' });
        $('#BtnCancel').SBT({ width: '100' });

        $('#ddlBookNo').SQ({ width: '99%' });
        $('#ddlSubLedgerNoOLD').SQ({ width: '99%' });
        $('#ddlSubLedgerCodeOLD').SQ({ width: '99%' });
        $('#ddlGeneralLedgerOLD').SQ({ width: '99%' });
        $('#ddlSubLedgerNoNEW').SQ({ width: '99%' });
        $('#ddlSubLedgerCodeNEW').SQ({ width: '99%' });
        $('#ddlGeneralLedgerNEW').SQ({ width: '99%' });

        Disable_Save_Controls();
        BindddlBookNo();
        BindSubLedgerNoNEW();
        BindddlGeneralLedgerNEW();
        ValidateControl();
        

       
        $('#BtnCancel').on('click', function () {
            Clear_Save_Controls();
            Disable_Save_Controls();
        });

        $('#BtnSelect').on('click', function () {
            Enable_Save_Controls();
        });

        $('#BtnSaveReplace').on('click', function () {
            SaveVrCodeReplacement();
            
        });


      


        $('#ddlBookNo').on('change', function () {
            if ($("#ddlBookNo").SQ('getSelectedIndex') > 0) {
                $('#txtBookNoOLD').val($("#ddlBookNo").SQ('getSelectedItem').value);
                BindGridInvoiceList();
            }
            else {
                $('#txtBookNoOLD').val('');
            }
            
        });

        $('#ddlSubLedgerNoOLD').on('change', function () {
            if ($("#ddlSubLedgerNoOLD").SQ('getSelectedIndex') > 0) {
                $('#txtSubLedgerNoOLD').val($("#ddlSubLedgerNoOLD").SQ('getSelectedItem').value);

                BindddlSubLedgerCodeOLD();
            }
            else {
                $('#txtSubLedgerNoOLD').val('');
            }
           
        });

        
        $('#ddlGeneralLedgerOLD').on('change', function () {
            if ($("#ddlGeneralLedgerOLD").SQ('getSelectedIndex') > 0) {
                $('#txtGeneralLedgerOLD').val($("#ddlGeneralLedgerOLD").SQ('getSelectedItem').value);
            }
            else {
                $('#txtGeneralLedgerOLD').val('');
            }
        });


       

        $('#ddlSubLedgerNoNEW').on('change', function () {
            if ($("#ddlSubLedgerNoNEW").SQ('getSelectedIndex') > 0) {
                $('#txtSubLedgerNoNEW').val($("#ddlSubLedgerNoNEW").SQ('getSelectedItem').value);

                BindSubLedgerCodeNew();
            }
            else {
                $('#txtSubLedgerNoNEW').val('');
            }
        });


        

        $('#ddlSubLedgerCodeOLD').on('change', function () {
            if ($("#ddlSubLedgerCodeOLD").SQ('getSelectedIndex') > 0) {
                $('#txtSubLedgerCodeOLD').val($("#ddlSubLedgerCodeOLD").SQ('getSelectedItem').value);
            }
            else {
                $('#txtSubLedgerCodeOLD').val('');
            }
        });

        
        $('#ddlSubLedgerCodeNEW').on('change', function () {
            if ($("#ddlSubLedgerCodeNEW").SQ('getSelectedIndex') > 0) {
                $('#txtSubLedgerCodeNEW').val($("#ddlSubLedgerCodeNEW").SQ('getSelectedItem').value);
            }
            else {
                $('#txtSubLedgerCodeNEW').val('');
            }
        });

        
        $('#ddlGeneralLedgerNEW').on('change', function () {
            if ($("#ddlGeneralLedgerNEW").SQ('getSelectedIndex') > 0) {
                $('#txtGeneralLedgerNEW').val($("#ddlGeneralLedgerNEW").SQ('getSelectedItem').value);
            }
            else {
                $('#txtGeneralLedgerNEW').val('');
            }
        });





        BindGridInvoiceList = function () {
            var flag = 'GETINVOICELIST';
            var bookNo = $("#ddlBookNo").SQ('getSelectedItem').value;
            var sourceGrid = {
                datatype: "xml",
                datafields: [
                    { name: 'VOUCHER_NO' },
                    { name: 'VOU_DATE' },
                    { name: 'VOU_DATE_1' },                    
                    { name: 'REF_NO1' },                    
                ],
                async: false,
                record: 'OutputTable',
                data: { 'Flag': "'" + flag + "'", 'BookNo': "'" + bookNo + "'"},
                url: 'VrCodeReplacement.aspx/GetInvoiceListByBookNo',
            };

            var dataAdapterGrid = new $.Control.dataAdapter(sourceGrid, {
                contentType: 'application/json; charset=utf-8',
                loadError: function (ControlHR, status, error) {
                    alert(error);
                }
            });

            $("#gridInvoiceList").SBG({
                source: dataAdapterGrid,
                width: "100%",
                height: "310px",
                 filterable: true,
                sortable: true,
                enabletooltips: true,
               // selectionmode: 'checkbox',
                altrows: true,
                virtualmode: false,
                rendergridrows: function (args) {
                    return args.data;
                },
                columns: [
                    {
                        text: 'Select', width: "10%", menu: false, sortable: false, cellsrenderer: function (row, column, value, defaulthtml) {
                            return '<div title="Select" style="text-align: center;cursor:pointer"> <i onclick="btnSelectInvoice(' + row + ')" class="fa fa-pencil-square-o fa-2x myIconColor"></i></div></div>';
                        }
                    },
                    { text: 'Invoice No.', dataField: 'VOUCHER_NO', width: "40%" },
                    { text: 'Invoice Date', dataField: 'VOU_DATE_1', width: "20%" },
                    { text: 'BL No.', dataField: 'REF_NO1', width: "30%" },
                ]
            });
        };


        $('#dvVrCodeReplacement').on('validationSuccess', function (event) {
            var BookNo = $('#ddlBookNo').SQ('getSelectedItem').value;
            alert('hello 1');
            var SLNoOld = $('#ddlSubLedgerNoOLD').SQ('getSelectedItem').value;
            var SLCodeOLD = $('#ddlSubLedgerCodeOLD').SQ('getSelectedItem').value;
            var GeneralLedger_old = $('#ddlGeneralLedgerOLD').SQ('getSelectedItem').value;
            var SLNoNew = $('#ddlSubLedgerNoNEW').SQ('getSelectedItem').value;
            var SLCodeNew = $('#ddlSubLedgerCodeNEW').SQ('getSelectedItem').value;
            var GeneralLedger_New = $('#ddlGeneralLedgerNEW').SQ('getSelectedItem').value;
            var InvoiceNo = $('#hidVoucherNo').val();
            var InvoiceDate = $('#hidVoucherDate').val();
            alert(InvoiceDate);
            $.ajax({
                type:'POST',
                url: 'VrCodeReplacement.aspx/SaveVrCodeReplacement',
                async: true,
                cache: true,
                data: "{'BookNo':'" + BookNo + "', 'SLNoOld': '" + SLNoOld + "', 'SLCodeOLD': '" + SLCodeOLD + "' , 'GeneralLedger_old': '"
                    + GeneralLedger_old + "', 'SLNoNew': '" + SLNoNew + "', 'SLCodeNew': '" + SLCodeNew + "'  , 'GeneralLedger_New': '"
                    + GeneralLedger_New + "' , 'InvoiceNo': '" + InvoiceNo + "' , 'InvoiceDate': '" + InvoiceDate + "' }",

                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (response) {
                    if (parseInt(response.d) > 0) {
                        MessageControl('#myMessage', 'myMessageSuccess', 'VrCodeReplacement Saved Successfully.');
                        BtnCancelClick();
                        
                    }
                    else if (parseInt(response.d) == -1) {
                        MessageControl('#myMessage', 'myMessageError', 'VrCodeReplacement with same name already exists.');
                    }
                    else if (parseInt(response.d) == -1 && entryMode == 'EDIT') {
                        MessageControl('#myMessage', 'myMessageError', 'You can not Edit/Delete, Due to payment received.');
                    }
                    else if (parseInt(response.d) == -1 && entryMode == 'EDIT') {
                        MessageControl('#myMessage', 'myMessageError', 'No record found.');
                    }
                    else if (parseInt(response.d) == 0) {
                        MessageControl('#myMessage', 'myMessageError', 'Error during saving.');
                    }
                },
                failure: function (response) {
                    MessageControl('#myMessage', 'myMessageError', 'Try Connecting ');
                },
                error: function (xhr, errorType, exception) {
                    var errorMessage = exception || xhr.statusText;
                    MessageControl('#myMessage', 'myMessageError', 'Try Connecting '  + errorMessage);
                }
            });
        });


    });


    btnSelectInvoice = function (row) {
        $('#hidVoucherNo').val($("#gridInvoiceList").SBG('getcellvalue', row, "VOUCHER_NO"));
        $('#hidVoucherDate').val($("#gridInvoiceList").SBG('getcellvalue', row, "VOU_DATE").substring(0, 10));

        alert($('#hidVoucherDate').val());

        BindddlSLNoOLD();
        BindddlGeneralLedgerOLD();

        
    }


    BindddlSLNoOLD = function () {
        var flag = 'GETSLNOOLD';
        var bookNo = $("#ddlBookNo").SQ('getSelectedItem').value;
        var VOUCHER_NO = $("#hidVoucherNo").val();
        var VOU_DATE = $('#hidVoucherDate').val();
        var sourceddl =
        {
            datatype: "xml",
            datafields: [
                { name: 'CODE_DESC1' },
                { name: 'CODE' },
            ],
            record: 'OutputTable',
            data: { 'FLAG': "'" + flag + "'", 'BOOK_NO': "'" + bookNo + "'", 'VOUCHER_NO': "'" + VOUCHER_NO + "'", 'VOU_DATE': "'" + VOU_DATE + "'" },
            url: 'VrCodeReplacement.aspx/GetSLNoOLD',
            async: false
        };
        var dataAdapterddl = new $.Control.dataAdapter(sourceddl, { contentType: 'application/json; charset=utf-8' });
        $('#ddlSubLedgerNoOLD').SQ({
            source: dataAdapterddl, filterable: true, searchMode: 'containsignorecase', displayMember: "CODE_DESC1", valueMember: "CODE", placeHolder: 'Select Sub Ledger No.:', selectedIndex: 0, width: '99%'
        });

        $("#ddlSubLedgerNoOLD").SQ('insertAt', 'Select Sub Ledger No.:', 0);
    };

    BindddlSubLedgerCodeOLD = function () {
        var flag = 'GETSLCODEOLD';
        var VOUCHER_NO = $("#hidVoucherNo").val();
        var bookNo = $("#ddlBookNo").SQ('getSelectedItem').value;
        var VOU_DATE = $('#hidVoucherDate').val();
        var subLedgerNo = $("#ddlSubLedgerNoOLD").SQ('getSelectedItem').value;
        var sourceddl =
        {
            datatype: "xml",
            datafields: [
                { name: 'SL_CODE_DESC' },
                { name: 'SL_CODE' },
            ],
            record: 'OutputTable',
            data: {
                'FLAG': "'" + flag + "'", 'subLedgerNo': "'" + subLedgerNo + "'", 'BOOK_NO': "'" + bookNo + "'", 'VOUCHER_NO': "'"
                    + VOUCHER_NO + "'", 'VOU_DATE': "'" + VOU_DATE + "'"
            },
            url: 'VrCodeReplacement.aspx/GetSLCodeOLD',
            async: false
        };
        var dataAdapterddl = new $.Control.dataAdapter(sourceddl, { contentType: 'application/json; charset=utf-8' });
        $('#ddlSubLedgerCodeOLD').SQ({
            source: dataAdapterddl, filterable: true, searchMode: 'containsignorecase', displayMember: "SL_CODE_DESC", valueMember: "SL_CODE", placeHolder: 'Select Sub Ledger Code OLD .:', selectedIndex: 0, width: '99%'
        });
        $("#ddlSubLedgerCodeOLD").SQ('insertAt', 'Select Sub Ledger Code.:', 0);
    };

    BindddlGeneralLedgerOLD = function () {
        var flag = 'GETGENERALLEDGERNOOLD';
        var bookNo = $("#ddlBookNo").SQ('getSelectedItem').value;
        var VOUCHER_NO = $("#hidVoucherNo").val();
        var VOU_DATE = $('#hidVoucherDate').val();
        var sourceddl =
        {
            datatype: "xml",
            datafields: [
                { name: 'GL_DESC' },
                { name: 'L_CODE' }                
            ],
            record: 'OutputTable',
            data: {'FLAG': "'" + flag + "'", 'BOOK_NO': "'" + bookNo + "'", 'VOUCHER_NO': "'" + VOUCHER_NO + "'", 'VOU_DATE': "'" + VOU_DATE + "'" },
            url: 'VrCodeReplacement.aspx/GetGeneralLedgerNoOLD',
            async: false
        };
        var dataAdapterddl = new $.Control.dataAdapter(sourceddl, { contentType: 'application/json; charset=utf-8' });
        $('#ddlGeneralLedgerOLD').SQ({
            source: dataAdapterddl, filterable: true, searchMode: 'containsignorecase', displayMember: "GL_DESC", valueMember: "L_CODE", placeHolder: 'Select General Ledger No.:', selectedIndex: 0, width: '99%'
        });
        $("#ddlGeneralLedgerOLD").SQ('insertAt', 'Select General Ledger No.:', 0);
    };

    BindddlBookNo = function () {
        var stType = '11';
       
        var sourceddl =
        {
            datatype: "xml",
            datafields: [
                { name: 'CODE_DESC1'},
                { name: 'CODE'},
            ],
            record: 'OutputTable',
            data: { 'STTYPE': "'" + stType + "'" },
            url: 'VrCodeReplacement.aspx/GetPMMast',
            async: false
        };
        var dataAdapterddl = new $.Control.dataAdapter(sourceddl, { contentType: 'application/json; charset=utf-8' });
        $('#ddlBookNo').SQ({
            source: dataAdapterddl, filterable: true, searchMode: 'containsignorecase', displayMember: "CODE_DESC1", valueMember: "CODE", placeHolder: 'Select Book No.:', selectedIndex: 0, width: '99%'
        });
        $("#ddlBookNo").SQ('insertAt', 'Select Book No.:', 0);
    };

    BindSubLedgerNoNEW = function () {
        var stType = '01';

        var sourceddl =
        {
            datatype: "xml",
            datafields: [
                { name: 'CODE_DESC1' },
                { name: 'CODE' },
            ],
            record: 'OutputTable',
            data: { 'STTYPE': "'" + stType + "'" },
            url: 'VrCodeReplacement.aspx/GetPMMast',
            async: false
        };
        var dataAdapterddl = new $.Control.dataAdapter(sourceddl, { contentType: 'application/json; charset=utf-8' });
        $('#ddlSubLedgerNoNEW').SQ({
            source: dataAdapterddl, filterable: true, searchMode: 'containsignorecase', displayMember: "CODE_DESC1", valueMember: "CODE", placeHolder: 'Select  Sub Ledger No NEW.:', selectedIndex: 0, width: '99%'
        });
        $("#ddlSubLedgerNoNEW").SQ('insertAt', 'Select Sub Ledger No .:', 0);
    };

    BindSubLedgerCodeNew = function () {
        
        var slNo = $("#ddlSubLedgerNoNEW").SQ('getSelectedItem').value;
        var sourceddl =
        {
            datatype: "xml",
            datafields: [
                { name: 'SL_DESC ' },
                { name: 'SL_CODE' },
            ],
            record: 'OutputTable',
            data: {
                'SLNO': "'" + slNo + "'", 
            },
            url: 'VrCodeReplacement.aspx/GetSLCodeNEW',
            async: false
        };
        var dataAdapterddl = new $.Control.dataAdapter(sourceddl, { contentType: 'application/json; charset=utf-8' });
        $('#ddlSubLedgerCodeNEW').SQ({
            source: dataAdapterddl, filterable: true, searchMode: 'containsignorecase', displayMember: "SL_DESC ", valueMember: "SL_CODE", placeHolder: 'Select Sub Ledger Code NEW .:', selectedIndex: 0, width: '99%'
        });
        $("#ddlSubLedgerCodeNEW").SQ('insertAt', 'Select Sub Ledger Code NEW.:', 0);
    };

    BindddlGeneralLedgerNEW = function () {
        var flag = 'GETGENERALLEDGERNEW';
        var sourceddl =
        {
            datatype: "xml",
            datafields: [
                { name: 'GL_DESC' },
                { name: 'L_CODE' },
            ],
            record: 'OutputTable',
            data: { 'FLAG': "'" + flag + "'"},
            url: 'VrCodeReplacement.aspx/GetGeneralLedgerNew',
            async: false
        };
        var dataAdapterddl = new $.Control.dataAdapter(sourceddl, { contentType: 'application/json; charset=utf-8' });
        $('#ddlGeneralLedgerNEW').SQ({
            source: dataAdapterddl, filterable: true, searchMode: 'containsignorecase', displayMember: "GL_DESC", valueMember: "L_CODE", placeHolder: 'Select General Ledger No.:', selectedIndex: 0, width: '99%'
        });
        $("#ddlGeneralLedgerNEW").SQ('insertAt', 'Select General Ledger No.:', 0);
    };


    Clear_Save_Controls = function () {
        $('#txtBookNoOLD').val('');
        $('#txtSubLedgerNoOLD').val('');
        $('#txtSubLedgerCodeOLD').val('');
        $('#txtGeneralLedgerOLD').val('');
        $('#txtSubLedgerNoNEW').val('');
        $('#txtSubLedgerCodeNEW').val('');
        $('#txtGeneralLedgerNEW').val('');
        $('#gridInvoiceList').remove();
        $('#ddlBookNo').SQ('clearSelection');
        $('#ddlSubLedgerNoOLD ').SQ('clearSelection');

        $('#ddlSubLedgerCodeOLD ').SQ('clearSelection');
        $('#ddlGeneralLedgerOLD ').SQ('clearSelection');

        $('#ddlSubLedgerNoNEW').SQ('clearSelection');
        $('#ddlSubLedgerCodeNEW').SQ('clearSelection');
         $('#ddlGeneralLedgerNEW').SQ('clearSelection');
    };


    Disable_Save_Controls = function () {
        $('#ddlBookNo').SQ({ disabled: true });
        $('#ddlSubLedgerNoOLD').SQ({ disabled: true });
        $('#ddlSubLedgerCodeOLD').SQ({ disabled: true });
        $('#ddlGeneralLedgerOLD').SQ({ disabled: true });
        $('#ddlGeneralLedgerOLD').SQ({ disabled: true });
        $('#ddlSubLedgerNoNEW').SQ({ disabled: true });
        $('#ddlSubLedgerCodeNEW').SQ({ disabled: true });
        $('#ddlGeneralLedgerNEW').SQ({ disabled: true });
        $('#txtBookNoOLD').prop('disabled', true);
        $('#txtSubLedgerNoOLD').prop('disabled', true);
        $('#txtSubLedgerCodeOLD').prop('disabled', true);
        $('#txtGeneralLedgerOLD').prop('disabled', true);
        $('#txtSubLedgerNoNEW').prop('disabled', true);
        $('#txtSubLedgerCodeNEW').prop('disabled', true);
        $('#txtGeneralLedgerNEW').prop('disabled', true);
        $('#BtnSaveReplace').SBT({ disabled: true });
        $('#BtnCancel').SBT({ disabled: true });
        $('#BtnSelect').SBT({ disabled: false });

    };


    Enable_Save_Controls = function () {
        $('#ddlBookNo').SQ({ disabled: false });
        $('#ddlSubLedgerNoOLD').SQ({ disabled: false });
        $('#ddlSubLedgerCodeOLD').SQ({ disabled: false });
        $('#ddlGeneralLedgerOLD').SQ({ disabled: false });
        $('#ddlGeneralLedgerOLD').SQ({ disabled: false });
        $('#ddlSubLedgerNoNEW').SQ({ disabled: false });
        $('#ddlSubLedgerCodeNEW').SQ({ disabled: false });
        $('#ddlGeneralLedgerNEW').SQ({ disabled: false });
        $('#BtnSaveReplace').SBT({ disabled: false });
        $('#BtnCancel').SBT({ disabled: false });
        $('#BtnSelect').SBT({ disabled: true });
    };


         SaveVrCodeReplacement = function () {
        $('#dvVrCodeReplacement').SA('validate');
    };

    ValidateControl = function () {

        $('#dvVrCodeReplacement').SA({
            hintType: 'label',
            animationDuration: 0,
            rules: [

                {
                    input: '#ddlBookNo', message: 'Required!', action: 'select, blur', rule: function (input, commit) {
                        var lcode = $("#ddlBookNo").SQ('selectedIndex');
                        if (lcode <= 0) { return false; }
                        return true;
                    }
                },

                {
                    input: '#gridInvoiceList', message: 'Required!', action: 'select, blur', rule: function (input, commit) {
                        var lcode = $("#gridInvoiceList").SQ('selectedIndex');
                        if (lcode <= 0) { return false; }
                        return true;
                    }
                },

                {
                    input: '#ddlSubLedgerNoOLD', message: 'Required!', action: 'select, blur', rule: function (input, commit) {
                        var lcode = $("#ddlSubLedgerNoOLD").SQ('selectedIndex');
                        if (lcode <= 0) { return false; }
                        return true;
                    }
                },

                
                {
                    input: '#ddlSubLedgerCodeOLD', message: 'Required!', action: 'select, blur', rule: function (input, commit) {
                        var lcode = $("#ddlSubLedgerCodeOLD").SQ('selectedIndex');
                        if (lcode <= 0) { return false; }
                        return true;
                    }
                },

                {
                    input: '#ddlGeneralLedgerOLD', message: 'Required!', action: 'select, blur', rule: function (input, commit) {
                        var lcode = $("#ddlGeneralLedgerOLD").SQ('selectedIndex');
                        if (lcode <= 0) { return false; }
                        return true;
                    }
                },

                //new
                {
                    input: '#ddlSubLedgerNoNEW', message: 'Required!', action: 'select, blur', rule: function (input, commit) {
                        var lcode = $("#ddlSubLedgerNoNEW").SQ('selectedIndex');
                        if (lcode <= 0) { return false; }
                        return true;
                    }
                },


                {
                    input: '#ddlSubLedgerCodeNEW', message: 'Required!', action: 'select, blur', rule: function (input, commit) {
                        var lcode = $("#ddlSubLedgerCodeNEW").SQ('selectedIndex');
                        if (lcode <= 0) { return false; }
                        return true;
                    }
                },


                {
                    input: '#ddlGeneralLedgerNEW', message: 'Required!', action: 'select, blur', rule: function (input, commit) {
                        var lcode = $("#ddlGeneralLedgerNEW").SQ('selectedIndex');
                        if (lcode <= 0) { return false; }
                        return true;
                    }
                },


            ]
        });
    };



})(jQuery);