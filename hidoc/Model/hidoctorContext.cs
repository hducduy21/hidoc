using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace hidoc.Model
{
    public partial class hidoctorContext : DbContext
    {
        public hidoctorContext()
        {
        }

        public hidoctorContext(DbContextOptions<hidoctorContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Banner> Banners { get; set; } = null!;
        public virtual DbSet<Department> Departments { get; set; } = null!;
        public virtual DbSet<Disease> Diseases { get; set; } = null!;
        public virtual DbSet<Hospital> Hospitals { get; set; } = null!;
        public virtual DbSet<HospitalDepartment> HospitalDepartments { get; set; } = null!;
        public virtual DbSet<HospitalSchedule> HospitalSchedules { get; set; } = null!;
        public virtual DbSet<Interact> Interacts { get; set; } = null!;
        public virtual DbSet<Link> Links { get; set; } = null!;
        public virtual DbSet<Report> Reports { get; set; } = null!;
        public virtual DbSet<Schedule> Schedules { get; set; } = null!;
        public virtual DbSet<SignPartner> SignPartners { get; set; } = null!;
        public virtual DbSet<SignSchedule> SignSchedules { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=DESKTOP-VIT0CG8\\SQLEXPRESS;Initial Catalog=hidoctor;Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Banner>(entity =>
            {
                entity.ToTable("banner");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Link)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("link");
            });

            modelBuilder.Entity<Department>(entity =>
            {
                entity.HasKey(e => e.Did)
                    .HasName("PK__Departme__C036563084375A16");

                entity.ToTable("Department");

                entity.Property(e => e.Did).HasColumnName("DID");

                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<Disease>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("Disease");

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("ID");

                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<Hospital>(entity =>
            {
                entity.HasKey(e => e.Hid)
                    .HasName("PK__Hospital__C7551527C5AAA28E");

                entity.ToTable("Hospital");

                entity.Property(e => e.Hid).HasColumnName("HID");

                entity.Property(e => e.Address)
                    .HasMaxLength(100)
                    .HasColumnName("address");

                entity.Property(e => e.Description)
                    .HasColumnType("ntext")
                    .HasColumnName("description");

                entity.Property(e => e.Examined).HasColumnName("examined");

                entity.Property(e => e.Img)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("img");

                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .HasColumnName("name");

                entity.Property(e => e.Timework)
                    .HasMaxLength(100)
                    .HasColumnName("timework");

                entity.Property(e => e.Type).HasColumnName("type");

                entity.Property(e => e.XPrice).HasColumnName("xPrice");
            });

            modelBuilder.Entity<HospitalDepartment>(entity =>
            {
                entity.ToTable("Hospital_Department");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Did).HasColumnName("DID");

                entity.Property(e => e.Hid).HasColumnName("HID");

                entity.HasOne(d => d.DidNavigation)
                    .WithMany(p => p.HospitalDepartments)
                    .HasForeignKey(d => d.Did)
                    .HasConstraintName("FK__Hospital_De__DID__4D94879B");

                entity.HasOne(d => d.HidNavigation)
                    .WithMany(p => p.HospitalDepartments)
                    .HasForeignKey(d => d.Hid)
                    .HasConstraintName("FK__Hospital_De__HID__4E88ABD4");
            });

            modelBuilder.Entity<HospitalSchedule>(entity =>
            {
                entity.ToTable("Hospital_Schedule");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Hid).HasColumnName("HID");

                entity.Property(e => e.Maxnumber).HasColumnName("maxnumber");

                entity.Property(e => e.SDate)
                    .HasColumnType("date")
                    .HasColumnName("S_date");

                entity.Property(e => e.Session).HasColumnName("session");

                entity.HasOne(d => d.HidNavigation)
                    .WithMany(p => p.HospitalSchedules)
                    .HasForeignKey(d => d.Hid)
                    .HasConstraintName("FK__Hospital_Sc__HID__5BE2A6F2");
            });

            modelBuilder.Entity<Interact>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("interact");

                entity.Property(e => e.ContentInt).HasColumnName("contentInt");

                entity.Property(e => e.ContentString)
                    .HasMaxLength(255)
                    .HasColumnName("contentString");

                entity.Property(e => e.Customer)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("customer");

                entity.Property(e => e.Doctor)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("doctor");

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("id");

                entity.Property(e => e.Type).HasColumnName("type");
            });

            modelBuilder.Entity<Link>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("Link");

                entity.Property(e => e.Did)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("DID");

                entity.Property(e => e.Hid).HasColumnName("HID");

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("ID");

                entity.Property(e => e.Link1)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .HasColumnName("link");

                entity.Property(e => e.Type).HasColumnName("type");

                entity.HasOne(d => d.DidNavigation)
                    .WithMany()
                    .HasForeignKey(d => d.Did)
                    .HasConstraintName("FK__Link__DID__656C112C");

                entity.HasOne(d => d.HidNavigation)
                    .WithMany()
                    .HasForeignKey(d => d.Hid)
                    .HasConstraintName("FK__Link__HID__6477ECF3");
            });

            modelBuilder.Entity<Report>(entity =>
            {
                entity.ToTable("Report");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Description)
                    .HasColumnType("ntext")
                    .HasColumnName("description");

                entity.Property(e => e.Title)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("title");

                entity.Property(e => e.Username)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("username");

                entity.HasOne(d => d.UsernameNavigation)
                    .WithMany(p => p.Reports)
                    .HasForeignKey(d => d.Username)
                    .HasConstraintName("FK__Report__username__5629CD9C");
            });

            modelBuilder.Entity<Schedule>(entity =>
            {
                entity.ToTable("Schedule");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Address)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("address");

                entity.Property(e => e.MaxNumber).HasColumnName("maxNumber");

                entity.Property(e => e.SDate)
                    .HasColumnType("date")
                    .HasColumnName("S_date");

                entity.Property(e => e.TimeE).HasColumnName("timeE");

                entity.Property(e => e.TimeS).HasColumnName("timeS");

                entity.Property(e => e.Username)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("username");

                entity.HasOne(d => d.UsernameNavigation)
                    .WithMany(p => p.Schedules)
                    .HasForeignKey(d => d.Username)
                    .HasConstraintName("FK__Schedule__userna__59063A47");
            });

            modelBuilder.Entity<SignPartner>(entity =>
            {
                entity.ToTable("Sign_Partner");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Address)
                    .HasMaxLength(100)
                    .HasColumnName("address");

                entity.Property(e => e.Email)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .HasColumnName("name");

                entity.Property(e => e.PState).HasColumnName("P_State");
            });

            modelBuilder.Entity<SignSchedule>(entity =>
            {
                entity.ToTable("Sign_Schedule");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Hsid).HasColumnName("HSID");

                entity.Property(e => e.Prescription)
                    .HasMaxLength(1000)
                    .HasColumnName("prescription");

                entity.Property(e => e.Remind)
                    .HasMaxLength(1000)
                    .HasColumnName("remind");

                entity.Property(e => e.Result)
                    .HasMaxLength(1000)
                    .HasColumnName("result");

                entity.Property(e => e.SState).HasColumnName("S_state");

                entity.Property(e => e.Sid).HasColumnName("SID");

                entity.Property(e => e.Username)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("username");

                entity.HasOne(d => d.SidNavigation)
                    .WithMany(p => p.SignSchedules)
                    .HasForeignKey(d => d.Sid)
                    .HasConstraintName("FK__Sign_Schedu__SID__60A75C0F");

                entity.HasOne(d => d.UsernameNavigation)
                    .WithMany(p => p.SignSchedules)
                    .HasForeignKey(d => d.Username)
                    .HasConstraintName("FK__Sign_Sche__usern__5FB337D6");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Username)
                    .HasName("PK__User__F3DBC573FF77873E");

                entity.ToTable("User");

                entity.HasIndex(e => e.Email, "UQ__User__AB6E616442C3220F")
                    .IsUnique();

                entity.HasIndex(e => e.Sdt, "UQ__User__DDDFB483F5D9CC7D")
                    .IsUnique();

                entity.HasIndex(e => e.Email, "email");

                entity.Property(e => e.Username)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("username");

                entity.Property(e => e.Achievements)
                    .HasColumnType("ntext")
                    .HasColumnName("achievements");

                entity.Property(e => e.Address)
                    .HasMaxLength(255)
                    .HasColumnName("address");

                entity.Property(e => e.Birthday)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("birthday");

                entity.Property(e => e.Desctipt)
                    .HasColumnType("ntext")
                    .HasColumnName("desctipt");

                entity.Property(e => e.Email)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.Examined).HasColumnName("examined");

                entity.Property(e => e.Gender).HasColumnName("gender");

                entity.Property(e => e.Hid).HasColumnName("HID");

                entity.Property(e => e.History)
                    .HasColumnType("ntext")
                    .HasColumnName("history");

                entity.Property(e => e.Level).HasColumnName("level");

                entity.Property(e => e.Link)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("link");

                entity.Property(e => e.List)
                    .HasColumnType("ntext")
                    .HasColumnName("list");

                entity.Property(e => e.MHistory)
                    .HasMaxLength(255)
                    .HasColumnName("M_history");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .HasColumnName("name");

                entity.Property(e => e.Password)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("password");

                entity.Property(e => e.Role).HasColumnName("role");

                entity.Property(e => e.Sdt)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("sdt");

                entity.Property(e => e.Token)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("token");

                entity.Property(e => e.XPrice).HasColumnName("xPrice");

                entity.HasOne(d => d.HidNavigation)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.Hid)
                    .HasConstraintName("FK__User__HID__534D60F1");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
