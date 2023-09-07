using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using hidoc.Model;
using hidoc.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using hidoc.Template;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Security.Principal;
using hidoc.Dto;

namespace hidoc.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HospitalsController : ControllerBase
    {
        private readonly IHospitalRepo _hospital;
        private readonly hidoctorContext _db;

        public HospitalsController(IHospitalRepo hospitalrepo)
        {
            _hospital = hospitalrepo;
            _db = new hidoctorContext();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hospital>>> getAll()
        {

            List<Hospital> l = await _db.Hospitals.ToListAsync();
            return l;
        }

        // GET: api/Hospitals
        [HttpGet("popular")]
        public async Task<ActionResult<IEnumerable<Hospital>>> top([FromQuery] int page, [FromQuery] int pageSize, [FromQuery] bool desc)
        {

            List<Hospital> l;
            if (desc) { 
                l = await _db.Hospitals.OrderByDescending(u => u.Examined)
                .Take(5)
                .Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
            }
            else
            {
                l = await _db.Hospitals.OrderBy(u => u.Examined)
                .Take(5)
                .Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
            }
            string port = new SettingHandler().portDomain;
            foreach (Hospital hospital in l)
            {
                hospital.Img = port + "static/" + hospital.Img;
            }
            return l;
        }

        // GET: api/Hospitals/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Hospital>> GetHospital([FromRoute] int id)
        {
            var hospital = await _db.Hospitals.FirstOrDefaultAsync(q=>q.Hid== id); 

            if (hospital == null)
            {
                return NotFound();
            }

            return Ok(new Response(true,"",hospital));
        }

        //// PUT: api/Hospitals/5
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutHospital(int id, Hospital hospital)
        //{
        //    if (id != hospital.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(hospital).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!HospitalExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        //// POST: api/Hospitals
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost]
        //public async Task<ActionResult<Hospital>> PostHospital(Hospital hospital)
        //{
        //    _context.T_Hospital.Add(hospital);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetHospital", new { id = hospital.Id }, hospital);
        //}

        //// DELETE: api/Hospitals/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteHospital(int id)
        //{
        //    var hospital = await _context.T_Hospital.FindAsync(id);
        //    if (hospital == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.T_Hospital.Remove(hospital);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        //private bool HospitalExists(int id)
        //{
        //    return _context.T_Hospital.Any(e => e.Id == id);
        //}
    }
}
