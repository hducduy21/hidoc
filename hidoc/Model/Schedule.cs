using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace hidoc.Model
{
    public partial class Schedule
    {
        public Schedule()
        {
            SignSchedules = new HashSet<SignSchedule>();
        }

        public int Id { get; set; }
        public string Username { get; set; }
        public DateTime SDate { get; set; }
        public TimeSpan TimeS { get; set; }
        public TimeSpan TimeE { get; set; }
        public int MaxNumber { get; set; }
        public string? Address { get; set; }

        public virtual User? UsernameNavigation { get; set; }
        [JsonIgnore]
        public virtual ICollection<SignSchedule> SignSchedules { get; set; }
    }
}
