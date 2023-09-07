using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace hidoc.Model
{
    public partial class SignSchedule
    {
        public int Id { get; set; }
        public string? Username { get; set; }
        public int? Sid { get; set; }
        public int? Hsid { get; set; }
        public int SState { get; set; }
        public string? Prescription { get; set; }
        public string? Result { get; set; }
        public string? Remind { get; set; }
        [JsonIgnore]
        public virtual Schedule SidNavigation { get; set; }
        [JsonIgnore]
        public virtual User? UsernameNavigation { get; set; }
    }
}
