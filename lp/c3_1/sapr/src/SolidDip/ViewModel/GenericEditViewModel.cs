namespace SolidDip.ViewModel
{
    using System;
    using System.ComponentModel;
    using System.Windows;
    using System.Windows.Input;
    using SolidDip.Fx;
    using Utils;

    public class GenericEditViewModel : ViewModelBase
    {
        public GenericEditViewModel(object initial, Action<object> success)
        {
            Object = initial;
            SaveCommand = new ActionCommand(() =>
            {
                var err = Object as IDataErrorInfo;

                if (err != null && !err.IsDataValid())
                {
                    MessageBox.Show(err.GetDataValidationError());
                    return;
                }

                StartProgress();

                success(Object);

                CompleteProgress();
            });
        }

        public object Object { get; set; }

        public ICommand SaveCommand { get; private set; }
    }
}
