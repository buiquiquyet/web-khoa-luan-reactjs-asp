using cuoikiAsp.Models;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.Design;

namespace cuoikiAsp.Respositories
{
    public class EvaluateRespositories : IEvaluateRespositories
    {
        private readonly databaseContext _context;

        public EvaluateRespositories(databaseContext context)
        {
            _context = context;
        }

        public async Task<List<Evaluate>> getAll()
        {
            var Evaluate = await _context.Evaluates.ToListAsync();


            return Evaluate;
        }
        public async Task<bool> addEvaluate(Evaluate newEvaluate)
        {
            try
            {

                _context.Evaluates.Add(newEvaluate);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {

                return false;
            }
        }
        public async Task<bool> updateEvaluate(int CommentId, int UserId,  Evaluate updatedEvaluate)
        {
            try
            {
          

                var existingEvaluate = await _context.Evaluates
                    .Where(u => u.CommentId == CommentId && u.UserId == UserId)
                     .FirstOrDefaultAsync();
                if (existingEvaluate == null)
                {
                    return false;
                }

                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                // Log lỗi hoặc xử lý lỗi theo yêu cầu của bạn.
                return false;
            }
        }

        public async Task<int> deleteEvaluateByUserIdArr(int[] UserIds)
        {
            try
            {
                var existingEvaluates = await _context.Evaluates.Where(u => UserIds.Contains(u.UserId)).ToListAsync();

                if (existingEvaluates == null || existingEvaluates.Count == 0)
                {
                    return 0;
                }

                _context.Evaluates.RemoveRange(existingEvaluates);
                await _context.SaveChangesAsync();

                return existingEvaluates.Count;
            }
            catch (DbUpdateException ex)
            {
                // Xử lý lỗi cơ sở dữ liệu, log lỗi nếu cần
                Console.Error.WriteLine($"Lỗi khi xóa nhiều người dùng: {ex.Message}");
                return 0;
            }
            catch (Exception ex)
            {
                // Xử lý lỗi chung, log lỗi nếu cần
                Console.Error.WriteLine($"Lỗi khi xóa nhiều người dùng: {ex.Message}");
                return 0;
            }
        }
        public async Task<int> deleteEvaluateByCommetnIdArr(int[] CommetnId)
        {
            try
            {
                var existingEvaluates = await _context.Evaluates.Where(u => CommetnId.Contains(u.CommentId)).ToListAsync();

                if (existingEvaluates == null || existingEvaluates.Count == 0)
                {
                    return 0;
                }

                _context.Evaluates.RemoveRange(existingEvaluates);
                await _context.SaveChangesAsync();

                return existingEvaluates.Count;
            }
            catch (DbUpdateException ex)
            {
                // Xử lý lỗi cơ sở dữ liệu, log lỗi nếu cần
                Console.Error.WriteLine($"Lỗi khi xóa nhiều comment: {ex.Message}");
                return 0;
            }
            catch (Exception ex)
            {
                // Xử lý lỗi chung, log lỗi nếu cần
                Console.Error.WriteLine($"Lỗi khi xóa nhiều comment: {ex.Message}");
                return 0;
            }
        }
        public async Task<bool> delEvaluate(int CommentId, int UserId)
        {
            try
            {
                var existingEvaluate = await _context.Evaluates
                    .Where(u => u.CommentId == CommentId && u.UserId == UserId)
                     .FirstOrDefaultAsync();
                if (existingEvaluate == null)
                {
                    return false;
                }
                _context.Evaluates.Remove(existingEvaluate);
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }
        public async Task<bool> delEvaluateByCommentId(int CommentId)
        {
            try
            {
                var existingEvaluates = await _context.Evaluates
                    .Where(u => u.CommentId == CommentId)
                    .ToListAsync();

                if (existingEvaluates.Any())
                {
                    _context.Evaluates.RemoveRange(existingEvaluates);
                    await _context.SaveChangesAsync();
                    return true;
                }

                return false;
            }
            catch
            {
                return false;
            }
        }
        public async Task<bool> delEvaluateByUserId(int UserId)
        {
            try
            {
                var existingEvaluates = await _context.Evaluates
                    .Where(u => u.UserId == UserId)
                    .ToListAsync();

                if (existingEvaluates.Any())
                {
                    _context.Evaluates.RemoveRange(existingEvaluates);
                    await _context.SaveChangesAsync();
                    return true;
                }

                return false;
            }
            catch
            {
                return false;
            }
        }


        public async Task<List<string>> getByCommentIdToUserName(int commentId)
        {
            try
            {
                var userNames = await _context.Evaluates
                    .Where(e => e.CommentId == commentId)
                    .Join(
                        _context.Users,
                        evaluate => evaluate.UserId,
                        user => user.UserId,
                        (evaluate, user) => user.Name
                    )
                    .ToListAsync();

                return userNames;
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu cần
                Console.Error.WriteLine($"Lỗi khi lấy tên người dùng theo CommentId: {ex.Message}");
                return null;
            }
        }
        public async Task<int> getByCommentId(int CommentId)
        {
            try
            {
                var evaluate = await _context.Evaluates
                    .Where(u => u.CommentId == CommentId )
                    .ToListAsync();

                return evaluate.Count;
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu cần
                Console.Error.WriteLine($"Lỗi khi lấy người dùng theo ID: {ex.Message}");
                return 0;
            }
        }
    }
}
