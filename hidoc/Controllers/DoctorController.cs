 using hidoc.Model;
using hidoc.Template;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Numerics;

namespace hidoc.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private readonly hidoctorContext _db;
        public DoctorController(hidoctorContext db) { _db = db; }
        [HttpGet("")]
        public async Task<ActionResult<IEnumerable<User>>> getAll()
        {
            //var user = (UserTemplate)HttpContext.Items["User"];
            //if(user == null)
            //{
            //    return Unauthorized();
            //}
            string port = new SettingHandler().portDomain;
            var list = await _db.Users.Where(q=>q.Role==2).ToListAsync();
            var list2 = list.Select(e =>
            new DoctorTemplate()
            {
                Username = e.Username,
                Hid = e.Hid,
                Level = e.Level,
                History = e.History,
                XPrice = e.XPrice,
                Achievements = e.Achievements,
                Examined = e.Examined,
                Link = port + "static/" + e.Link,
            });
            return Ok(list2);
        }
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<User>>> getAll2()
        {
            var list = await _db.Users.Where(q => q.Role == 2).ToListAsync();
            return Ok(list);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<DoctorTemplate>>> get([FromRoute] string id)
        {
            var user = await _db.Users.FirstOrDefaultAsync(q=> q.Role==2 && q.Username == id);
            if(user != null)
            {
                var hosDepartment = await _db.HospitalDepartments.FirstOrDefaultAsync(q => q.Id == user.Hid);
                string hos = "";
                string address = "";
                if (hosDepartment != null)
                {
                    var temp = await _db.Hospitals.FirstOrDefaultAsync(q => q.Hid == hosDepartment.Hid);
                    hos = temp == null ? "" : temp.Name;
                    address = temp == null ? "" : temp.Address;
                }
                if (hosDepartment != null)
                {
                    DoctorTemplate d = new DoctorTemplate();
                    d.Username = user.Username;
                    d.name = user.Name;
                    d.Hid = hosDepartment.Hid;
                    d.Hospital = hos;
                    d.HAddress = address;
                    d.email = user.Email;
                    d.Achievements = user.Achievements;
                    d.Examined = user.Examined;
                    d.Descript = user.Desctipt;
                    d.XPrice = user.XPrice;
                    d.Link = user.Link;
                    d.Level = user.Level;
                    return Ok(d);
                }
                return BadRequest(new Response(false, "Không tồn tại bác sỹ 1"));
            }
            return BadRequest(new Response(false,"Không tồn tại bác sỹ 2"));
        }
        [HttpGet("top10")]
        public async Task<ActionResult<IEnumerable<DoctorTemplate>>> getTop10()
        {
            string port = new SettingHandler().portDomain;
            var list =  await _db.Users.Where(q => q.Role == 2)
                     .OrderByDescending(u => u.Examined)
                     .Take(10)
                     .ToListAsync();
            var list2 = list.Select(e =>
            new DoctorTemplate()
            {
                Username = e.Username,
                name = e.Name,
                Level= e.Level,
                Descript = e.Desctipt,
                Link = port + "static/" + e.Link,
            });
            return Ok(list2);
        }
        [HttpPost("schedule")]
        public async Task<ActionResult<IEnumerable<DoctorTemplate>>> addSchedule(Schedule schedule)
        {
            User doc = await _db.Users.FirstOrDefaultAsync(q=>q.Username== schedule.Username);
            List<Schedule> sche = await _db.Schedules.Where(q => q.SDate == schedule.SDate).ToListAsync();
            bool flag = true;
            foreach (Schedule s in sche) {
                int result1 = TimeSpan.Compare(schedule.TimeS, s.TimeS); 
                int result2 = TimeSpan.Compare(schedule.TimeS, s.TimeE);
                if (result1 >= 0 && result2 <= 0)
                {
                   flag= false;
                    break;
                }

                int result3 = TimeSpan.Compare(schedule.TimeE, s.TimeS);
                int result4 = TimeSpan.Compare(schedule.TimeE, s.TimeE);
                if (result3 >= 0 && result4 <= 0)
                {
                    flag = false;
                    break;
                }

                int result5 = TimeSpan.Compare(s.TimeS, schedule.TimeS);
                int result6 = TimeSpan.Compare(s.TimeS, schedule.TimeE);
                if (result5 >= 0 && result6 <= 0)
                {
                    flag = false;
                    break;
                }
            }
            if (flag)
            {
                schedule.UsernameNavigation = doc;
                await _db.Schedules.AddAsync(schedule);
                await _db.SaveChangesAsync();
                return Ok(schedule);
            }
            else
            {
                return BadRequest(new Response(false, "Khoảng thời gian chọn trùng với lịch khác trong ngày"));
            }
            
        }
        [HttpGet("schedule")]
        public async Task<ActionResult<IEnumerable<ScheduleDto>>> getSchedule([FromQuery] DateTime date)
        {
            DateTime[] next7Days = new DateTime[7];

            for (int i = 0; i < 7; i++)
            {
                    next7Days[i] = date;
                    date = date.AddDays(1);
            }
            string[] nextSevenDaysOfWeek = Array.ConvertAll(next7Days, x => x.ToString("dddd"));
            SchedulesDto[] schedules = new SchedulesDto[7];
            for (int i = 0; i < 7; i++)
            {
                schedules[i] = new SchedulesDto();
                schedules[i].date = next7Days[i].ToString("yyyy-MM-dd");
                schedules[i].day = nextSevenDaysOfWeek[i];
                var sche = await _db.Schedules.Where(q => q.SDate == next7Days[i]).ToListAsync();
                List<ScheduleDto> scheduleDtos = await _db.Schedules
                .Where(q => q.SDate == next7Days[i])
                .Select(s => new ScheduleDto
                {
                    Id = s.Id,
                    Username = s.Username,
                    SDate = s.SDate,
                    TimeS = s.TimeS,
                    TimeE = s.TimeE,
                    MaxNumber = s.MaxNumber,
                    registered = _db.SignSchedules.Count(q => q.Sid == s.Id)
                })
                .ToListAsync();
                schedules[i].schedules = scheduleDtos;
            }
            return Ok(schedules);
        }
    }
}
