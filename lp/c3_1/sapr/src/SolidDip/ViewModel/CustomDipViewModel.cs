namespace SolidDip.ViewModel
{
    using System;
    using System.ComponentModel;
    using System.Threading.Tasks;
    using System.Windows;
    using GalaSoft.MvvmLight;
    using GalaSoft.MvvmLight.Command;
    using Model;
    using Utils;
    using Solid;

    public class CustomDipViewModel : ViewModelBase
    {
        public CustomDipViewModel()
        {
            PinCount = 8;
            CorpusWidthMm = 6.0;
            GenerateCommand = new RelayCommand(async () =>
            {
                if (!this.IsDataValid())
                {
                    MessageBox.Show(this.GetDataValidationError());
                    return;
                }
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
        
        public RelayCommand GenerateCommand { get; private set; }

        protected override string GetError(string columnName)
        {
            //if (columnName == "Name")
            //{
            //    if (String.IsNullOrWhiteSpace(Name))
            //    {
            //        return "Введіть будь ласка назву корпусу";
            //    }
            //}

            return null;            
        }
    }
}
