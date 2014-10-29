namespace SolidDip.ViewModel
{
    using System.Collections.ObjectModel;
    using System.Windows;
    using GalaSoft.MvvmLight;
    using GalaSoft.MvvmLight.Command;
    using Model;
    using SolidDip.Views;

    public class DbDipViewModel : ViewModelBase
    {
        public DbDipViewModel()
        {
            InProgress = Visibility.Hidden;
            Corpuses = new ObservableCollection<DipCorpus>
            {
                new DipCorpus
                {
                    Name = "Yjdf",
                    PinCount = 12,
                    CorpusWidthMm = 12.5
                }
            };
            AddCommand = new RelayCommand(() =>
            {
                StartProgress();

                // Do generation
                var item = new DipCorpus
                {
                    Name = "Новий корпус",
                    PinCount = 8,
                    CorpusWidthMm = 6
                };
                var editor = new EditDip();
                editor.DataContext = new EditDipViewModel(item, () => {
                    Corpuses.Add(item);
                    editor.Close();
                 });
                editor.ShowDialog();

                CompleteProgress();
            });

            EditCommand = new RelayCommand<DipCorpus>(item =>
            {
                StartProgress();

                var editor = new EditDip();
                editor.DataContext = new EditDipViewModel(item, editor.Close);
                editor.ShowDialog();

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

        public ObservableCollection<DipCorpus> Corpuses { get; private set; }

        public Visibility InProgress { get; private set; }
        
        public RelayCommand AddCommand { get; private set; }
        public RelayCommand<DipCorpus> EditCommand { get; private set; }

    }
}
