namespace ThriftHaven.Models
{
    public class Favorite
    {
        public int Id { get; set; }
        public int ListingId { get; set; }
        public int UserId { get; set; }
        public Listing? Listing { get; set; }
    }

    public class FavoriteAdd
    {
        public int Id { get; set; }
        public int ListingId { get; set; }
        public int UserId { get; set; }
    }
}
