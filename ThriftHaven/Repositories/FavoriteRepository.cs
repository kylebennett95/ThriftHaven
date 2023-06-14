using ThriftHaven.Models;
using ThriftHaven.Utils;

namespace ThriftHaven.Repositories
{
    public class FavoriteRepository : BaseRepository, IFavoriteRepository
    {
        public FavoriteRepository(IConfiguration configuration) : base(configuration) { }

        public Favorite GetFavoritesByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT
                                        f.id,
	                                    f.listingId,
	                                    f.userId,
                                        l.userId,
                                        l.categoryId,
	                                    l.location,
                                        l.price,
                                        l.description,
                                        l.Image,
                                        l.dateTime
                                    FROM [Favorite] f
                                    JOIN [Listing] l
	                                    ON f.listingId = l.id
                                    WHERE f.userId = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                    Favorite favorite = null;
                    while (reader.Read())
                    {
                        if (favorite == null)
                        {
                            favorite = new Favorite()
                            {
                                Id = DbUtils.GetInt(reader, "id"),
                                ListingId = DbUtils.GetInt(reader, "listingId"),
                                UserId = DbUtils.GetInt(reader, "userId"),
                                Listing = new Listing
                                {
                                    Id = DbUtils.GetInt(reader, "id"),
                                    UserId = DbUtils.GetInt(reader, "userId"),
                                    CategoryId = DbUtils.GetInt(reader, "categoryId"),
                                    Location = DbUtils.GetString(reader, "location"),
                                    Description = DbUtils.GetString(reader, "description"),
                                    Price = DbUtils.GetInt(reader, "price"),
                                    DateTime = DbUtils.GetDateTime(reader, "dateTime"),
                                    Image = DbUtils.GetString(reader, "image"),
                                },
                            };
                        }
                    }

                    reader.Close();
                    return favorite;
                }
            }
        }

        public List<Favorite> GetAllByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT
                                        f.id,
	                                    f.listingId,
	                                    f.userId,
                                        l.userId,
                                        l.categoryId,
	                                    l.location,
                                        l.price,
                                        l.description,
                                        l.Image,
                                        l.dateTime
                                    FROM [Favorite] f
                                    JOIN [Listing] l
	                                    ON f.listingId = l.id
                                    WHERE f.userId = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();
                    var favorites = new List<Favorite>();

                    while (reader.Read())
                    {
                        var favorite = new Favorite()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            ListingId = DbUtils.GetInt(reader, "listingId"),
                            UserId = DbUtils.GetInt(reader, "userId"),
                            Listing = new Listing
                            {
                                Id = DbUtils.GetInt(reader, "id"),
                                UserId = DbUtils.GetInt(reader, "userId"),
                                CategoryId = DbUtils.GetInt(reader, "categoryId"),
                                Location = DbUtils.GetString(reader, "location"),
                                Description = DbUtils.GetString(reader, "description"),
                                Price = DbUtils.GetInt(reader, "price"),
                                DateTime = DbUtils.GetDateTime(reader, "dateTime"),
                                Image = DbUtils.GetString(reader, "image"),
                            },
                        };

                        favorites.Add(favorite);
                    }

                    reader.Close();
                    return favorites;
                }
            }
        }


        public void Add(FavoriteAdd favorite)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO [Favorite]
                                (listingId,
                                userId)
                            OUTPUT INSERTED.ID
                            VALUES
                                (@listingId,
                                @userId)";

                    DbUtils.AddParameter(cmd, "@listingId", favorite.ListingId);
                    DbUtils.AddParameter(cmd, "@userId", favorite.UserId);

                    favorite.Id = (int)cmd.ExecuteScalar(); // Execute the INSERT command and get the inserted ID


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
                    cmd.CommandText = "DELETE FROM [Favorite] WHERE id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
