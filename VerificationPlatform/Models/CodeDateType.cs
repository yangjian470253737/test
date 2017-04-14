using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace VerificationPlatform.Models
{
    public class CodeDateType
    {
        /// <summary> 
        /// 类型编号  
        /// </summary> 
        [Key]
        [Required]
        [DisplayName("类型编号")]
        public int TypeID { get; set; }
        /// <summary> 
        /// 类型名称  
        /// </summary> 
        [Required]
        [DisplayName("类型名称")]
        [StringLength(10)]
        public string TypeName { get; set; }
        /// <summary> 
        /// 激活时长(Day) 
        /// </summary> 
        [Required]
        [DisplayName("激活时长(Day) ")]
        public int AuthTime { get; set; }
        /// <summary> 
        /// 卡价值
        /// </summary> 
        [Required]
        [DisplayName("卡价值")]
        public double Price { get; set; }
        /// <summary> 
        /// 项目ID
        /// </summary> 
        [Required]
        [DisplayName("所属项目")]
        public int ProjectID { get; set; }
    }
}