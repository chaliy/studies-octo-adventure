namespace SolidDip.ViewModel
{
    using System.Collections.ObjectModel;    
    using System.Windows.Input;
    using Model;
    using SolidDip.Fx;
    using SolidDip.Services;
    using SolidDip.Solid;
    using SolidDip.Views;

    public class DbDipViewModel : ViewModelBase
    {
        public DbDipViewModel()
        {
            Corpuses = new ObservableCollection<DipCorpus>();
            foreach(var corpus in CorpusesStorage.AllCorpuses())
            {
                Corpuses.Add(corpus);
            }
            AddCommand = new ActionCommand(() =>
            {
                StartProgress();

                var editor = GenericEdit.Create(new DipCorpus
                {
                    Name = "Новий корпус",
                    PinCount = 8,
                    CorpusWidthMm = 6
                }, corpus =>
                {
                    Corpuses.Add(corpus);
                    SaveCorpuses();
                });

                editor.ShowDialog();

                CompleteProgress();
            });

            EditCommand = new ActionCommand<DipCorpus>(item =>
            {
                StartProgress();
                // TODO Should copy instead of modification
                var editor = GenericEdit.Create(item, corpus =>
                {                    
                    SaveCorpuses();
                });

                editor.ShowDialog();

                CompleteProgress();
            });

            RemoveCommand = new ActionCommand<DipCorpus>(item =>
            {
                StartProgress();

                Corpuses.Remove(item);
                SaveCorpuses();

                CompleteProgress();
            });

            GenerateCommand = new ActionCommand<DipCorpus>(item =>
            {
                StartProgress();

                new DipBuilder(new SwContext()).Build(item);

                CompleteProgress();
            });
        }

        private void SaveCorpuses()
        {
            CorpusesStorage.Save(Corpuses);
        }

        public ObservableCollection<DipCorpus> Corpuses { get; private set; }

        public ICommand AddCommand { get; private set; }
        public ICommand EditCommand { get; private set; }
        public ICommand RemoveCommand { get; private set; }
        public ICommand GenerateCommand { get; private set; }
    }
}
