using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace hidoc.Model
{
    public partial class User
    {
        public User()
        {
            Reports = new HashSet<Report>();
            Schedules = new HashSet<Schedule>();
            SignSchedules = new HashSet<SignSchedule>();
        }

        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;
        public int Role { get; set; }
        public string Name { get; set; } = null!;
        public bool? Gender { get; set; }
        public string? Birthday { get; set; }
        public string Email { get; set; } = null!;
        public string Sdt { get; set; } = null!;
        public string? Address { get; set; }
        public string? Token { get; set; }
        public string? MHistory { get; set; }
        public string? List { get; set; }
        public int? Hid { get; set; }
        public int? Level { get; set; }
        public string? Achievements { get; set; }
        public int? XPrice { get; set; }
        public string? History { get; set; }
        public int? Examined { get; set; }
        public string? Link { get; set; }
        public string? Desctipt { get; set; }

        public virtual HospitalDepartment? HidNavigation { get; set; }
        [JsonIgnore]
        public virtual ICollection<Report> Reports { get; set; }
        [JsonIgnore]
        public virtual ICollection<Schedule> Schedules { get; set; }
        [JsonIgnore]
        public virtual ICollection<SignSchedule> SignSchedules { get; set; }
    }
}
