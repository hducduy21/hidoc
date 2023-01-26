using Microsoft.EntityFrameworkCore;

namespace hidoc.Models
{
    public class HiDocDBContext : DbContext
    {
        public HiDocDBContext(DbContextOptions options) : base(options) {
        }

        public DbSet<User> T_User { get; set; }
        public DbSet<Admin> T_Admin { get; set; }
        public DbSet<Customer> T_Customer { get; set; }
        public DbSet<Department> T_Department { get; set; }
        public DbSet<Hospital> T_Hospital { get; set; }
        public DbSet<Hospital_Department> T_Hospital_Department { get; set; }
        public DbSet<Disease> T_Disease { get; set; }
        public DbSet<Doctor> T_Doctor { get; set; }
        public DbSet<News> T_News { get; set; }
        public DbSet<Report> T_Report { get; set; }
        public DbSet<Schedule> T_Schedule { get; set; }
        public DbSet<Sign_Partner> T_Sign_Partner { get; set; }
        public DbSet<Sign_Schedule> T_Sign_Schedule { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(e =>
            {
                e.ToTable("User");
            });
            modelBuilder.Entity<Admin>(e =>
            {
                e.ToTable("Admin");
                e.HasOne(u => u.User).WithOne(u => u.admin).HasForeignKey<User>(u => u.Id);
            });
            modelBuilder.Entity<Customer>(e =>
            {
                e.ToTable("Customer");
                e.HasOne(u => u.user).WithOne(u => u.customer).HasForeignKey<User>(u => u.Id);
            });
            modelBuilder.Entity<Doctor>(e =>
            {
                e.ToTable("Doctor");
                e.HasOne(u => u.user).WithOne(u => u.doctor).HasForeignKey<User>(u => u.Id);
                e.HasOne(u => u.department).WithMany(u => u.Doctors).HasForeignKey(u => u.DID);
            });
            modelBuilder.Entity<Hospital>(e =>
            {
                e.ToTable("Hospital");
            });
            modelBuilder.Entity<Department>(e =>
            {
                e.ToTable("Department");
            });
            modelBuilder.Entity<Hospital_Department>(e =>
            {
                e.ToTable("Hospital_Department");
                e.HasOne(e => e.Hospital).WithMany(e => e.Hospital_Departments).HasForeignKey(u => u.HID);
                e.HasOne(e => e.Department).WithMany(e => e.Hospital_Departments).HasForeignKey(u => u.DID);
            });
            modelBuilder.Entity<Disease>(e =>
            {
                e.ToTable("Disease");
                e.HasOne(e => e.Department).WithMany(e => e.diseases).HasForeignKey(u => u.DID);
            });
            modelBuilder.Entity<News>(e =>
            {
                e.ToTable("News");
                e.HasOne(e => e.Author).WithMany(e => e.News).HasForeignKey(u => u.UserID);
            });
            modelBuilder.Entity<Report>(e =>
            {
                e.ToTable("Report");
                e.HasOne(e => e.Author).WithMany(e => e.Reports).HasForeignKey(u => u.UserID);
            });
            modelBuilder.Entity<Schedule>(e =>
            {
                e.ToTable("Schedule");
                e.HasOne(e => e.Doctor).WithMany(e => e.schedules).HasForeignKey(u => u.DoctorID);
            });
            modelBuilder.Entity<Sign_Schedule>(e =>
            {
                e.ToTable("Sign_Schedule");
                e.HasOne(e => e.Customer).WithMany(e => e.schedules).HasForeignKey(u => u.CustomerID);
                e.HasOne(e => e.schedule).WithMany(e => e.Sign_Schedule).HasForeignKey(u => u.ScheID);
            });
        }
    }
}
