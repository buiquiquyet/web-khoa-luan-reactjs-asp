using cuoikiAsp.Models;
using Microsoft.EntityFrameworkCore;

namespace cuoikiAsp.Respositories
{
    public class ForumRespositories : IForumRespositories
    {
        private readonly databaseContext _context;

        public ForumRespositories(databaseContext context)
        {
            _context = context;
        }

        public async Task<List<Forum>> getAll()
        {
            var Forum = await _context.Forums.ToListAsync();
            return Forum;
        }
        public async Task<bool> addForum(Forum newForum)
        {
            try
            {
                _context.Forums.Add(newForum);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {

                return false;
            }
        }
        public async Task<bool> updateForum(int ForumId, Forum updatedForum)
        {
            try
            {
                if (updatedForum == null)
                {
                    return false;
                }

                var existingForum = await _context.Forums.FindAsync(ForumId);
                if (existingForum == null)
                {
                    return false;
                }
                existingForum.Title = updatedForum.Title;
                existingForum.Discriptions = updatedForum.Discriptions;
                existingForum.CreatedDate = updatedForum.CreatedDate;
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                // Log lỗi hoặc xử lý lỗi theo yêu cầu của bạn.
                return false;
            }
        }
        public async Task<int> deleteForum(int[] ForumIds)
        {
            try
            {
                var existingForums = await _context.Forums.Where(u => ForumIds.Contains(u.ForumId)).ToListAsync();

                if (existingForums == null || existingForums.Count == 0)
                {
                    // Trả về 0 nếu không tìm thấy người dùng để xóa
                    return 0;
                }

                _context.Forums.RemoveRange(existingForums);
                await _context.SaveChangesAsync();

                // Trả về số lượng người dùng đã xóa thành công
                return existingForums.Count;
            }
            catch (DbUpdateException ex)
            {
                // Xử lý lỗi cơ sở dữ liệu, log lỗi nếu cần
                Console.Error.WriteLine($"Lỗi khi xóa nhiều diễn đàn: {ex.Message}");
                return 0;
            }
            catch (Exception ex)
            {
                // Xử lý lỗi chung, log lỗi nếu cần
                Console.Error.WriteLine($"Lỗi khi xóa nhiều diễn đàn: {ex.Message}");
                return 0;
            }
        }
        public async Task<List<Forum>> getByName(string Name)
        {
            try
            {
                var forrums = await _context.Forums
                    .Where(u => u.Title.Contains(Name))
                    .ToListAsync();
                return forrums;
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu cần
                Console.Error.WriteLine($"Lỗi khi lấy người dùng theo tên: {ex.Message}");
                return null;
            }
        }
        public async Task<Forum> getById(int ForumId)
        {
            try
            {
                var forrum = await _context.Forums.FirstOrDefaultAsync(u => u.ForumId == ForumId);
                return forrum;
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu cần
                Console.Error.WriteLine($"Lỗi khi lấy diễn đàn theo ID: {ex.Message}");
                return null;
            }
        }
        public async Task<Forum> getByForumTitle(string title)
        {

            try
            {
                var Forum = await _context.Forums
                    .Where(u => u.Title == title  )
                    .FirstOrDefaultAsync();
              

                return Forum;
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu cần
                Console.Error.WriteLine($"Lỗi khi lấy người dùng theo ID: {ex.Message}");
                return null;
            }
        }
    }
}
