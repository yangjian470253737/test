using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VerificationPlatform.Common;
using VerificationPlatform.Models;

namespace VerificationPlatform.Controllers.API
{
    #region  "POST参数类"

    public class ProjectListObj
    {
        public string token { get; set; }
        public int pindex { get; set; }
        public int pagesize { get; set; }
    }

    public class ProjectObj
    {
        public string token { get; set; }
        public int projectid { get; set; }
        public string pname { get; set; }
        public double version { get; set; }
        public int platformid { get; set; }
        public string remark { get; set; }
        public bool effective { get; set; }
        public int trialTime { get; set; }
    }

    public class DateTypeObj
    {
        public string token { get; set; }
        public int typeid { get; set; }
        public int projectid { get; set; }
        public string typename { get; set; }
        public int day { get; set; }
    }

    #endregion

    /// <summary>
    /// 项目相关接口
    /// </summary>
    public class ProjectController : ApiController
    {
        private ZhiBaiEntities db = new ZhiBaiEntities();
        private string conn = Commons.connection;

        #region "获取项目列表"
        /// <summary>
        /// 获取项目列表
        /// </summary>
        /// <param name="token">令牌</param>
        /// <param name="pindex">页码</param>
        /// <param name="pagesize">每页条数</param>
        /// <returns>项目列表</returns>
        [HttpGet]
        public Dictionary<string, object> GetProjectList(string token, int pindex, int pagesize)
        {
            ProjectListObj obj = new ProjectListObj();
            obj.token = token;
            obj.pindex = pindex;
            obj.pagesize = pagesize;
            return GetProjectList(obj);
        }
        /// <summary>
        /// 获取项目列表
        /// </summary>
        /// <param name="token">令牌</param>
        /// <param name="pindex">页码</param>
        /// <param name="pagesize">每页条数</param>
        /// <returns>项目列表</returns>
        [HttpPost]
        public Dictionary<string, object> GetProjectList(ProjectListObj obj)
        {
            Dictionary<string, object> list = new Dictionary<string, object>();
            var user = (from tb in db.Users where tb.Token == obj.token select new { tb.UserID }).ToList();
            if (user.Count > 0)
            {
                var project = (from p in db.Projects
                               join pt in db.Platforms on p.PlatformID equals pt.PlatformID into pt_join
                               from pt in pt_join.DefaultIfEmpty()
                               where
                                 p.UserID == 1
                               select new
                               {
                                   p.ProjectID,
                                   p.ProjectName,
                                   PlatformName = pt.PlatformName,
                                   p.Version,
                                   p.Remark,
                                   p.CreateDate,
                                   p.Effective
                               }).Skip((obj.pindex - 1) * obj.pagesize).Take(obj.pagesize).ToList();
                list.Add("issuccess", 1);
                list.Add("message", project);
            }
            else
            {
                list.Add("issuccess", 0);
                list.Add("message", "您已在其他设备登录！");
            }
            return list;
        }

        #endregion

        #region "创建项目"
        /// <summary>
        /// 创建项目
        /// </summary>
        /// <param name="token">令牌</param>
        /// <param name="pname">项目名称</param>
        /// <param name="version">版本号</param>
        /// <param name="platformid">平台ID</param>
        /// <param name="remark">描述</param>
        /// <param name="effective">是否有效</param>
        /// <param name="trialTime">未注册可试用时间（秒）</param>
        /// <returns>是否成功</returns>
        [HttpGet]
        public Dictionary<string, object> CreateProject(string token, string pname, double version, int platformid, string remark, bool effective,int trialTime)
        {
            ProjectObj obj = new ProjectObj();
            obj.token = token;
            obj.pname = pname;
            obj.version = version;
            obj.platformid = platformid;
            obj.remark = remark;
            obj.effective = effective;
            obj.trialTime = trialTime;
            
            return CreateProject(obj);
        }
        /// <summary>
        /// 创建项目
        /// </summary>
        /// <param name="token">令牌</param>
        /// <param name="pname">项目名称</param>
        /// <param name="version">版本号</param>
        /// <param name="platformid">平台ID</param>
        /// <param name="remark">描述</param>
        /// <param name="effective">是否有效</param>
        /// <param name="trialTime">未注册可试用时间（秒）</param>
        /// <returns>是否成功</returns>
        [HttpPost]
        public Dictionary<string, object> CreateProject(ProjectObj obj)
        {
            Dictionary<string, object> list = new Dictionary<string, object>();
            var user = (from tb in db.Users where tb.Token == obj.token select new { tb.UserID }).ToList();
            if (user.Count > 0)
            {
                db.Projects.Add(new Project
                {
                    ProjectName = obj.pname,
                    UserID = user[0].UserID,
                    PlatformID = obj.platformid,
                    Remark = obj.remark,
                    TrialTime = obj.trialTime,
                    Effective = obj.effective,
                    CreateDate = DateTime.Now
                });
                list.Add("issuccess", 1);
                list.Add("message", "添加成功！");
            }
            else
            {
                list.Add("issuccess", 0);
                list.Add("message", "您已在其他设备登录！");
            }
            return list;
        }

