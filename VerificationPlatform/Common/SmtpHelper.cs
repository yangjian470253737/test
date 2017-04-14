using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Web;

namespace VerificationPlatform.Common
{
    public class SmtpHelper
    {

        public static void SendMail(string title, string address, string body)
        { 
            //简单邮件传输协议类
            SmtpClient client = new SmtpClient();
            client.Host = "smtp.163.com";//邮件服务器
            client.Port = 25;//smtp主机上的端口号,默认是25.
            client.DeliveryMethod = SmtpDeliveryMethod.Network;//邮件发送方式:通过网络发送到SMTP服务器
            client.Credentials = new NetworkCredential("gz_zhibai@163.com", "zhibai123456");//凭证,发件人登录邮箱的用户名和密码

            //电子邮件信息类
            MailAddress fromAddress = new MailAddress("gz_zhibai@163.com", "智百科技");
            MailAddress toAddress = new MailAddress(address, address.Split('@')[0]); 
            MailMessage mailMessage = new MailMessage(fromAddress, toAddress);//创建一个电子邮件类
            mailMessage.Subject = title;
            mailMessage.Body = body;//可为html格式文本
            mailMessage.SubjectEncoding = Encoding.UTF8;//邮件主题编码
            mailMessage.BodyEncoding =Encoding.GetEncoding("GB2312");//邮件内容编码
            mailMessage.IsBodyHtml = true;//邮件内容是否为html格式
            mailMessage.Priority = MailPriority.High;//邮件的优先级,有三个值:高(在邮件主题前有一个红色感叹号,表示紧急),低(在邮件主题前有一个蓝色向下箭头,表示缓慢),正常(无显示).
            try
            {
                client.Send(mailMessage);//发送邮件
                //client.SendAsync(mailMessage, "ojb");异步方法发送邮件,不会阻塞线程.
            }
            catch (Exception)
            {

            }
        }
    }
}