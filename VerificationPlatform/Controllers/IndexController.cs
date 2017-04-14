using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VerificationPlatform.Common;

namespace VerificationPlatform.Controllers
{
    public class IndexController : Controller
    {
        //
        // GET: /Index/

        public ActionResult Index()
        {
            //SmtpHelper.SendMail("智百科技注册验证码", "xiaozhiduo@163.com", "智百科技注册验证码：35465864");
            return View();
        }

        //生成验证码
        public ActionResult ValiCode()
        {
            ValidateCode validateCode = new ValidateCode();
            string code = validateCode.CreateValidateCode(4);
            Session["ValiCode"] = code;
            byte[] bytes = validateCode.CreateValidateGraphic(code);
            return File(bytes, @"image/jpeg");
        }
    }
}
