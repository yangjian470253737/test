using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace VerificationPlatform.Models
{
    public class EmailCode
    {
        /// <summary> 
        /// 验证码编号  
        /// </summary> 
        [Key]
        [Required]
        [DisplayName("验证码编号")]
        public int CodeID { get; set; }
        /// <summary> 
        /// 邮箱  
        /// </summary> 
        [Required]
        [DisplayName("邮箱")]
        [StringLength(50)]
        public string Email { get; set; }
        /// <summary> 
        /// 验证码
        /// </summary> 
        [Required]
        [DisplayName("验证码")]
        [StringLength(10)]
        public string Code { get; set; }
        /// <summary> 
        /// 过期时间
        /// </summary> 
        [Required]
        [DisplayName("过期时间")]
        public DateTime ExpireDate { get; set; }
        /// <summary> 
        /// 是否有效  
        /// </summary> 
        [Required]
        [DisplayName("是否有效")]
        public bool Effective { get; set; }
    }
}