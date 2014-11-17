CREATE TABLE [dbo].[Продаж]
(
	[Дата] DATE NOT NULL, 
    [Година] TINYINT NOT NULL, 
    [Відділ] INT NOT NULL, 
    [Товар] INT NOT NULL, 
    [Кількість] INT NOT NULL, 
    [Сумма] MONEY NULL, 
    CONSTRAINT [FK_Продаж_Відділ] FOREIGN KEY ([Відділ]) REFERENCES [Відділ]([Код]), 
    CONSTRAINT [FK_Продаж_Товар] FOREIGN KEY ([Товар]) REFERENCES [Товар]([Код]) 
)
