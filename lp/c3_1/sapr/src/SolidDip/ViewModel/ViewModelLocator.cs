namespace SolidDip.ViewModel
{
    using GalaSoft.MvvmLight.Ioc;
    using Microsoft.Practices.ServiceLocation;

    public class ViewModelLocator
    {
        public ViewModelLocator()
        {
            ServiceLocator.SetLocatorProvider(() => SimpleIoc.Default);

            SimpleIoc.Default.Register<MainViewModel>();
            SimpleIoc.Default.Register<CustomDipViewModel>();
            SimpleIoc.Default.Register<DbDipViewModel>();
            SimpleIoc.Default.Register<PlaceElementViewModel>();
        }

        public MainViewModel Main
        {
            get
            {
                return ServiceLocator.Current.GetInstance<MainViewModel>();
            }
        }

        public CustomDipViewModel CustomDip
        {
            get
            {
                return ServiceLocator.Current.GetInstance<CustomDipViewModel>();
            }
        }

        public DbDipViewModel DbDip
        {
            get
            {
                return ServiceLocator.Current.GetInstance<DbDipViewModel>();
            }
        }

        public PlaceElementViewModel PlaceElement
        {
            get
            {
                return ServiceLocator.Current.GetInstance<PlaceElementViewModel>();
            }
        }

        public static void Cleanup()
        {
            // TODO Clear the ViewModels
        }
    }
}