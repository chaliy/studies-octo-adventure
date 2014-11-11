namespace SolidDip.Views
{
    using SolidDip.ViewModel;

    public partial class Components
    {
        public Components()
        {
            InitializeComponent();
            Loaded += (s, e) =>
            {
                DataContext = new ComponentsViewModel();
            };
        }
    }
}
