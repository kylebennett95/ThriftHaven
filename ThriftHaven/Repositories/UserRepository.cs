using ThriftHaven.Models;
using ThriftHaven.Utils;

namespace ThriftHaven.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

        public List<User> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT
                                        id,
	                                    name,
	                                    email,
	                                    image,
	                                    password
                                    FROM [User]";

                    var reader = cmd.ExecuteReader();
                    var users = new List<User>();

                    while (reader.Read())
                    {
                        var user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Name = DbUtils.GetString(reader, "name"),
                            Email = DbUtils.GetString(reader, "email"),
                            Image = DbUtils.GetString(reader, "image"),
                            Password = DbUtils.GetString(reader, "password")
                        };

                        users.Add(user);
                    }

                    reader.Close();
                    return users;
                }
            }
        }

        public User GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT
                                        id,
	                                    name,
	                                    email,
	                                    image,
	                                    password
                                    FROM [User]
                                    WHERE id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                    User user = null;
                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Name = DbUtils.GetString(reader, "name"),
                            Email = DbUtils.GetString(reader, "email"),
                            Image = DbUtils.GetString(reader, "image"),
                            Password = DbUtils.GetString(reader, "password")
                        };
                    }

                    reader.Close();
                    return user;
                }
            }
        }

        public void Add(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO [User]
	                                    (name,
	                                    email,
	                                    image,
	                                    password)
                                    OUTPUT INSERTED.ID
                                    VALUES
	                                    (@name,
                                        @email,
                                        @image,
                                        @password)";

                    DbUtils.AddParameter(cmd, "@name", user.Name);
                    DbUtils.AddParameter(cmd, "@email", user.Email);
                    DbUtils.AddParameter(cmd, "@image", user.Image);
                    DbUtils.AddParameter(cmd, "@password", user.Password);

                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE [User]
	                                    SET name = @name,
	                                        email = @email,
	                                        image = @image,
	                                        password = @password
                                    WHERE id = @id";

                    DbUtils.AddParameter(cmd, "@id", user.Id);
                    DbUtils.AddParameter(cmd, "@name", user.Name);
                    DbUtils.AddParameter(cmd, "@email", user.Email);
                    DbUtils.AddParameter(cmd, "@image", user.Image);
                    DbUtils.AddParameter(cmd, "@password", user.Password);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public Boolean isEmailAvailable(string Email)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT id FROM [User] WHERE email=@Email";
                    DbUtils.AddParameter(cmd, "@Email", Email);

                    var reader = cmd.ExecuteReader();

                    var isValid = reader.HasRows == false;

                    return isValid;
                }
            }
        }

        public User ValidateUser(string email)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT * from [dbo].[User]
                                        WHERE Email = @Email";
                    DbUtils.AddParameter(cmd, "@Email", email);
                    var reader = cmd.ExecuteReader();
                    User user = null;
                    while (reader.Read())
                    {
                        if (user == null)
                        {
                            user = new User()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Email = DbUtils.GetString(reader, "Email"),
                                Password = DbUtils.GetString(reader, "Password"),
                                Image = DbUtils.GetString(reader, "Image"),
                            };
                        }
                    }
                    reader.Close();
                    return user;
                }
            }
        }
    }
}
