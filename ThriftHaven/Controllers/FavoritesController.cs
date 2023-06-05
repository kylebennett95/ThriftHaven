using ThriftHaven.Models;
using ThriftHaven.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace ThriftHaven.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class FavoritesController : ControllerBase
    {
        private readonly IFavoriteRepository _favoriteRepo;

        public FavoritesController(IFavoriteRepository favoriteRepository)
        {
            _favoriteRepo = favoriteRepository;
        }

        [HttpGet("user/{id}")]
        public IActionResult GetByUserId(int id) 
        {
            var fav = _favoriteRepo.GetFavoritesByUserId(id);
            if (fav == null)
            {
                return NotFound();
            }
            return Ok(fav);
        }

        [HttpPost]
        public IActionResult Post(Favorite favorite)
        {
            _favoriteRepo.Add(favorite);
            return CreatedAtAction("Get", new { id = favorite.Id }, favorite);
        }

        [HttpPost("{id}")]
        public IActionResult Delete(int id)
        {
            _favoriteRepo.Delete(id);
            return Ok(id);
        }
    }
}
