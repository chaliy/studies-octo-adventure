namespace SolidDip.Views
{
    using System;
    using SolidDip.ViewModel;

    public partial class GenericEdit
    {
        public GenericEdit(object initial, Action<object> success)
        {
            InitializeComponent();
            Loaded += (s, e) =>
            {
                DataContext = new GenericEditViewModel(initial, c =>
                {
                    success(c);
                    Close();
                });
            };
        }

        public static GenericEdit Create<T>(T initial, Action<T> succes)
        {
            return new GenericEdit(initial, result =>
            {
                succes((T)result);
            });
        }
    }
}
