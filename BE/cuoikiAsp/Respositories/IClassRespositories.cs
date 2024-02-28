using cuoikiAsp.Models;

namespace cuoikiAsp.Respositories
{
    public interface IClassRespositories
    {
        public Task<List<Class>> getAll();
       public Task<Class> getSpecializedId(int id);
        public Task<Class> getId(int id);

    }
}
