namespace hidoc.Template
{
    public class UserTemplate
    {
        public string id;
        public string name;
        public int role;
        public string email;
        public bool gender;
        public string birthday;
        public string sdt;
        public string address;
        public UserTemplate() { }
        public UserTemplate(string id, string name, int role,string email)
        {
            this.id = id;
               this.name = name;
            this.role = role;
            this.email = email;
        }

    }
}
