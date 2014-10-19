namespace Restaurants.Model
{
    using System;
    using System.Collections.Generic;
    
    public partial class Restaurant
    {
        public System.Guid Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
    
        public virtual City City { get; set; }
        public virtual RestaurantNetwork RestaurantNetwork { get; set; }
    }
}
