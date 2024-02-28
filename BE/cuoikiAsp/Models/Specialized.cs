using System;
using System.Collections.Generic;

namespace cuoikiAsp.Models
{
    public partial class Specialized
    {
        public Specialized()
        {
            Classes = new HashSet<Class>();
            Users = new HashSet<User>();
        }

        public int SpecializedId { get; set; }
        public string Name { get; set; } = null!;
        public int? DepartmentId { get; set; }

        public virtual Department? Department { get; set; }
        public virtual ICollection<Class> Classes { get; set; }
        public virtual ICollection<User> Users { get; set; }
    }
}
