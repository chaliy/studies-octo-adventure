namespace SolidDip.Views
{
    using SolidDip.ViewModel;

    public partial class CustomDip
    {
        public CustomDip()
        {
            InitializeComponent();
            Loaded += (s, e) =>
            {
                DataContext = new CustomDipViewModel();
            };
        }
    }
}
