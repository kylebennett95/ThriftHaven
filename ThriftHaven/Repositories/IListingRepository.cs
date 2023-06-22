using ThriftHaven.Models;

namespace ThriftHaven.Repositories
{
    public interface IListingRepository
    {
        void Add(Listing listing);
        void Delete(int id);
        List<Listing> GetAll();
        List<Listing> GetAllByCategoryId(int categoryId);
        List<Listing> GetAllByUserId(int userId);
        List<Listing> GetByCategoryId(int id);
        ListingEdit GetById(int id);
        List<Listing> Search(string criterion);
        void Update(ListingEdit listing);
    }
}