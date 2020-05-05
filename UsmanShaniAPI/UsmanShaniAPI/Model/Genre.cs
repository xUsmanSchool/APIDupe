using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace UsmanShaniAPI.Model
{
    public class Genre
    {
        public int GenreId { get; set; }
        public string Name { get; set; }
        public Movie Movie { get; set; }
    }
}
