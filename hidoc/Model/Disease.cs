using System;
using System.Collections.Generic;

namespace hidoc.Model
{
    public partial class Disease
    {
        public int Id { get; set; }
        public int? Department { get; set; }
        public string? Name { get; set; }
    }
}
