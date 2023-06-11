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

        [HttpGet("GetAll")]
        public IActionResult Get()
        {
            return Ok(_listingRepo.GetAll());
        }

        [HttpGet("search")]
        public ActionResult Search(string q) 
        {
            return Ok(_listingRepo.Search(q));
        }

        [HttpGet("GetAllByCategory")]
        public ActionResult GetAllByCategoryId(string? categoryIds = null, string? searchCriterion = null) 
        {
            return Ok(_listingRepo.GetAllByCategoryId(categoryIds, searchCriterion));
        }

        [HttpGet("get/{id}")]
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

        [HttpPost("{id}")]
        public IActionResult Put(int id, ListingEdit listing) 
        {
            if (id != listing.Id)
            {
                return BadRequest();
            }

            _listingRepo.Update(listing);
            return Ok(listing);
        }

        [HttpPost("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _listingRepo.Delete(id);
            return Ok(id);
        }
    }
}
