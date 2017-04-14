using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace VerificationPlatform.Models
{
    /// <summary>
    /// 用户(作者)表
    /// </summary>
    public class User
    {
        /// <summary> 
        /// 用户编号  
        /// </summary> 
        [Key]
        [Required]
        [DisplayName("用户编号")]
        public int UserID { get; set; }
        /// <summary> 
        /// 用户名  
        /// </summary> 
        [Required]
        [DisplayName("用户名")]
        [StringLength(20)]
        public string UserName { get; set; }
        /// <summary> 
        /// 昵称  
        /// </summary> 
        [Required]
        [DisplayName("昵称")]
        [StringLength(20)]
        public string NickName { get; set; }
        /// <summary> 
        /// 密码  
        /// </summary> 
        [Required]
        [DisplayName("密码")]
        [StringLength(32)]
        public string UserPass { get; set; }
        /// <summary> 
        /// 令牌  
        /// </summary> 
        [Required]
        [DisplayName("令牌")]
        [StringLength(32)]
        public string Token { get; set; }
        /// <summary> 
        /// 邮箱  
        /// </summary> 
        [Required]
        [DisplayName("邮箱")]
        [StringLength(50)]
        public string Email { get; set; }
        /// <summary> 
        /// 注册时间  
        /// </summary> 
        [Required]
        [DisplayName("注册时间")]
        public DateTime RegTime { get; set; }
        /// <summary> 
        /// 是否有效  
        /// </summary> 
        [Required]
        [DisplayName("是否有效")]
        public bool Effective { get; set; }
    }
}