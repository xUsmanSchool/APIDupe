using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UsmanShaniAPI.Model;

namespace UsmanShaniAPI.DBContext
{
    public class DBInitializer
    {
        public static void Initialize(CollectionContext context)
        {
            context.Database.EnsureCreated();

            if (!context.Actors.Any())
            {
                var NewActor = new Actor()
                {
                    Name = "Reeves",
                    FirstName = "Keanu",
                    Age = 54,
                    DateOfBirth = DateTime.Parse("02/09/1964"),
                    PlaceOfBirth = "Beiroet, Libanon"
                };
                context.Actors.Add(NewActor);
                context.SaveChanges();
            }

            if (!context.Movies.Any())
            {
                var NewMovie = new Movie()
                {
                    Name = "John Wick",
                    ReleaseYear = 2014,
                    Length = 101,
                    Rating = 72
                };
                context.Movies.Add(NewMovie);
                context.SaveChanges();
            }
        }
    }
}
