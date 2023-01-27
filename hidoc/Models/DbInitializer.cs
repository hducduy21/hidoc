namespace hidoc.Models
{
    public class DbInitializer
    {
        private readonly HiDocDBContext _hidocDbContext;
        public DbInitializer(HiDocDBContext hidocDbContext)
        {
            _hidocDbContext = hidocDbContext;
        }
        public void Seed()
        {
            if (!_hidocDbContext.T_User.Any())
            {
                Guid[] arrGuid = new Guid[14];
                for(int i = 0;i < arrGuid.Length; i++)
                {
                    arrGuid[i] = Guid.NewGuid();
                }

                var user = new List<User>()
                {
                    new User()
                    {
                        Id= arrGuid[0],
                        Gender = true,
                        birthday = "06/02/2001",
                        Name = "Admin",
                        Email = "hoangducduybh2002@gmail.com",
                        Password= "admin",
                        Phone= "0354851420",
                        Address = "Buôn Hồ, Đắk Lắk",
                        token = null,
                        f_token= null,
                    },
                    new User()
                    {
                        Id= arrGuid[1],
                        Name = "Hoàng Sỹ Tiến",
                        birthday = "01/08/1995",
                        Gender = true,
                        Email = "exampleemail72600@gmail.com",
                        Password= "123456",
                        Phone= "0354851210",
                        Address = "Quận 7, TP HCM",
                        token = null,
                        f_token= null,
                    },
                    new User()
                    {
                        Id= arrGuid[2],
                        Name = "Hoàng Sỹ Nghi",
                        birthday = "06/01/1994",
                        Gender = false,
                        Email = "exampleemail72601@gmail.com",
                        Password= "123456",
                        Phone= "0354345210",
                        Address = "Quận 5, TP HCM",
                        token = null,
                        f_token= null,
                    },
                    new User()
                    {
                        Id= arrGuid[3],
                        Name = "Hoàng Sỹ Học",
                        birthday = "19/12/1995",
                        Gender = true,
                        Email = "exampleemail72603@gmail.com",
                        Password= "123456",
                        Phone= "0354314104",
                        Address = "Quận 1, TP HCM",
                        token = null,
                        f_token= null,
                    },
                    new User()
                    {
                        Id= arrGuid[4],
                        Name = "Hoàng Sỹ Nhi",
                        birthday = "06/09/1997",
                        Gender = false,
                        Email = "exampleemail72604@gmail.com",
                        Password= "123456",
                        Phone= "0354832210",
                        Address = "Quận 3, TP HCM",
                        token = null,
                        f_token= null,
                    },
                    new User()
                    {
                        Id= arrGuid[5],
                        Name = "Hoàng Khách Sáo",
                        birthday = "16/12/2001",
                        Gender = false,
                        Email = "exampleemail72605@gmail.com",
                        Password= "123456",
                        Phone= "0354833310",
                        Address = "Quận 1, TP HCM",
                        token = null,
                        f_token= null,
                    },
                    new User()
                    {
                        Id= arrGuid[6],
                        Name = "Hoàng Khách Quý",
                        birthday = "22/11/2007",
                        Gender = true,
                        Email = "exampleemail72606@gmail.com",
                        Password= "123456",
                        Phone= "0354233210",
                        Address = "Quận 2, TP HCM",
                        token = null,
                        f_token= null,
                    },
                    new User()
                    {
                        Id= arrGuid[7],
                        Name = "Hoàng Khách Sạn",
                        birthday = "16/02/2000",
                        Gender = true,
                        Email = "exampleemail72607@gmail.com",
                        Password= "123456",
                        Phone= "0353933210",
                        Address = "Quận 1, TP HCM",
                        token = null,
                        f_token= null,
                    },
                    new User()
                    {
                        Id= arrGuid[8],
                        Name = "Hoàng Khách Mai",
                        birthday = "29/02/1990",
                        Gender = false,
                        Email = "exampleemail72608@gmail.com",
                        Password= "123456",
                        Phone= "0354831280",
                        Address = "Quận 1, TP HCM",
                        token = null,
                        f_token= null,
                    },
                    new User()
                    {
                        Id= arrGuid[9],
                        Name = "Hoàng Khách Nam",
                        Gender = true,
                        birthday = "09/08/1996",
                        Email = "exampleemail72609@gmail.com",
                        Password= "123456",
                        Phone= "0354213210",
                        Address = "Quận 6, TP HCM",
                        token = null,
                        f_token= null,
                    },
                    new User()
                    {
                        Id= arrGuid[10],
                        Name = "Hoàng Khách Phương",
                        birthday = "06/10/1992",
                        Gender = false,
                        Email = "exampleemail72610@gmail.com",
                        Password= "123456",
                        Phone= "0354831210",
                        Address = "Quận 1, TP HCM",
                        token = null,
                        f_token= null,
                    },
                    new User()
                    {
                        Id= arrGuid[11],
                        Name = "Hoàng Khách Phú",
                        Gender = true,
                        birthday = "07/07/2003",
                        Email = "exampleemail72611@gmail.com",
                        Password= "123456",
                        Phone= "0354838510",
                        Address = "Quận 1, TP HCM",
                        token = null,
                        f_token= null,
                    },
                    new User()
                    {
                        Id= arrGuid[12],
                        Name = "Hoàng Khách Phượng",
                        birthday = "13/01/1999",
                        Gender = false,
                        Email = "exampleemail72612@gmail.com",
                        Password= "123456",
                        Phone= "0354833280",
                        Address = "Quận 1, TP HCM",
                        token = null,
                        f_token= null,
                    },
                    new User()
                    {
                        Id= arrGuid[13],
                        Name = "Hoàng Khách Lệ",
                        birthday = "12/05/1998",
                        Gender = false,
                        Email = "exampleemail72613@gmail.com",
                        Password= "123456",
                        Phone= "0301333210",
                        Address = "Quận 1, TP HCM",
                        token = null,
                        f_token= null,
                    },
                };
                _hidocDbContext.T_User.AddRange(user);
                _hidocDbContext.SaveChanges();

                var admin = new List<Admin>() {
                    new Admin()
                    {
                        ID= arrGuid[0],
                    }
                };
                _hidocDbContext.T_Admin.AddRange(admin);
                _hidocDbContext.SaveChanges();

                var customer = new List<Customer>() {
                    new Customer()
                    {
                        Id= arrGuid[5],
                        history = "Viêm xoang"
                    },
                    new Customer()
                    {
                        Id= arrGuid[6],
                        history = "Viêm Tai"
                    },
                    new Customer()
                    {
                        Id= arrGuid[7],
                        history = "Cột sống"
                    },
                    new Customer()
                    {
                        Id= arrGuid[8],
                        history = "Trĩ"
                    },
                    new Customer()
                    {
                        Id= arrGuid[9],
                        history = "Viêm xoang"
                    },
                    new Customer()
                    {
                        Id= arrGuid[10],
                        history = "Hói"
                    },
                    new Customer()
                    {
                        Id= arrGuid[11],
                        history = "Thoát vị đĩa đệm, đau cột sống"
                    },
                    new Customer()
                    {
                        Id= arrGuid[12],
                        history = "Không có"
                    },
                    new Customer()
                    {
                        Id= arrGuid[13],
                        history = "Viêm tai mũi họng"
                    }
                };
                _hidocDbContext.T_Customer.AddRange(customer);
                _hidocDbContext.SaveChanges();

                var hospital = new List<Hospital>()
                {
                    new Hospital()
                    {
                        Name = "Bệnh viện Chợ Rẫy",
                        Description = "Bệnh viện Chợ Rẫy là một bệnh viện đa khoa trung ương cấp quốc gia. Đây là bệnh viện tuyến cuối hạng đặc biệt trực thuộc Bộ Y tế, đồng thời là trung tâm nghiên cứu khoa học, chỉ đạo tuyến và triển khai nhiều dự án hợp tác quốc tế trong lĩnh vực y tế",
                        Address = "201B Nguyễn Chí Thanh, Phường 12, Q5,  TP HCM",
                    },
                    new Hospital()
                    {
                        Name = "Bệnh viện Nhi đồng 1",
                        Description = "Bệnh viện Nhi đồng 1 là một bệnh viện chuyên khoa Nhi trực thuộc Sở Y tế Thành phố Hồ Chí Minh, được UBNDTPHCM xếp hạng I, hiện là một trong ba bệnh viện Nhi tuyến cuối phục vụ các tỉnh thành phía Nam Việt Nam",
                        Address = "341 đường Sư Vạn Hạnh, Phường 10, Q10,  TP HCM",
                    },
                    new Hospital()
                    {
                        Name = "Bệnh viện Từ Dũ",
                        Description = "Bệnh viện Từ Dũ là một bệnh viện phụ sản ở Thành phố Hồ Chí Minh, Việt Nam. Với gần 100 năm làm việc và phát triển, Bệnh viện Từ Dũ là nơi ra đời của rất nhiều thế hệ em bé sinh ra ở tại Thành phố Hồ Chí Minh. Bệnh viện Từ Dũ cũng là một trong bệnh viện hàng đầu ở Việt Nam trong vấn đề về hiếm muộn và thụ tinh nhân tạo",
                        Address = "284 Cống Quỳnh, Q1,  TP HCM",
                    },
                    new Hospital()
                    {
                        Name = "Bệnh viện Da liễu Trung ương",
                        Description = "Bệnh viện Da liễu Trung ương là bệnh viện công lập chuyên khoa đầu ngành về chuyên ngành da liễu, đặt tại Hà Nội, Việt Nam. Bệnh viện có tên dịch ra tiếng Anh là National Hospital of Dermatology and Venereology, viết tắt là NHDV",
                        Address = "15A, Phương Mai, Hà Nội",
                    },
                };
                _hidocDbContext.T_Hospital.AddRange(hospital);
                _hidocDbContext.SaveChanges();

                var department = new List<Department>()
                {
                    new Department()
                    {
                        Name = "Cấp cứu",
                    },
                    new Department()
                    {
                        Name = "Hồi sức",
                    },
                    new Department()
                    {
                        Name = "Ung bướu",
                    },
                    new Department()
                    {
                        Name = "Nhi",
                    },
                    new Department()
                    {
                        Name = "Da Liễu",
                    },
                    new Department()
                    {
                        Name = "Hô hấp",
                    },
                };
                _hidocDbContext.T_Department.AddRange(department);
                _hidocDbContext.SaveChanges();

                var hos_department = new List<Hospital_Department>()
                {
                    new Hospital_Department()
                    {
                        HID = 1,
                        DID = 1,
                    },
                    new Hospital_Department()
                    {
                        HID = 1,
                        DID = 2,
                    },
                    new Hospital_Department()
                    {
                        HID = 1,
                        DID = 3,
                    },
                    new Hospital_Department()
                    {
                        HID = 1,
                        DID = 4,
                    },
                    new Hospital_Department()
                    {
                        HID = 1,
                        DID = 5,
                    },
                    new Hospital_Department()
                    {
                        HID = 1,
                        DID = 6,
                    },
                    new Hospital_Department()
                    {
                        HID = 2,
                        DID = 4,
                    },
                    new Hospital_Department()
                    {
                        HID = 3,
                        DID = 4,
                    },
                    new Hospital_Department()
                    {
                        HID = 4,
                        DID = 5,
                    },
                };
                _hidocDbContext.T_Hospital_Department.AddRange(hos_department);
                _hidocDbContext.SaveChanges();

                var doc = new List<Doctor>()
                {
                    new Doctor()
                    {
                        Id = arrGuid[1],
                        level= 1,
                        DID = 1,
                    },
                    new Doctor()
                    {
                        Id = arrGuid[2],
                        level= 2,
                        DID = 7,
                    },
                    new Doctor()
                    {
                        Id = arrGuid[3],
                        level= 2,
                        DID = 8,
                    },
                    new Doctor()
                    {
                        Id = arrGuid[4],
                        level= 2,
                        DID = 8,
                    }
                };
                _hidocDbContext.T_Doctor.AddRange(doc);
                _hidocDbContext.SaveChanges();
            }
        }
    }
}
