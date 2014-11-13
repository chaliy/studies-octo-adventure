namespace SolidDip.ViewModel
{
    using System;
    using System.ComponentModel;
    using System.Threading.Tasks;
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

        public GenericEditViewModel(object initial, Func<object, Task> success)
        {
            Object = initial;
            SaveCommand = new ActionCommand(async () =>
            {
                var err = Object as IDataErrorInfo;

                if (err != null && !err.IsDataValid())
                {
                    MessageBox.Show(err.GetDataValidationError());
                    return;
                }

                StartProgress();

                await success(Object);

                CompleteProgress();
            });
        }

        public object Object { get; set; }

        public ICommand SaveCommand { get; private set; }
    }
}
