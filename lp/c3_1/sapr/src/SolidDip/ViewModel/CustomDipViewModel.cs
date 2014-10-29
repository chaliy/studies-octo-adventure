namespace SolidDip.ViewModel
{
    using System.Threading.Tasks;
    using System.Windows;
    using GalaSoft.MvvmLight;
    using GalaSoft.MvvmLight.Command;
    using Model;
    using Solid;

    public class CustomDipViewModel : ViewModelBase
    {
        public CustomDipViewModel()
        {
            InProgress = Visibility.Hidden;
            PinCount = 8;
            CorpusWidthMm = 6.0;
            GenerateCommand = new RelayCommand(async () =>
            {
                StartProgress();

                // Do generation
                var model = new DipCorpus
                {
                    Name = Name,
                    PinCount = PinCount,
                    CorpusWidthMm = CorpusWidthMm
                };

                await Task.Run(() => SwController.BuildDip(model));

                CompleteProgress();
            });
        }

        private void CompleteProgress()
        {
            InProgress = Visibility.Hidden;
            RaisePropertyChanged((() => InProgress));
        }

        private void StartProgress()
        {
            InProgress = Visibility.Visible;
            RaisePropertyChanged((() => InProgress));
        }

        public string Name { get; set; }
        public int PinCount { get; set; }
        public double CorpusWidthMm { get; set; }

        public Visibility InProgress { get; private set; }
        
        public RelayCommand GenerateCommand { get; private set; }

    }
}
