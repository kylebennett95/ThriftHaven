using ThriftHaven.Models;
using ThriftHaven.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace ThriftHaven.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepo;

        public CategoriesController(ICategoryRepository categoryRepo)
        {
            _categoryRepo = categoryRepo;
        }

        [HttpGet("GetAll")]
        public IActionResult Get()
        {
            return Ok(_categoryRepo.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id) 
        {
            var category = _categoryRepo.GetById(id);
            if (category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }

        [HttpPost]
        public IActionResult Post(Category category)
        {
            _categoryRepo.Add(category);
            return CreatedAtAction("Get", new { id = category.Id }, category);
        }

        [HttpPost("post/{id}")]
        public IActionResult Put(int id, Category category) 
        {
            if (id != category.Id)
            {
                return BadRequest();
            }

            _categoryRepo.Add(category);
            return Ok(category);
        }
    }
}
