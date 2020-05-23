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

            var NewDirector = new Director()
            {
                Name = "Stahelski",
                FirstName = "Chad"
            };

            if (!context.Director.Any())
            {
                context.Director.Add(NewDirector);
                context.SaveChanges();
            }

            if (!context.Actors.Any())
            {
                var NewActor = new Actor()
                {
                    Name = "Reeves",
                    FirstName = "Keanu",
                    Age = 54,
                    DateOfBirth = DateTime.Parse("02/09/1964"),
                    PlaceOfBirth = "Beiroet, Libanon",
                    ImageUrl = "https://www.rtlnieuws.nl/sites/default/files/styles/liggend/public/content/images/2019/12/12/ANP121219015-1.jpg?h=a9edb586&itok=Qx8DYke0"
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
                    Rating = 72,
                    Director = NewDirector
                };
                context.Movies.Add(NewMovie);
                context.SaveChanges();
            }

            
        }
    }
}
