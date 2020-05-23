using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UsmanShaniAPI.Model
{
    public class Director
    {
        public int DirectorID { get; set; }
        public string Name { get; set; }
        public string FirstName { get; set; }
        [JsonIgnore]
        public ICollection<Movie> Movie { get; set; }
    }
}
