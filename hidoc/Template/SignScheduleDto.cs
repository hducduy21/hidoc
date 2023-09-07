using hidoc.Model;

namespace hidoc.Template
{
    public class SignScheduleDto
    {
        public int Id { get; set; }
        public string? Username { get; set; }
        public int Sid { get; set; }
        public int Hsid { get; set; }
        public int SState { get; set; }
        public string Prescription { get; set; }
        public string Result { get; set; }
        public string Remind { get; set; }
        public virtual Schedule SidNavigation { get; set; }
        public SignScheduleDto() { }
    }
}
