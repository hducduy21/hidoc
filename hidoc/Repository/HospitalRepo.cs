using hidoc.Model;
using hidoc.Template;
using Microsoft.EntityFrameworkCore;

namespace hidoc.Repository
{
    public class HospitalRepo : IHospitalRepo
    {
        private readonly hidoctorContext _db;

        public HospitalRepo(hidoctorContext db) {
            _db = db;
        }
        async Task<int> IHospitalRepo.addHospital(Hospital hospital)
        {
            _db.Hospitals.Add(hospital);
            await _db.SaveChangesAsync();

            return hospital.Hid;
        }

        async Task<bool> IHospitalRepo.deleteHospital(int id)
        {
            var hospital = await _db.Hospitals.FindAsync(id);
            if (hospital == null)
            {
                return false;
            }

            _db.Hospitals.Remove(hospital);
            await _db.SaveChangesAsync();

            return true;
        }

        async Task<List<Hospital>> IHospitalRepo.getAll()
        {
            return await _db.Hospitals.ToListAsync();
        }

        async Task<Hospital> IHospitalRepo.getHospital(int id)
        {
            var hospital = await _db.Hospitals.FindAsync(id);

            return hospital;
        }

        async Task<int> IHospitalRepo.updateHospital(int id, Hospital hospital)
        {
            if (id != hospital.Hid)
            {
                return -1;
            }

            _db.Hospitals.Update(hospital);

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_db.Hospitals.Any(e => e.Hid == id))
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
