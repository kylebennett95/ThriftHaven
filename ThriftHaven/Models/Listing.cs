namespace ThriftHaven.Models
{
    public class Listing
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int CategoryId { get; set; }
        public string Location { get; set; }
        public int Price { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public DateTime DateTime { get; set; }
        public Favorite? Favorite { get; set; }

        public Category? Category { get; set; }
    }
}
