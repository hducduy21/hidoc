using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace hidoc.Models
{
    public class Report
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }
        public Guid UserID { get; set; }
        public User? Author { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }
}
