using System.ComponentModel.DataAnnotations;

namespace hidoc.Models
{
    public class Customer
    {
        [Key]
        public Guid Id { get; set; }
        public User user { get; set; }
        public string history { get; set; }
        public ICollection<Sign_Schedule> schedules { get; set; }
    }
}
