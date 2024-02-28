using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;


namespace cuoikiAsp.Models
{
    public partial class User
    {
        [NotMapped]
        public string? ClassName { get; set; }
        [NotMapped]
        public string? DepartmentName { get; set; }
        [NotMapped]
        public string? SpecializedName { get; set; }
        public User()
        {
            Comments = new HashSet<Comment>();
            ProjectLists = new HashSet<ProjectList>();
        }

        public int? checkComment { get; set; }
        public int UserId { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? UserGroup { get; set; }
        public int? DepartmentId { get; set; }
        public int? ClassId { get; set; }
        public int? SpecializedId { get; set; }
        public string? Name { get; set; } = null!;
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; } = null!;
        public string? Address { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Sex { get; set; }
        public string? Image { get; set; }

        [System.Text.Json.Serialization.JsonIgnore]
        public virtual Class? Class { get; set; }
        [System.Text.Json.Serialization.JsonIgnore]
        public virtual Department? Department { get; set; }
        [System.Text.Json.Serialization.JsonIgnore]
        public virtual Specialized? Specialized { get; set; }
        [System.Text.Json.Serialization.JsonIgnore]
        public virtual ICollection<Comment>? Comments { get; set; }
        [System.Text.Json.Serialization.JsonIgnore]
        public virtual ICollection<ProjectList>? ProjectLists { get; set; }



    }
}