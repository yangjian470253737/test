using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace VerificationPlatform.Models
{
    public class AuthCode
    {
        /// <summary> 
        /// 激活码编号  
        /// </summary> 
        [Key]
        [Required]
        [DisplayName("激活码编号")]
        public int AuthID { get; set; }
        /// <summary> 
        /// 激活码  
        /// </summary> 
        [Required]
        [DisplayName("激活码")]
        [StringLength(32)]
        public string Code { get; set; }
        /// <summary> 
        /// 时间类型ID
        /// </summary> 
        [Required]
        [DisplayName("时间类型ID")]
        public int TypeID { get; set; }
        /// <summary> 
        /// 所属项目
        /// </summary> 
        [Required]
        [DisplayName("所属项目")]
        public int ProjectID { get; set; }
        /// <summary> 
        /// 使用者
        /// </summary> 
        [Required]
        [DisplayName("使用者")]
        public int DeviceID { get; set; }
        /// <summary> 
        /// 生成时间
        /// </summary> 
        [Required]
        [DisplayName("生成时间")]
        public DateTime CreateDate { get; set; }
        /// <summary> 
        /// 使用时间
        /// </summary> 
        [Required]
        [DisplayName("使用时间")]
        public DateTime UseDate { get; set; }
        /// 是否有效  
        /// </summary> 
        [Required]
        [DisplayName("是否有效")]
        public bool Effective { get; set; }
    }
}