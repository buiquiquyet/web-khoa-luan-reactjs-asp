using cuoikiAsp.Models;

namespace cuoikiAsp.Respositories
{
    public interface IForumRespositories
    {
        public Task<List<Forum>> getAll();
        public Task<bool> addForum(Forum newForum);
        public Task<bool> updateForum(int userId, Forum updatedForum);
        public Task<int> deleteForum(int[] ForumIds);
        public Task<Forum> getById(int ForumId);
        public Task<List<Forum>> getByName(string name);
        public Task<Forum> getByForumTitle(string title);
    }
}
