using cuoikiAsp.Models;

namespace cuoikiAsp.Respositories
{
    public interface ICommentFeedBackRespositories
    {
        public Task<List<CommentFeedback>> getAll();
        public Task<bool> addCommentFeedback(CommentFeedback newComment);
        public Task<bool> updateCommentFeedbackt(int CommentFeedbackId, CommentFeedback updatedCommentFeedback);
        public Task<bool> updateEvaluate(int CommentFeedbackId, int Evaluate);
        public Task<int> deleteCommentFeedbacks(int[] UserIds);
        public Task<List<CommentFeedback>> deleteCommentFeedbacksByPostTypeAndId(int[] projectId, string typePost);
        public Task<bool> delCommentFeedback(int CommentId);
        public Task<bool> delCommentFeedbackByUserId(int UserId);
        public Task<List<CommentFeedback>> getByTypePostId(string CommentType, int PostId);
        public Task<CommentFeedback> getById(int CommentFeedbackId);
    }
}
