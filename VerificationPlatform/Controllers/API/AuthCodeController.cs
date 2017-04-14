using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VerificationPlatform.Models;
using VerificationPlatform.Common;
using System.Collections;

namespace VerificationPlatform.Controllers.API
{
    #region  "POST参数类"

    public class AuthCodeListObj
    {
        public string token { get; set; }
        public int projectID { get; set; }
        public bool effective { get; set; }
        public string code { get; set; }
        public int deviceID { get; set; }
        public string uniqueID { get; set; }
        public int pindex { get; set; }
        public int pagesize { get; set; }
    }

    public class GenAuthCodeObj
    {
        public string token { get; set; }
        public int projectID { get; set; }
        public int typeid { get; set; }
        public int num { get; set; }
    }

    public class AuthCodeObj
    {
        public int projectid { get; set; }
        public string token { get; set; }
        public string pname { get; set; }
        public double version { get; set; }
        public int platformid { get; set; }
        public string remark { get; set; }
        public bool effective { get; set; }
    }

    #endregion

    /// <summary>
    /// 激活码相关接口
    /// </summary>
    public class AuthCodeController : ApiController
    {
        private ZhiBaiEntities db = new ZhiBaiEntities();
        private string conn = Commons.connection;

        #region "获取激活码列表"
        /// <summary>
        /// 获取激活码列表
        /// </summary>
        /// <param name="token">令牌</param>
        /// <param name="projectID">项目ID</param>
        /// <param name="effective">是否有效,2全部,1有效,0无效</param>
        /// <param name="code">激活码</param>
        /// <param name="deviceID">设备ID</param>
        /// <param name="uniqueID">设备唯一ID</param>
        /// <param name="pindex">页码</param>
        /// <param name="pagesize">每页条数</param>
        /// <returns>激活码列表</returns>
        [HttpGet]
        public Dictionary<string, object> GetAuthCodeList(string token, int projectID, bool effective, string code, int deviceID, string uniqueID, int pindex, int pagesize)
        {
            AuthCodeListObj obj = new AuthCodeListObj();
            obj.token = token;
            obj.projectID = projectID;
            obj.effective = effective;
            obj.code = code;
            obj.deviceID = deviceID;
            obj.uniqueID = uniqueID;
            obj.pindex = pindex;
            obj.pagesize = pagesize;
            return GetAuthCodeList(obj);
        }
        /// <summary>
        /// 获取激活码列表
        /// </summary>
        /// <param name="token">令牌</param>
        /// <param name="projectID">项目ID</param>
        /// <param name="effective">是否有效,2全部,1有效,0无效</param>
        /// <param name="code">激活码</param>
        /// <param name="deviceID">设备ID</param>
        /// <param name="uniqueID">设备唯一ID</param>
        /// <param name="pindex">页码</param>
        /// <param name="pagesize">每页条数</param>
        /// <returns>激活码列表</returns>
        [HttpPost]
        public Dictionary<string, object> GetAuthCodeList(AuthCodeListObj obj)
        {
            Dictionary<string, object> list = new Dictionary<string, object>();
            var user = (from tb in db.Users where tb.Token == obj.token select new { tb.UserID }).ToList();
            if (user.Count > 0)
            {
                var codes = (from ac in db.AuthCodes
                             join pj in db.Projects on ac.ProjectID equals pj.ProjectID into pj_join
                             from pj in pj_join.DefaultIfEmpty()
                             join pt in db.Platforms on pj.PlatformID equals pt.PlatformID into pt_join
                             from pt in pt_join.DefaultIfEmpty()
                             join d in db.Devices on ac.DeviceID equals d.DeviceID into d_join
                             from d in d_join.DefaultIfEmpty()
                             join u in db.Users on pj.UserID equals u.UserID into u_join
                             from u in u_join.DefaultIfEmpty()
                             join dt in db.CodeDateTypes on ac.TypeID equals dt.TypeID into dt_join
                             from dt in dt_join.DefaultIfEmpty()
                             where u.UserID == 1 && ac.Effective == obj.effective
                               && (obj.projectID != 0 ? ac.ProjectID == obj.projectID : 1 == 1)
                               && (obj.code.Trim() != "" ? ac.Code.Contains(obj.code) : 1 == 1)
                               && (obj.deviceID != 0 ? ac.DeviceID == obj.deviceID : 1 == 1)
                               && (obj.uniqueID.Trim() != "" ? d.UniqueID.Contains(obj.uniqueID) : 1 == 1)
                             select new
                             {
                                 ac.AuthID,
                                 ac.Code,
                                 dt.AuthTime,
                                 dt.Price,
                                 ac.Effective,
                                 ProjectName = pj.ProjectName,
                                 PlatformName = pt.PlatformName,
                                 UniqueID = d.UniqueID
                             }).Skip((obj.pindex - 1) * obj.pagesize).Take(obj.pagesize).ToList();
                list.Add("issuccess", 1);
                list.Add("message", codes);
            }
            else
            {
                list.Add("issuccess", 0);
                list.Add("message", "您已在其他设备登录！");
            }
            return list;
        }

