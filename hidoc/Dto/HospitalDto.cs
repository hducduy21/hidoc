using hidoc.Model;

namespace hidoc.Dto
{
    public class HospitalDto
    {
        public int Hid { get; set; }
        public int? Type { get; set; }
        public string? Name { get; set; }
        public string? Address { get; set; }
        public string? Timework { get; set; }
        public string? Description { get; set; }
        public int? XPrice { get; set; }
        public string? Img { get; set; }
        public int? Examined { get; set; }
        public HospitalDto() { }
        public HospitalDto(int hid, int? type, string? name, string? address, string? timework, string? description, int? xPrice, string? img, int? examined)
        {
            Hid = hid;
            Type = type;
            Name = name;
            Address = address;
            Timework = timework;
            Description = description;
            XPrice = xPrice;
            Img = img;
            Examined = examined;
        }
    }
}
