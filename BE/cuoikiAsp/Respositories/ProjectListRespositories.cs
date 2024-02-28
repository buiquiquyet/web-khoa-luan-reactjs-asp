using cuoikiAsp.DTO;
using cuoikiAsp.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Xml.Linq;

namespace cuoikiAsp.Respositories
{
    public class ProjectListRespositores : IProjectListRespositories
    {
        private readonly databaseContext _context;

        public ProjectListRespositores(databaseContext context)
        {
            _context = context;
        }

        public async Task<List<ProjectList>> getAll()
        {
            var ProjectList = await _context.ProjectLists
                  .Include(u => u.User)
                   .Where(p =>  p.CheckAdmin == 1)
                  .OrderByDescending(p => p.CreatedDate)
                  .ToListAsync();
            foreach (var project in ProjectList)
            {
               
                project.UserName = project.User?.Name;
                
               
            }


            return ProjectList;
        }
        public async Task<List<ProjectList>> getAllAdmin()
        {
            var ProjectList = await _context.ProjectLists
                  .Include(u => u.User)
                  .OrderByDescending(p => p.CreatedDate)
                  .ToListAsync();
            foreach (var project in ProjectList)
            {

                project.UserName = project.User?.Name;


            }


            return ProjectList;
        }
        private async Task<string> SaveFileAsync(IFormFile file)
        {
            // Mã lưu file giữ nguyên không đổi

            var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "files");

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

        public async Task<bool> addProject(ProjectListDTO newProject)
        {
            try
            {
                
                if (newProject.ImageFile != null)
                {
                    var fileName = await SaveFileAsync(newProject.ImageFile);

                    var projectToAdd = new ProjectList
                    {
                        Name = newProject.Name,
                        Point = newProject.Point,
                        LinkDownload = newProject.LinkDownload,
                        CheckAdmin = newProject.CheckAdmin,
                        Watched = newProject.Watched ?? 0,
                        Download = newProject.Download ?? 0,
                        UserId = newProject.UserId,
                        Discriptions = newProject.Discriptions,
                        SchoolYearId = newProject.SchoolYearId,
                        CreatedDate = newProject.CreatedDate,
                        Image = fileName
                    };
                    _context.ProjectLists.Add(projectToAdd);
                    await _context.SaveChangesAsync();
                    return true;
                }
                else
                {
                    // Trả về false nếu không có tệp hình ảnh
                    return false;
                }
            }
            catch (Exception ex)
            {
                // Xử lý lỗi
                return false;
            }
        }
  
        public async Task<bool> updateProject(int ProjectId, ProjectListDTO updatedProject)
        {
            try
            {
                if (updatedProject == null)
                {
                    return false;
                }

                var existingProject = await _context.ProjectLists.FindAsync(ProjectId);
                if (existingProject == null)
                {
                    return false;
                }

                existingProject.Name = updatedProject.Name ?? existingProject.Name;
                existingProject.Discriptions = updatedProject.Discriptions ?? existingProject.Discriptions;
                existingProject.CreatedDate = updatedProject.CreatedDate ?? existingProject.CreatedDate;
                existingProject.SchoolYearId = updatedProject.SchoolYearId ?? existingProject.SchoolYearId;

                // Nếu có file hình ảnh mới, xử lý nó
                if (updatedProject.ImageFile != null && updatedProject.ImageFile.Length > 0)
                {
                    DeleteProjectFile(existingProject);
                    existingProject.Image = await SaveFileAsync(updatedProject.ImageFile);
                }
                if (updatedProject.Watched != null)
                {
                    existingProject.Watched = updatedProject.Watched;
                }
                if (updatedProject.Download != null )
                {
                    existingProject.Download = updatedProject.Download;
                }

                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                // Log lỗi hoặc xử lý lỗi theo yêu cầu của bạn.
                Console.Error.WriteLine($"Lỗi khi cập nhật dự án: {ex.Message}");
                return false;
            }
        }
        public async Task<string> updateProjectCheckAdmin(List<ProjectList> model)
        {
           
            try
            {
                int total = 0;
                for (int i = 0; i < model.Count; i++)
                {
                    var item = model[i];
                    var itemUpdate = await _context.ProjectLists.FindAsync(item.ProjectListId);
                    if(itemUpdate != null)
                    {
                        itemUpdate.CheckAdmin = item.CheckAdmin;
                        total++;
                    }
                }
                await _context.SaveChangesAsync();
                return $"{total} mục đã được cập nhật ";
            }
           
            catch (Exception ex)
            {
                // Log lỗi hoặc xử lý lỗi theo yêu cầu của bạn.
                Console.Error.WriteLine($"Lỗi khi cập nhật dự án: {ex.Message}");
                return null;
            }
        }

