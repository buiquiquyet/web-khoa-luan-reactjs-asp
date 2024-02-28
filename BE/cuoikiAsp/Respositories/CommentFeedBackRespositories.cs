using cuoikiAsp.Models;
using Microsoft.EntityFrameworkCore;

namespace cuoikiAsp.Respositories
{
    public class CommentFeedBackRespositories : ICommentFeedBackRespositories
    {
        private readonly databaseContext _context;

        public CommentFeedBackRespositories(databaseContext context)
        {
            _context = context;
        }

        public async Task<List<CommentFeedback>> getAll()
        {
            var comments = await _context.CommentFeedbacks.ToListAsync();
            comments.Reverse();

            return comments;
        }
        public async Task<bool> addCommentFeedback(CommentFeedback newCommentFeedback)
        {
            try
            {

                _context.CommentFeedbacks.Add(newCommentFeedback);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {

                return false;
            }
        }
        public async Task<bool> updateCommentFeedbackt(int CommentFeedbackId, CommentFeedback updatedCommentFeedback)
        {
            try
            {
                if (CommentFeedbackId == null)
                {
                    return false;
                }

                var existingCommentFeedback = await _context.CommentFeedbacks.FindAsync(CommentFeedbackId);
                if (existingCommentFeedback == null)
                {
                    return false;
                }

                existingCommentFeedback.FullName = updatedCommentFeedback.FullName;
                existingCommentFeedback.Email = updatedCommentFeedback.Email;
                existingCommentFeedback.Discriptions = updatedCommentFeedback.Discriptions;
                existingCommentFeedback.CommentDate = updatedCommentFeedback.CommentDate;
                existingCommentFeedback.UserId = updatedCommentFeedback.UserId;
                existingCommentFeedback.ByUserId = updatedCommentFeedback.ByUserId;
                existingCommentFeedback.CommentType = updatedCommentFeedback.CommentType;
                existingCommentFeedback.PostId = updatedCommentFeedback.PostId;


                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                // Log lỗi hoặc xử lý lỗi theo yêu cầu của bạn.
                return false;
            }
        }
        public async Task<bool> updateEvaluate(int CommentFeedbackId, int Evaluate)
        {
            try
            {
                if (CommentFeedbackId == null)
                {
                    return false;
                }

                var existingCommentFeedback = await _context.CommentFeedbacks.FindAsync(CommentFeedbackId);
                if (existingCommentFeedback == null)
                {
                    return false;
                }
                /*existingComment.Evaluate = Evaluate;*/
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public async Task<int> deleteCommentFeedbacks(int[] UserIds)
        {
            try
            {
                var existingCommentFeedbacks = await _context.CommentFeedbacks.Where(u => UserIds.Contains(u.UserId)).ToListAsync();

                if (existingCommentFeedbacks == null || existingCommentFeedbacks.Count == 0)
                {
                    return 0;
                }

                _context.CommentFeedbacks.RemoveRange(existingCommentFeedbacks);
                await _context.SaveChangesAsync();

                return existingCommentFeedbacks.Count;
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
        public async Task<List<CommentFeedback>> deleteCommentFeedbacksByPostTypeAndId(int[] postId, string typePost)
        {
            try
            {
                var existingCommentFeedbacks = await _context.CommentFeedbacks.Where(u => postId.Contains(u.PostId) && u.CommentType == typePost).ToListAsync();

                if (existingCommentFeedbacks == null || existingCommentFeedbacks.Count == 0)
                {
                    return null;
                }

                _context.CommentFeedbacks.RemoveRange(existingCommentFeedbacks);
                await _context.SaveChangesAsync();

                return existingCommentFeedbacks;
            }
            catch (DbUpdateException ex)
            {
                // Xử lý lỗi cơ sở dữ liệu, log lỗi nếu cần
                Console.Error.WriteLine($"Lỗi khi xóa nhiều người dùng: {ex.Message}");
                return null;
            }
            catch (Exception ex)
            {
                // Xử lý lỗi chung, log lỗi nếu cần
                Console.Error.WriteLine($"Lỗi khi xóa nhiều người dùng: {ex.Message}");
                return null;
            }
        }
        public async Task<bool> delCommentFeedback(int CommentFeedbackId)
        {
            try
            {
                var existingCommentFeedback = await _context.CommentFeedbacks.FindAsync(CommentFeedbackId);
                if (existingCommentFeedback == null)
                {
                    return false;
                }
                _context.CommentFeedbacks.Remove(existingCommentFeedback);
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }
        public async Task<bool> delCommentFeedbackByUserId(int UserId)
        {
            try
            {
                var existingCommentFeedbacks = await _context.CommentFeedbacks
                    .Where(u => u.UserId == UserId)
                    .ToListAsync();

                if (existingCommentFeedbacks.Any())
                {
                    _context.CommentFeedbacks.RemoveRange(existingCommentFeedbacks);
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
        public async Task<CommentFeedback> getById(int CommentFeedbackId)
        {
            try
            {
                var CommentFeedback = await _context.CommentFeedbacks.FirstOrDefaultAsync(u => u.CommentId == CommentFeedbackId);
                return CommentFeedback;
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu cần
                Console.Error.WriteLine($"Lỗi khi lấy người dùng theo ID: {ex.Message}");
                return null;
            }
        }
        public async Task<List<CommentFeedback>> getByTypePostId(string CommentFeedbackType, int PostId)
        {
            try
            {
                var commentFeedbacks = await _context.CommentFeedbacks
                .Where(c => c.CommentType == CommentFeedbackType && c.PostId == PostId)
                .Include(c => c.User)
                .ThenInclude(u => u.Class)
                .Where(c => c.User != null && c.User.Class != null)
                .Select(c => new CommentFeedback
                {
                    CommentId = c.CommentId,
                    UserId = c.UserId,
                    FullName = c.FullName,
                    Email = c.Email,
                    CommentDate = c.CommentDate,
                    Discriptions = c.Discriptions,
                    CommentType = c.CommentType,
                    PostId = c.PostId,
                    UserGroup = c.User.UserGroup,
                    ClassName = c.User.Class.Name

                })
                .ToListAsync();

                commentFeedbacks.Reverse();
                return commentFeedbacks;
                /*  var comment = await _context.Comments
                      .Where(u => u.CommentType == CommentType && u.PostId == PostId)
                      .ToListAsync();
                  comment.Reverse();
                  return comment;*/
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
