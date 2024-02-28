using cuoikiAsp.Models;
using cuoikiAsp.Respositories;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace cuoikiAsp.Controllers
{

    [EnableCors("AllowAll")]
    [Route("api/v1/[controller]")]
    [ApiController]
    public class CommentFeedbackController : ControllerBase
    {
        private readonly ICommentFeedBackRespositories _resp;

        public CommentFeedbackController(ICommentFeedBackRespositories resp)
        {

            _resp = resp;


        }

        [HttpGet]
        public async Task<ActionResult> getAll()
        {
            try
            {
                var comments = await _resp.getAll();

                return Ok(comments);
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu có
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpPost]
        public async Task<ActionResult> addCommentFeedback([FromBody] CommentFeedback newComment)
        {
            try
            {

                if (newComment == null)
                {
                    return BadRequest("Invalid data");
                }


                var result = await _resp.addCommentFeedback(newComment);

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
        public async Task<ActionResult> updateCommentFeedbackt(int id, [FromBody] CommentFeedback updatedComment)
        {
            var success = await _resp.updateCommentFeedbackt(id, updatedComment);

            if (success)
            {
                return Ok("Sửa thông tin thành công");
            }
            else
            {
                return NotFound();
            }
        }
        [HttpPut("Evaluate/{id} {Evaluate}")]
        public async Task<ActionResult> updateEvaluate(int id, int Evaluate)
        {
            var success = await _resp.updateEvaluate(id, Evaluate);

            if (success)
            {
                return Ok("Sửa thông tin thành công");
            }
            else
            {
                return NotFound();
            }
        }
        [HttpDelete("byCommentFeedbackId/{id}")]
        public async Task<ActionResult> delCommentFeedback(int id)
        {
            var success = await _resp.delCommentFeedback(id);

            if (success)
            {
                return Ok("Xóa thành công");
            }
            else
            {
                return NotFound();
            }
        }
        [HttpDelete("byUserId/{id}")]
        public async Task<ActionResult> delCommentFeedbackByUserId(int id)
        {
            var success = await _resp.delCommentFeedbackByUserId(id);

            if (success)
            {
                return Ok("Xóa thành công");
            }
            else
            {
                return NotFound();
            }
        }
        [HttpDelete("delete-multiple")]
        public async Task<ActionResult> deleteComment([FromBody] int[] commentIds)
        {
            if (commentIds == null || commentIds.Length == 0)
            {
                return BadRequest("Mảng ID comment không hợp lệ.");
            }

            var deletedCount = await _resp.deleteCommentFeedbacks(commentIds);

            if (deletedCount > 0)
            {
                return Ok($"Đã xóa {deletedCount} comment thành công.");
            }
            else
            {
                return NotFound("Không tìm thấy comment để xóa.");
            }
        }
        [HttpDelete("delByPostTypeAndId/delete-multiple")]
        public async Task<ActionResult> delByPostTypeAndId([FromBody] int[] PostIds, string typePost)
        {
            if (PostIds == null || PostIds.Length == 0 || typePost == "")
            {
                return BadRequest("Mảng ID comment không hợp lệ.");
            }

            var deletedCount = await _resp.deleteCommentFeedbacksByPostTypeAndId(PostIds, typePost);

            if (deletedCount != null)
            {
                return Ok(deletedCount);
            }
            else
            {
                return NotFound("Không tìm thấy comment để xóa.");
            }
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<CommentFeedback>> GetCommentById(int id)
        {
            var comment = await _resp.getById(id);

            if (comment == null)
            {
                return NotFound();
            }

            return Ok(comment);
        }
        [HttpGet("getByTypePost/{CommentType} {PostId}")]
        public async Task<ActionResult<CommentFeedback>> GetByTypePostId(string CommentFeedbackType, int PostId)
        {
            var comment = await _resp.getByTypePostId(CommentFeedbackType, PostId);

            if (comment == null)
            {
                return NotFound();
            }

            return Ok(comment);
        }

    }
}
