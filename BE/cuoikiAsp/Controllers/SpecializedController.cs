using cuoikiAsp.Respositories;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;


namespace cuoikiAsp.Controllers
{
    [EnableCors("AllowAll")]
    [Route("api/v1/[controller]")]
    [ApiController]
    public class SpecializedController : ControllerBase
    {
        private readonly ISpecializedRespositories _resp;
        public SpecializedController(ISpecializedRespositories resp)
        {
            _resp = resp;
        }
        [HttpGet]
        public async Task<ActionResult> getAll()
        {
            try
            {
                var specializeds = await _resp.getAll();

                return Ok(specializeds);
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu có
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("getByDeparmentId/{id}")]
        public async Task<ActionResult> getByDeparmentId(int id )
        {
            try
            {
                var specialized = await _resp.getByDeparmentId(id);

                if (specialized != null)
                {
                    return Ok(specialized);
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
                var specialized = await _resp.getId(id);

                if (specialized != null)
                {
                    return Ok(specialized);
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

        /*// POST api/<SpecializedController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<SpecializedController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<SpecializedController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }*/
    }
}