        #endregion

        #region "修改项目"
        /// <summary>
        /// 修改项目
        /// </summary>
        /// <param name="token">令牌</param>
        /// <param name="projectid">项目ID</param>
        /// <param name="pname">项目名称</param>
        /// <param name="version">版本号</param>
        /// <param name="remark">项目描述</param>
        /// <param name="effective">是否有效</param>
        /// <returns>是否成功</returns>
        [HttpGet]
        public Dictionary<string, object> ModifyProject(string token, int projectid, string pname, double version, string remark, bool effective)
        {
            ProjectObj obj = new ProjectObj();
            obj.token = token;
            obj.pname = pname;
            obj.version = version;
            obj.remark = remark;
            obj.effective = effective;
            return ModifyProject(obj);
        }
        /// <summary>
        /// 修改项目
        /// </summary>
        /// <param name="token">令牌</param>
        /// <param name="projectid">项目ID</param>
        /// <param name="pname">项目名称</param>
        /// <param name="version">版本号</param>
        /// <param name="remark">项目描述</param>
        /// <param name="effective">是否有效</param>
        /// <returns>是否成功</returns>
        [HttpPost]
        public Dictionary<string, object> ModifyProject(ProjectObj obj)
        {
            Dictionary<string, object> list = new Dictionary<string, object>();
            var user = (from tb in db.Users where tb.Token == obj.token select new { tb.UserID }).ToList();
            if (user.Count > 0)
            {
                var project = (from tb in db.Projects where tb.ProjectID == obj.projectid && tb.UserID == user[0].UserID select tb);
                foreach (var pj in project)
                {
                    pj.ProjectName = obj.pname;
                    pj.Remark = obj.remark;
                    pj.PlatformID = obj.platformid;
                    pj.Version = obj.version;
                    pj.Effective = obj.effective;
                }
                db.SaveChanges();

                list.Add("issuccess", 1);
                list.Add("message", "修改成功！");
            }
            else
            {
                list.Add("issuccess", 0);
                list.Add("message", "您已在其他设备登录！");
            }
            return list;
        }

        #endregion

