using cuoikiAsp.Models;

namespace cuoikiAsp.Respositories
{
    public interface IDeparmentRespotories
    {
        public Task<List<Department>> getAll();

        
    }
}
