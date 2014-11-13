namespace SolidDip.ViewModel
{
    using System;
    using System.Windows.Input;
    using SolidDip.Fx;

    public class MainViewModel : ViewModelBase
    {

        public MainViewModel()
        {
            CurrentPage = new Uri("Views/Schema.xaml", UriKind.RelativeOrAbsolute);
            NavigateTo = new ActionCommand<string>(page =>
            {
                CurrentPage = new Uri(page, UriKind.RelativeOrAbsolute);
                RaisePropertyChanged("CurrentPage");
            });
        }

        public ICommand NavigateTo { get; private set; }

        public Uri CurrentPage { get; private set; }
    }
}