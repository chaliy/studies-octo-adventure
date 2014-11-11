namespace SolidDip.Fx
{
    using System;
    using System.Windows.Input;

    public class ActionCommand : ICommand
    {
        readonly Action action;

        public ActionCommand(Action action)
        {
            this.action = action;
        }

        public event EventHandler CanExecuteChanged;

        public bool CanExecute(object parameter)
        {
            return true;
        }

        public void Execute(object parameter)
        {
            action();
        }
    }

    public class ActionCommand<T> : ICommand
    {
        readonly Action<T> action;

        public ActionCommand(Action<T> action)
        {
            this.action = action;
        }

        public event EventHandler CanExecuteChanged;

        public bool CanExecute(object parameter)
        {
            return true;
        }

        public void Execute(object parameter)
        {
            action((T)parameter);
        }
    }
}
