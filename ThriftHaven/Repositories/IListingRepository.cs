using ThriftHaven.Models;

namespace ThriftHaven.Repositories
{
    public interface IListingRepository
    {
        void Add(Listing listing);
        void Delete(int id);
        List<Listing> GetAll(string? categoryIds = null, string? searchCriterion = null);
        List<Listing> GetByCategoryId(int id);
        Listing GetById(int id);
        List<Listing> Search(string criterion);
        void Update(Listing listing);
    }
}