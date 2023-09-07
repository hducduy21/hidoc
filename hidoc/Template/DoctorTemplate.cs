namespace hidoc.Template
{
    public class DoctorTemplate
    {
        public string Username { get; set; } = null!;
        public string name { get; set; }
        public bool gender { get; set; }
        public string email { get; set; }
        public string sdt { get; set; }
        public int? Hid { get; set; }
        public string Hospital { get; set; }
        public string HAddress { get; set; }
        public int? Level { get; set; }
        public string? History { get; set; }
        public int? XPrice { get; set; }
        public string? Achievements { get; set; }
        public int? Examined { get; set; }
        public string? Link { get; set; }
        public string Descript { get; set; }
        public DoctorTemplate() { }
    }
    
}
