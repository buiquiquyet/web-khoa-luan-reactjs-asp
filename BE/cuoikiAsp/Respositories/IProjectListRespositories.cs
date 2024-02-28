using cuoikiAsp.DTO;
using cuoikiAsp.Models;

namespace cuoikiAsp.Respositories
{
    public interface IProjectListRespositories
    {
        public Task<List<ProjectList>> getAll();
        public Task<List<ProjectList>> getAllAdmin();
        public Task<bool> addProject(ProjectListDTO newProject);
        public Task<bool> updateProject(int ProjectId, ProjectListDTO updatedProject);
        public Task<string> updateProjectCheckAdmin(List<ProjectList> model);
        public Task<int> deleteProject(int[] ProjectIds);
        public Task<List<ProjectList>> getByUserId(int userId);
        public Task<List<ProjectList>> getThreeDataBig();
        public Task<List<ProjectList>> getThreeDataBigDownload();
        public Task<ProjectList> getById(int ProjectId);
        public Task<List<ProjectList>> getByName(string name);
        public Task<List<ProjectList>> getByUserIDAndName(int UserId, string name);

        public Task<List<ProjectList>> getByKhoa(int departmentId);
        public Task<List<ProjectList>> getDataByNameAndKhoaId(string Name, int departmentId);

    }
}
