using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace hidoc.Models
{
    public class Hospital_Department
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }
        public int HID { get; set; }
        public Hospital? Hospital { get; set; }
        public int DID { get; set; }
        public Department? Department { get; set; }
        public ICollection<Doctor>? Doctors { get; set; }
    }
}
