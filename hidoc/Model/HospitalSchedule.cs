using System;
using System.Collections.Generic;

namespace hidoc.Model
{
    public partial class HospitalSchedule
    {
        public int Id { get; set; }
        public int? Hid { get; set; }
        public DateTime SDate { get; set; }
        public bool? Session { get; set; }
        public int? Maxnumber { get; set; }

        public virtual Hospital? HidNavigation { get; set; }
    }
}
