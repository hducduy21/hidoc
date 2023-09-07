using hidoc.Model;
using hidoc.Template;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace hidoc.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly hidoctorContext _db;
        public AuthController(hidoctorContext db) { _db = db; }
        [HttpGet("login")]
        public async Task<ActionResult<IEnumerable<Response>>> Login()
        {
            var user = (UserTemplate)HttpContext.Items["User"];
            if (user == null)
                return Unauthorized();
            else
                return Ok(new Response(true, "Logined",new {name=user.name, email= user.email,id=user.id}));
            
        }

        [HttpPost("login")]
        public async Task<ActionResult<IEnumerable<Response>>> Login(Login userIn)
        {
            var user = await _db.Users.FirstOrDefaultAsync(q => q.Email == userIn.email);
            if (user == null)
            {
                return Ok(new Response(false, "User not found"));
            }
            else
            {
                if (BCrypt.Net.BCrypt.Verify(userIn.password, user.Password))
                {
                    string t = getToken(user, user.Role.ToString());
                    return Ok(new Response(true, "login success", new { name = user.Name, email = user.Email, token = t , role = user.Role }));
                }
                else
                {
                    return Ok(new Response(true, "login fail"));
                }
            }
        }
        [HttpDelete("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("hidoctoken");
            return Ok(new Response(true, "LogOut success"));
        }
        [HttpPost("signup")]
        public IActionResult SignUp(User u)
        {
            if (u.Name == null || u.Password == null || u.Email == null || u.Birthday == null || u.Gender == null)
            {
                return BadRequest(new Response(false, "Vui lòng nhập đầy đủ thông tin"));
            }
            if (_db.Users.Any(q => q.Username == u.Username || q.Email == u.Email))
            {
                return BadRequest(new Response(false, "Đã tồn tại người dùng"));
            }
            _db.Users.Add(u);
            _db.SaveChanges();
            return Ok(new Response(true, "Authen success"));
        }
        private string getToken(User user,string role)
        {
            
            var token = new JwtSecurityTokenHandler();
            var secret = Encoding.UTF8.GetBytes("HiDoctorAPIweb52000650");
            var tokenre = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                new[] {
                    new Claim("email", user.Email),
                    new Claim("id", user.Username.ToString()),
                    new Claim("role", role),
                    new Claim("name", user.Name),
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(secret), SecurityAlgorithms.HmacSha256Signature),
            };
            return token.WriteToken(token.CreateToken(tokenre));
        }
    }
}
