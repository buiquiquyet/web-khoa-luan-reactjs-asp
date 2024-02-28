using cuoikiAsp.Models;
using Microsoft.EntityFrameworkCore;

namespace cuoikiAsp.Respositories
{
    public class DeparmentRespotories : IDeparmentRespotories
    {
        private readonly databaseContext _context;
        public DeparmentRespotories(databaseContext context)
        {
            _context = context;
        }
        public async Task<List<Department>> getAll()
        {
            var deparments = await _context.Departments
                .Select(d => new Department
                {
                    DepartmentId = d.DepartmentId,
                    Name = d.Name,
                }).ToListAsync();
            return deparments;
        }
    }
}
