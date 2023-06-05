using ThriftHaven.Models;
using ThriftHaven.Repositories;
using Microsoft.AspNetCore.Mvc;
using BCrypt.Net;
using Microsoft.AspNetCore.Authorization;

namespace ThriftHaven.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepo;

        public UsersController(IUserRepository userRepo)
        {
            _userRepo = userRepo;
        }

        [HttpGet("Login/{email}/{password}")]
        public IActionResult LoginUser(string email, string password)
        {
            User user = _userRepo.ValidateUser(email);

            if(user == null)
            {
                return Unauthorized("Invalid Credentials");
            }

            if(!BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                return Unauthorized("Invalid Credentials");
            }
            else
            {
                user.Password = "";
                return Ok(user);
            }
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var user = _userRepo.GetById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost("/AddUser")]
        public IActionResult AddUser(User user)
        {
            if (user == null)
            {
                return BadRequest(new { message = "Missing User Data"});
            }

            var isValidEmail = _userRepo.isEmailAvailable(user.Email);

            if (isValidEmail == false) 
            {
                return BadRequest(new { message = "Email already exists" });
            }

            var newUser = new User
            {
                Name = user.Name,
                Email = user.Email,
                Image = user.Image,
                Password = BCrypt.Net.BCrypt.HashPassword(user.Password)
            };

            _userRepo.Add(newUser);

            newUser.Password = "";
            return Created("", newUser);
        }

        [HttpPost("/EditUser/{id}")]
        public IActionResult Put(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _userRepo.Update(user);
            return Ok(user);
        }
    }
}