        #region "删除项目"
        /// <summary>
        /// 删除项目
        /// </summary>
        /// <param name="token">令牌</param>
        /// <param name="projectid">项目ID</param>
        /// <returns>是否成功</returns>
        [HttpGet]
        public Dictionary<string, object> DeleteProject(string token, int projectid)
        {
            ProjectObj obj = new ProjectObj();
            obj.token = token;
            return DeleteProject(obj);
        }
        /// <summary>
        /// 删除项目
        /// </summary>
        /// <param name="token">令牌</param>
        /// <param name="projectid">项目ID</param>
        /// <returns>是否成功</returns>
        [HttpPost]
        public Dictionary<string, object> DeleteProject(ProjectObj obj)
        {
            Dictionary<string, object> list = new Dictionary<string, object>();
            var user = (from tb in db.Users where tb.Token == obj.token select new { tb.UserID }).ToList();
            if (user.Count > 0)
            {
                int i = SqlHelper.ExecuteNonQuery(conn, CommandType.Text, "DELETE FROM dbo.Projects WHERE ProjectID=@ProjectID AND UserID=@UserID",
                    new SqlParameter[] { new SqlParameter("@ProjectID", obj.projectid), new SqlParameter("@UserID", user[0].UserID) });
                if (i > 0)
                {
                    list.Add("issuccess", 1);
                    list.Add("message", "删除成功！");
                }
                else
                {
                    list.Add("issuccess", 1);
                    list.Add("message", "删除失败！");
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

        #region "获取时间类型列表"
        /// <summary>
        /// 获取时间类型列表
        /// </summary>
        /// <param name="token">令牌</param>
        /// <param name="projectid">项目ID</param>
        /// <returns>时间类型列表</returns>
        [HttpGet]
        public Dictionary<string, object> GetDateType(string token, int projectid)
        {
            DateTypeObj obj = new DateTypeObj();
            obj.token = token;
            obj.projectid = projectid;
            return GetDateType(obj);
        }
        /// <summary>
        /// 获取时间类型列表
        /// </summary>
        /// <param name="token">令牌</param>
        /// <param name="projectid">项目ID</param>
        /// <returns>时间类型列表</returns>
        [HttpPost]
        public Dictionary<string, object> GetDateType(DateTypeObj obj)
        {
            Dictionary<string, object> list = new Dictionary<string, object>();
            var user = (from tb in db.Users where tb.Token == obj.token select new { tb.UserID }).ToList();
            if (user.Count > 0)
            {
                var types = (from dt in db.CodeDateTypes
                             join pj in db.Projects on dt.ProjectID equals pj.ProjectID into pj_join
                             from pj in pj_join.DefaultIfEmpty()
                             join u in db.Users on pj.UserID equals u.UserID into u_join
                             from u in u_join.DefaultIfEmpty()
                             where
                               pj.UserID == user[0].UserID &&
                               dt.ProjectID == obj.projectid
                             select new
                             {
                                 dt.TypeID,
                                 dt.TypeName
                             }).ToList();
            }
            else
            {
                list.Add("issuccess", 0);
                list.Add("message", "您已在其他设备登录！");
            }
            return list;
        }

        #endregion

        #region "增加时间类型"
        /// <summary>
        /// 增加时间类型
        /// </summary>
        /// <param name="token">令牌</param>
        /// <param name="typename">类型名称</param>
        /// <param name="day">天数</param>
        /// <param name="projectid">项目ID</param>
        /// <returns>是否成功</returns>
        [HttpGet]
        public Dictionary<string, object> CreateDateType(string token, string typename, int day, int projectid)
        {
            DateTypeObj obj = new DateTypeObj();
            obj.token = token;
            obj.typename = typename;
            obj.day = day;
            obj.projectid = projectid;

            return CreateDateType(obj);
        }
        /// <summary>
        /// 增加时间类型
        /// </summary>
        /// <param name="token">令牌</param>
        /// <param name="typename">类型名称</param>
        /// <param name="day">天数</param>
        /// <param name="projectid">项目ID</param>
        /// <returns>是否成功</returns>
        [HttpPost]
        public Dictionary<string, object> CreateDateType(DateTypeObj obj)
        {
            Dictionary<string, object> list = new Dictionary<string, object>();
            var user = (from tb in db.Users where tb.Token == obj.token select new { tb.UserID }).ToList();
            if (user.Count > 0)
            {
                var project = (from tb in db.Projects where tb.UserID == user[0].UserID && tb.ProjectID == obj.projectid select tb).ToList();
                if (project.Count > 0)
                {
                    //db.CodeDateTypes.Add(new CodeDateType { TypeName = obj.typename, AuthTime = obj.day, ProjectID = obj.projectid });
                    list.Add("issuccess", 1);
                    list.Add("message", "添加成功！");
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

        #region "删除时间类型"
        /// <summary>
        /// 删除时间类型
        /// </summary>
        /// <param name="token">令牌</param>
        /// <param name="typeid">时间类型ID</param>
        /// <returns>是否成功</returns>
        [HttpGet]
        public Dictionary<string, object> DeleteDateType(string token, int typeid)
        {
            DateTypeObj obj = new DateTypeObj();
            obj.token = token;
            obj.typeid = typeid;

            return DeleteDateType(obj);
        }
        /// <summary>
        /// 删除时间类型
        /// </summary>
        /// <param name="token">令牌</param>
        /// <param name="typeid">时间类型ID</param>
        /// <returns>是否成功</returns>
        [HttpPost]
        public Dictionary<string, object> DeleteDateType(DateTypeObj obj)
        {
            Dictionary<string, object> list = new Dictionary<string, object>();
            var user = (from tb in db.Users where tb.Token == obj.token select new { tb.UserID }).ToList();
            if (user.Count > 0)
            {
                int i = SqlHelper.ExecuteNonQuery(conn, CommandType.Text, @"DELETE FROM dbo.CodeDateTypes WHERE TypeID=(SELECT TOP 1 dt.TypeID FROM dbo.CodeDateTypes AS dt LEFT JOIN dbo.Projects AS pj ON pj.ProjectID = dt.ProjectID
                        LEFT JOIN dbo.Users AS u ON u.UserID = pj.UserID WHERE u.UserID=@UserID AND dt.TypeID=@TypeID)", new SqlParameter[] { new SqlParameter("@TypeID", obj.typeid), new SqlParameter("@UserID", user[0].UserID) });
                if (i > 0)
                {
                    list.Add("issuccess", 1);
                    list.Add("message", "删除成功！");
                }
                else
                {
                    list.Add("issuccess", 0);
                    list.Add("message", "删除失败！");
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

    }
}
