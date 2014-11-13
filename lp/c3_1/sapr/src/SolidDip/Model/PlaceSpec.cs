using System.ComponentModel;

namespace SolidDip.Model
{
    public class PlaceSpec
    {
        [Category("Позиція")]
        [DisplayName("X (мм)")]
        public double XMm { get; set; }

        [Category("Позиція")]
        [DisplayName("Y (мм)")]
        public double YMm { get; set; }

        [Category("Позиція")]
        [DisplayName("Кут")]
        public double Angle { get; set; }
    }
}
