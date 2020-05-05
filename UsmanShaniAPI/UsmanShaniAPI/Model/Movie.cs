using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UsmanShaniAPI.Model
{
    public class Movie
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int ReleaseYear { get; set; }
        public ICollection<Genre> Genre { get; set; }
        public int Length { get; set; }
        public int Rating { get; set; }
        public IList<MovieActors> MovieActors { get; set; }
    }
}
