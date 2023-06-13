using ThriftHaven.Models;

namespace ThriftHaven.Repositories
{
    public interface IUserRepository
    {
        void Add(User user);
        List<User> GetAll();
        EditUser GetById(int id);
        bool isEmailAvailable(string Email);
        void Update(EditUser user);
        User ValidateUser(string email);
    }
}