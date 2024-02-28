using cuoikiAsp.Models;

namespace cuoikiAsp.DTO
{
    public class ProjectListDTO
    {
       
        public int? CheckAdmin { get; set; }

        public string? Name { get; set; } 
        public string? Point { get; set; }
        public string? LinkDownload { get; set; } 
        public int? UserId { get; set; }
        public string? Evaluate { get; set; }
        public string? Discriptions { get; set; }
        public int? Watched { get; set; }
        public int? Download { get; set; }
        
        public DateTime? CreatedDate { get; set; }
        public int? SchoolYearId { get; set; }

        public IFormFile? ImageFile { get; set; }
    }
}
