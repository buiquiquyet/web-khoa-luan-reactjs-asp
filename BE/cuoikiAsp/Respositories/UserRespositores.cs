using cuoikiAsp.DTO;
using cuoikiAsp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace cuoikiAsp.Respositories
{
    public class UserRespositores : IUserRespositores
    {
        private readonly databaseContext _context;

        public UserRespositores(databaseContext context)
        {
            _context = context;
        }

        public async Task<List<User>> getAll()
        {
            var users = await _context.Users
                .Include(u => u.Class)
                .Include(u => u.Department)
                .Include(u => u.Specialized)
                .ToListAsync();

            foreach (var user in users)
            {
                user.ClassName = user.Class?.Name;
                user.DepartmentName = user.Department?.Name;
                user.SpecializedName = user.Specialized?.Name;
            }

            return users;
        }
        private async Task<string> SaveFileAsync(IFormFile file)
        {
            // Mã lưu file giữ nguyên không đổi

            var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "images");

            // Tạo thư mục lưu trữ nếu chưa tồn tại
            if (!Directory.Exists(uploadFolder))
            {
                Directory.CreateDirectory(uploadFolder);
            }

            // Lấy tên file không kèm đuôi mở rộng
            var fileName = Path.GetFileNameWithoutExtension(file.FileName);

            // Lấy đuôi mở rộng của file
            var fileExtension = Path.GetExtension(file.FileName);

            // Tạo tên file mới để tránh trùng lặp
            var uniqueFileName = $"{fileName}_{DateTime.Now:yyyyMMddHHmmssfff}{fileExtension}";

            var filePath = Path.Combine(uploadFolder, uniqueFileName);

            // Lưu file vào đường dẫn
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream); // Sử dụng CopyToAsync để đợi hoàn tất
            }

            return uniqueFileName;
        }
        public async Task<bool> addUser( UserDTO newUser)
        {
            try
            {
                var fileName = await SaveFileAsync(newUser.ImageFile);
                var UserToAdd = new User
                {
                    Username = newUser.Username,
                    Password = newUser.Password,
                    UserGroup = newUser.UserGroup,
                    PhoneNumber = newUser.PhoneNumber,
                    Address = newUser.Address,
                    Name = newUser.Name,
                    Email = newUser.Email,
                    DateOfBirth = newUser.DateOfBirth,
                    Sex = newUser.Sex,
                    checkComment = newUser.checkComment ?? 0,
                    ClassId = newUser.ClassId,
                    DepartmentId = newUser.DepartmentId,
                    SpecializedId = newUser.SpecializedId,
                    Image = fileName

                };
                 _context.Users.Add(UserToAdd);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
               
                return false;              
            }
        }
        public async Task<bool> updateUser(int userId, UserDTO updatedUser)
        {
            try
            {
                if (updatedUser == null)
                {
                    return false;
                }

                var existingUser = await _context.Users.FindAsync(userId);
                if (existingUser == null)
                {
                    return false;
                }

                existingUser.Username = updatedUser.Username;
                existingUser.Password = updatedUser.Password;
                existingUser.UserGroup = updatedUser.UserGroup;
                existingUser.PhoneNumber = updatedUser.PhoneNumber;
                existingUser.Address = updatedUser.Address;
                existingUser.Name = updatedUser.Name;
                existingUser.Email = updatedUser.Email;
                existingUser.DateOfBirth = updatedUser.DateOfBirth;
                existingUser.Sex = updatedUser.Sex;

                
                existingUser.ClassId = updatedUser.ClassId;
                existingUser.DepartmentId = updatedUser.DepartmentId;
                existingUser.SpecializedId = updatedUser.SpecializedId;

                if (updatedUser.ImageFile != null )
                {
                    DeleteUserFile(existingUser);
                    existingUser.Image = await SaveFileAsync(updatedUser.ImageFile);
                }
                /*DeleteUserFile(existingUser);
                existingUser.Image = await SaveFileAsync(updatedUser.ImageFile);*/
                

                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                // Log lỗi hoặc xử lý lỗi theo yêu cầu của bạn.
                return false;
            }
        }
        public async Task<bool> updateUserCheckComment(int userId, User updatedUser)
        {
            try
            {
                if (updatedUser == null)
                {
                    return false;
                }

                var existingUser = await _context.Users.FindAsync(userId);
                if (existingUser == null)
                {
                    return false;
                }
                existingUser.checkComment = updatedUser.checkComment;


                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                // Log lỗi hoặc xử lý lỗi theo yêu cầu của bạn.
                return false;
            }
        }
        public async Task<int> deleteUser(int[] userIds)
        {
            try
            {
                var existingUsers = await _context.Users.Where(u => userIds.Contains(u.UserId)).ToListAsync();

                if (existingUsers == null || existingUsers.Count == 0)
                {
                    return 0;
                }

                foreach (var user in existingUsers)
                {
                    // Xóa file liên quan từ hệ thống tệp
                    DeleteUserFile(user);

                    // Xóa dự án khỏi cơ sở dữ liệu
                    _context.Users.Remove(user);
                }

                await _context.SaveChangesAsync();

                return existingUsers.Count;
            }
            catch (DbUpdateException ex)
            {
                // Xử lý lỗi cơ sở dữ liệu, log lỗi nếu cần
                Console.Error.WriteLine($"Lỗi khi xóa nhiều dự án: {ex.Message}");
                return 0;
            }
            catch (Exception ex)
            {
                // Xử lý lỗi chung, log lỗi nếu cần
                Console.Error.WriteLine($"Lỗi khi xóa nhiều dự án: {ex.Message}");
                return 0;
            }
        }

        private void DeleteUserFile(User user)
        {
            // Kiểm tra xem project có file liên quan không
            if (!string.IsNullOrEmpty(user.Image))
            {
                // Đường dẫn đến file
                string filePath = Path.Combine("images", user.Image);

                try
                {
                    // Xóa file từ hệ thống tệp
                    File.Delete(filePath);

                    Console.WriteLine($"Đã xóa file: {user.Image}");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Lỗi khi xóa file: {ex.Message}");
                }
            }
        }
        public async Task<User> getById(int userId)
        {
            try
            {
                var user = await _context.Users
                    .Include(u => u.Class)
                    .Include(u => u.Department)
                    .Include(u => u.Specialized)
                    .FirstOrDefaultAsync(u => u.UserId == userId);

                if (user != null)
                {
                    user.ClassName = user.Class?.Name;
                    user.DepartmentName = user.Department?.Name;
                    user.SpecializedName = user.Specialized?.Name;
                }

                return user;
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu cần
                Console.Error.WriteLine($"Lỗi khi lấy người dùng theo ID: {ex.Message}");
                return null;
            }
        }
        public async Task<User> getByOnlyUserName(string userName)
        {
            try
            {
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.Username == userName);
                return user;
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu cần
                Console.Error.WriteLine($"Lỗi khi lấy người dùng theo ID: {ex.Message}");
                return null;
            }
        }
        public async Task<User> getByIdCheckComment(int userId)
        {
            try
            {
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.UserId == userId && u.checkComment == 1);
                return user;
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu cần
                Console.Error.WriteLine($"Lỗi khi lấy người dùng theo ID: {ex.Message}");
                return null;
            }
        }
        public async Task<List<User>> getByName(string userName)
        {
            try
            {
                var users = await _context.Users
                    .Include(u => u.Class)
                    .Include(u => u.Department)
                    .Include(u => u.Specialized)
                    .Where(u => u.Name.Contains(userName))
                    .ToListAsync();

                foreach (var user in users)
                {
                    user.ClassName = user.Class?.Name;
                    user.DepartmentName = user.Department?.Name;
                    user.SpecializedName = user.Specialized?.Name;
                }

                return users;
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu cần
                Console.Error.WriteLine($"Lỗi khi lấy danh sách người dùng theo tên: {ex.Message}");
                return null;
            }
        }
        public async Task<User> getByUsername(string username, string pass)
        {

            try
            {
                var user = await _context.Users
                    .Where(u => u.Username == username && u.Password == pass)
                    .FirstOrDefaultAsync();
                if (user != null)
                {
                    user.ClassName = user.Class?.Name;
                    user.DepartmentName = user.Department?.Name;
                    user.SpecializedName = user.Specialized?.Name;
                }

                return user;
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
