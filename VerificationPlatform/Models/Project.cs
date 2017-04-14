using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace VerificationPlatform.Models
{
    public class Project
    {
        /// <summary> 
        /// 项目编号  
        /// </summary> 
        [Key]
        [Required]
        [DisplayName("项目编号")]
        public int ProjectID { get; set; }
        /// <summary> 
        /// 项目名称  
        /// </summary> 
        [Required]
        [DisplayName("项目名称")]
        [StringLength(100)]
        public string ProjectName { get; set; }
        /// <summary> 
        /// AppID  
        /// </summary> 
        [Required]
        [DisplayName("AppID")]
        [StringLength(32)]
        public string AppID { get; set; }
        /// <summary> 
        /// 作者ID  
        /// </summary> 
        [Required]
        [DisplayName("作者ID")]
        public int UserID { get; set; }
        /// <summary> 
        /// 平台ID  
        /// </summary> 
        [Required]
        [DisplayName("平台ID")]
        public int PlatformID { get; set; }
        /// <summary> 
        /// 版本号
        /// </summary> 
        [Required]
        [DisplayName("版本号")]
        public double Version { get; set; }
        /// <summary> 
        /// 项目描述
        /// </summary> 
        [Required]
        [DisplayName("项目描述")]
        public string Remark { get; set; }
         /// <summary> 
        /// 试用时长(秒)
        /// </summary> 
        [Required]
        [DisplayName("试用时长(秒)")]
        public int TrialTime { get; set; }
        /// <summary> 
        /// 创建时间
        /// </summary> 
        [Required]
        [DisplayName("创建时间")]
        public DateTime CreateDate { get; set; }
        /// <summary> 
        /// 是否有效  
        /// </summary> 
        [Required]
        [DisplayName("是否有效")]
        public bool Effective { get; set; }
    }
}