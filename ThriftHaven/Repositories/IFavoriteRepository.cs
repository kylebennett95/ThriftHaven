using ThriftHaven.Models;

namespace ThriftHaven.Repositories
{
    public interface IFavoriteRepository
    {
        void Add(Favorite favorite);
        void Delete(int id);
        Listing GetFavoritesByUserId(int id);
    }
}