        #endregion

        #region "批量生成激活码"
        /// <summary>
        /// 批量生成激活码
        /// </summary>
        /// <param name="token">令牌</param>
        /// <param name="projectID">项目ID</param>
        /// <param name="typeid">时间类型ID</param>
        /// <param name="num">数量</param>
        /// <returns>是否成功</returns>
        [HttpGet]
        public Dictionary<string, object> GenAuthCode(string token, int projectID, int typeid, int num)
        {
            GenAuthCodeObj obj = new GenAuthCodeObj();
            obj.token = token;
            obj.projectID = projectID;
            obj.typeid = typeid;
            obj.num = num;
            return GenAuthCode(obj);
        }
        /// <summary>
        /// 批量生成激活码
        /// </summary>
        /// <param name="token">令牌</param>
        /// <param name="projectID">项目ID</param>
        /// <param name="typeid">时间类型ID</param>
        /// <param name="num">数量</param>
        /// <returns>是否成功</returns>
        [HttpPost]
        public Dictionary<string, object> GenAuthCode(GenAuthCodeObj obj)
        {
            Dictionary<string, object> list = new Dictionary<string, object>();
            if (obj.num > 1000)
            {
                list.Add("issuccess", 0);
                list.Add("message", "数量过大！");
                return list;
            }
            var user = (from tb in db.Users where tb.Token == obj.token select new { tb.UserID }).ToList();
            if (user.Count > 0)
            {
                var project = (from tb in db.Projects where tb.UserID == user[0].UserID && tb.ProjectID == obj.projectID select tb).ToList();
                if (project.Count > 0)
                {
                    ArrayList codelist = Commons.GenAuthCode(obj.num);

                    foreach (var item in codelist)
                    {
                        db.AuthCodes.Add(new AuthCode { Code = item.ToString(), Effective = true, ProjectID = obj.projectID, TypeID = obj.typeid });
                    }
                    db.SaveChanges();

                    list.Add("issuccess", 1);
                    list.Add("message", codelist);
                }
                else
                {
                    list.Add("issuccess", 0);
                    list.Add("message", "项目不存在！");
                }
            }
            else
            {
                list.Add("issuccess", 0);
                list.Add("message", "您已在其他设备登录！");
            }
            return list;
        }

        #endregion

        [HttpGet]
        public string GenAuthCode()
        {
            ArrayList codelist = Commons.GenAuthCode(1000);
            string list = "";
            for (int i = 0; i < codelist.Count; i++)
            {
                list += codelist[i].ToString() + "，";
            }

            return list;
        }

        [HttpGet]
        public string MaxCode()
        {
            string list = Converter.ParseInt("10000000").ToString() + "-";
            list += Converter.ParseInt("ZZZZZZZZ").ToString();

            return list;
        }
    }
}
