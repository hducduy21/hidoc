using hidoc.Model;
using hidoc.Template;

namespace hidoc.Repository
{
    public interface IHospitalRepo
    {
        public Task<List<Hospital>> getAll();
        public Task<Hospital> getHospital(int id);
        public Task<int> addHospital(Hospital hospital);
        public Task<int> updateHospital(int id, Hospital hospital);
        public Task<bool> deleteHospital(int id);
    }
}
