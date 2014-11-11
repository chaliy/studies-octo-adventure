namespace SolidDip.ViewModel
{
    using System.ComponentModel;
    using System.Windows;
    using SolidDip.Fx;

    public abstract class ViewModelBase : ObservableObject, IDataErrorInfo
    {
        protected ViewModelBase()
        {
            InProgress = Visibility.Hidden;
        }

        protected void CompleteProgress()
        {
            InProgress = Visibility.Hidden;
            RaisePropertyChanged((() => InProgress));
        }

        protected void StartProgress()
        {
            InProgress = Visibility.Visible;
            RaisePropertyChanged((() => InProgress));
        }

        protected virtual string GetError(string columnName)
        {
            return null;
        }

        public Visibility InProgress { get; private set; }

        string IDataErrorInfo.Error
        {
            get
            {
                return null;
            }
        }

        string IDataErrorInfo.this[string columnName]
        {
            get
            {
                return GetError(columnName);
            }
        }
    }
}
