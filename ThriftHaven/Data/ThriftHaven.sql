USE [master]
GO
IF db_id('ThriftHaven') IS NULL
	CREATE DATABASE [ThriftHaven]
GO
USE [ThriftHaven]
GO
DROP TABLE IF EXISTS [Category];
DROP TABLE IF EXISTS [Favorite];
DROP TABLE IF EXISTS [Listing];
DROP TABLE IF EXISTS [User];
CREATE TABLE [Category] (
	[id] int PRIMARY KEY identity,
	[name] nvarchar(255) not null
)
GO
CREATE TABLE [Favorite] (
	[id] int PRIMARY KEY identity,
	[listingId] int not null,
	[userId] int not null
)
GO
CREATE TABLE [Listing] (
	[id] int PRIMARY KEY identity,
	[userId] int not null,
	[categoryId] int not null,
	[location] nvarchar(255) not null,
	[price] int not null,
	[description] nvarchar(255) not null,
	[image] nvarchar(255),
	[dateTime] datetime not null
)
GO
CREATE TABLE [User] (
	[id] int PRIMARY KEY identity,
	[name] nvarchar(255) not null,
	[email] nvarchar(255) not null,
	[image] nvarchar(255),
	[password] text(255) not null
)
GO
ALTER TABLE [favorite] ADD FOREIGN KEY ([listingId]) REFERENCES [listing] ([id])
GO
ALTER TABLE [favorite] ADD FOREIGN KEY (userId) REFERENCES [user] ([id])
GO
ALTER TABLE [listing] ADD FOREIGN KEY (userId) REFERENCES [user] ([id])
GO
ALTER TABLE [listing] ADD FOREIGN KEY (categoryId) REFERENCES [category] ([id])
GO
--STARTING DATA--
INSERT INTO [Category] 
			([name])
		VALUES
	('Couch'),
	('Dresser'),
	('Table'),
	('Nightstand'),
	('Bed'),
	('Chair'),
	('Bookshelf'),
	('Coffee Table')
GO
INSERT INTO [User]
			([name],
			[email],
			[image],
			[password])
		VALUES
			('Justin Ewing', 'amet.consectetuer@hotmail.org', NULL, 'nitsuj'),
			('Hilda Ryan', 'senectus@outlook.edu', NULL, 'adlih'),
			('Emmanuel Cardenas', 'quam.pellentesque@hotmail.ca', NULL, 'leunamme'),
			('Haley Bailey', 'sapien.gravida@google.net', NULL, 'yelah'),
			('Marvin Cabrera', 'scelerisque.dui@aol.ca', NULL, 'nivram')
GO
INSERT INTO [Listing]
			([userId],
			[categoryId],
			[location],
			[price],
			[description],
			[image],
			[dateTime])
		VALUES
			(5, 4, 'Hendersonville', 75, 'Nightstand', NULL, 'Jan 8, 2023'),
			(4, 2, 'Gallatin', 200, 'Dresser', NULL, 'Oct 16, 2022'),
			(3, 6, 'Lebanon', 25, 'Chair', NULL, 'Aug 12,2023'),
			(2, 8, 'Antioch', 50, 'Coffee Table', NULL, 'May 15, 2023'),
			(1, 1, 'Green Hills', 250, 'Couch', NULL, 'May 1, 2023'),
			(1, 3, 'Bellevue', 100, 'Table', NULL, 'Jan 13, 2023'),
			(2, 5, 'Mt. Juliet', 125, 'Bed', NULL, 'Mar 17, 2023'),
			(3, 7, 'Gallatin', 75, 'Bookshelf', NULL, 'Apr 8, 2023'),
			(4, 6, 'East Nashville', 30, 'Chair', NULL, 'Jun 8, 2023'),
			(5, 4, 'Antioch', 80, 'Nightstand', NULL, 'Mar 8, 2023')
GO
INSERT INTO [Favorite]
			([listingId],
			[userId])
		VALUES
			(9, 1),
			(7, 3),
			(5, 4)
GO