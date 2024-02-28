using cuoikiAsp.Models;
using cuoikiAsp.Respositories;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace cuoikiAsp.Controllers
{
    [EnableCors("AllowAll")]
    [Route("api/v1/[controller]")]
    [ApiController]
    public class ForumController : ControllerBase
    {
        private readonly IForumRespositories _resp;

        public ForumController(IForumRespositories resp)
        {
            _resp = resp;

        }

        [HttpGet]
        public async Task<ActionResult> getAll()
        {
            try
            {
                var forums = await _resp.getAll();

                return Ok(forums);
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu có
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpPost]
        public async Task<ActionResult> addForum([FromBody] Forum newForum)
        {
            try
            {

                if (newForum == null)
                {
                    return BadRequest("Invalid data");
                }
                var result = await _resp.addForum(newForum);

                if (result)
                {
                    return Ok("Thêm Thành Công");
                }
                else
                {
                    return StatusCode(500, "Error inserting user");
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
        public async Task<ActionResult> updateForum(int id, [FromBody] Forum updatedForum)
        {
            var success = await _resp.updateForum(id, updatedForum);

            if (success)
            {
                return Ok("Sửa thông tin thành công");
            }
            else
            {
                return NotFound();
            }
        }
        [HttpDelete("delete-multiple")]
        public async Task<ActionResult> deleteForum([FromBody] int[] forrumIds)
        {
            if (forrumIds == null || forrumIds.Length == 0)
            {
                return BadRequest("Mảng ID diễn đàn không hợp lệ.");
            }

            var deletedCount = await _resp.deleteForum(forrumIds);

            if (deletedCount > 0)
            {
                return Ok($"Đã xóa {deletedCount} diễn đàn thành công.");
            }
            else
            {
                return NotFound("Không tìm thấy diễn đàn để xóa.");
            }
        }
        [HttpGet("getByName/{name}")]
        public async Task<ActionResult<Forum>> GetForumByName(string name)
        {
            var user = await _resp.getByName(name);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Forum>> GetForumById(int id)
        {
            var forrum = await _resp.getById(id);

            if (forrum == null)
            {
                return NotFound();
            }

            return Ok(forrum);
        }
        [HttpGet("getByUsername/{username} {pass}")]
        public async Task<ActionResult<Forum>> GetByForumTitle(string username)
        {
            var forrum = await _resp.getByForumTitle(username);

            if (forrum == null)
            {
                return NotFound();
            }

            return Ok(forrum);
        }
    }
}

