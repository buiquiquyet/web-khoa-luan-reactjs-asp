using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace cuoikiAsp.Models
{
    public partial class ProjectList
    {
        [NotMapped]
        public string? UserName { get; set; } = null!;

        public int ProjectListId { get; set; }
        public string? Name { get; set; }
        public string? Point { get; set; }
        public string? LinkDownload { get; set; }
        public int? UserId { get; set; }
        public int? CheckAdmin { get; set; } 
        public string? Image { get; set; }
        public string? Discriptions { get; set; }
        public int? Watched { get; set; }
        public int? Download { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? SchoolYearId { get; set; }

        [System.Text.Json.Serialization.JsonIgnore]
        public virtual SchoolYear? SchoolYear { get; set; }
        [System.Text.Json.Serialization.JsonIgnore]
        public virtual User? User { get; set; } = null!;
    }
}
