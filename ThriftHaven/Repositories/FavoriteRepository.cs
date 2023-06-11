using ThriftHaven.Models;
using ThriftHaven.Utils;

namespace ThriftHaven.Repositories
{
    public class FavoriteRepository : BaseRepository, IFavoriteRepository
    {
        public FavoriteRepository(IConfiguration configuration) : base(configuration) { }

        public List<Favorite> GetFavoritesByUserId(int id)
        {
            var favorites = new List<Favorite>();

            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT
                                f.id AS FavoriteId,
                                f.listingId,
                                f.userId
                            FROM [Favorite] f
                            WHERE f.userId = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        var favorite = new Favorite
                        {
                            Id = DbUtils.GetInt(reader, "FavoriteId"),
                            ListingId = DbUtils.GetInt(reader, "listingId"),
                            UserId = DbUtils.GetInt(reader, "userId")
                        };

                        favorites.Add(favorite);
                    }

                    reader.Close();
                }
            }

            return favorites;
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

                    int insertedId = (int)cmd.ExecuteScalar(); // Execute the INSERT command and get the inserted ID

                    favorite.Id = insertedId; // Set the ID property of the favorite object
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
