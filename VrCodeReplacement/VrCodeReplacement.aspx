<%@ Page Title="Vr Code Replacement" Language="C#" MasterPageFile="~/MainMaster.master" AutoEventWireup="true" CodeFile="VrCodeReplacement.aspx.cs" Inherits="Finance_VrCodeReplacement" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">

    <style>
        .forFieldset {
            margin: 5px;
            border: 1px solid #aaa;
            margin-bottom: 0px;
        }

        .forFieldsetButton {
            margin: 5px;
            border: 1px solid #aaa;
            text-align: center;
            vertical-align: central;
            background-color: #E8E8E8;
            height: 30px;
            margin-top: 15px;
        }

            .forFieldsetButton input {
                margin-top: 2px;
                margin-right: 5px;
            }


        .table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td, .table > tbody > tr > td, .table > tfoot > tr > td {
            padding: 3px;
            border-top: 0px solid #ddd;
        }

        .table {
            margin-bottom: 0px;
        }
    </style>
    <script type="text/javascript" src="Javascript/VrCodeReplacement.js"></script>

   
    <div style="margin-top: 5px" id="dvVrCodeReplacement" >
        <table style="width: 100%">
            <tr>
                <td style="width: 20%">
                    <input type="hidden" id="hidVoucherNo" value="" />
                    <input type="hidden" id="hidVoucherDate" value="" />
                </td>
                <td style="width: 60%;">
                    <fieldset class="forFieldset">
                        <legend style="background-color: gray; padding: 5px; margin-left: 20px; color: white; font-size: larger; font-weight: bolder">Data Transfer Control Form</legend>
                        <table style="width: 100%; vertical-align: top;">
                            <tr>
                                <td style="width: 100%; vertical-align: top;">
                                    <div class="table-responsive" style="width: 100%;">
                                        <fieldset class="forFieldset">
                                            <table style="width: 100%" class="table">
                                                <tr>
                                                    <td style="width: 15%">
                                                        Book No.:
                                                    </td>
                                                    <td style="width: 20%">
                                                        <input type="text" disabled id="txtBookNoOLD" style="width: 99%" />
                                                    </td>
                                                    <td style="width: 65%">
                                                        <div id="ddlBookNo"></div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 15%"></td>
                                                    <td style="width: 20%" colspan="2">
                                                        <table style="width: 100%;height:100px" border="1">
                                                            <tr>
                                                                <td>
                                                                    <div id="gridInvoiceList"></div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 15%">
                                                        Sub Ledger No.:
                                                    </td>
                                                    <td style="width: 20%">
                                                        <input type="text" disabled id="txtSubLedgerNoOLD" style="width: 99%" />
                                                    </td>
                                                    <td style="width: 65%">
                                                        <div id="ddlSubLedgerNoOLD"></div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 15%">
                                                        Sub Ledger Code.:
                                                    </td>
                                                    <td style="width: 20%">
                                                        <input type="text" disabled id="txtSubLedgerCodeOLD" style="width: 99%" />
                                                    </td>
                                                    <td style="width: 65%">
                                                        <div id="ddlSubLedgerCodeOLD"></div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 15%">
                                                        General Ledger:
                                                    </td>
                                                    <td style="width: 20%">
                                                        <input type="text" disabled id="txtGeneralLedgerOLD" style="width: 99%" />
                                                    </td>
                                                    <td style="width: 65%">
                                                        <div id="ddlGeneralLedgerOLD"></div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </fieldset>
                                        <fieldset class="forFieldset">
                                            <table style="width: 100%" class="table">
                                                <tr>
                                                    <td style="width: 15%">
                                                        Sub Ledger No.:
                                                    </td>
                                                    <td style="width: 20%">
                                                        <input type="text" disabled id="txtSubLedgerNoNEW" style="width: 99%" />
                                                    </td>
                                                    <td style="width: 65%">
                                                        <div id="ddlSubLedgerNoNEW"></div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 15%">
                                                        Sub Ledger Code.:
                                                    </td>
                                                    <td style="width: 20%">
                                                        <input type="text" disabled id="txtSubLedgerCodeNEW" style="width: 99%" />
                                                    </td>
                                                    <td style="width: 65%">
                                                        <div id="ddlSubLedgerCodeNEW"></div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 15%">
                                                        General Ledger:
                                                    </td>
                                                    <td style="width: 20%">
                                                        <input type="text" disabled id="txtGeneralLedgerNEW" style="width: 99%" />
                                                    </td>
                                                    <td style="width: 65%">
                                                        <div id="ddlGeneralLedgerNEW"></div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </fieldset>
                                     
                                        <div class="forFieldsetButton">
                                            <table style="width: 100%">
                                                <tr>
                                                    <td style="text-align: center">
                                                        <input type="button" value="Select" id='BtnSelect' />
                                                        <input type="button" value="Save Replace" id='BtnSaveReplace' />
                                                        <input type="button" value="Cancel" id='BtnCancel' />
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </td>

                            </tr>
                        </table>
                    </fieldset>
                </td>
                <td style="width: 20%"></td>
            </tr>
        </table>

    </div>

    <div id='ControlAlertBox' style="display: none;">
        <div>
            <span style="font-weight: bold; font-size: 15px; font-family: Calibri">Delete Record</span>
        </div>
        <br />
        <div>
            Are You Sure, Do you want to delete ?&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="button" style="width: 50px" value="Yes" id="btnYes" />&nbsp;&nbsp;  
                <input type="button" style="width: 50px" value="No" id="btnNo" />
        </div>
    </div>



</asp:Content>







