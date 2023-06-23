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
	[image] text,
	[dateTime] datetime not null
)
GO
CREATE TABLE [User] (
	[id] int PRIMARY KEY identity,
	[name] nvarchar(255) not null,
	[email] nvarchar(255) not null,
	[image] nvarchar(255),
	[password] text not null
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
ALTER TABLE [listing] ADD CONSTRAINT FK_Listing FOREIGN KEY (userId) REFERENCES [user] ([id]) ON DELETE CASCADE;
GO
ALTER TABLE [favorite] ADD CONSTRAINT FK_Favorite FOREIGN KEY (userId) REFERENCES [user] ([id]) ON DELETE CASCADE;
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
			('Justin Ewing', 'justinewing@hotmail.org', NULL, 'nitsuj'),
			('Hilda Ryan', 'hryan@outlook.edu', NULL, 'adlih'),
			('Emmanuel Cardenas', 'emmancared@hotmail.ca', NULL, 'leunamme'),
			('Haley Bailey', 'baileyh@gmail.com', NULL, 'yelah'),
			('Marvin Cabrera', 'marvcabrera@aol.ca', NULL, 'nivram'),
			('Name', 'test@test.com', NULL, 'test')
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
			(5, 4, 'Hendersonville', 150, 'Nightstand like new. Contact me at marvcabrera@aol.ca', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo1Yq4eEEYFZpJTFwvoWFlUgKFQyMagoyqQw&usqp=CAU', 'Jan 8, 2023'),
			(4, 2, 'Gallatin', 200, 'Dresser, never used. Asking 200 obo. Email is baileyh@gmail.com', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6OpGd__Ysv-mTm_YjDEk085_3iUkXatSrLA&usqp=CAU', 'Oct 16, 2022'),
			(3, 6, 'Lebanon', 250, 'Lazy boy chair for sale, asking 250. Can not deliver. emmancared@hotmail.ca', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmxssN1at643f4TEUdwn1_167neYFQ0ahcQQ&usqp=CAU', 'Aug 12,2023'),
			(2, 8, 'Antioch', 100, 'Coffee table for sale. A few scuffs but nothing major. Asking 100 even. You can reach me at hryan@outlook.edu', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz6zx9i9jCEJDYyhSfrbFoAfaCX8o46rE_Qw&usqp=CAU', 'May 15, 2023'),
			(1, 1, 'Green Hills', 300, 'Couch for sale. Moving and no longer need. Shows signs of use but is otherwise in good condition. justinewing@hotmail.org', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-tW8guTxNNH3z5KcxsqPA5TsbFNA5rNk4oA&usqp=CAU', 'May 1, 2023'),
			(1, 3, 'Bellevue', 350, 'Dining room table for sale. 350 obo You can reach me at justinewing@hotmail.org', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAlok_rO6YOPcmSswkEudpFNZ2pAYcFKfPZmC8fbBSUCfc2arVaIsWk63VNW2xoF4dMjQ&usqp=CAU', 'Jan 13, 2023'),
			(2, 5, 'Mt. Juliet', 150, 'Bed frame for sale. You must pick up. Email is hryan@outlook.edu', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg5iEk3F-K3w_LeVbEJcr2w8VqzStO5dCO2g&usqp=CAU', 'Mar 17, 2023'),
			(3, 7, 'Gallatin', 75, 'Bookshelf in near perfect condition. Asking 75 firm. Message me at emmancared@hotmail.ca', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1X6MlVKWZ7IcxW_IBiVxX-lg3MSdm9q_y0cmL4P0Qd_i4JhD91cjzlqVOBUQrNYWL27E&usqp=CAU', 'Apr 8, 2023'),
			(4, 6, 'East Nashville', 400, 'La-Z-Boy for sale, like new. Send me a message baileyh@gmail.com', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiilAR8UCz14_D6qCUtRjBG_zr-dJnyKJ9Bg&usqp=CAU', 'Jun 8, 2023'),
			(5, 4, 'Antioch', 50, 'Ikea nightstand for sale. Light scratches, but nothing major. Asking 50. marvcabrera@aol.ca', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfNvLFkrFzZF15Ob5PNCxjXhUa_mk5sRFFcw&usqp=CAU', 'Mar 8, 2023'),
			(4, 1, 'West End', 450, 'Used couch. Barely shows signs of use. You can reach me at baileyh@gmail.com', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXNngLhKu0NhJXZroyyN8m7qRoGrp4kj5g-g&usqp=CAU', 'Jun 16, 2023'),
			(3, 2, 'The Gulch', 250, 'Chest of drawers for sale. Would like to get 250 for it. If you have questions email me at emmancared@hotmail.ca', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWu-CjQucN1qGEgRLzSRaGyJPP860dQ3www5vCuUprC180qsPiUgbROJJcLgPVOtRpJDw&usqp=CAU', 'May 30, 2023'),
			(2, 3, 'Madison', 150, 'Kitchen table for sale, shows signs of use but it can be buffed out. 150 firm. Email is hryan@outlook.edu', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOIdxuB69ovuL9YuYJLr421hilDBvHnetO6A&usqp=CAU', 'Feb 8, 2023'),
			(1, 5, 'East Nashville', 225, 'Queen sized bed frame for sale. Never been out of storage. Contact me at justinewing@hotmail.org', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnXcC475n-u5CES0IU-NnC05YKn-KGZaTz0A&usqp=CAU', 'Apr 19, 2023'),
			(2, 7, 'Downtown', 115, 'Downsizing so need to get rid of this shelf. In terrific shape. 115 firm. hryan@outlook.edu', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB3o4MURnMJ2d9TkRn4gtlMzZCYn1OQZN91A&usqp=CAU', 'Feb 17, 2023'),
			(3, 8, 'Belle Mead', 250, 'Very nice coffee table, in like new condition. Its yours for 250. If the listing is up it is still available. emmancared@hotmail.ca', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg9yA1b-wi_Dg4R158vkAG3ZjmDBex3UXD5Q&usqp=CAU', 'Dec 8, 2022')
GO
INSERT INTO [Favorite]
			([listingId],
			[userId])
		VALUES
			(9, 1),
			(7, 3),
			(5, 4)
GO