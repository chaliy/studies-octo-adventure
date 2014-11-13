namespace SolidDip.ViewModel
{
    using System.Collections.ObjectModel;
    using System.Windows.Input;
    using Model;
    using Fx;
    using Services;
    using Views;
    using SolidDip.Solid;
    using System.Threading.Tasks;

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

                var editor = GenericEdit.Create(new DipCorpus { PinCount = 8, CorpusWidthMm = 6.0 }, async corpus =>
                {
                    var component = await Task.Run(() =>
                    {
                        var builder = new DipBuilder(new SwContext());
                        return builder.BuildComponent(corpus);
                    });
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

            GenerateCommand = new ActionCommand<CircuitComponent>(item =>
            {
                StartProgress();

                var editor = GenericEdit.Create(new PlaceSpec(), async place =>
                {
                    await Task.Run(() =>
                    {
                        var ctx = EnsureAssemblyContext();
                        if (ctx != null)
                        {
                            ctx.Place(place, item);
                        }
                    });
                });

                editor.ShowDialog();

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


        private AssemblyContext EnsureAssemblyContext()
        {
            //var assemblyFileName = @"C:\Users\Mike\Projects\studies-octo-adventure\lp\c3_1\sapr\parts\Example.SLDASM";
            //return new AssemblyContext(assemblyFileName);

            var open = new Microsoft.Win32.OpenFileDialog();
            open.FileName = "";
            open.DefaultExt = ".sldasm";
            open.Filter = "SolidWorks сбірки (.sldasm)|*.sldasm";

            if (open.ShowDialog() == true)
            {
                var assemblyFileName = open.FileName;

                return new AssemblyContext(assemblyFileName);
            }

            return null;
        }
    }
}
