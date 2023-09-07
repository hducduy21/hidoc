using hidoc.Model;
using hidoc.Template;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using SignScheduleDto = hidoc.Template.SignScheduleDto;

namespace hidoc.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        private readonly hidoctorContext _db;
        public ScheduleController(hidoctorContext db) { _db = db; }
        [HttpGet("sign")]
        public async Task<ActionResult<IEnumerable<User>>> getAll()
        {
            //var user = (UserTemplate)HttpContext.Items["User"];
            //if(user == null)
            //{
            //    return Unauthorized();
            //}
            var list = await _db.SignSchedules.ToListAsync();
            return Ok(list);
        }
        [HttpPost("sign")]
        public async Task<ActionResult<IEnumerable<User>>> addSignSchedule([FromBody] IdRequest id)
        {
            var user = (UserTemplate)HttpContext.Items["User"];
            if (user == null)
            {
                return Unauthorized("Chưa đăng nhập");
            }
            Schedule s = await _db.Schedules.FirstOrDefaultAsync(q => q.Id == id.Id);
            if (s == null)
            {
                return Ok(new Response(false, "Lịch khám không tồn tại"));
            }
            bool flag = await _db.SignSchedules.AnyAsync(q => q.Sid == id.Id && q.Username == user.id);
            if (flag)
            {
                return Ok(new Response(false, "Bạn đã đăng ký lịch khám này"));
            }
            try
            {
                var u = await _db.Users.FirstOrDefaultAsync(q => q.Username == user.id);
                SignSchedule newSign = new SignSchedule();
                newSign.Sid = s.Id;
                newSign.Username = u.Username;
                newSign.SState = 1;
                newSign.SidNavigation = s;
                newSign.UsernameNavigation = u;
                await _db.SignSchedules.AddAsync(newSign);

                s.SignSchedules.Add(newSign);
                u.SignSchedules.Add(newSign);

                await _db.SaveChangesAsync();
                return Ok(new Response(true, "Đăng ký thành công", newSign));
            }
            catch (Exception ex)
            {
                return Problem("Lỗi: " + ex, statusCode: StatusCodes.Status500InternalServerError);

            }

        }
        [HttpGet("history")]
        public async Task<ActionResult<IEnumerable<Response>>> getHistory()
        {
            var user = (UserTemplate)HttpContext.Items["User"];
            if (user == null || user.id == null)
            {
                return Unauthorized("Chưa đăng nhập");
            }
            var list = await _db.SignSchedules
                .Where(q => q.Username == user.id)
                .Select(s =>
                    new SignScheduleDto
                    {
                        Id = s.Id,
                        Username = s.Username,
                        Sid = s.Sid ?? -1,
                        Hsid = s.Hsid ?? -1,
                        SState = s.SState,
                        Prescription = s.Prescription??"",
                        Result = s.Result ?? "",
                        Remind = s.Result ?? "",
                        SidNavigation = s.SidNavigation
                    }
                    )
                .ToListAsync();

            if (list == null || !list.Any())
            {
                return NoContent();
            }

            return Ok(new Response(true, "", list));
        }
    }
}
