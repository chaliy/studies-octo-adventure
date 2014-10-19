namespace Restaurants.Model
{
    using System;
    using System.Collections.Generic;
    
    public partial class City
    {
        public City()
        {
            this.Restaurants = new HashSet<Restaurant>();
        }
    
        public System.Guid Id { get; set; }
        public string Name { get; set; }
    
        public virtual Country Country { get; set; }
        public virtual ICollection<Restaurant> Restaurants { get; set; }
    }
}
