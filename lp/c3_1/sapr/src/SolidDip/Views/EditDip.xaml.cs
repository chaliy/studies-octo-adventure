namespace SolidDip.Views
{
    using System.Windows;
    using SolidDip.ViewModel;

    public partial class EditDip : Window
    {
        public EditDip()
        {
            InitializeComponent();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            ((EditDipViewModel)DataContext).Save();
        }
    }
}
