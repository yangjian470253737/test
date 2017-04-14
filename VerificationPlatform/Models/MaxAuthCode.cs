using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace VerificationPlatform.Models
{
    public class MaxAuthCode
    {
        /// <summary> 
        /// 编号  
        /// </summary> 
        [Key]
        [Required]
        [DisplayName("编号")]
        public int ID { get; set; }
        /// <summary> 
        /// 最大激活码Int  
        /// </summary> 
        [Required]
        [DisplayName("最大激活码Int")]
        public long MaxCode { get; set; }
    }
}