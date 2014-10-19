USE [master]
GO
/****** Object:  Database [Restaurant]    Script Date: 19.10.2014 13:05:06 ******/
CREATE DATABASE [Restaurant]
 CONTAINMENT = NONE
 ON  PRIMARY
( NAME = N'Restaurant', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\Restaurant.mdf' , SIZE = 5120KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON
( NAME = N'Restaurant_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\Restaurant_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [Restaurant] SET COMPATIBILITY_LEVEL = 120
GO
USE [Restaurant]
GO
/****** Object:  Table [dbo].[City]    Script Date: 19.10.2014 13:05:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[City](
	[CityID] [uniqueidentifier] ROWGUIDCOL  NOT NULL CONSTRAINT [DF_City_CityID]  DEFAULT (newid()),
	[Name] [nvarchar](455) NOT NULL,
	[CountryID] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_City] PRIMARY KEY CLUSTERED
(
	[CityID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Country]    Script Date: 19.10.2014 13:05:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Country](
	[CountryID] [uniqueidentifier] ROWGUIDCOL  NOT NULL CONSTRAINT [DF_Country_CountryID]  DEFAULT (newid()),
	[Name] [nvarchar](455) NOT NULL,
	[ISOCode] [nchar](10) NOT NULL,
 CONSTRAINT [PK_Country] PRIMARY KEY CLUSTERED
(
	[CountryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Restaurant]    Script Date: 19.10.2014 13:05:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Restaurant](
	[RestaurantID] [uniqueidentifier] ROWGUIDCOL  NOT NULL CONSTRAINT [DF_Restaurant_RestaurantID]  DEFAULT (newid()),
	[Name] [nvarchar](455) NOT NULL,
	[Address] [nvarchar](455) NOT NULL,
	[RestaurantNetworkID] [uniqueidentifier] NOT NULL,
	[CityID] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_Restaurant] PRIMARY KEY CLUSTERED
(
	[RestaurantID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[RestaurantNetwork]    Script Date: 19.10.2014 13:05:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RestaurantNetwork](
	[RestaurantNetworkID] [uniqueidentifier] ROWGUIDCOL  NOT NULL CONSTRAINT [DF_RestaurantNetwork_RestaurantNetworkID]  DEFAULT (newid()),
	[Name] [nvarchar](455) NOT NULL,
	[CountryID] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_RestaurantNetwork] PRIMARY KEY CLUSTERED
(
	[RestaurantNetworkID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[City]  WITH CHECK ADD  CONSTRAINT [FK_City_Country] FOREIGN KEY([CountryID])
REFERENCES [dbo].[Country] ([CountryID])
GO
ALTER TABLE [dbo].[City] CHECK CONSTRAINT [FK_City_Country]
GO
ALTER TABLE [dbo].[Restaurant]  WITH CHECK ADD  CONSTRAINT [FK_Restaurant_City] FOREIGN KEY([CityID])
REFERENCES [dbo].[City] ([CityID])
GO
ALTER TABLE [dbo].[Restaurant] CHECK CONSTRAINT [FK_Restaurant_City]
GO
ALTER TABLE [dbo].[Restaurant]  WITH CHECK ADD  CONSTRAINT [FK_Restaurant_RestaurantNetwork] FOREIGN KEY([RestaurantNetworkID])
REFERENCES [dbo].[RestaurantNetwork] ([RestaurantNetworkID])
GO
ALTER TABLE [dbo].[Restaurant] CHECK CONSTRAINT [FK_Restaurant_RestaurantNetwork]
GO
ALTER TABLE [dbo].[RestaurantNetwork]  WITH CHECK ADD  CONSTRAINT [FK_RestaurantNetwork_Country] FOREIGN KEY([CountryID])
REFERENCES [dbo].[Country] ([CountryID])
GO
ALTER TABLE [dbo].[RestaurantNetwork] CHECK CONSTRAINT [FK_RestaurantNetwork_Country]
GO
USE [master]
GO
ALTER DATABASE [Restaurant] SET  READ_WRITE
GO
