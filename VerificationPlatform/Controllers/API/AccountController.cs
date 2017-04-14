using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using VerificationPlatform.Common;
using VerificationPlatform.Models;

namespace VerificationPlatform.Controllers.API
{
    #region  "POST参数类"

    public class SendEmailObj
    {
        public string email { get; set; }
    }

    public class RegisterObj
    {
        public string username { get; set; }
        public string userpass { get; set; }
        public string email { get; set; }
        public string valicode { get; set; }
    }

    public class LoginObj
    {
        public string username { get; set; }
        public string userpass { get; set; }
        public string valicode { get; set; }
    }

    #endregion

    /// <summary>
    /// 账号相关接口
    /// </summary>
    public class AccountController : ApiController
    {
        private ZhiBaiEntities db = new ZhiBaiEntities();
        private string conn = Commons.connection;

        #region "发送邮箱验证码"

        /// <summary>
        /// 发送邮箱验证码
        /// </summary>
        /// <param name="email">email</param>
        /// <returns>成功或失败</returns>
        [HttpGet]
        public Dictionary<string, object> SendEmailCode(string email)
        {
            SendEmailObj obj = new SendEmailObj();
            obj.email = email;
            return SendEmailCode(obj);
        }

        /// <summary>
        /// 发送邮箱验证码
        /// </summary>
        /// <param name="email">email</param>
        /// <returns>成功或失败</returns>
        [HttpPost]
        public Dictionary<string, object> SendEmailCode(SendEmailObj obj)
        {
            Dictionary<string, object> list = new Dictionary<string, object>();
            string valicode = new Random().Next(100000, 999999).ToString();
            try
            {
                SqlHelper.ExecuteNonQuery(conn, CommandType.Text, "UPDATE dbo.EmailCodes SET Effective=0 WHERE Email=@Email", new SqlParameter[] { new SqlParameter("@Email", obj.email) });
                SmtpHelper.SendMail("智百交易验证平台注册验证码", obj.email, String.Format("亲爱的用户，您的验证码为:{0}，请在30分钟内使用！", valicode));
                db.EmailCodes.Add(new EmailCode { Code = valicode, Email = obj.email, ExpireDate = DateTime.Now.AddMinutes(30), Effective = true });
                db.SaveChanges();
                list.Add("issuccess", 1);
                list.Add("message", "发送成功！");
            }
            catch (Exception ex)
            {
                list.Add("issuccess", 0);
                list.Add("message", ex.Message);
            }
            return list;
        }

        #endregion

        #region "注册账号"
        /// <summary>
        /// 注册账号
        /// </summary>
        /// <param name="username">用户名</param>
        /// <param name="userpass">密码</param>
        /// <param name="email">邮箱</param>
        /// <param name="valicode">验证码</param>
        /// <returns>是否成功</returns>
        [HttpGet]
        public Dictionary<string, object> Register(string username, string userpass, string email, string valicode)
        {
            RegisterObj obj = new RegisterObj();
            obj.username = username.ToLower();
            obj.userpass = userpass;
            obj.email = email.ToLower();
            obj.valicode = valicode;

            return Register(obj);
        }
        /// <summary>
        /// 注册账号
        /// </summary>
        /// <param name="username">用户名</param>
        /// <param name="userpass">密码</param>
        /// <param name="email">邮箱</param>
        /// <param name="valicode">验证码</param>
        /// <returns>是否成功</returns>
        [HttpPost]
        public Dictionary<string, object> Register(RegisterObj obj)
        {
            Dictionary<string, object> list = new Dictionary<string, object>();
            try
            {
                if (obj.valicode.ToLower() != (HttpContext.Current.Session["ValiCode"] ?? "").ToString())
                {
                    list.Add("issuccess", 0);
                    list.Add("message", "验证码不正确！");
                    return list;
                }
                var user = (from users in db.Users
                            where
                              users.UserName == obj.username ||
                              (Convert.ToString((users.Email ?? "")) != "" &&
                              users.Email == obj.email)
                            select new
                            {
                                users.UserName,
                                users.Email,
                            }).ToList();

                if (user.Count > 0)
                {
                    if (user[0].UserName == obj.username)
                    {
                        list.Add("issuccess", 0);
                        list.Add("message", "用户名已存在！");
                    }
                    else
                    {
                        list.Add("issuccess", 0);
                        list.Add("message", "邮箱已存在！");
                    }
                }
                else
                {
                    string pwd = Commons.MD5(obj.userpass);
                    string token = Commons.GenToken();
                    db.Users.Add(new User { UserName = obj.username, Email = obj.email, UserPass = pwd, NickName = "", Token = token, Effective = true });
                    list.Add("issuccess", 1);
                    list.Add("message", "成功！");
                }
            }
            catch (Exception ex)
            {
                list.Add("issuccess", 0);
                list.Add("message", ex.Message);
            }

            return list;
        }

       
        #endregion

        #region "登录账号"
        /// <summary>
        /// 登录账号
        /// </summary>
        /// <param name="username">用户名</param>
        /// <param name="userpass">密码</param>
        /// <param name="valicode">验证码</param>
        /// <returns>失败信息或Token</returns>
        [HttpGet]
        public Dictionary<string, object> Login(string username, string userpass, string valicode)
        {
            LoginObj obj = new LoginObj();
            obj.username = username.ToLower();
            obj.userpass = userpass;
            obj.valicode = valicode;

            return Login(obj);
        }
        /// <summary>
        /// 登录账号
        /// </summary>
        /// <param name="username">用户名</param>
        /// <param name="userpass">密码</param>
        /// <param name="valicode">验证码</param>
        /// <returns>失败信息或Token</returns>
        [HttpPost]
        public Dictionary<string, object> Login(LoginObj obj)
        {
            Dictionary<string, object> list = new Dictionary<string, object>();
            try
            {
                string scode = (HttpContext.Current.Session["ValiCode"] ?? "").ToString().ToLower();
                if (obj.valicode.ToLower() != scode)
                {
                    list.Add("issuccess", 0);
                    list.Add("message", scode + "验证码不正确！");
                    return list;
                }
                var user = (from users in db.Users
                            where
                              users.UserName == "aa" &&
                              users.UserPass == "aa"
                            select new
                            {
                                users.UserID,
                                users.UserName,
                                users.NickName,
                                users.Email,
                                users.Effective
                            }).ToList();
                if (user.Count > 0)
                {
                    if (user[0].Effective)
                    {
                        string token = Commons.GenToken();
                        SqlHelper.ExecuteNonQuery(conn, CommandType.Text, "UPDATE dbo.Users SET Token=@Token WHERE UserID=@UserID",
                            new SqlParameter[] { new SqlParameter("@Token", token), new SqlParameter("@UserID", user[0].UserID) });

                        HttpContext.Current.Session["UserID"] = user[0].UserID;
                        HttpContext.Current.Session["UserName"] = user[0].UserName;
                        HttpContext.Current.Session["NickName"] = user[0].NickName;
                        HttpContext.Current.Session["Email"] = user[0].Email;
                        list.Add("issuccess", 1);
                        list.Add("message", token);
                    }
                    else
                    {
                        list.Add("issuccess", 0);
                        list.Add("message", "您的账户已被禁用，请联系管理员！");
                    }
                }
                else
                {
                    list.Add("issuccess", 0);
                    list.Add("message", "用户名或密码错误！");
                }
            }
            catch (Exception ex)
            {
                list.Add("issuccess", 0);
                list.Add("message", ex.Message);
            }

            return list;
        }

        #endregion

    }
}
