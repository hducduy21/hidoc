using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace hidoc.Models
{
    public class Schedule
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public Guid DoctorID { get; set; }
        public Doctor Doctor { get; set; }
        [MaxLength(15)]
        public String date { get; set; }
        [MaxLength(15)]
        public String timeS { get; set; }
        [MaxLength(15)]
        public String timeE { get; set; }
        public int maxNum { get; set; }
        public string Address { get; set; }

        public ICollection<Sign_Schedule> Sign_Schedule { get; set; }


    }
}
