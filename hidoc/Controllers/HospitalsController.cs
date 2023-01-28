using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using hidoc.Models;
using hidoc.Repository;
using Microsoft.AspNetCore.Authorization;

namespace hidoc.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HospitalsController : ControllerBase
    {
        private readonly IHospitalRepo _hospital;

        public HospitalsController(IHospitalRepo hospitalrepo)
        {
            _hospital = hospitalrepo;
        }

        // GET: api/Hospitals
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Hospital>>> GetT_Hospital()
        {
            try
            {
                return Ok(await _hospital.getAll());
            }
            catch (Exception ex) { 
                return BadRequest(ex.Message);
            }
        }

        // GET: api/Hospitals/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<Hospital>> GetHospital(int id)
        //{
        //    var hospital = await _context.T_Hospital.FindAsync(id);

        //    if (hospital == null)
        //    {
        //        return NotFound();
        //    }

        //    return hospital;
        //}

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
