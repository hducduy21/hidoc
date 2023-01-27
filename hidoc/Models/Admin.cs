using System.ComponentModel.DataAnnotations;

namespace hidoc.Models
{
    public class Admin
    {
        [Key]
        public Guid ID { get; set; }
        public User? User;
    }
}
