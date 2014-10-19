namespace Restaurants.Model
{
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;

    public class RestaurantEntities : DbContext
    {
        public RestaurantEntities()
            : base("name=RestaurantDatabase")
        {
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Properties()
                    .Where(p => p.Name == "Id")
                    .Configure(p => p.IsKey().HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity));

            modelBuilder.Properties()
                    .Where(p => p.PropertyType == typeof(string))
                    .Configure(p => p.IsVariableLength().HasMaxLength(455));

            modelBuilder.Entity<Country>().Property(_ => _.ISOCode).IsFixedLength().HasMaxLength(3);

        }

        public virtual DbSet<City> Cities { get; set; }
        public virtual DbSet<Country> Countries { get; set; }
        public virtual DbSet<Restaurant> Restaurants { get; set; }
        public virtual DbSet<RestaurantNetwork> RestaurantNetworks { get; set; }
    }

    
}
