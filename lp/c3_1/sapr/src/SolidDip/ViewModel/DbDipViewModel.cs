namespace SolidDip.ViewModel
{
    using System.Collections.ObjectModel;
    using System.Windows;
    using GalaSoft.MvvmLight;
    using GalaSoft.MvvmLight.Command;
    using Model;
    using SolidDip.Services;
    using SolidDip.Solid;
    using SolidDip.Views;

    public class DbDipViewModel : ViewModelBase
    {
        public DbDipViewModel()
        {
            InProgress = Visibility.Hidden;
            Corpuses = new ObservableCollection<DipCorpus>();
            foreach(var corpus in CorpusesStorage.AllCorpuses())
            {
                Corpuses.Add(corpus);
            }
            AddCommand = new RelayCommand(() =>
            {
                StartProgress();

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
                    SaveCorpuses();
                 });
                editor.ShowDialog();

                CompleteProgress();
            });

            EditCommand = new RelayCommand<DipCorpus>(item =>
            {
                StartProgress();

                var editor = new EditDip();
                editor.DataContext = new EditDipViewModel(item, () =>
                {
                    editor.Close();
                    SaveCorpuses();
                });
                editor.ShowDialog();

                CompleteProgress();
            });

            RemoveCommand = new RelayCommand<DipCorpus>(item =>
            {
                StartProgress();

                Corpuses.Remove(item);
                SaveCorpuses();

                CompleteProgress();
            });

            GenerateCommand = new RelayCommand<DipCorpus>(item =>
            {
                StartProgress();

                SwController.BuildDip(item);

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

        private void SaveCorpuses()
        {
            CorpusesStorage.Save(Corpuses);
        }

        public ObservableCollection<DipCorpus> Corpuses { get; private set; }

        public Visibility InProgress { get; private set; }
        
        public RelayCommand AddCommand { get; private set; }
        public RelayCommand<DipCorpus> EditCommand { get; private set; }
        public RelayCommand<DipCorpus> RemoveCommand { get; private set; }
        public RelayCommand<DipCorpus> GenerateCommand { get; private set; }
    }
}
