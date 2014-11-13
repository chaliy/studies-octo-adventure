namespace SolidDip.Views
{
    using System;
    using System.Threading.Tasks;
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

        public GenericEdit(object initial, Func<object, Task> success)
        {
            InitializeComponent();
            Loaded += (s, e) =>
            {
                DataContext = new GenericEditViewModel(initial, async c =>
                {
                    await success(c);
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

        public static GenericEdit Create<T>(T initial, Func<T, Task> succes)
        {
            return new GenericEdit(initial, async result =>
            {
                await succes((T)result);
            });
        }
    }
}
