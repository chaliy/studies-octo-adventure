namespace SolidDip.ViewModel
{
    using System;
    using System.IO;
    using System.Windows;
    using GalaSoft.MvvmLight.Command;
    using Model;
    using SolidDip.Solid;
    using Utils;

    public class PlaceElementViewModel : ViewModelBase
    {
        public PlaceElementViewModel()
        {
            X = 0.0.ToInvariantString();
            Y = 0.0.ToInvariantString();
            InsertCommand = new RelayCommand(() =>
            {
                if (!this.IsDataValid())
                {
                    MessageBox.Show(this.GetDataValidationError());
                    return;
                }

                StartProgress();

                var place = new PlaceSpec
                {
                    YMm = Y.AsDoubleOrZero(),
                    XMm = X.AsDoubleOrZero()
                };

                try
                {
                    var ctx = EnsureAssemblyContext();
                    if (ctx != null)
                    {
                        var partSpec = new CircuitComponent
                        {
                            PartName = "DIP8_2",
                            Data = File.ReadAllBytes(@"C:\Users\Mike\Projects\studies-octo-adventure\lp\c3_1\sapr\parts\DIP8.sldprt"),
                            ZeroXMm = 3.25,
                            ZeroYMm = 0.5,
                            ZeroZMm = 3.85,
                            ZeroAngle = 90
                        };
                        ctx.Place(place, partSpec);
                    }
                }
                catch(ApplicationException ex)
                {
                    MessageBox.Show(ex.Message);
                }

                CompleteProgress();
            });
        }


        public string Y { get; set; }
        public string X { get; set; }

        public string PartName { get; set; }

        public RelayCommand InsertCommand { get; private set; }

        protected override string GetError(string columnName)
        {
            if (columnName == "Y")
            {
                if (!Y.IsValidDouble())
                {
                    return "Y має бути валідним числом. Приклад: " + 0.0.ToInvariantString();
                }
            }

            if (columnName == "X")
            {
                if (!X.IsValidDouble())
                {
                    return "X має бути валідним числом. Приклад: " + 0.0.ToInvariantString();
                }
            }

            return null;
        }

        private AssemblyContext EnsureAssemblyContext()
        {
            var assemblyFileName = @"C:\Users\Mike\Projects\studies-octo-adventure\lp\c3_1\sapr\parts\Example.SLDASM";
            return new AssemblyContext(assemblyFileName);

            //var open = new Microsoft.Win32.OpenFileDialog();
            //open.FileName = "";
            //open.DefaultExt = ".sldasm";
            //open.Filter = "SolidWorks сбірки (.sldasm)|*.sldasm";

            //if (open.ShowDialog() == true)
            //{
            //    var assemblyFileName = open.FileName;

            //    return new AssemblyContext(assemblyFileName);
            //}

            //return null;
        }

    }
}
