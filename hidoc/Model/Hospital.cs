using System;
using System.Collections.Generic;

namespace hidoc.Model
{
    public partial class Hospital
    {
        public Hospital()
        {
            HospitalDepartments = new HashSet<HospitalDepartment>();
            HospitalSchedules = new HashSet<HospitalSchedule>();
        }

        public int Hid { get; set; }
        public int? Type { get; set; }
        public string? Name { get; set; }
        public string? Address { get; set; }
        public string? Timework { get; set; }
        public string? Description { get; set; }
        public int? XPrice { get; set; }
        public string? Img { get; set; }
        public int? Examined { get; set; }

        public virtual ICollection<HospitalDepartment> HospitalDepartments { get; set; }
        public virtual ICollection<HospitalSchedule> HospitalSchedules { get; set; }
    }
}
