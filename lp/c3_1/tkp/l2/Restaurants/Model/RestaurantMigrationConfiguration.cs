namespace Restaurants.Model
{
    using System.Linq;
    using System.Data.Entity.Migrations;

    public class RestaurantMigrationConfiguration : DbMigrationsConfiguration<RestaurantEntities>
    {
        public RestaurantMigrationConfiguration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(RestaurantEntities db)
        {
#if HASOWNER
            foreach (var rn in from rn in db.RestaurantNetworks
                               where rn.Name == "FEST" && rn.Owner == null
                               select rn)
            {
                rn.Owner = "Andriy Khudo";
            }
#endif
            base.Seed(db);
        }
    }
}
