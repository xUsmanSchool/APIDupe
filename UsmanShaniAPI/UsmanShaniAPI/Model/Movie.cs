using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace UsmanShaniAPI.Model
{
    public class Movie
    {
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        [Required]
        public string Name { get; set; }
        [Required]
        [DataMember]
        public int ReleaseYear { get; set; }
        [Required]
        [DataMember]
        public int Length { get; set; }
        [Required]
        [DataMember]
        public int Rating { get; set; }
        [DataMember]
        [JsonIgnore]
        public int DirectorId { get; set; }
        [Required]
        [DataMember]
        public Director Director { get; set; }

        [JsonIgnore]
        public IList<MovieActors> MovieActors { get; set; }
    }
}
