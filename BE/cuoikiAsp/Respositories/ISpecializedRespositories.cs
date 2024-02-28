using cuoikiAsp.Models;

namespace cuoikiAsp.Respositories
{
    public interface ISpecializedRespositories
    {
        public Task<List<Specialized>> getAll();
        public Task<List<Specialized>> getByDeparmentId(int id);
        public Task<List<Specialized>> getId(int id);
    }
}
