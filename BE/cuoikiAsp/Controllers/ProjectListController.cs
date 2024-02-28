using cuoikiAsp.DTO;
using cuoikiAsp.Models;
using cuoikiAsp.Respositories;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace cuoikiAsp.Controllers
{
   
    [EnableCors("AllowAll")]
    [Route("api/v1/[controller]")]
    [ApiController]
    public class ProjectListController : ControllerBase
    {
        private readonly IProjectListRespositories _resp;


        public ProjectListController(IProjectListRespositories resp)
        {

            _resp = resp;


        }

        [HttpGet]
        public async Task<ActionResult> getAll()
        {
            try
            {
                var Projects = await _resp.getAll();

                return Ok(Projects);
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu có
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("getAllAdmin")]
        public async Task<ActionResult> getAllAdmin()
        {
            try
            {
                var Projects = await _resp.getAllAdmin();

                return Ok(Projects);
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu có
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpPost]
        public async Task<ActionResult> addProject([FromForm] ProjectListDTO newProject)
        {
            try
            {

                if (newProject == null)
                {
                    return BadRequest("Invalid data");
                }
                var rs = await _resp.addProject(newProject);
                if (rs)
                {
                    return Ok("Thành công");
                }
                else
                {
                    return BadRequest();
                }


            }
            catch (Exception ex)
            {
                // Log hoặc in ra lỗi để xác định nguyên nhân cụ thể
                Console.WriteLine($"Error: {ex}");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> updateProject(int id, [FromForm] ProjectListDTO updatedProject)
        {
            var success = await _resp.updateProject(id, updatedProject);

            if (success)
            {
                return Ok("Sửa thông tin thành công");
            }
            else
            {
                return NotFound();
            }
        }
        [HttpPut("checkAdmin")]
        public async Task<ActionResult<ProjectList>> UpdateProjectsCheckAdmin([FromBody] List<ProjectList> model)
        {
            try
            {
                return Ok(await _resp.updateProjectCheckAdmin(model));
            }
            catch (Exception ex)
            {
                // Log lỗi hoặc xử lý lỗi theo yêu cầu của bạn.
                Console.Error.WriteLine($"Lỗi khi cập nhật dự án: {ex.Message}");
                return StatusCode(500, "Lỗi trong quá trình xử lý");
            }
        }

        [HttpDelete("delete-multiple")]
        public async Task<ActionResult> deleteProject([FromBody] int[] ProjectIds)
        {
            if (ProjectIds == null || ProjectIds.Length == 0)
            {
                return BadRequest("Mảng ID người dùng không hợp lệ.");
            }

            var deletedCount = await _resp.deleteProject(ProjectIds);

            if (deletedCount > 0)
            {
                return Ok($"Đã xóa {deletedCount} Project thành công.");
            }
            else
            {
                return NotFound("Không tìm thấy người dùng để xóa.");
            }
        }
        [HttpGet("getByUserId/{id}")]
        public async Task<ActionResult<ProjectList>> GetByUserId(int id)
        {
            var user = await _resp.getByUserId(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
        [HttpGet("getByName/{name}")]
        public async Task<ActionResult<ProjectList>> GetByName(string name)
        {
            var user = await _resp.getByName(name);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
        [HttpGet("getByUserIdAndName/{userId} {name}")]
        public async Task<ActionResult<ProjectList>> GetByUserIdAndName(int userId, string name)
        {
            var user = await _resp.getByUserIDAndName(userId,name);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var project = await _resp.getById(id);

            if (project == null)
            {
                return NotFound();
            }

            return Ok(project);
        }
        [HttpGet("getThreeDataBig")]
        public async Task<ActionResult> getThreeDataBig()
        {
            var project = await _resp.getThreeDataBig();

            if (project == null)
            {
                return NotFound();
            }

            return Ok(project);
        }
        [HttpGet("getThreeDataBigDownload")]
        public async Task<ActionResult> getThreeDataBigDownload()
        {
            var project = await _resp.getThreeDataBigDownload();

            if (project == null)
            {
                return NotFound();
            }

            return Ok(project);
        }
        [HttpGet("getByKhoa/{departmentId}")]
        public async Task<ActionResult> getByKhoa(int departmentId)
        {
            var project = await _resp.getByKhoa(departmentId);

            if (project == null)
            {
                return NotFound();
            }

            return Ok(project);
        }
        [HttpGet("getDataByNameAndKhoaId/{name} {departmentId}")]
        public async Task<ActionResult> getDataByNameAndKhoaId(string name, int departmentId)
        {
            var project = await _resp.getDataByNameAndKhoaId(name, departmentId);

            if (project == null)
            {
                return NotFound();
            }

            return Ok(project);
        }


    }

}

