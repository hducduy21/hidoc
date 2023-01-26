using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace hidoc.Models
{
    public class Department
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [MaxLength(75)]
        public string Name { get; set; }
        public ICollection<Hospital_Department> Hospital_Departments { get; set; }
        public ICollection<Disease> diseases { get; set; }
    }
}
