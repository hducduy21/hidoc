using System;
using System.Collections.Generic;

namespace hidoc.Model
{
    public partial class Department
    {
        public Department()
        {
            HospitalDepartments = new HashSet<HospitalDepartment>();
        }

        public int Did { get; set; }
        public string Name { get; set; } = null!;

        public virtual ICollection<HospitalDepartment> HospitalDepartments { get; set; }
    }
}
