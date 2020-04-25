using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UsmanShaniAPI.Model
{
    public class Actor
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string FirstName { get; set; }
        public int Age { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string PlaceOfBirth { get; set; }
        public IList<MovieActors> MovieActors { get; set; }
    }
}
