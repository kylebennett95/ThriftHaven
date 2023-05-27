using ThriftHaven.Models;

namespace ThriftHaven.Repositories
{
    public interface IUserRepository
    {
        void Add(User user);
        List<User> GetAll();
        User GetById(int id);
        bool isEmailAvailable(string Email);
        void Update(User user);
        User ValidateUser(string email);
    }
}