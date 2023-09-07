using hidoc.Model;
using hidoc.Template;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json.Linq;
using NuGet.Common;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace hidoc.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly hidoctorContext _db;
        public UserController(hidoctorContext db) { _db = db; }
        [HttpGet("")]
        public async Task<ActionResult<IEnumerable<User>>> getAll2()
        {
            var list = await _db.Users.Where(q => q.Role == 3).ToListAsync();
            return Ok(list);
        }
        [HttpGet("profile")]
        public async Task<ActionResult<IEnumerable<Response>>> getProfile()
        {
            if (HttpContext.Items["User"] != null)
            {
                UserTemplate u = (UserTemplate)HttpContext.Items["User"];
                var user = await _db.Users.FirstOrDefaultAsync(q => q.Username == u.id);
                if (user == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(new Response(true, "success", new { name = user.Name, email = user.Email, gender = user.Gender, birthday = user.Birthday, phone = user.Sdt, address = user.Address }));
                }
            }
            else
            {
                return Unauthorized(new Response(false, "Unauthorized"));
            }
        }
    }
}
