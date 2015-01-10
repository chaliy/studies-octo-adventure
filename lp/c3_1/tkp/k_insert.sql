USE [tkp_k]
GO
DECLARE @LastID int

INSERT INTO [dbo].[Клуби] ([Назва] ,[Країна] ,[Бюджет]) VALUES ('Карпати', 'UKR', 200000)
SELECT @LastID = SCOPE_IDENTITY()

INSERT INTO [dbo].[Статистика] ([КлубІд] ,[Сезон] ,[Дата] ,[Статус]) VALUES (@LastID , 2014, '20140210' , 'W')
INSERT INTO [dbo].[Статистика] ([КлубІд] ,[Сезон] ,[Дата] ,[Статус]) VALUES (@LastID , 2014, '20140315' , 'L')
INSERT INTO [dbo].[Статистика] ([КлубІд] ,[Сезон] ,[Дата] ,[Статус]) VALUES (@LastID , 2014, '20140404' , 'P')
INSERT INTO [dbo].[Статистика] ([КлубІд] ,[Сезон] ,[Дата] ,[Статус]) VALUES (@LastID , 2014, '20140520' , 'W')
INSERT INTO [dbo].[Статистика] ([КлубІд] ,[Сезон] ,[Дата] ,[Статус]) VALUES (@LastID , 2014, '20140607' , 'L')

INSERT INTO [dbo].[Клуби] ([Назва] ,[Країна] ,[Бюджет]) VALUES ('Динамо', 'UKR', 2000000)
SELECT @LastID = SCOPE_IDENTITY()

INSERT INTO [dbo].[Статистика] ([КлубІд] ,[Сезон] ,[Дата] ,[Статус]) VALUES (@LastID , 2014, '20140220' , 'L')
INSERT INTO [dbo].[Статистика] ([КлубІд] ,[Сезон] ,[Дата] ,[Статус]) VALUES (@LastID , 2014, '20140320' , 'W')
INSERT INTO [dbo].[Статистика] ([КлубІд] ,[Сезон] ,[Дата] ,[Статус]) VALUES (@LastID , 2014, '20140401' , 'W')
INSERT INTO [dbo].[Статистика] ([КлубІд] ,[Сезон] ,[Дата] ,[Статус]) VALUES (@LastID , 2014, '20140525' , 'P')
INSERT INTO [dbo].[Статистика] ([КлубІд] ,[Сезон] ,[Дата] ,[Статус]) VALUES (@LastID , 2014, '20140604' , 'W')
