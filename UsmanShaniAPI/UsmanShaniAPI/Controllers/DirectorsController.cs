using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UsmanShaniAPI.DBContext;
using UsmanShaniAPI.Model;

namespace UsmanShaniAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DirectorsController : ControllerBase
    {
        private readonly CollectionContext _context;

        public DirectorsController(CollectionContext context)
        {
            _context = context;
        }

        // GET: api/Directors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Director>>> GetDirector()
        {
            return await _context.Director.ToListAsync();
        }

        // GET: api/Directors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Director>> GetDirector(int id)
        {
            var director = await _context.Director.FindAsync(id);

            if (director == null)
            {
                return NotFound();
            }

            return director;
        }

        // PUT: api/Directors/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDirector(int id, Director director)
        {
            if (id != director.DirectorID)
            {
                return BadRequest();
            }

            _context.Entry(director).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DirectorExists(id))
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

        // POST: api/Directors
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Director>> PostDirector(Director director)
        {
            _context.Director.Add(director);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDirector", new { id = director.DirectorID }, director);
        }

        // DELETE: api/Directors/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Director>> DeleteDirector(int id)
        {
            var director = await _context.Director.FindAsync(id);
            if (director == null)
            {
                return NotFound();
            }

            _context.Director.Remove(director);
            await _context.SaveChangesAsync();

            return director;
        }

        private bool DirectorExists(int id)
        {
            return _context.Director.Any(e => e.DirectorID == id);
        }
    }
}
