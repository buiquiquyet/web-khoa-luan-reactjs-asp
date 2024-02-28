using cuoikiAsp.Models;

namespace cuoikiAsp.Respositories
{
    public interface ISchoolYearRespositories
    {
        public Task<List<SchoolYear>> getAll();
    }
}
