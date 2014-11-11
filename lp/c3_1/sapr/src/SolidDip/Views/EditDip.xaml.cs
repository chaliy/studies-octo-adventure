namespace SolidDip.Views
{
    using System;
    using System.Windows;
    using SolidDip.Model;
    using SolidDip.ViewModel;

    public partial class EditDip : Window
    {
        public EditDip(DipCorpus item, Action success)
        {
            InitializeComponent();
            Loaded += (s, e) =>
            {
                DataContext = new EditDipViewModel(item, () =>
                {
                    Close();
                    success();
                });
            };
        }
    }
}
