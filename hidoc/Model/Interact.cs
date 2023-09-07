using System;
using System.Collections.Generic;

namespace hidoc.Model
{
    public partial class Interact
    {
        public int Id { get; set; }
        public int? Type { get; set; }
        public string Customer { get; set; } = null!;
        public string Doctor { get; set; } = null!;
        public string? ContentString { get; set; }
        public int? ContentInt { get; set; }
    }
}