        public async Task<int> deleteProject(int[] ProjectIds)
        {
            try
            {
                var existingProjects = await _context.ProjectLists.Where(u => ProjectIds.Contains(u.ProjectListId)).ToListAsync();

                if (existingProjects == null || existingProjects.Count == 0)
                {
                    return 0;
                }

                foreach (var project in existingProjects)
                {
                    // Xóa file liên quan từ hệ thống tệp
                    DeleteProjectFile(project);

                    // Xóa dự án khỏi cơ sở dữ liệu
                    _context.ProjectLists.Remove(project);
                }

                await _context.SaveChangesAsync();

                return existingProjects.Count;
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

        private void DeleteProjectFile(ProjectList project)
        {
            // Kiểm tra xem project có file liên quan không
            if (!string.IsNullOrEmpty(project.Image))
            {
                // Đường dẫn đến file
                string filePath = Path.Combine("files", project.Image);

                try
                {
                    // Xóa file từ hệ thống tệp
                    File.Delete(filePath);

                    Console.WriteLine($"Đã xóa file: {project.Image}");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Lỗi khi xóa file: {ex.Message}");
                }
            }
        }
        public async Task<List<ProjectList>> getByUserId(int UsertId)
        {
            try
            {
                var Project = await _context.ProjectLists.
                    Where(u => u.UserId == UsertId)
                     .OrderByDescending(p => p.CreatedDate)
                    .ToListAsync();

                return Project;
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu cần
                Console.Error.WriteLine($"Lỗi khi lấy người dùng theo ID: {ex.Message}");
                return null;
            }

        }
        public async Task<List<ProjectList>> getThreeDataBig()
        {
            try
            {
                var projects = await _context.ProjectLists
                     .Include(u => u.User)
                      .Where(p => p.CheckAdmin == 1)
                    .OrderByDescending(p => p.Watched)
                    .Take(3)
                    .ToListAsync();
                foreach (var project in projects)
                {
                    project.UserName = project.User?.Name;

                }
                return projects;
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu cần
                Console.Error.WriteLine($"Lỗi khi lấy dữ liệu: {ex.Message}");
                return null;
            }
        }
        public async Task<List<ProjectList>> getThreeDataBigDownload()
        {
            try
            {
                var projects = await _context.ProjectLists
                     .Include(u => u.User)
                      .Where(p => p.CheckAdmin == 1)
                    .OrderByDescending(p => p.Download)
                    .Take(3)
                    .ToListAsync();
                foreach (var project in projects)
                {
                    project.UserName = project.User?.Name;

                }
                return projects;
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu cần
                Console.Error.WriteLine($"Lỗi khi lấy dữ liệu: {ex.Message}");
                return null;
            }
        }
        public async Task<List<ProjectList>> getByKhoa(int departmentId)
        {
            try
            {
                var projects = await _context.ProjectLists
                    .Include(p => p.User)
                    .ThenInclude(u => u.Department)
                    .Where(p => p.User != null && p.User.DepartmentId == departmentId && p.CheckAdmin == 1)
                    .OrderByDescending(p => p.CreatedDate)
                    .ToListAsync();

                foreach (var project in projects)
                {
                    project.UserName = project.User?.Name;
                }

                return projects;
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu cần
                Console.Error.WriteLine($"Lỗi khi lấy dữ liệu: {ex.Message}");
                return null;
            }
        }
        public async Task<List<ProjectList>> getDataByNameAndKhoaId(string name, int departmentId)
        {
            try
            {
                var projects = await _context.ProjectLists
                    .Include(p => p.User)
                    .ThenInclude(u => u.Department)
                    .Where(p => p.User != null && p.User.DepartmentId == departmentId && p.Name.Contains(name) && p.CheckAdmin == 1)
                    .OrderByDescending(p => p.CreatedDate)
                    .ToListAsync();

                foreach (var project in projects)
                {
                    project.UserName = project.User?.Name;
                }

                return projects;
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu cần
                Console.Error.WriteLine($"Lỗi khi lấy dữ liệu: {ex.Message}");
                return null;
            }
        }
        public async Task<ProjectList> getById(int ProjectId)
        {
            try
            {
                var Project = await _context.ProjectLists.
                    Where(u => u.ProjectListId == ProjectId)
                    .FirstOrDefaultAsync();
                /*if (Project != null)
                {
                    // Loại bỏ ngày tháng năm từ tên tệp hình ảnh
                    Project.Image = RemoveDateAndTimeFromFileName(Project.Image);
                }*/
                return Project;
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu cần
                Console.Error.WriteLine($"Lỗi khi lấy người dùng theo ID: {ex.Message}");
                return null;
            }
        }
        public async Task<List<ProjectList>> getByName(string name)
        {
            try
            {
                var Project = await _context.ProjectLists
                .Include(u => u.User)
                    .Where(u => u.Name.Contains(name) && u.CheckAdmin == 1)
                    .OrderByDescending(p => p.CreatedDate)
                     .ToListAsync();

                foreach (var project in Project)
                {
                    project.UserName = project.User?.Name;

                }


                return Project;
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu cần
                Console.Error.WriteLine($"Lỗi khi lấy người dùng theo ID: {ex.Message}");
                return null;
            }
        }
        public async Task<List<ProjectList>> getByUserIDAndName(int UserId, string name)
        {
            try
            {
                var Project = await _context.ProjectLists
                .Include(u => u.User)
                    .Where(u => u.UserId == UserId && u.Name.Contains(name))
                    .OrderByDescending(p => p.CreatedDate)
                    .ToListAsync();

                foreach (var project in Project)
                {
                    project.UserName = project.User?.Name;

                }


                return Project;
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu cần
                Console.Error.WriteLine($"Lỗi khi lấy người dùng theo ID: {ex.Message}");
                return null;
            }
        }
        public string RemoveDateAndTimeFromFileName(string fileName)
        {
            // Tìm vị trí của dấu gạch chân (_) cuối cùng
            int lastUnderscoreIndex = fileName.LastIndexOf('_');

            if (lastUnderscoreIndex != -1)
            {
                // Loại bỏ phần của chuỗi từ vị trí dấu gạch chân cuối cùng trở đi
                fileName = fileName.Substring(0, lastUnderscoreIndex);
            }

            return fileName;
        }

    }
}
