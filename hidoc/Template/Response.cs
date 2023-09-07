
namespace hidoc.Template
{
    public class Response
    {
        public Boolean? status { get; set; }
        public String? message { get; set; }
        public Object? data { get; set; }
        public Response(Boolean s, String m, Object d) {
            status = s;
            message = m;
            data = d;
        }
        public Response(Boolean s, String m)
        {
            status = s;
            message = m;
        }

    }
}
