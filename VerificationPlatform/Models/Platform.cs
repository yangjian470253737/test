using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace VerificationPlatform.Models
{
    public class Platform
    {
        /// <summary> 
        /// 平台编号
        /// </summary> 
        [Key]
        [Required]
        [DisplayName("平台编号")]
        public int PlatformID { get; set; }
        /// <summary> 
        /// 脚本所属平台  
        /// </summary> 
        [Required]
        [DisplayName("脚本所属平台")]
        [StringLength(30)]
        public string PlatformName { get; set; }
        /// <summary> 
        /// 平台描述  
        /// </summary> 
        [Required]
        [DisplayName("平台描述")]
        public string Remark { get; set; }
    }
}