using cuoikiAsp.Models;

namespace cuoikiAsp.Respositories
{
    public interface IEvaluateRespositories
    {
        public Task<List<Evaluate>> getAll();
        public Task<bool> addEvaluate(Evaluate newEvaluate);
        public Task<bool> updateEvaluate(int CommentId, int UserId,  Evaluate updatedEvaluate);
        public Task<int> deleteEvaluateByUserIdArr(int[] UserIds);
        public Task<int> deleteEvaluateByCommetnIdArr(int[] CommetnId);
        public Task<bool> delEvaluate(int CommentId, int UserId );
        public Task<bool> delEvaluateByCommentId(int CommentId);
        public Task<bool> delEvaluateByUserId(int UserId);
        public Task<List<string>> getByCommentIdToUserName(int CommentId);
        public Task<int> getByCommentId(int CommentId);
    }
       
}
