using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace cuoikiAsp.Models
{
    public partial class Evaluate
    {
        [NotMapped]
        public string? UserName { get; set; }
        public int EvaluateId { get; set; }
        public int UserId { get; set; }
        public int CommentId { get; set; }

        [System.Text.Json.Serialization.JsonIgnore]
        public User? User { get; set; }
    }
}
