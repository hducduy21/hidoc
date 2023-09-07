using System;
using System.Collections.Generic;

namespace hidoc.Model
{
    public partial class Link
    {
        public int Id { get; set; }
        public string? Link1 { get; set; }
        public int? Type { get; set; }
        public int? Hid { get; set; }
        public string? Did { get; set; }

        public virtual User? DidNavigation { get; set; }
        public virtual Hospital? HidNavigation { get; set; }
    }
}
