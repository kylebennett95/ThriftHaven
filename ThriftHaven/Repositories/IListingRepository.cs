﻿using ThriftHaven.Models;

namespace ThriftHaven.Repositories
{
    public interface IListingRepository
    {
        void Add(Listing listing);
        void Delete(int id);
        List<Listing> GetAll();
        List<Listing> GetAllByCategoryId(string? categoryIds = null, string? searchCriterion = null);
        List<Listing> GetByCategoryId(int id);
        ListingEdit GetById(int id);
        List<Listing> Search(string criterion);
        void Update(ListingEdit listing);
    }
}