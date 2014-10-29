namespace SolidDip.ViewModel
{
    using System;
    using System.Windows;
    using GalaSoft.MvvmLight;
    using GalaSoft.MvvmLight.Command;
    using Model;

    public class EditDipViewModel : ViewModelBase
    {
        private Action close;
        private DipCorpus item;

        public EditDipViewModel(DipCorpus item, Action close)
        {
            InProgress = Visibility.Hidden;
            PinCount = item.PinCount;
            CorpusWidthMm = item.CorpusWidthMm;
            Name = item.Name;
            this.item = item;
            this.close = close;

            SaveCommand = new RelayCommand(() =>
            {
                StartProgress();

                item.PinCount = PinCount;
                item.CorpusWidthMm = CorpusWidthMm;
                item.Name = Name;
                
                CompleteProgress();

                close();
            });
        }

        public void Save()
        {
            StartProgress();

            item.PinCount = PinCount;
            item.CorpusWidthMm = CorpusWidthMm;
            item.Name = Name;

            CompleteProgress();

            close();

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
        
        public RelayCommand SaveCommand { get; private set; }

    }
}
