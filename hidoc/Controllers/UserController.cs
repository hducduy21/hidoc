using hidoc.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
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
        private readonly HiDocDBContext _db;
        public UserController(HiDocDBContext db) { _db = db; }

        [HttpPost]
        public IActionResult Login(Login userIn) {
            var user = _db.T_User.SingleOrDefault(q => q.Email.Trim().ToLower() == userIn.email && q.Password.Trim().ToLower() == userIn.password);
            if (user == null)
            {
                return Ok(new Response()
                {
                    state = false,
                    message = userIn.password,
                });
            }
            return  Ok(new Response
            {
                state = true,
                message ="Authen success",
                data = getToken(user), 
            });
        }
        private string getToken(User user)
        {
            var token = new JwtSecurityTokenHandler();
            var secret = Encoding.UTF8.GetBytes("HiDoctorAPIweb52000650");
            var tokenre = new SecurityTokenDescriptor
            {   
                Subject = new ClaimsIdentity(
                new[] {
                    new Claim("email", user.Email),
                    new Claim("id", user.Id.ToString()),

                }),
                Expires = DateTime.UtcNow.AddMinutes(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(secret),SecurityAlgorithms.HmacSha256Signature)

            };
            return token.WriteToken(token.CreateToken(tokenre));
        }
    }
}
