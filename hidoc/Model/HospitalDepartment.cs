using System;
using System.Collections.Generic;

namespace hidoc.Model
{
    public partial class HospitalDepartment
    {
        public HospitalDepartment()
        {
            Users = new HashSet<User>();
        }

        public int Id { get; set; }
        public int? Did { get; set; }
        public int? Hid { get; set; }

        public virtual Department? DidNavigation { get; set; }
        public virtual Hospital? HidNavigation { get; set; }
        public virtual ICollection<User> Users { get; set; }
    }
}
