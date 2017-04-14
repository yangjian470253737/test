using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace VerificationPlatform.Models
{
    public class LoginHistory
    {
        /// <summary> 
        /// 编号  
        /// </summary> 
        [Key]
        [Required]
        [DisplayName("编号")]
        public int LoginID { get; set; }
        /// <summary> 
        /// 用户ID
        /// </summary> 
        [Required]
        [DisplayName("用户ID")]
        public int UserID { get; set; }
        /// <summary> 
        /// IP
        /// </summary> 
        [Required]
        [DisplayName("IP")]
        [StringLength(40)]
        public string IP { get; set; }
        /// <summary> 
        /// 登录时间
        /// </summary> 
        [Required]
        [DisplayName("登录时间")]
        public string LoginTime { get; set; }
    }
}