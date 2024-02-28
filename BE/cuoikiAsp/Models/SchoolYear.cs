using System;
using System.Collections.Generic;

namespace cuoikiAsp.Models
{
    public partial class SchoolYear
    {
        public SchoolYear()
        {
            Classes = new HashSet<Class>();
            ProjectLists = new HashSet<ProjectList>();
        }

        public int SchoolYearId { get; set; }
        public string Name { get; set; } = null!;

        public virtual ICollection<Class> Classes { get; set; }
        public virtual ICollection<ProjectList> ProjectLists { get; set; }
    }
}
