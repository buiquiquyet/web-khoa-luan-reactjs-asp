using cuoikiAsp.Models;
using cuoikiAsp.Respositories;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace cuoikiAsp.Controllers
{
    [EnableCors("AllowAll")]
    [Route("api/v1/[controller]")]
    [ApiController]
    public class EvaluateController : ControllerBase
    {
        private readonly IEvaluateRespositories _resp;

        public EvaluateController(IEvaluateRespositories resp)
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
        public async Task<ActionResult> addEvaluate([FromBody] Evaluate newEvaluate)
        {
            try
            {

                if (newEvaluate == null)
                {
                    return BadRequest("Invalid data");
                }


                var result = await _resp.addEvaluate(newEvaluate);

                if (result)
                {
                    return Ok("Thêm Thành Công");
                }
                else
                {
                    return StatusCode(500, "Error inserting Evalute");
                }

            }
            catch (Exception ex)
            {
                // Log hoặc in ra lỗi để xác định nguyên nhân cụ thể
                Console.WriteLine($"Error: {ex}");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpPut("{CommentId} {UserId}")]
        public async Task<ActionResult> updateEvaluate(int CommentId, int UserId,  [FromBody] Evaluate updatedComment)
        {
            var success = await _resp.updateEvaluate(CommentId, UserId, updatedComment);

            if (success)
            {
                return Ok("Sửa thông tin thành công");
            }
            else
            {
                return NotFound();
            }
        }
        [HttpDelete("byUserIdArr/delete-multiple")]
        public async Task<ActionResult> deleteByUserIdArr([FromBody] int[] userIds)
        {
            if (userIds == null || userIds.Length == 0)
            {
                return BadRequest("Mảng ID userId không hợp lệ.");
            }

            var deletedCount = await _resp.deleteEvaluateByUserIdArr(userIds);

            if (deletedCount > 0)
            {
                return Ok($"Đã xóa {deletedCount} đánh giá thành công.");
            }
            else
            {
                return NotFound("Không tìm thấy đánh giá để xóa.");
            }
        }
        [HttpDelete("byCommentIdArr/delete-multiple")]
        public async Task<ActionResult> deleteByCommentIdArr([FromBody] int[] commentId)
        {
            if (commentId == null || commentId.Length == 0)
            {
                return BadRequest("Mảng ID comment không hợp lệ.");
            }

            var deletedCount = await _resp.deleteEvaluateByCommetnIdArr(commentId);

            if (deletedCount > 0)
            {
                return Ok($"Đã xóa {deletedCount} comment thành công.");
            }
            else
            {
                return NotFound("Không tìm thấy đánh giá để xóa.");
            }
        }
        [HttpDelete("{CommentId} {UserId}")]
        public async Task<ActionResult> deleteEvaluate(int CommentId, int UserId)
        {
            var success = await _resp.delEvaluate(CommentId, UserId);

            if (success)
            {
                return Ok("Xóa thành công");
            }
            else
            {
                return NotFound();
            }
        }
        [HttpDelete("byCommentId/{CommentId}")]
        public async Task<ActionResult> deleteEvaluateByCommentId(int CommentId)
        {
            var success = await _resp.delEvaluateByCommentId(CommentId);

            if (success)
            {
                return Ok("Xóa thành công");
            }
            else
            {
                return NotFound();
            }
        }
        [HttpDelete("byUserId/{UserId}")]
        public async Task<ActionResult> deleteEvaluateByUserId(int UserId)
        {
            var success = await _resp.delEvaluateByUserId(UserId);

            if (success)
            {
                return Ok("Xóa thành công");
            }
            else
            {
                return NotFound();
            }
        }
        [HttpGet("{CommentId}")]
        public async Task<ActionResult<List<string>>> GetByCommentIdToUserName(int CommentId)
        {
            var userNames = await _resp.getByCommentIdToUserName(CommentId);

            if (userNames == null)
            {
                return NotFound();
            }

            return Ok(userNames);
        }
        [HttpGet("getByCommentId/{CommentId}")]
        public async Task<ActionResult<Evaluate>> GetByCommentId(int CommentId)
        {
            var comment = await _resp.getByCommentId(CommentId);

            if (comment == null)
            {
                return NotFound();
            }

            return Ok(comment);
        }



    }
}
