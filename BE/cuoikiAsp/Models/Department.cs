using System;
using System.Collections.Generic;

namespace cuoikiAsp.Models
{
    public partial class Department
    {
        public Department()
        {
            Classes = new HashSet<Class>();
            Specializeds = new HashSet<Specialized>();
            Users = new HashSet<User>();
        }

        public int DepartmentId { get; set; }
        public string? Name { get; set; }
        [System.Text.Json.Serialization.JsonIgnore]
        public virtual ICollection<Class> Classes { get; set; }
        [System.Text.Json.Serialization.JsonIgnore]
        public virtual ICollection<Specialized> Specializeds { get; set; }
        [System.Text.Json.Serialization.JsonIgnore]
        public virtual ICollection<User> Users { get; set; }
    }
}
