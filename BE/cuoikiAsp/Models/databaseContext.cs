using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace cuoikiAsp.Models
{
    public partial class databaseContext : DbContext
    {
        public databaseContext()
        {
        }

        public databaseContext(DbContextOptions<databaseContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Class> Classes { get; set; } = null!;
        public virtual DbSet<Comment> Comments { get; set; } = null!;
        public virtual DbSet<Department> Departments { get; set; } = null!;
        public virtual DbSet<Evaluate> Evaluates { get; set; } = null!;
        public virtual DbSet<Forum> Forums { get; set; } = null!;
        public virtual DbSet<ProjectList> ProjectLists { get; set; } = null!;
        public virtual DbSet<SchoolYear> SchoolYears { get; set; } = null!;
        public virtual DbSet<Specialized> Specializeds { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<UserGroup> UserGroups { get; set; } = null!;

        public virtual DbSet<CommentFeedback> CommentFeedbacks { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=DESKTOP-UTRCQSJ;Database=database;Trusted_Connection=True;TrustServerCertificate=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Class>(entity =>
            {
                entity.ToTable("Class");

                entity.Property(e => e.Name).HasMaxLength(100);

                entity.HasOne(d => d.Department)
                    .WithMany(p => p.Classes)
                    .HasForeignKey(d => d.DepartmentId)
                    .HasConstraintName("FK_Class_Department");

                entity.HasOne(d => d.SchoolYear)
                    .WithMany(p => p.Classes)
                    .HasForeignKey(d => d.SchoolYearId)
                    .HasConstraintName("FK_Class_SchoolYear");

                entity.HasOne(d => d.Specialized)
                    .WithMany(p => p.Classes)
                    .HasForeignKey(d => d.SpecializedId)
                    .HasConstraintName("FK_Class_Specialized");
            });

            modelBuilder.Entity<Comment>(entity =>
            {
                entity.ToTable("Comment");

                entity.Property(e => e.CommentDate).HasColumnType("datetime");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Comment_User");
            });

            modelBuilder.Entity<Department>(entity =>
            {
                entity.ToTable("Department");

                entity.Property(e => e.Name).HasMaxLength(255);
            });

            modelBuilder.Entity<Evaluate>(entity =>
            {
                entity.ToTable("Evaluate");
            });

            modelBuilder.Entity<Forum>(entity =>
            {
                entity.ToTable("Forum");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<ProjectList>(entity =>
            {
                entity.ToTable("ProjectList");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Point).HasMaxLength(3);

                entity.HasOne(d => d.SchoolYear)
                    .WithMany(p => p.ProjectLists)
                    .HasForeignKey(d => d.SchoolYearId)
                    .HasConstraintName("FK_ProjectList_SchoolYear");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.ProjectLists)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ProjectList_User");
            });

            modelBuilder.Entity<SchoolYear>(entity =>
            {
                entity.ToTable("SchoolYear");

                entity.Property(e => e.Name).HasMaxLength(100);
            });

            modelBuilder.Entity<Specialized>(entity =>
            {
                entity.ToTable("Specialized");

                entity.HasOne(d => d.Department)
                    .WithMany(p => p.Specializeds)
                    .HasForeignKey(d => d.DepartmentId)
                    .HasConstraintName("FK_Specialized_Department");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User");

                entity.Property(e => e.DateOfBirth).HasColumnType("datetime");

                entity.Property(e => e.PhoneNumber).HasMaxLength(11);

                entity.Property(e => e.UserGroup).HasMaxLength(100);

                entity.HasOne(d => d.Class)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.ClassId)
                    .HasConstraintName("FK_User_Class");

                entity.HasOne(d => d.Department)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.DepartmentId)
                    .HasConstraintName("FK_User_Department");

                entity.HasOne(d => d.Specialized)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.SpecializedId)
                    .HasConstraintName("FK_User_Specialized");
            });

            modelBuilder.Entity<CommentFeedback>(entity =>
            {
                entity.HasKey(e => e.CommentId)
                    .HasName("PK__CommentF__C3B4DFCACF661EA0");

                entity.ToTable("CommentFeedback");

                entity.Property(e => e.CommentId).ValueGeneratedNever();

                entity.Property(e => e.CommentDate).HasColumnType("datetime");

                /*entity.HasOne(d => d.User)
                    .WithMany(p => p.CommentFeedbacks)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CommentFeedback_User");*/
            });

            modelBuilder.Entity<UserGroup>(entity =>
            {
                entity.ToTable("UserGroup");

                entity.Property(e => e.UserGroupId).HasMaxLength(100);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}

          