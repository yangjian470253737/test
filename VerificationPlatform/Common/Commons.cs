using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Security;
using VerificationPlatform.Models;

namespace VerificationPlatform.Common
{
    public class Commons
    {
        public static string connection = ConfigurationManager.ConnectionStrings["ZhiBaiConnection"].ConnectionString;

        /// MD5加密
        /// </summary>
        /// <param name="input">需要加密的字符串</param>
        /// <returns></returns>
        public static string MD5(string input)
        {
            return FormsAuthentication.HashPasswordForStoringInConfigFile(input, "MD5").ToUpper();
        }

        /// <summary>
        /// Base64加密
        /// </summary>
        /// <param name="input">需要加密的字符串</param>
        /// <returns></returns>
        public static string Base64(string input)
        {
            return Convert.ToBase64String(new UTF8Encoding().GetBytes(input));
        }

        /// <summary>
        /// 生成一个Token
        /// </summary>
        /// <returns></returns>
        public static string GenToken()
        {
            return MD5(Guid.NewGuid().ToString()); 
        }

        /// <summary>
        /// 生成AuthCode(8位可生成27427457组)
        /// </summary>
        /// <returns></returns>
        public static ArrayList GenAuthCode(int num)
        {
            ZhiBaiEntities db = new ZhiBaiEntities();
            var max = (from tb in db.MaxAuthCodes select tb).ToList()[0].MaxCode;
            int rs = SqlHelper.ExecuteNonQuery(connection, CommandType.Text, "UPDATE dbo.MaxAuthCodes SET MaxCode=@MaxCode",
                new SqlParameter[] { new SqlParameter("@MaxCode", max + 100000 * num) });
            ArrayList codelist = new ArrayList();
            for (int i = 0; i < num; i++)
            {
                codelist.Add(Converter.ParseHex(max + i * 100000 + new Random().Next(10000, 99999)));
            }

            return codelist;
        }

        /// <summary>
        /// 获取访问IP
        /// </summary>
        /// <returns></returns>
        public static string GetIP()
        {
            string ip = "";
            try
            {
                if (HttpContext.Current.Request.ServerVariables["HTTP_VIA"] != null)
                {
                    ip = HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"].ToString();
                }
                else
                {
                    ip = HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"].ToString();
                }
            }
            catch
            {
                return "";
            }
            return ip;
        }

        /// <summary>
        /// //获取IP所在地
        /// </summary>
        /// <param name="ip"></param>
        /// <returns></returns>
        public static string GetLocation(string ip)
        {
            try
            {
                string strBuff = "";
                HttpWebRequest webRequest = (HttpWebRequest)WebRequest.Create(String.Format("https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php?resource_id=6006&query={0}", ip));
                HttpWebResponse webResponse = (HttpWebResponse)webRequest.GetResponse();
                Stream stream = webResponse.GetResponseStream();
                StreamReader reader = new StreamReader(stream, System.Text.Encoding.GetEncoding("GB2312"));
                strBuff = reader.ReadToEnd();
                JObject json = JObject.Parse(strBuff);
                JToken data = json["data"];
                string location = data[0]["location"].ToString();

                return location;
            }
            catch
            {
                return "";
            }
        }


    }
}