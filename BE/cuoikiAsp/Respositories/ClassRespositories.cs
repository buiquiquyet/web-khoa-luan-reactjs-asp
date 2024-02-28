using cuoikiAsp.Models;
using Microsoft.EntityFrameworkCore;

namespace cuoikiAsp.Respositories
{
    public class ClassRespositories : IClassRespositories
    {
        private readonly databaseContext _context;
        public ClassRespositories(databaseContext context)
        {
            _context = context;
        }

        public async Task<List<Class>> getAll()
        {
            return await _context.Classes.ToListAsync();
        }
        public async Task<Class> getSpecializedId(int id)
        {

            var bySpecialized = await _context.Classes
            .Where(d => d.SpecializedId == id)
            .Select(d => new Class
            {
                ClassId = d.ClassId,
                Name = d.Name,
            })
            .FirstOrDefaultAsync();

            return bySpecialized;
        }
        public async Task<Class> getId(int id)
        {

            var classs = await _context.Classes
            .Where(d => d.ClassId == id)
            .Select(d => new Class
            {
                ClassId = d.ClassId,
                Name = d.Name,
            })
            .FirstOrDefaultAsync();

            return classs;
        }

    }
}
