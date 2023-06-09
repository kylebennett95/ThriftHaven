﻿using ThriftHaven.Models;

namespace ThriftHaven.Repositories
{
    public interface IFavoriteRepository
    {
        void Add(FavoriteAdd favorite);
        void Delete(int id);
        List<Favorite> GetAllByUserId(int userId);
        Favorite GetFavoritesByUserId(int id);
    }
}