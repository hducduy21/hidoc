using hidoc.Model;
using hidoc.Template;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace hidoc.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly hidoctorContext _db;
        public DepartmentController(hidoctorContext db) { _db = db; }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Department>>> getAll()
        {
            return await _db.Departments.ToListAsync();
        }
    }
    
}
