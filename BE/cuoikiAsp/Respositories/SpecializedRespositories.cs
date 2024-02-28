using cuoikiAsp.Models;
using Microsoft.EntityFrameworkCore;

namespace cuoikiAsp.Respositories
{
    public class SpecializedRespositories : ISpecializedRespositories
    {
        private readonly databaseContext _context;
        public SpecializedRespositories(databaseContext context)
        {
            _context = context;
        }
        public async Task<List<Specialized>> getAll()
        {
            var specializeds = await _context.Specializeds
                .Select(d => new Specialized
                {
                    SpecializedId = d.SpecializedId,
                    Name = d.Name,
                }).ToListAsync();
            return specializeds;
        }
        public async Task<List<Specialized>> getByDeparmentId(int id)
        {
            var specializedList = await _context.Specializeds
                .Where(d => d.DepartmentId == id)
                .Select(d => new Specialized
                {
                    SpecializedId = d.SpecializedId,
                    Name = d.Name,
                })
                .ToListAsync();

            return specializedList;
        }
        public async Task<List<Specialized>> getId(int id)
        {
            var specializedList = await _context.Specializeds
                .Where(d => d.SpecializedId == id)
                .Select(d => new Specialized
                {
                    SpecializedId = d.SpecializedId,
                    Name = d.Name,
                })
                .ToListAsync();

            return specializedList;
        }

    }
}
