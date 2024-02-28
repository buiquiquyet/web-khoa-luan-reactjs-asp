using cuoikiAsp.Models;
using System.Collections.Generic;

namespace cuoikiAsp.Respositories
{
    public interface ICommentRespositories
    {
        public Task<List<Comment>> getAll();
        public Task<bool> addComment(Comment newComment);
        public Task<bool> updateComment(int CommentId, Comment updatedComment);
        public Task<bool> updateEvaluate(int CommentId, int Evaluate);
        public Task<int> deleteComments(int[] UserIds);
        public Task<List<Comment>> deleteCommentsByPostTypeAndId(int[] projectId, string typePost);
        public Task<bool> delComment(int CommentId);
        public Task<bool> delByCommentId(int ByCommentId);
        public Task<bool> delCommentByUserId(int UserId);
        public Task<List<Comment>> getByTypePostId(string CommentType, int PostId);
        public Task<List<Comment>> getBybyCommentId( int ByCommentId);
        public Task<List<Comment>> getByTypePostCommentId(string CommentType, int PostId, int byUserId);
        public Task<List<Comment>> getByTypePostCommentIdotherNull(string CommentType, int PostId);
        public Task<Comment> getById(int commentId);
    }
}
