using System;
using System.Collections.Generic;

namespace hidoc.Model
{
    public partial class SignPartner
    {
        public int Id { get; set; }
        public int? PState { get; set; }
        public string? Email { get; set; }
        public string? Name { get; set; }
        public string? Address { get; set; }
    }
}
