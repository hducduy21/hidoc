using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace hidoc.Models
{
    public class Sign_Schedule
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }
        public Guid? CustomerID { get; set; }
        public Customer? Customer { get; set; }
        public int? ScheID { get; set; }
        public Schedule? schedule { get; set; }
        public int status { get; set; }
        public string prescription { get; set; }
        public string result { get; set; }
        public string remind { get; set; }
    }
}
