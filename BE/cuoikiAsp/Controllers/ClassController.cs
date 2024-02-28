using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using cuoikiAsp.Respositories;

namespace cuoikiAsp.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class ClassController : ControllerBase
    {
        private readonly IClassRespositories _resp;
        public ClassController(IClassRespositories resp)
        {
            _resp = resp;
        }

        [HttpGet]
        public async Task<ActionResult> getAll()
        {
            return Ok(await _resp.getAll());
        }
        [HttpGet("getSpecializedId/{id}")]
        public async Task<ActionResult> getSpecializedId(int id)
        {
            try
            {
                var classs = await _resp.getSpecializedId(id);

                if (classs != null)
                {
                    return Ok(classs);
                }
                else
                {
                    return NotFound($"Specialized with ID {id} not found");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("getId/{id}")]
        public async Task<ActionResult> getId(int id)
        {
            try
            {
                var classs = await _resp.getId(id);

                if (classs != null)
                {
                    return Ok(classs);
                }
                else
                {
                    return NotFound($"Specialized with ID {id} not found");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
    
}
