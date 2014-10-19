namespace Restaurants.Model
{
    using System;
    using System.Collections.Generic;
    
    public partial class RestaurantNetwork
    {
        public RestaurantNetwork()
        {
            this.Restaurants = new HashSet<Restaurant>();
        }
    
        public System.Guid Id { get; set; }
        public string Name { get; set; }
#if HASOWNER
        public string Owner { get; set; }
#endif
        public virtual ICollection<Restaurant> Restaurants { get; set; }
        public virtual Country Country { get; set; }
    }
}
