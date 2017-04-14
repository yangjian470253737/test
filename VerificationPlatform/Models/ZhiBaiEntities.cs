using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace VerificationPlatform.Models
{
    public class ZhiBaiEntities:DbContext
    {
        //数据库迁移
        //Enable-Migrations -Force
        //add-migration Initial
        //update-database
        public ZhiBaiEntities()
            : base("name=ZhiBaiConnection")
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<LoginHistory> LoginHistorys { get; set; }
        public DbSet<Platform> Platforms { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<AuthCode> AuthCodes { get; set; }
        public DbSet<Device> Devices { get; set; }
        public DbSet<EmailCode> EmailCodes { get; set; }
        public DbSet<CodeDateType> CodeDateTypes { get; set; }
        public DbSet<MaxAuthCode> MaxAuthCodes { get; set; }

    }
}