namespace SolidDip.Model
{
    using GalaSoft.MvvmLight;

    public class DipCorpus : ObservableObject
    {
        string name;
        int pinCount;
        double corpusWidthMm;

        public string Name
        {
            get { return name; }
            set
            {
                name = value;
                RaisePropertyChanged(() => Name);
            }
        }
        public int PinCount
        {
            get { return pinCount; }
            set
            {
                pinCount = value;
                RaisePropertyChanged(() => PinCount);
            }
        }

        public double CorpusWidthMm
        {
            get { return corpusWidthMm; }
            set
            {
                corpusWidthMm = value;
                RaisePropertyChanged(() => CorpusWidthMm);
            }
        }
    }
}
