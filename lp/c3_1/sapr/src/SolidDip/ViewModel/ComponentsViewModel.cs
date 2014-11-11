namespace SolidDip.ViewModel
{
    using System.Collections.ObjectModel;
    using System.Windows.Input;
    using Model;
    using Fx;
    using Services;
    using Views;
    using SolidDip.Solid;

    public class ComponentsViewModel : ViewModelBase
    {
        public ComponentsViewModel()
        {
            Components = new ObservableCollection<CircuitComponent>();
            foreach (var component in ComponentsStorage.AllComponents())
            {
                Components.Add(component);
            }
            AddExistingCommand = new ActionCommand(() =>
            {
                StartProgress();

                var editor = GenericEdit.Create(new CircuitComponent(), component =>
                {
                    Components.Add(component);
                    SaveCorpuses();
                });

                editor.ShowDialog();

                CompleteProgress();
            });

            AddDIPCommand = new ActionCommand(() =>
            {
                StartProgress();

                var editor = GenericEdit.Create(new DipCorpus { PinCount = 8, CorpusWidthMm = 6.0 }, corpus =>
                {
                    var builder = new DipBuilder(new SwContext());
                    var component = builder.BuildComponent(corpus);
                    Components.Add(component);
                    SaveCorpuses();
                });

                editor.ShowDialog();

                CompleteProgress();
            });

            EditCommand = new ActionCommand<CircuitComponent>(item =>
            {
                StartProgress();

                //var editor = new EditDip(item, () =>
                //{
                //    SaveCorpuses();
                //});
                //editor.ShowDialog();

                CompleteProgress();
            });

            RemoveCommand = new ActionCommand<CircuitComponent>(item =>
            {
                StartProgress();

                Components.Remove(item);
                SaveCorpuses();

                CompleteProgress();
            });

            GenerateCommand = new ActionCommand<DipCorpus>(item =>
            {
                StartProgress();

                //new DipBuilder(item).Build();

                CompleteProgress();
            });
        }

        private void SaveCorpuses()
        {
            ComponentsStorage.Save(Components);
        }

        public ObservableCollection<CircuitComponent> Components { get; private set; }

        public ICommand AddExistingCommand { get; private set; }
        public ICommand AddDIPCommand { get; private set; }

        public ICommand EditCommand { get; private set; }
        public ICommand RemoveCommand { get; private set; }
        public ICommand GenerateCommand { get; private set; }
    }
}
