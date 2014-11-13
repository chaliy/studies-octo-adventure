namespace SolidDip.ViewModel
{
    using System;
    using System.ComponentModel;
    using System.Threading.Tasks;
    using System.Windows;
    using Model;
    using Utils;
    using Solid;
    using SolidDip.Fx;
    using System.Windows.Input;

    public class CustomDipViewModel : ViewModelBase
    {
        public CustomDipViewModel()
        {
            PinCount = 8;
            CorpusWidthMm = 6.0;
            GenerateCommand = new ActionCommand(async () =>
            {
                StartProgress();

                // Do generation
                var model = new DipCorpus
                {
                    Name = Name,
                    PinCount = PinCount,
                    CorpusWidthMm = CorpusWidthMm
                };

                await Task.Run(() => new DipBuilder(new SwContext()).Build(model));

                CompleteProgress();
            });
        }

        public string Name { get; set; }
        public int PinCount { get; set; }
        public double CorpusWidthMm { get; set; }
        
        public ICommand GenerateCommand { get; private set; }
    }
}
