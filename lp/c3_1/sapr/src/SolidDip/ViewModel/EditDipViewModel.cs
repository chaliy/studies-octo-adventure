namespace SolidDip.ViewModel
{
    using System;
    using System.Windows;
    using GalaSoft.MvvmLight.Command;
    using Model;
    using Utils;

    public class EditDipViewModel : ViewModelBase
    {
        public EditDipViewModel(DipCorpus item, Action success)
        {
            PinCount = item.PinCount;
            CorpusWidthMm = item.CorpusWidthMm;
            Name = item.Name;

            SaveCommand = new RelayCommand(() =>
            {
                if (!this.IsDataValid())
                {
                    MessageBox.Show(this.GetDataValidationError());
                    return;
                }

                StartProgress();

                item.PinCount = PinCount;
                item.CorpusWidthMm = CorpusWidthMm;
                item.Name = Name;
                
                CompleteProgress();

                success();
            });
        }

      
        public string Name { get; set; }
        public int PinCount { get; set; }
        public double CorpusWidthMm { get; set; }

        public RelayCommand SaveCommand { get; private set; }

        protected override string GetError(string columnName)
        {
            if (columnName == "Name")
            {
                if (String.IsNullOrWhiteSpace(Name))
                {
                    return "Введіть будь ласка назву корпусу";
                }
            }

            return null;
        }

    }
}
