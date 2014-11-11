namespace SolidDip.Services
{
    using System.Collections.Generic;
    using System.Linq;
    using Dapper;
    using Infrastructure;
    using SolidDip.Model;

    public static class CorpusesStorage
    {
        private static void Ensure()
        {
            Db.Run(c =>
            {
                c.Execute(@"create table if not exists [Corpuses]([Name] text, [PinCount] integer, [CorpusWidthMm] real);", new { });
            });
        }

        public static void Save(IEnumerable<DipCorpus> corpuses)
        {
            Ensure();
            Db.Run(c =>
            {
                c.Execute(@"delete from Corpuses");
                c.Execute(@"insert into Corpuses values (@Name, @PinCount, @CorpusWidthMm)", corpuses);
            });
        }


        public static DipCorpus[] AllCorpuses()
        {
            Ensure();
            return Db.Run(c =>
            {
                return c.Query<DipCorpus>(@"select Name, PinCount, CorpusWidthMm
                            from Corpuses");
            }).ToArray();
        }
    }
}
