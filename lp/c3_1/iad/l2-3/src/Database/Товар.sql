CREATE TABLE [dbo].[Товар]
(
	[Код] INT NOT NULL PRIMARY KEY, 
    [Найменування] NVARCHAR(455) NOT NULL, 
    [Група] INT NOT NULL, 
    CONSTRAINT [FK_Товар_Група] FOREIGN KEY ([Група]) REFERENCES [Група]([Код]) 
)
