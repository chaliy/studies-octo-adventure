namespace SolidDip.Views
{
    using SolidDip.ViewModel;

    public partial class DbDip
    {
        public DbDip()
        {
            InitializeComponent();

            Loaded += (s, e) =>
            {
                DataContext = new DbDipViewModel();
            };
        }
    }
}
