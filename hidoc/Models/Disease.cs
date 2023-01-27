using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace hidoc.Models
{
    public class Disease
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }
        public int DID { get; set; }
        public Department? Department { get; set; }
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

    }
}
