using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using System.Web.Script.Services;
using System.Data;
using System.IO;
using System.Data.SqlClient;
using System.Configuration;
using System.Web.Script.Serialization;
using SavvyShippingDataFramework;
using FinanceBusinessFramework;
using FinanceObjectFramework;


public partial class Finance_VrCodeReplacement : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
    public static string GetPMMast(string STTYPE)
    {

        VrCodeReplacement objPMMaster = new VrCodeReplacement();
        DataTable dt = objPMMaster.GetPMMast(STTYPE);
        System.IO.StringWriter writer = new System.IO.StringWriter();
        dt.WriteXml(writer, XmlWriteMode.WriteSchema, false);
        return writer.ToString();
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
    public static string GetInvoiceListByBookNo(string Flag, string BookNo)
    {
        VrCodeReplacement objVCR = new VrCodeReplacement();

         Flag = HttpUtility.UrlDecode(Flag) ?? "";
        int bNo = Convert.ToInt32(HttpUtility.UrlDecode(BookNo) == "" ? "0" : HttpUtility.UrlDecode(BookNo));
                
        DataTable dt = objVCR.GetInvoiceListByBookNo(Flag,bNo);
        System.IO.StringWriter writer = new System.IO.StringWriter();
        dt.WriteXml(writer, XmlWriteMode.WriteSchema, false);
        return writer.ToString();
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
    public static string GetSLNoOLD(string FLAG, string BOOK_NO, string VOUCHER_NO, string VOU_DATE)
    {
        VrCodeReplacement objVCP = new VrCodeReplacement();

        FLAG = HttpUtility.UrlDecode(FLAG) ?? "";
        int bNo = Convert.ToInt32(HttpUtility.UrlDecode(BOOK_NO) == "" ? "0" : HttpUtility.UrlDecode(BOOK_NO));
        int vNo = Convert.ToInt32(HttpUtility.UrlDecode(VOUCHER_NO) == "" ? "0" : HttpUtility.UrlDecode(VOUCHER_NO));

        DataTable dt = objVCP.GetSLNoOLD( FLAG, bNo,vNo, VOU_DATE);
        System.IO.StringWriter writer = new System.IO.StringWriter();
        dt.WriteXml(writer, XmlWriteMode.WriteSchema, false);
        return writer.ToString();
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
    public static string GetSLCodeOLD(string FLAG, string subLedgerNo, string BOOK_NO, string VOUCHER_NO, string VOU_DATE)
    {
        VrCodeReplacement objVCP = new VrCodeReplacement();
        FLAG = HttpUtility.UrlDecode(FLAG) ?? "";
        int slNO = Convert.ToInt32(HttpUtility.UrlDecode(subLedgerNo) == "" ? "0" : HttpUtility.UrlDecode(subLedgerNo));
        int bNo = Convert.ToInt32(HttpUtility.UrlDecode(BOOK_NO) == "" ? "0" : HttpUtility.UrlDecode(BOOK_NO));
        int vNo = Convert.ToInt32(HttpUtility.UrlDecode(VOUCHER_NO) == "" ? "0" : HttpUtility.UrlDecode(VOUCHER_NO));

        DataTable dt = objVCP.GetSLCodeOLD(FLAG, slNO, bNo, vNo, VOU_DATE);
        System.IO.StringWriter writer = new System.IO.StringWriter();
        dt.WriteXml(writer, XmlWriteMode.WriteSchema, false);
        return writer.ToString();
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
    public static string GetGeneralLedgerNoOLD(string FLAG, string BOOK_NO, string VOUCHER_NO, string VOU_DATE)
    {
        VrCodeReplacement objVCP = new VrCodeReplacement();
        FLAG = HttpUtility.UrlDecode(FLAG) ?? "";
        int bNo = Convert.ToInt32(HttpUtility.UrlDecode(BOOK_NO) == "" ? "0" : HttpUtility.UrlDecode(BOOK_NO));
        int vNo = Convert.ToInt32(HttpUtility.UrlDecode(VOUCHER_NO) == "" ? "0" : HttpUtility.UrlDecode(VOUCHER_NO));
        DataTable dt = objVCP.GetGeneralLedgerNoOLD(FLAG, bNo, vNo, VOU_DATE);
        System.IO.StringWriter writer = new System.IO.StringWriter();
        dt.WriteXml(writer, XmlWriteMode.WriteSchema, false);
        return writer.ToString();
    }
    [WebMethod]
    [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
    public static string GetSLCodeNEW(string SLNO)
    {
        CodeReplacement objCodeReplacement = new CodeReplacement();
        DataTable dt = objCodeReplacement.GetSubLedgerMast(SLNO);
        System.IO.StringWriter writer = new System.IO.StringWriter();
        dt.WriteXml(writer, XmlWriteMode.WriteSchema, false);
        return writer.ToString();
    }


    //get GeneralLedgerNew

    [WebMethod]
    [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
    public static string GetGeneralLedgerNew(string FLAG)
    {
        VrCodeReplacement objVCP = new VrCodeReplacement();
        FLAG = HttpUtility.UrlDecode(FLAG) ?? "";
        System.IO.StringWriter writer = new System.IO.StringWriter();
        DataTable dt = objVCP.GetGeneralLedgerNew(FLAG);
        dt.WriteXml(writer, XmlWriteMode.WriteSchema, false);
        return writer.ToString();
    }


    [WebMethod()]
    public static string SaveVrCodeReplacement(string BookNo, string SLNoOld, string SLCodeOLD, string GeneralLedger_old, 
        string SLNoNew, string SLCodeNew, string GeneralLedger_New, string InvoiceNo, string InvoiceDate)        
        {
        VrCodeReplacement objVrCodeReplacement = new VrCodeReplacement();
        int BNO = Convert.ToInt32(HttpUtility.UrlDecode(BookNo) == "" ? "0" : HttpUtility.UrlDecode(BookNo));
        int SL_NOOLD = Convert.ToInt32(HttpUtility.UrlDecode(SLNoOld) == "" ? "0" : HttpUtility.UrlDecode(SLNoOld));
      string  SL_CODEOLD = HttpUtility.UrlDecode(SLCodeOLD) ?? "";
       string  SL_GENERALOLD = HttpUtility.UrlDecode(GeneralLedger_old) ?? "";
        int SL_NONEW = Convert.ToInt32(HttpUtility.UrlDecode(SLNoNew) == "" ? "0" : HttpUtility.UrlDecode(SLNoNew));
        string SL_CODENEW = HttpUtility.UrlDecode(SLCodeNew) ?? "";
      string  SL_GENERALNEW = HttpUtility.UrlDecode(GeneralLedger_New) ?? "";

        int INVOICENO1 = Convert.ToInt32(HttpUtility.UrlDecode(InvoiceNo) == "" ? "0" : HttpUtility.UrlDecode(InvoiceNo));

        string InvoiceDate1 = HttpUtility.UrlDecode(InvoiceDate) ?? "";
        //DateTime? invDt;
        //if (InvoiceDate != "")
        //{
        //    invDt = Utility.GetFormattedDate(InvoiceDate);
        //}
        //else
        //{
        //    invDt = null;
        //}




        string UserId = "";
        string result = "";
        result = Convert.ToString(objVrCodeReplacement.SaveVrCodeReplacement(BNO, SL_NOOLD, SL_CODEOLD, SL_GENERALOLD,
           SL_NONEW, SL_CODENEW, SL_GENERALNEW, INVOICENO1, InvoiceDate1, UserId));
        return result;
    }












}
