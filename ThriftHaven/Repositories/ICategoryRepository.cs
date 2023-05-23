using ThriftHaven.Models;

namespace ThriftHaven.Repositories
{
    public interface ICategoryRepository
    {
        void Add(Category category);
        void Delete(int id);
        List<Category> GetAll();
        Category GetById(int id);
        void Update(Category category);
    }
}