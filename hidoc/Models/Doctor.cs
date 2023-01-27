using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace hidoc.Models
{
    public class Doctor
    {
        [Key]
        public Guid Id { get; set; }
        public int level { get; set; }
        public User? user { get; set; }
        public int DID { get; set; }
        public Hospital_Department? department { get; set; }
        public ICollection<Schedule>? schedules { get; set; }
        
    }
}
