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
            //SimpleIoc.Default.Register<EditDipViewModel>();
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

        //public EditDipViewModel EditDip
        //{
        //    get
        //    {
        //        return ServiceLocator.Current.GetInstance<EditDipViewModel>();
        //    }
        //}

        public static void Cleanup()
        {
            // TODO Clear the ViewModels
        }
    }
}