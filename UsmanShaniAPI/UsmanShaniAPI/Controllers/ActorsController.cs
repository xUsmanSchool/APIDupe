using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UsmanShaniAPI.DBContext;
using UsmanShaniAPI.Model;
using System.Web.Http.Cors;

namespace UsmanShaniAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ActorsController : ControllerBase
    {
        private readonly CollectionContext _context;

        public ActorsController(CollectionContext context)
        {
            _context = context;
        }

        // GET: /Actors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Actor>>> GetActors(string name, string firstName, string sort, int? page, int length = 5, string dir = "asc")
        {
            IQueryable<Actor> query = _context.Actors;

            if (!string.IsNullOrWhiteSpace(name))
                query = query.Where(a => a.Name == name);

            if (!string.IsNullOrWhiteSpace(firstName))
                query = query.Where(a => a.FirstName == firstName);

            if (!string.IsNullOrWhiteSpace(sort))
            {
                switch (sort)
                {
                    case "name":
                        if (dir == "asc")
                            query = query.OrderBy(a => a.Name);
                        else if (dir == "desc")
                            query = query.OrderByDescending(a => a.Name);
                        break;
                    case "firstName":
                        if (dir == "asc")
                            query = query.OrderBy(a => a.FirstName);
                        else if (dir == "desc")
                            query = query.OrderByDescending(a => a.FirstName);
                        break;
                }
            }

            if (page.HasValue)
            {
                query = query.Skip(page.Value * length);
            }
            query = query.Take(length);

            return query.ToList();
        }

        // GET: /Actors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Actor>> GetActor(int id)
        {
            var actor = await _context.Actors.FindAsync(id);

            if (actor == null)
            {
                return NotFound();
            }

            return actor;
        }

        // PUT: /Actors/5
       
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActor(int id, Actor actor)
        {
            if (id != actor.Id)
            {
                return BadRequest();
            }

            _context.Entry(actor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: /Actors
        [HttpPost]
        public async Task<ActionResult<Actor>> PostActor([FromBody]Actor actor)
        {
            _context.Actors.Add(actor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetActor", new { id = actor.Id }, actor);
        }

        // DELETE: /Actors/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Actor>> DeleteActor(int id)
        {
            var actor = await _context.Actors.FindAsync(id);
            if (actor == null)
            {
                return NotFound();
            }

            _context.Actors.Remove(actor);
            await _context.SaveChangesAsync();

            return actor;
        }

        private bool ActorExists(int id)
        {
            return _context.Actors.Any(e => e.Id == id);
        }
    }
}
