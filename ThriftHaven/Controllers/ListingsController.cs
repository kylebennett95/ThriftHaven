using ThriftHaven.Models;
using ThriftHaven.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace ThriftHaven.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ListingsController : ControllerBase
    {
        private readonly IListingRepository _listingRepo;

        public ListingsController(IListingRepository listingRepo)
        {
            _listingRepo = listingRepo;
        }

        [HttpGet("search")]
        public ActionResult Search(string q) 
        {
            return Ok(_listingRepo.Search(q));
        }

        [HttpGet]
        public ActionResult GetAll(string? categoryIds = null, string? searchCriterion = null) 
        {
            return Ok(_listingRepo.GetAll(categoryIds, searchCriterion));
        }

        [HttpGet("{id}")]
        public ActionResult Get(int id) 
        {
            var listing = _listingRepo.GetById(id);
            if (listing == null)
            {
                return NotFound();
            }
            return Ok(listing);
        }

        [HttpGet("category/{id}")]
        public ActionResult GetByCategoryId(int id) 
        {
            return Ok(_listingRepo.GetByCategoryId(id));
        }

        [HttpPost]
        public IActionResult Post(Listing listing)
        {
            _listingRepo.Add(listing);
            return CreatedAtAction("Get", new { id = listing.Id }, listing);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Listing listing) 
        {
            if (id != listing.Id)
            {
                return BadRequest();
            }

            _listingRepo.Update(listing);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _listingRepo.Delete(id);
            return NoContent();
        }
    }
}
