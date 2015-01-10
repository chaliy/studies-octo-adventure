USE [tkp_k]
GO
/****** Object:  Table [dbo].[Клуби]    Script Date: 10.01.2015 21:07:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Клуби](
  [Ід] [int] IDENTITY(1,1) NOT NULL,
  [Назва] [nvarchar](450) NOT NULL,
  [Країна] [nchar](3) NOT NULL,
  [Бюджет] [money] NOT NULL,
  CONSTRAINT [PK_Клуби] PRIMARY KEY CLUSTERED
  (
    [Ід] ASC
  )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Статистика]    Script Date: 10.01.2015 21:07:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Статистика](
  [Ід] [int] IDENTITY(1,1) NOT NULL,
  [КлубІд] [int] NOT NULL,
  [Сезон] [int] NOT NULL,
  [Дата] [date] NOT NULL,
  [Статус] [nchar](1) NOT NULL,
  CONSTRAINT [PK_Статистика] PRIMARY KEY CLUSTERED
  (
    [Ід] ASC
  )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[Клуби] ADD  CONSTRAINT [DF_Клуби_Бюджет]  DEFAULT ((0)) FOR [Бюджет]
GO
ALTER TABLE [dbo].[Статистика]  WITH CHECK ADD  CONSTRAINT [FK_Статистика_Клуби] FOREIGN KEY([КлубІд])
REFERENCES [dbo].[Клуби] ([Ід])
GO
ALTER TABLE [dbo].[Статистика] CHECK CONSTRAINT [FK_Статистика_Клуби]
GO
