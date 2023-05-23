using ThriftHaven.Models;
using ThriftHaven.Utils;

namespace ThriftHaven.Repositories
{
    public class FavoriteRepository : BaseRepository, IFavoriteRepository
    {
        public FavoriteRepository(IConfiguration configuration) : base(configuration) { }

        public Listing GetFavoritesByUserId(int id)
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
	                                    ON l.userId = f.userId
                                    WHERE l.userId = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                    Listing listing = null;
                    while (reader.Read())
                    {
                        if (listing == null)
                        {
                            listing = new Listing()
                            {
                                Id = DbUtils.GetInt(reader, "id"),
                                UserId = DbUtils.GetInt(reader, "userId"),
                                CategoryId = DbUtils.GetInt(reader, "categoryId"),
                                Location = DbUtils.GetString(reader, "location"),
                                Description = DbUtils.GetString(reader, "description"),
                                Price = DbUtils.GetInt(reader, "price"),
                                DateTime = DbUtils.GetDateTime(reader, "dateTime"),
                                Image = DbUtils.GetString(reader, "image"),
                                Favorite = new Favorite
                                {
                                    Id = DbUtils.GetInt(reader, "id"),
                                    ListingId = DbUtils.GetInt(reader, "listingId"),
                                    UserId = DbUtils.GetInt(reader, "userId")
                                },
                            };
                        }
                    }

                    reader.Close();
                    return listing;
                }
            }
        }

        public void Add(Favorite favorite)
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
