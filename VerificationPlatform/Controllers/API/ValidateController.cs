using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http;
using VerificationPlatform.Common;
using VerificationPlatform.Models;

namespace VerificationPlatform.Controllers.API
{
    /// <summary>
    /// 验证接口
    /// </summary>
    public class ValidateController : ApiController
    {
        private ZhiBaiEntities db = new ZhiBaiEntities();
        private string conn = Commons.connection;

        /// <summary>
        /// 验证使用权限
        /// </summary>
        /// <param name="uniqueID">设备唯一ID</param>
        /// <param name="appID">项目AppId</param>
        /// <param name="version">脚本版本号</param>
        /// <param name="resolution">分辨率</param>
        /// <param name="model">型号</param>
        /// <param name="format">返回数据格式（json,xml,lua,|）</param>
        /// <returns>验证信息</returns>
        [HttpGet]
        public HttpResponseMessage AccessValidate(string uniqueID = "", string appID = "", double version = 0, string resolution = "", string model = "", string format = "json")
        {
            string token = Commons.GenToken();//客户端Token
            int allowUse = 1;//是否允许使用
            string message = "";//提示信息
            int doTime = 0;//执行时间
            double sversion = 0;//版本号
            double dayleft = 0;//剩余有效期

            try
            {
                if (String.IsNullOrEmpty(appID) || String.IsNullOrEmpty(uniqueID) || appID.Length != 32)
                {
                    allowUse = 0;
                    message = "请求参数不对，请联系作者！";
                }
                else
                {

                    var device = (from d in db.Devices
                                  join p in db.Projects on d.ProjectID equals p.ProjectID into p_join
                                  from p in p_join.DefaultIfEmpty()
                                  where p.AppID == appID && d.UniqueID == uniqueID
                                  select new { d.DeviceID, d.ExpireDate, d.Effective, p.ProjectID, ProjectName = p.ProjectName, Version = p.Version, P_Effective = p.Effective, TrialTime = p.TrialTime }).ToList();
                    if (device.Count > 0)//项目存在
                    {
                        if (device[0].P_Effective)//项目有效
                        {
                            doTime = device[0].TrialTime;
                            sversion = device[0].Version;
                            dayleft = (device[0].ExpireDate - DateTime.Now).TotalDays < 0 ? 0 : (device[0].ExpireDate - DateTime.Now).TotalDays;

                            if (device.Count > 0)//有记录`
                            {
                                if (device[0].Effective)//有效
                                {
                                    if ((device[0].ExpireDate - DateTime.Now).TotalMinutes > 0)//未过期
                                    {
                                        allowUse = 1;
                                        doTime = 0;
                                    }
                                    else//已过期
                                    {
                                        allowUse = 1;
                                    }
                                }
                                else//被禁用
                                {
                                    allowUse = 0;
                                    message = "您已被禁止使用，请联系作者！";
                                }

                                //修改请求记录
                                SqlHelper.ExecuteNonQuery(conn, CommandType.Text, "UPDATE dbo.Devices SET LastDate=GETDATE(),LastIP=@IP,Token=@Token,Request=Request+1 WHERE DeviceID=@DeviceID",
                                    new SqlParameter[] { new SqlParameter("@IP", Commons.GetIP()), new SqlParameter("@Token", token), new SqlParameter("@DeviceID", device[0].DeviceID) });
                            }
                            else//无记录,新增
                            {
                                db.Devices.Add(new Device
                                {
                                    UniqueID = uniqueID,
                                    Model = model,
                                    Resolution = resolution,
                                    ProjectID = device[0].ProjectID,
                                    Token = Commons.GenToken(),
                                    CreateDate = DateTime.Now,
                                    ExpireDate = DateTime.Now,
                                    LastDate = DateTime.Now,
                                    LastIP = Commons.GetIP(),
                                    Effective = true,
                                    Request = 1
                                });
                                db.SaveChanges();

                                allowUse = 1;
                            }
                        }
                        else
                        {
                            allowUse = 0;
                            message = "项目已被停止，请联系作者！";
                        }
                    }
                    else//项目不存在
                    {
                        allowUse = 0;
                        message = "项目不存在，请联系作者！";
                    }
                }
            }
            catch (Exception ex)
            {
                string path = HttpContext.Current.Server.MapPath("") + "\\Logs\\ValidateError.txt";
                StreamWriter sw = File.AppendText(path);
                sw.Write("错误时间:" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + "\r\n链接：" + Request.RequestUri + "\r\n信息：" + ex.Message + "\r\n=========================================================\r\n");
                sw.Close();

                allowUse = 0;
                message = "服务器出现异常，请联系验证平台！";
            }

            StringBuilder sb = new StringBuilder();
            format = format.ToLower();
            if (format == "json")
            {
                sb.Append("{\"AllowUse\":" + allowUse + ",");
                sb.Append("\"DoTime\":" + doTime + ",");
                sb.Append("\"Dayleft\":" + dayleft + ",");
                sb.Append("\"Sversion\":" + sversion + ",");
                sb.Append("\"Token\":\"" + token + "\",");
                sb.Append("\"Message\":\"" + message + "\"}");
            }
            else if (format == "xml")
            {
                sb.Append("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
                sb.Append("<AllowUse>" + allowUse + "</AllowUse>");
                sb.Append("<DoTime>" + doTime + "</DoTime>");
                sb.Append("<Dayleft>" + dayleft + "</Dayleft>");
                sb.Append("<Sversion>" + sversion + "</Sversion>");
                sb.Append("<Token>" + token + "</Token>");
                sb.Append("<Message>" + message + "</Message>");
            }
            else if (format == "lua")
            {
                sb.Append("AllowUse=" + allowUse + ";");
                sb.Append("DoTime=" + doTime + ";");
                sb.Append("Dayleft=" + dayleft + ";");
                sb.Append("Sversion=" + sversion + ";");
                sb.Append("Token=\"" + token + "\";");
                sb.Append("Message=\"" + message + "\";");
            }
            else if (format == "|")
            {
                sb.Append(String.Format("{0}|{1}|{2}|{3}|{4}|{5}", allowUse, doTime, dayleft, sversion, token, message));
            }
            else
            {
                sb.Append("format格式错误！");
            }

            HttpResponseMessage responseMessage = new HttpResponseMessage { Content = new StringContent(sb.ToString(), Encoding.GetEncoding("UTF-8"), "text/plain") };
            return responseMessage;
        }

        /// <summary>
        /// 心跳验证
        /// </summary>
        /// <param name="uniqueID">设备唯一ID</param>
        /// <param name="appID">项目AppId</param>
        /// <param name="token">token</param>
        /// <param name="format">返回数据格式</param>
        /// <returns>验证信息</returns>
        [HttpGet]
        public HttpResponseMessage HeartPacket(string uniqueID = "", string appID = "", string token = "", string format = "json")
        {
            int valid = 0;
            string message = "";

            if (String.IsNullOrEmpty(uniqueID) || String.IsNullOrEmpty(token) || token.Length != 32)
            {
                valid = 0;
                message = "请求参数不对，请联系作者！";
            }
            else
            {
                var device = (from d in db.Devices
                              join p in db.Projects on d.ProjectID equals p.ProjectID into p_join
                              from p in p_join.DefaultIfEmpty()
                              where d.UniqueID == uniqueID && d.Token == token && p.AppID == appID
                              select new { d.DeviceID }).ToList();
                if (device.Count > 0)
                {
                    valid = 1;
                    message = "Token有效";
                }
            }

            StringBuilder resault = new StringBuilder();
            format = format.ToLower();
            if (format == "json")
            {
                resault.Append("{\"Valid\":" + valid + ",");
                resault.Append("\"Message\":\"" + message + "\"}");
            }
            else if (format == "xml")
            {
                resault.Append("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
                resault.Append("<Valid>" + valid + "</Valid>");
                resault.Append("<Message>" + message + "</Message>");
            }
            else if (format == "lua")
            {
                resault.Append("Valid=" + valid + ";");
                resault.Append("Message=\"" + message + "\";");
            }
            else if (format == "|")
            {
                resault.Append(String.Format("{0}|{1}", valid, message));
            }
            else
            {
                resault.Append("format格式错误！");
            }

            HttpResponseMessage responseMessage = new HttpResponseMessage { Content = new StringContent(resault.ToString(), Encoding.GetEncoding("UTF-8"), "text/plain") };
            return responseMessage;
        }

        /// <summary>
        /// 获取用户注册信息
        /// </summary>
        /// <param name="uniqueID">设备唯一ID</param>
        /// <param name="format">项目AppId</param>
        /// <param name="format">返回数据格式</param>
        /// <returns>注册信息</returns>
        [HttpGet]
        public HttpResponseMessage UserInfo(string uniqueID = "", string appID = "", string format = "json")
        {
            var user = (from d in db.Devices
                        join pj in db.Projects on d.ProjectID equals pj.ProjectID into pj_join
                        from pj in pj_join.DefaultIfEmpty()
                        where d.UniqueID == uniqueID && pj.AppID == appID
                        select new
                        {
                            d.DeviceID,
                            pj.ProjectName,
                            d.ExpireDate,
                            d.CreateDate,
                            d.LastDate,
                            d.LastIP,
                            d.Model,
                            d.Resolution,
                            d.Request,
                            pj.Version,
                            d.Effective
                        }).ToList();

            StringBuilder resault = new StringBuilder();
            format = format.ToLower();
            if (String.IsNullOrEmpty(format) || format == "json")
            {
                resault.Append("{\"DeviceID\":" + user[0].DeviceID + ",");
                resault.Append("\"ProjectName\":\"" + user[0].ProjectName + "\",");
                resault.Append("\"ExpireDate\":\"" + user[0].ExpireDate + "\",");
                resault.Append("\"CreateDate\":\"" + user[0].CreateDate + "\",");
                resault.Append("\"LastDate\":\"" + user[0].LastDate + "\",");
                resault.Append("\"LastIP\":\"" + user[0].LastIP + "\",");
                resault.Append("\"Model\":\"" + user[0].Model + "\",");
                resault.Append("\"Resolution\":\"" + user[0].Resolution + "\",");
                resault.Append("\"Request\":" + user[0].Request + ",");
                resault.Append("\"Version\":" + user[0].Version + ",");
                resault.Append("\"Effective\":\"" + user[0].Effective + "\"}");
            }
            else if (format == "xml")
            {
                resault.Append("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
                resault.Append("<DeviceID>" + user[0].DeviceID + "</DeviceID>");
                resault.Append("<ProjectName>" + user[0].ProjectName + "</ProjectName>");
                resault.Append("<ExpireDate>" + user[0].ExpireDate + "</ExpireDate>");
                resault.Append("<CreateDate>" + user[0].CreateDate + "</CreateDate>");
                resault.Append("<LastIP>" + user[0].LastIP + "</LastIP>");
                resault.Append("<Model>" + user[0].Model + "</Model>");
                resault.Append("<Resolution>" + user[0].Resolution + "</Resolution>");
                resault.Append("<Request>" + user[0].Request + "</Request>");
                resault.Append("<Version>" + user[0].Version + "</Version>");
                resault.Append("<Effective>" + user[0].Effective + "</Effective>");
            }
            else if (format == "lua")
            {
                resault.Append("DeviceID=" + user[0].DeviceID + ";");
                resault.Append("ProjectName=" + user[0].ProjectName + ";");
                resault.Append("ExpireDate=" + user[0].ExpireDate + ";");
                resault.Append("CreateDate=" + user[0].CreateDate + ";");
                resault.Append("LastIP=" + user[0].LastIP + ";");
                resault.Append("Model=" + user[0].Model + ";");
                resault.Append("Resolution=" + user[0].Resolution + ";");
                resault.Append("Request=" + user[0].Request + ";");
                resault.Append("Version=" + user[0].Version + ";");
                resault.Append("Effective=" + user[0].Effective + ";");
            }
            else if (format == "|")
            {
                resault.Append(String.Format("{0}|{1}|{2}|{3}|{4}|{5}|{6}|{7}|{8}|{9}", user[0].DeviceID, user[0].ProjectName, user[0].ExpireDate,
                    user[0].CreateDate, user[0].LastIP, user[0].Model, user[0].Resolution, user[0].Request, user[0].Version, user[0].Effective));
            }
            else
            {
                resault.Append("format格式错误！");
            }

            HttpResponseMessage responseMessage = new HttpResponseMessage { Content = new StringContent(resault.ToString(), Encoding.GetEncoding("UTF-8"), "text/plain") };
            return responseMessage;
        }

        /// <summary>
        /// 使用激活码
        /// </summary>
        /// <param name="uniqueID">设备唯一ID</param>
        /// <param name="code">激活码</param>
        /// <param name="format">返回数据格式</param>
        /// <returns>验证信息</returns>
        [HttpGet]
        public HttpResponseMessage ApplyAuthCode(string uniqueID = "", string code = "", string format = "json")
        {
            int valid = 0;
            string message = "";

            if (String.IsNullOrEmpty(uniqueID))
            {
                valid = 0;
                message = "请求参数不对，请联系作者！";
            }
            else
            {
                var authcode = (from cd in db.AuthCodes
                                join dt in db.CodeDateTypes on cd.TypeID equals dt.TypeID into dt_join
                                from dt in dt_join.DefaultIfEmpty()
                                select new
                                {
                                    cd.AuthID,
                                    cd.Code,
                                    cd.Effective,
                                    cd.ProjectID,
                                    dt.AuthTime
                                }).ToList();
                var device = (from tb in db.Devices where tb.UniqueID == uniqueID && tb.ProjectID == authcode[0].ProjectID select tb).ToList();
                if (device.Count > 0)
                {
                    if (authcode.Count > 0)
                    {
                        if (!authcode[0].Effective)
                        {
                            valid = 0;
                            message = "激活码已失效！";
                        }
                        else
                        {
                            DateTime expireDate = DateTime.Now;
                            if ((device[0].ExpireDate - DateTime.Now).TotalMinutes > 0)
                            {
                                expireDate = device[0].ExpireDate.AddDays(authcode[0].AuthTime);
                            }
                            else
                            {
                                expireDate = DateTime.Now.AddDays(authcode[0].AuthTime);
                            }

                            int rs = SqlHelper.ExecuteNonQuery(conn, CommandType.Text, "UPDATE dbo.AuthCodes SET Effective=0,UseDate=@UseDate WHERE AuthID=@AuthID;UPDATE dbo.Devices SET ExpireDate=@ExpireDate WHERE DeviceID=@DeviceID;",
                                new SqlParameter[] { new SqlParameter("@AuthID", authcode[0].AuthID), new SqlParameter("@ExpireDate", expireDate), new SqlParameter("@DeviceID", device[0].DeviceID) });

                            if (rs > 0)
                            {
                                valid = 1;
                                message = String.Format("使用成功，增加了{0}天有效期！", authcode[0].AuthTime);
                            }
                        }
                    }
                    else
                    {
                        valid = 0;
                        message = "激活码无效！";
                    }
                }
                else
                {
                    valid = 0;
                    message = "设备尚未使用过，无法使用激活码！";
                }
            }

            StringBuilder resault = new StringBuilder();
            format = format.ToLower();
            if (format == "json")
            {
                resault.Append("{\"Valid\":" + valid + ",");
                resault.Append("\"Message\":\"" + message + "\"}");
            }
            else if (format == "xml")
            {
                resault.Append("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
                resault.Append("<Valid>" + valid + "</Valid>");
                resault.Append("<Message>" + message + "</Message>");
            }
            else if (format == "lua")
            {
                resault.Append("Valid=" + valid + ";");
                resault.Append("Message=\"" + message + "\";");
            }
            else if (format == "|")
            {
                resault.Append(String.Format("{0}|{1}", valid, message));
            }
            else
            {
                resault.Append("format格式错误！");
            }

            HttpResponseMessage responseMessage = new HttpResponseMessage { Content = new StringContent(resault.ToString(), Encoding.GetEncoding("UTF-8"), "text/plain") };
            return responseMessage;
        }

    }
}
