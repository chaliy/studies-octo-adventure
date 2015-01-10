namespace SolidDip.Views
{
    using SolidDip.ViewModel;

    public partial class Calculation
    {
        public Calculation()
        {
            InitializeComponent();
            Loaded += (s, e) =>
            {
                DataContext = new CalculationViewModel();
            };
        }
    }
}
