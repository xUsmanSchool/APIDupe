using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UsmanShaniAPI.Model;

namespace UsmanShaniAPI.DBContext
{
    public class CollectionContext : DbContext
    {
        public CollectionContext(DbContextOptions<CollectionContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MovieActors>()
                .HasKey(movieActors => new { movieActors.ActorId, movieActors.MovieId });

            modelBuilder.Entity<MovieActors>()
                .HasOne(movieActors => movieActors.Movie)
                .WithMany(ma => ma.MovieActors)
                .HasForeignKey(fk => fk.MovieId);

            modelBuilder.Entity<MovieActors>()
                .HasOne(movieActors => movieActors.Actor)
                .WithMany(ma => ma.MovieActors)
                .HasForeignKey(fk => fk.ActorId);

            modelBuilder.Entity<Genre>()
                .HasOne<Movie>(g => g.Movie)
                .WithMany(m => m.Genre)
                .HasForeignKey(fk => fk.GenreId);
        }

        public DbSet<Actor> Actors { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<MovieActors> MovieActors { get; set; }
        public DbSet<UsmanShaniAPI.Model.Genre> Genre { get; set; }

    }
}
