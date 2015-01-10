namespace SolidDip.Services
{
    using System.Collections.Generic;
    using System.Linq;
    using Dapper;
    using Infrastructure;
    using SolidDip.Model;

    public static class ComponentsStorage
    {
        private static void Ensure()
        {
            Db.Run(c =>
            {
                c.Execute(@"create table if not exists [Components]([PartName] text, [Data] blob);", new { });
            });
        }

        public static void Save(IEnumerable<CircuitComponent> components)
        {
            Ensure();
            Db.Run(c =>
            {
                c.Execute(@"delete from Components");
                c.Execute(@"insert into Components values (@PartName, @Data)", components);
            });
        }

        public static CircuitComponent[] AllComponents()
        {
            Ensure();
            return Db.Run(c =>
            {
                return c.Query<CircuitComponent>(@"select * from Components");
            }).ToArray();
        }
    }
}
