using System.ComponentModel.DataAnnotations;

namespace hidoc.Models
{
    public class User
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        [MaxLength(30)]
        public Boolean Gender { get; set; }
        [MaxLength(10)]
        public String birthday { get; set; }
        public string Name { get; set; }
        [Required]
        [MaxLength(30)]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        [MaxLength(10)]
        public string Phone { get; set; }
        [Required]
        public string Address { get; set; }
        public string? token { get; set; }
        public string? f_token { get; set; }

        public Doctor? doctor { get; set; }
        public Admin? admin { get; set; }
        public Customer? customer { get; set; }

        public ICollection<Report> Reports { get; set; }
        public ICollection<News> News { get; set; }
    }
}
