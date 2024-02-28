using cuoikiAsp.DTO;
using cuoikiAsp.Models;

namespace cuoikiAsp.Respositories
{
    public interface IUserRespositores
    {
        public Task<List<User>> getAll();
        public Task<bool> addUser(UserDTO newUser);
        public Task<bool> updateUser(int userId, UserDTO updatedUser);

        public Task<bool> updateUserCheckComment(int userId, User updatedUser);
        public Task<int> deleteUser(int[] userIds);
        public Task<User> getById(int userId);
        public Task<User> getByIdCheckComment(int userId);
        public Task<User> getByOnlyUserName(string userName);
        public Task<List<User>> getByName(string userName);
        public Task<User> getByUsername(string username, string pass);

        


    }
}
