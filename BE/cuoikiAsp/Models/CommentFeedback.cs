using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace cuoikiAsp.Models
{
    public partial class CommentFeedback
    {
        public int CommentId { get; set; }
        public int UserId { get; set; }
        public string? FullName { get; set; } = null!;


        public string? Email { get; set; }
        public DateTime? CommentDate { get; set; }
        public string? Discriptions { get; set; } = null!;
        public string? CommentType { get; set; }
        public int PostId { get; set; }

        public int? ByUserId { get; set; }
        [NotMapped]
        public string? ClassName { get; set; } = null!;
        [NotMapped]
        public string? UserGroup { get; set; } = null!;
        [JsonIgnore]
        public virtual User? User { get; set; } = null!;

       
      

      
    }
}
