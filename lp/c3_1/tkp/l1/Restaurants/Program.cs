namespace Restaurants
{
    using ManyConsole;
    using System;
    using System.Data.Entity;
    using System.Linq;
    using System.Linq.Expressions;
    
    class Program
    {
        static int Main(string[] args)
        {
            var commands = ConsoleCommandDispatcher.FindCommandsInSameAssemblyAs(typeof(Program));

            return ConsoleCommandDispatcher.DispatchCommand(commands, args, Console.Out);
        }

        public class Add : ConsoleCommand
        {
            public Add()
            {
                IsCommand("add", "Додати тестовi даннi");
            }

            public override int Run(string[] remainingArguments)
            {
                using (var db = new RestaurantEntities())
                {
                    var ua = CreateIfNotExists(db.Countries, _ => _.Name == "Україна", () => new Country
                    {
                        Name = "Україна",
                        ISOCode = "UA"
                    }, "Країна Україна");

                    var uk = CreateIfNotExists(db.Countries, _ => _.Name == "Велика Британiя", () => new Country
                    {
                        Name = "Велика Британiя",
                        ISOCode = "UK"
                    }, "Країна Велика Британiя");

                    var lviv = CreateIfNotExists(db.Cities, _ => _.Name == "Львiв", () => new City
                    {
                        Name = "Львiв",
                        Country = ua,
                    }, "Мiсто Львiв");

                    var fest = CreateIfNotExists(db.RestaurantNetworks, _ => _.Name == "FEST", () => new RestaurantNetwork
                    {
                        Name = "FEST",
                        Country = ua
                    }, "Мережа FEST");

                    var kopalnia = CreateIfNotExists(db.Restaurants, _ => _.Name == "Копальня кави", () => new Restaurant
                    {
                        Name = "Копальня кави",
                        RestaurantNetwork = fest,
                        Address = "Площа ринок",
                        City = lviv
                    }, "Ресторан Копальня кави");

                    var miasoSparv = CreateIfNotExists(db.Restaurants, _ => _.Name == "М'ясо i справедливiсть", () => new Restaurant
                    {
                        Name = "М'ясо i справедливiсть",
                        RestaurantNetwork = fest,
                        Address = "Площа Данили Галицького",
                        City = lviv
                    }, "Ресторан М'ясо i справедливiсть");

                    db.SaveChanges();
                }
                Console.WriteLine("Тестовi даннi створенi...");
                return 0;
            }

            private static T CreateIfNotExists<T>(DbSet<T> set,
                Expression<Func<T, bool>> predicate,
                Func<T> factory, string description)
                where T : class
            {
                var entity = set.FirstOrDefault(predicate);
                if (entity == null)
                {
                    entity = set.Add(factory());
                    Console.WriteLine("Створено сутнiсть " + description);
                }
                else
                {
                    Console.WriteLine("Сутнiсть " + description + " вже iснує");
                }

                return entity;
            }
        }

        public class View : ConsoleCommand
        {
            public View()
            {
                IsCommand("view", "Дивитись даннi");
            }

            public override int Run(string[] remainingArguments)
            {
                using (var db = new RestaurantEntities())
                {
                    Console.WriteLine("Ресторани Львова");

                    var lviv = db.Cities.First(_ => _.Name == "Львiв");

                    foreach (var restoraunt in lviv.Restaurants)
                    {
                        Console.WriteLine("Ресторан " + restoraunt.Name);
                    }
                }
                return 0;
            }
        } 
    }
}
