using System;
using System.Collections.Generic;

namespace cuoikiAsp.Models
{
    public partial class Forum
    {
        public int ForumId { get; set; }
        public string? Title { get; set; }
        public string? Discriptions { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
}
