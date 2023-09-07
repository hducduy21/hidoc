using hidoc.Model;
using hidoc.Template;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace hidoc.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly hidoctorContext _db;
        public CustomerController(hidoctorContext db) { _db = db; }
        [HttpGet("")]
        public async Task<ActionResult<IEnumerable<User>>> getAll()
        {
            string port = new SettingHandler().portDomain;
            var list = await _db.Users.Where(q => q.Role == 3).ToListAsync();
            
            return Ok(list);
        }
    }
}
