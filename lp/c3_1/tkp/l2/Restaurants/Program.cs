namespace Restaurants
{
    using ManyConsole;
    using Restaurants.Model;
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

        public class Validate : ConsoleCommand
        {
            public Validate()
            {
                IsCommand("validate", "Тестова валiдацiя данних");
            }

            public override int Run(string[] remainingArguments)
            {
                using (var db = new RestaurantEntities())
                {
                    var gvadelupa = db.Countries.Add(new Country
                    {
                        Name = "Гваделупа",
                        ISOCode = "Гваделупа"
                    });

                    var validationErrors = db.GetValidationErrors()
                        .Where(vr => !vr.IsValid)
                        .SelectMany(vr => vr.ValidationErrors);

                    foreach (var error in validationErrors)
                    {
                        Console.WriteLine(error.ErrorMessage);
                    }

                }
                return 0;
            }
        }

        public class Audit : ConsoleCommand
        {
            public Audit()
            {
                IsCommand("audit", "Тестовий аудит данних");
            }

            public override int Run(string[] remainingArguments)
            {
                using (var db = new RestaurantEntities())
                {
                    var miasoSparv = db.Restaurants.First(_ => _.Name == "М'ясо i справедливiсть");
                    var tmpAddress = miasoSparv.Address;

                    // Change value directly in the DB
                    using (var db2 = new RestaurantEntities())
                    {
                        db.Database.ExecuteSqlCommand("update Restaurants set Address = 'Нова адресса в БД' where Name = 'М''ясо i справедливiсть'");
                    }

                    // Change the current value in memory
                    miasoSparv.Address = "Нова адресса в пам'ятi";

                    // Dump values
                    Console.WriteLine("Оригiнальне значення: " + db.Entry(miasoSparv).Property(m => m.Address).OriginalValue);
                    Console.WriteLine("Поточне значення: " + db.Entry(miasoSparv).Property(m => m.Address).CurrentValue);
                    Console.WriteLine("Значення з базиданних: " + db.Entry(miasoSparv).GetDatabaseValues().GetValue<string>("Address"));

                    // Revert back value
                    miasoSparv.Address = tmpAddress;
                    db.SaveChanges();
                }
                return 0;
            }
        }
#if HASOWNER
        public class Owner : ConsoleCommand
        {
            public Owner()
            {
                IsCommand("owner", "Дивитись власника мережi");
            }

            public override int Run(string[] remainingArguments)
            {
                using (var db = new RestaurantEntities())
                {
                    Console.WriteLine("Власники мережi");

                    foreach (var rn in db.RestaurantNetworks)
                    {
                        Console.WriteLine("Мережа " + rn.Name + ", власник " + rn.Owner);
                    }
                }
                return 0;
            }
        }
#endif
    }
}
