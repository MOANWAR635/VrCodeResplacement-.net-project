using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SavvyShippingDataFramework;
using System.Data;
using System.Data.SqlClient;

namespace FinanceBusinessFramework
{
     public class VrCodeReplacement  
    {
        List<SqlParameter> objSqlParameterList = null;
        public DataTable GetPMMast(string STTYPE)
        {
            DataTable objTable = null;
            objSqlParameterList = new List<SqlParameter>();
            try
            {
                AddSqlParameter.AddNewParameter(objSqlParameterList, "@STTYPE", STTYPE);
                objTable = SqlDBManager.SelectDataset(objSqlParameterList, "UDSP_GET_PMMAST", CommandType.StoredProcedure, MySqlConnection.DefaultFinance).Tables[0];
            }
            catch (Exception ex)
            {
                // throw ex;
            }
            return objTable;
        }

        public DataTable GetInvoiceListByBookNo(string Flag, int bNo)
        {
            DataTable objTable = null;
            objSqlParameterList = new List<SqlParameter>();

            try
            {
                AddSqlParameter.AddNewParameter(objSqlParameterList, "@FLAG", Flag);
                AddSqlParameter.AddNewParameter(objSqlParameterList, "@BOOK_NO", bNo);
                objTable = SqlDBManager.SelectDataset(objSqlParameterList, "UDSP_GET_VR_CODE_REPLACEMENT", CommandType.StoredProcedure, MySqlConnection.CustomConnectionString).Tables[0];

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return objTable;
        }
    

        public DataTable GetSLNoOLD( string FLAG, int bNo, int vNo,string vouDt)
        {
            DataTable objTable = null;
            objSqlParameterList = new List<SqlParameter>();
            try
            {
                AddSqlParameter.AddNewParameter(objSqlParameterList, "@FLAG", FLAG);
                AddSqlParameter.AddNewParameter(objSqlParameterList, "@BOOK_NO", bNo);
                AddSqlParameter.AddNewParameter(objSqlParameterList, "@VOUCHER_NO", vNo);
                AddSqlParameter.AddNewParameter(objSqlParameterList, "@VOU_DATE", vouDt);


                objTable = SqlDBManager.SelectDataset(objSqlParameterList, "UDSP_GET_VR_CODE_REPLACEMENT", CommandType.StoredProcedure, MySqlConnection.DefaultFinance).Tables[0];
            }
            catch (Exception ex)
            {
                // throw ex;
            }
            return objTable;
        }

       

        public DataTable GetSLCodeOLD(string FLAG, int slNO, int bNo, int vNo, string vouDt)
        
        {
            DataTable objTable = null;
            objSqlParameterList = new List<SqlParameter>();
            try
            {
                AddSqlParameter.AddNewParameter(objSqlParameterList, "@FLAG", FLAG);
                AddSqlParameter.AddNewParameter(objSqlParameterList, "@SL_NO", slNO);
                AddSqlParameter.AddNewParameter(objSqlParameterList, "@BOOK_NO", bNo);
                AddSqlParameter.AddNewParameter(objSqlParameterList, "@VOUCHER_NO", vNo);
                AddSqlParameter.AddNewParameter(objSqlParameterList, "@VOU_DATE", vouDt);


                objTable = SqlDBManager.SelectDataset(objSqlParameterList, "UDSP_GET_VR_CODE_REPLACEMENT", CommandType.StoredProcedure, MySqlConnection.DefaultFinance).Tables[0];
            }
            catch (Exception ex)
            {
                // throw ex;
            }
            return objTable;
        }

         public DataTable GetGeneralLedgerNoOLD(string FLAG, int bNo, int vNo, string vouDt)
        {
            DataTable objTable = null;
            objSqlParameterList = new List<SqlParameter>();
            try
            {
                AddSqlParameter.AddNewParameter(objSqlParameterList, "@FLAG", FLAG);
                AddSqlParameter.AddNewParameter(objSqlParameterList, "@BOOK_NO", bNo);
                AddSqlParameter.AddNewParameter(objSqlParameterList, "@VOUCHER_NO", vNo);
                AddSqlParameter.AddNewParameter(objSqlParameterList, "@VOU_DATE", vouDt);


                objTable = SqlDBManager.SelectDataset(objSqlParameterList, "UDSP_GET_VR_CODE_REPLACEMENT", CommandType.StoredProcedure, MySqlConnection.DefaultFinance).Tables[0];
            }
            catch (Exception ex)
            {
                // throw ex;
            }
            return objTable;
        }



        public DataTable GetGeneralLedgerNew(string FLAG)
        {
            DataTable objTable = null;
            objSqlParameterList = new List<SqlParameter>();
            try
            {
                AddSqlParameter.AddNewParameter(objSqlParameterList, "@FLAG", FLAG);
                objTable = SqlDBManager.SelectDataset(objSqlParameterList, "UDSP_GET_VR_CODE_REPLACEMENT", CommandType.StoredProcedure, MySqlConnection.DefaultFinance).Tables[0];
            }
            catch (Exception ex)
            {
                // throw ex;
            }
            return objTable;
        }

        public int SaveVrCodeReplacement(int BNO, int SL_NOOLD, string SL_CODEOLD, string SL_GENERALOLD,
           int SL_NONEW, string SL_CODENEW, string SL_GENERALNEW, int INVOICENO, string INVOICE_DATE,  string Userid)
        {
            int Result;
            try
            {
                objSqlParameterList = new List<SqlParameter>();
                AddSqlParameter.AddNewParameter(objSqlParameterList, "@BOOK_NO", BNO);
                AddSqlParameter.AddNewParameter(objSqlParameterList, "@SUB_LEGDER_NO_OLD", SL_NOOLD);
                AddSqlParameter.AddNewParameter(objSqlParameterList, "@SUB_LEGDER_CODE_OLD", SL_CODEOLD);
                AddSqlParameter.AddNewParameter(objSqlParameterList, "@GENERAL_LEGDER_CODE_OLD", SL_GENERALOLD);
                AddSqlParameter.AddNewParameter(objSqlParameterList, "@SUB_LEGDER_NO_NEW", SL_NONEW);
                AddSqlParameter.AddNewParameter(objSqlParameterList, "@SUB_LEGDER_CODE_NEW", SL_CODENEW);
                AddSqlParameter.AddNewParameter(objSqlParameterList, "@GENERAL_LEGDER_CODE_NEW", SL_GENERALNEW);
                AddSqlParameter.AddNewParameter(objSqlParameterList, "@INVOICE_NO", INVOICENO);
                AddSqlParameter.AddNewParameter(objSqlParameterList, "@INVOICE_DATE", INVOICE_DATE);
                AddSqlParameter.AddNewParameter(objSqlParameterList, "@USER_ID", Userid);
                Result = Convert.ToInt32(SqlDBManager.SelectScalarData(objSqlParameterList, "UDSP_SAVE_VR_CODE_REPLACEMENT", CommandType.StoredProcedure, MySqlConnection.CustomConnectionString));

            
            }
            catch (Exception ex)
            {
                throw;
            }
            return Result;
        }



    }
}
