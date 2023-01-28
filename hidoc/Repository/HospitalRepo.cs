using hidoc.Models;
using Microsoft.EntityFrameworkCore;

namespace hidoc.Repository
{
    public class HospitalRepo : IHospitalRepo
    {
        private readonly HiDocDBContext _db;

        public HospitalRepo(HiDocDBContext db) {
            _db = db;
        }
        async Task<int> IHospitalRepo.addHospital(Hospital hospital)
        {
            _db.T_Hospital.Add(hospital);
            await _db.SaveChangesAsync();

            return hospital.Id;
        }

        async Task<bool> IHospitalRepo.deleteHospital(int id)
        {
            var hospital = await _db.T_Hospital.FindAsync(id);
            if (hospital == null)
            {
                return false;
            }

            _db.T_Hospital.Remove(hospital);
            await _db.SaveChangesAsync();

            return true;
        }

        async Task<List<Hospital>> IHospitalRepo.getAll()
        {
            return await _db.T_Hospital.ToListAsync();
        }

        async Task<Hospital> IHospitalRepo.getHospital(int id)
        {
            var hospital = await _db.T_Hospital.FindAsync(id);

            return hospital;
        }

        async Task<int> IHospitalRepo.updateHospital(int id, Hospital hospital)
        {
            if (id != hospital.Id)
            {
                return -1;
            }

            _db.T_Hospital.Update(hospital);

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_db.T_Hospital.Any(e => e.Id == id))
                {
                    return 0;
                }
                else
                {
                    return -1;
                }
            }

            return 1;
        }
    }
}
