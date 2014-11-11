namespace SolidDip.Model
{
    using System;
    using System.ComponentModel;
    using Fx;

    public class DipCorpus : ObservableObject, IDataErrorInfo
    {
        string name;
        int pinCount;
        double corpusWidthMm;

        [Category("Загальне")]
        [DisplayName("Назва корпусу")]
        public string Name
        {
            get { return name; }
            set
            {
                name = value;
                RaisePropertyChanged(() => Name);
            }
        }

        [Category("Корпус")]
        [DisplayName("Кількість виводів")]
        [Editor(typeof(DipCorpusPinCountControl), typeof(DipCorpusPinCountControl))]
        public int PinCount
        {
            get { return pinCount; }
            set
            {
                pinCount = value;
                RaisePropertyChanged(() => PinCount);
            }
        }

        [Category("Корпус")]
        [DisplayName("Ширина(мм, Wb):")]
        [Editor(typeof(DipCorpusWidthControl), typeof(DipCorpusWidthControl))]
        public double CorpusWidthMm
        {
            get { return corpusWidthMm; }
            set
            {
                corpusWidthMm = value;
                RaisePropertyChanged(() => CorpusWidthMm);
            }
        }

        string IDataErrorInfo.Error
        {
            get
            {
                return null;
            }
        }

        string IDataErrorInfo.this[string columnName]
        {
            get
            {
                if (columnName == "Name")
                {
                    if (String.IsNullOrWhiteSpace(Name))
                    {
                        return "Введіть будь ласка назву корпуса";
                    }
                }
                return null;
            }
        }
    }
}
