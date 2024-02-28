using cuoikiAsp.Respositories;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace cuoikiAsp.Controllers
{
    [EnableCors("AllowAll")]
    [Route("api/v1/[controller]")]
    [ApiController]
    public class SchoolYearController : ControllerBase
    {
        private readonly ISchoolYearRespositories _resp;
        public SchoolYearController(ISchoolYearRespositories resp)
        {
            _resp = resp;
        }

        [HttpGet]
        public async Task<ActionResult> getAll()
        {
            try
            {
                var users = await _resp.getAll();

                return Ok(users);
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu có
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
