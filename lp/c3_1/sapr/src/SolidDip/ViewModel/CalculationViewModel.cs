namespace SolidDip.ViewModel
{
    using System.Windows.Input;
    using Model;
    using Fx;
    using System;

    public class CalculationViewModel : ViewModelBase
    {
        public CalculationViewModel()
        {
            Spec = new CalculationSpec
            {
                L1 = 310,
                L2 = 900,
                L3 = 1600
            };

            CalculateCommand = new ActionCommand<CircuitComponent>(item =>
            {
                StartProgress();

                var ctx = new Matlab.MlContext();

                var result = ctx.Execute(Spec.L1, Spec.L2, Spec.L3);

                Result = "Результат: " + String.Join("; ", result.Item1);
                RaisePropertyChanged(() => Result);

                CompleteProgress();
            });
        }

        public CalculationSpec Spec { get; private set; }

        public string Result { get; private set; }

        public ICommand CalculateCommand { get; private set; }

    }
}
