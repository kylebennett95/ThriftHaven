﻿using ThriftHaven.Models;
using ThriftHaven.Utils;

namespace ThriftHaven.Repositories
{
    public class ListingRepository : BaseRepository, IListingRepository
    {
        public ListingRepository(IConfiguration configuration) : base(configuration) { }

        public List<Listing> Search(string criterion)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT
                                            l.id,
                                            l.userId,
                                            l.categoryId,
                                            l.location,
                                            l.price,
                                            l.description,
                                            l.image,
                                            l.dateTime,
                                        FROM Listing l
                                        WHERE l.description LIKE @Criterion";

                    DbUtils.AddParameter(cmd, "@Criterion", $"%{criterion}%");

                    var reader = cmd.ExecuteReader();
                    var listings = new List<Listing>();

                    while (reader.Read())
                    {
                        var listing = new Listing()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            UserId = DbUtils.GetInt(reader, "userId"),
                            CategoryId = DbUtils.GetInt(reader, "categoryId"),
                            Location = DbUtils.GetString(reader, "location"),
                            Price = DbUtils.GetInt(reader, "price"),
                            Description = DbUtils.GetString(reader, "description"),
                            Image = DbUtils.GetString(reader, "image"),
                            DateTime = DbUtils.GetDateTime(reader, "dateTime")
                        };

                        listings.Add(listing);
                    }

                    reader.Close();
                    return listings;
                }
            }
        }

        public List<Listing> GetAll(string? categoryIds = null, string? searchCriterion = null)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = @"SELECT
                                    id,
                                    userId,
                                    categoryId,
                                    location,
                                    price,
                                    description,
                                    image,
                                    dateTime";

                    var reader = cmd.ExecuteReader();
                    var listings = new List<Listing>();

                    while (reader.Read())
                    {
                        var listing = new Listing()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            UserId = DbUtils.GetInt(reader, "userId"),
                            CategoryId = DbUtils.GetInt(reader, "categoryId"),
                            Location = DbUtils.GetString(reader, "location"),
                            Price = DbUtils.GetInt(reader, "price"),
                            Description = DbUtils.GetString(reader, "description"),
                            Image = DbUtils.GetString(reader, "image"),
                            DateTime = DbUtils.GetDateTime(reader, "dateTime")
                        };

                        listings.Add(listing);
                    }

                    reader.Close();
                    return listings;
                }
            }
        }

        public Listing GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT
                                            id,
                                            userId,
                                            categoryId,
                                            location,
                                            price,
                                            description,
                                            image,
                                            dateTime
                                        FROM [Listing]
                                        WHERE id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                    Listing listing = null;
                    if (reader.Read())
                    {
                        listing = new Listing()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            UserId = DbUtils.GetInt(reader, "userId"),
                            CategoryId = DbUtils.GetInt(reader, "categoryId"),
                            Location = DbUtils.GetString(reader, "location"),
                            Price = DbUtils.GetInt(reader, "price"),
                            Description = DbUtils.GetString(reader, "description"),
                            Image = DbUtils.GetString(reader, "image"),
                            DateTime = DbUtils.GetDateTime(reader, "dateTime")
                        };
                    }

                    reader.Close();
                    return listing;
                }
            }
        }

        public List<Listing> GetByCategoryId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT
                                            l.id,
                                            l.userId,
                                            l.categoryId,
                                            l.location,
                                            l.price,
                                            l.description,
                                            l.image,
                                            l.dateTime
                                            c.name,
                                        FROM Listing l
                                        JOIN Category c
                                            ON l.categoryId = c.id
                                        WHERE l.categoryId = @categoryId";
                    DbUtils.AddParameter(cmd, "@categoryId", id);

                    var reader = cmd.ExecuteReader();
                    var listings = new List<Listing>();

                    while (reader.Read())
                    {
                        var listing = new Listing()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            UserId = DbUtils.GetInt(reader, "userId"),
                            CategoryId = DbUtils.GetInt(reader, "categoryId"),
                            Location = DbUtils.GetString(reader, "location"),
                            Price = DbUtils.GetInt(reader, "price"),
                            Description = DbUtils.GetString(reader, "description"),
                            Image = DbUtils.GetString(reader, "image"),
                            DateTime = DbUtils.GetDateTime(reader, "dateTime"),
                            Category = new Category()
                            {
                                Id = DbUtils.GetInt(reader, "categoryId"),
                                Name = DbUtils.GetString(reader, "name")
                            }
                        };

                        listings.Add(listing);
                    }

                    reader.Close();
                    return listings;
                }
            }
        }

        public void Add(Listing listing)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO [Listing]
                                            (userId,
                                            categoryId,
                                            location,
                                            price,
                                            description,
                                            image,
                                            dateTime)
                                        OUTPUT INSERTED.ID
                                        VALUES
                                            (@userId,
                                            @categoryId,
                                            @location,
                                            @price,
                                            @description,
                                            @image,
                                            @dateTime)";

                    DbUtils.AddParameter(cmd, "@userId", listing.UserId);
                    DbUtils.AddParameter(cmd, "@categoryId", listing.CategoryId);
                    DbUtils.AddParameter(cmd, "@location", listing.Location);
                    DbUtils.AddParameter(cmd, "@price", listing.Price);
                    DbUtils.AddParameter(cmd, "@description", listing.Description);
                    DbUtils.AddParameter(cmd, "@image", listing.Image);
                    DbUtils.AddParameter(cmd, "@dateTime", listing.DateTime);
                    listing.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Listing listing)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE [Listing]
                                            SET userId = @userId,
                                                categoryId = @categoryId,
                                                location = @location,
                                                price = @price,
                                                description = @description,
                                                image = @image,
                                                dateTime = @dateTime,
                                        WHERE id = @id";

                    DbUtils.AddParameter(cmd, "@id", listing.Id);
                    DbUtils.AddParameter(cmd, "@userId", listing.UserId);
                    DbUtils.AddParameter(cmd, "@categoryId", listing.CategoryId);
                    DbUtils.AddParameter(cmd, "@location", listing.Location);
                    DbUtils.AddParameter(cmd, "@price", listing.Price);
                    DbUtils.AddParameter(cmd, "@description", listing.Description);
                    DbUtils.AddParameter(cmd, "@image", listing.Image);
                    DbUtils.AddParameter(cmd, "@dateTime", listing.DateTime);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM [Listing] WHERE id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
