using cuoikiAsp.Models;
using Microsoft.EntityFrameworkCore;

namespace cuoikiAsp.Respositories
{
    public class CommentRespositories : ICommentRespositories
    {
        private readonly databaseContext _context;

        public CommentRespositories(databaseContext context)
        {
            _context = context;
        }

        public async Task<List<Comment>> getAll()
        {
            var comments = await _context.Comments.ToListAsync();
            comments.Reverse();

            return comments;
        }
        public async Task<bool> addComment(Comment newComment)
        {
            try
            {
        
                _context.Comments.Add(newComment);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {

                return false;
            }
        }
        public async Task<bool> updateComment(int CommentId, Comment updatedComment)
        {
            try
            {
                if (CommentId == null)
                {
                    return false;
                }

                var existingComment = await _context.Comments.FindAsync(CommentId);
                if (existingComment == null)
                {
                    return false;
                }

                existingComment.FullName = updatedComment.FullName;
                existingComment.Email = updatedComment.Email;
                existingComment.Discriptions = updatedComment.Discriptions;
                existingComment.CommentDate = updatedComment.CommentDate;
                existingComment.UserId = updatedComment.UserId;
                existingComment.CommentType = updatedComment.CommentType;
                existingComment.PostId = updatedComment.PostId;
     

                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                // Log lỗi hoặc xử lý lỗi theo yêu cầu của bạn.
                return false;
            }
        }
        public async Task<bool> updateEvaluate(int CommentId, int Evaluate)
        {
            try
            {
                if (CommentId == null)
                {
                    return false;
                }

                var existingComment = await _context.Comments.FindAsync(CommentId);
                if (existingComment == null)
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
        public async Task<int> deleteComments(int[] UserIds)
        {
            try
            {
                var existingComments = await _context.Comments.Where(u => UserIds.Contains(u.UserId)).ToListAsync();

                if (existingComments == null || existingComments.Count == 0)
                {
                    return 0;
                }

                _context.Comments.RemoveRange(existingComments);
                await _context.SaveChangesAsync();

                return existingComments.Count;
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
        public async Task<List<Comment>> deleteCommentsByPostTypeAndId(int[] postId, string typePost)
        {
            try
            {
                var existingComments = await _context.Comments.Where(u => postId.Contains(u.PostId) && u.CommentType == typePost).ToListAsync();

                if (existingComments == null || existingComments.Count == 0)
                {
                    return null;
                }

                _context.Comments.RemoveRange(existingComments);
                await _context.SaveChangesAsync();

                return existingComments;
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
        public async Task<bool> delComment(int commentId)
        {
            try
            {
                var existingCommnet = await _context.Comments.FindAsync(commentId);
                if (existingCommnet == null)
                {
                    return false;
                }
                _context.Comments.Remove(existingCommnet);
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }
        public async Task<bool> delCommentByUserId(int UserId)
        {
            try
            {
                var existingComments = await _context.Comments
                    .Where(u => u.UserId == UserId)
                    .ToListAsync();

                if (existingComments.Any())
                {
                    _context.Comments.RemoveRange(existingComments);
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
        public async Task<bool> delByCommentId(int ByCommentId)
        {
            try
            {
                var existingComments = await _context.Comments
                    .Where(u => u.ByCommentId == ByCommentId)
                    .ToListAsync();

                if (existingComments.Any())
                {
                    _context.Comments.RemoveRange(existingComments);
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
        public async Task<Comment> getById(int commentId)
        {
            try
            {
                var comment = await _context.Comments.FirstOrDefaultAsync(u => u.CommentId == commentId);
                return comment;
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu cần
                Console.Error.WriteLine($"Lỗi khi lấy người dùng theo ID: {ex.Message}");
                return null;
            }
        }
        public async Task<List<Comment>> getByTypePostId(string CommentType, int PostId)
        {
            try
            {
                var comments = await _context.Comments
                .Where(c => c.CommentType == CommentType && c.PostId == PostId && c.ByCommentId == null )
                .Include(c => c.User)
                .ThenInclude(u => u.Class)
                .Where(c => c.User != null && c.User.Class != null)
                .Select(c => new Comment
                {
                    CommentId = c.CommentId,
                    UserId = c.UserId,
                    FullName = c.FullName,
                    Email = c.Email,
                    CommentDate = c.CommentDate,
                    Discriptions = c.Discriptions,
                    CommentType = c.CommentType,
                    PostId = c.PostId,
                    ByCommentId = c.ByCommentId,
                    checkComment = c.User.checkComment,
                    UserGroup = c.User.UserGroup,
                    ClassName = c.User.Class.Name

                })
                .ToListAsync();

                comments.Reverse();
                return comments;
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
        public async Task<List<Comment>> getBybyCommentId( int ByCommentId)
        {
            try
            {
                var comments = await _context.Comments
                .Where(c =>  c.ByCommentId == ByCommentId)
                .Select(c => new Comment
                {
                    CommentId = c.CommentId,
                })
                .ToListAsync();

                comments.Reverse();
                return comments;
              
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu cần
                Console.Error.WriteLine($"Lỗi khi lấy người dùng theo ID: {ex.Message}");
                return null;
            }
        }
        public async Task<List<Comment>> getByTypePostCommentId(string CommentType, int PostId, int byUserId)
        {
            try
            {
                var comments = await _context.Comments
                .Where(c => c.CommentType == CommentType && c.PostId == PostId && c.ByCommentId == byUserId)
                .Include(c => c.User)
                .ThenInclude(u => u.Class)
                .Where(c => c.User != null && c.User.Class != null)
                .Select(c => new Comment
                {
                    CommentId = c.CommentId,
                    UserId = c.UserId,
                    FullName = c.FullName,
                    Email = c.Email,
                    CommentDate = c.CommentDate,
                    Discriptions = c.Discriptions,
                    CommentType = c.CommentType,
                    PostId = c.PostId,
                    ByCommentId = c.ByCommentId,
                    checkComment = c.User.checkComment,
                    UserGroup = c.User.UserGroup,
                    ClassName = c.User.Class.Name
                    
                })
                .ToListAsync();

                comments.Reverse();
                return comments;
               
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu cần
                Console.Error.WriteLine($"Lỗi khi lấy người dùng theo ID: {ex.Message}");
                return null;
            }
        }
        public async Task<List<Comment>> getByTypePostCommentIdotherNull(string CommentType, int PostId)
        {
            try
            {
                var comments = await _context.Comments
                .Where(c => c.CommentType == CommentType && c.PostId == PostId && c.ByCommentId != null)
                .Include(c => c.User)
                .ThenInclude(u => u.Class)
                .Where(c => c.User != null && c.User.Class != null)
                .Select(c => new Comment
                {
                    CommentId = c.CommentId,
                    UserId = c.UserId,
                    FullName = c.FullName,
                    Email = c.Email,
                    CommentDate = c.CommentDate,
                    Discriptions = c.Discriptions,
                    CommentType = c.CommentType,
                    PostId = c.PostId,
                    ByCommentId = c.ByCommentId,
                    /* Evaluate = c.Evaluate,*/
                    UserGroup = c.User.UserGroup,
                    checkComment = c.User.checkComment,
                    ClassName = c.User.Class.Name
                  

                })
                .ToListAsync();

                comments.Reverse();
                return comments;
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
