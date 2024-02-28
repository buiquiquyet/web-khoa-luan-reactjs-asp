using System.ComponentModel.DataAnnotations.Schema;

namespace cuoikiAsp.DTO
{
    public class UserDTO
    {
        public int? checkComment { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? UserGroup { get; set; }
        public int? DepartmentId { get; set; }
        public int? ClassId { get; set; }
        public int? SpecializedId { get; set; }
        public string Name { get; set; } = null!;
        public string? PhoneNumber { get; set; }
        public string Email { get; set; } = null!;
        public string? Address { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Sex { get; set; }

        public IFormFile? ImageFile { get; set; }
    }
}
