using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace VerificationPlatform.Models
{
    public class Device
    {
        /// <summary> 
        /// 设备编号
        /// </summary> 
        [Key]
        [Required]
        [DisplayName("设备编号")]
        public int DeviceID { get; set; }
        /// <summary> 
        /// 用户备注  
        /// </summary> 
        [Required]
        [DisplayName("用户备注")]
        [StringLength(200)]
        public string Remark { get; set; }
        /// <summary> 
        /// 设备唯一标识  
        /// </summary> 
        [Required]
        [DisplayName("设备唯一标识")]
        [StringLength(32)]
        public string UniqueID { get; set; }
        /// <summary> 
        /// 机型  
        /// </summary> 
        [Required]
        [DisplayName("机型")]
        [StringLength(32)]
        public string Model { get; set; }
        /// <summary> 
        /// 分辨率  
        /// </summary> 
        [Required]
        [DisplayName("分辨率")]
        [StringLength(32)]
        public string Resolution { get; set; }
        /// <summary> 
        /// 所属项目
        /// </summary> 
        [Required]
        [DisplayName("所属项目")]
        public int ProjectID { get; set; }
        /// <summary> 
        /// 用户Token  
        /// </summary> 
        [Required]
        [DisplayName("Token")]
        [StringLength(32)]
        public string Token { get; set; }
        /// <summary> 
        /// 创建时间
        /// </summary> 
        [Required]
        [DisplayName("创建时间")]
        public DateTime CreateDate { get; set; }
        /// <summary> 
        /// 有效日期
        /// </summary> 
        [Required]
        [DisplayName("有效日期")]
        public DateTime ExpireDate { get; set; }
        /// <summary> 
        /// 最后使用时间
        /// </summary> 
        [Required]
        [DisplayName("最后使用时间")]
        public DateTime LastDate { get; set; }
        /// <summary> 
        /// 最后使用IP
        /// </summary> 
        [Required]
        [DisplayName("最后使用IP")]
        [StringLength(40)]
        public string LastIP { get; set; }
        /// <summary> 
        /// 请求次数
        /// </summary> 
        [Required]
        [DisplayName("请求次数")]
        public int Request { get; set; }
        /// <summary> 
        /// 是否有效  
        /// </summary> 
        [Required]
        [DisplayName("是否有效")]
        public bool Effective { get; set; }
    }
}