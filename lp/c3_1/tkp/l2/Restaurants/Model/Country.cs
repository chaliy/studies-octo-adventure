namespace Restaurants.Model
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    
    public partial class Country
    {
        public Country()
        {
            this.Cities = new HashSet<City>();
            this.RestaurantNetworks = new HashSet<RestaurantNetwork>();
        }
    
        public System.Guid Id { get; set; }
        public string Name { get; set; }
        [MaxLength(3, ErrorMessage="ISO код країни не може бути довший за 3 символи")]
        public string ISOCode { get; set; }
    
        public virtual ICollection<City> Cities { get; set; }
        public virtual ICollection<RestaurantNetwork> RestaurantNetworks { get; set; }
    }
}
