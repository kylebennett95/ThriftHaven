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
	[location] nvarchar not null,
	[price] int not null,
	[description] nvarchar not null,
	[image] nvarchar not null,
	[dateTime] datetime not null
)
GO
CREATE TABLE [User] (
	[id] int PRIMARY KEY identity,
	[name] nvarchar not null,
	[email] nvarchar not null,
	[image] nvarchar not null,
	[password] nvarchar not null
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