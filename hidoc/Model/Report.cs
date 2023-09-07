using System;
using System.Collections.Generic;

namespace hidoc.Model
{
    public partial class Report
    {
        public int Id { get; set; }
        public string? Username { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }

        public virtual User? UsernameNavigation { get; set; }
    }
}
