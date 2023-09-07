using hidoc.Model;

namespace hidoc.Template
{
    public class ScheduleDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public DateTime SDate { get; set; }
        public TimeSpan TimeS { get; set; }
        public TimeSpan TimeE { get; set; }
        public int MaxNumber { get; set; }
        public int registered { get; set; }
        public ScheduleDto(int id, string username, DateTime sDate, TimeSpan timeS, TimeSpan timeE, int maxNumber, int registered)
        {
            Id = id;
            Username = username;
            SDate = sDate;
            TimeS = timeS;
            TimeE = timeE;
            MaxNumber = maxNumber;
            this.registered = registered;
        }
        public ScheduleDto() { }

    }
}
