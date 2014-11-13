namespace SolidDip
{
    using SolidDip.ViewModel;

    public partial class MainWindow
    {
        public MainWindow()
        {
            InitializeComponent();

            Loaded += (s, e) =>
            {
                DataContext = new MainViewModel();
            };
        }
    }
}
