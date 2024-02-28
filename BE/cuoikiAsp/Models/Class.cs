using System;
using System.Collections.Generic;

namespace cuoikiAsp.Models
{
    public partial class Class
    {
        public Class()
        {
            Users = new HashSet<User>();
        }

        public int ClassId { get; set; }
        public string Name { get; set; } = null!;
        public int? DepartmentId { get; set; }
        public int? SchoolYearId { get; set; }
        public int? SpecializedId { get; set; }

        public virtual Department? Department { get; set; }
        public virtual SchoolYear? SchoolYear { get; set; }
        public virtual Specialized? Specialized { get; set; }
        public virtual ICollection<User> Users { get; set; }
    }
}
