using cuoikiAsp.Respositories;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;


namespace cuoikiAsp.Controllers
{
    [EnableCors("AllowAll")]
    [Route("api/v1/[controller]")]
    [ApiController]
    public class DeparmentController : ControllerBase
    {
        private readonly IDeparmentRespotories _resp;
        public DeparmentController(IDeparmentRespotories resp) {
            _resp = resp;
        }
        [HttpGet]
        public async Task<ActionResult> getAll()
        {
            try
            {
                var departments = await _resp.getAll();

                return Ok(departments);
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu có
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


    }
}
