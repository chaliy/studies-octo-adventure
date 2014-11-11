namespace SolidDip.ViewModel
{
    using System;
    using System.Windows.Input;
    using GalaSoft.MvvmLight;
    using GalaSoft.MvvmLight.Command;

    public class MainViewModel : GalaSoft.MvvmLight.ViewModelBase
    {

        public MainViewModel()
        {
            CurrentPage = new Uri("Views/Schema.xaml", UriKind.RelativeOrAbsolute);
            NavigateTo = new RelayCommand<string>(page =>
            {
                CurrentPage = new Uri(page, UriKind.RelativeOrAbsolute);
                RaisePropertyChanged("CurrentPage");
            });
        }

        public ICommand NavigateTo { get; private set; }

        public Uri CurrentPage { get; private set; }
    }
}