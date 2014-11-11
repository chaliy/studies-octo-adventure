namespace SolidDip.Model
{
    using System.IO;
    using System.Windows;
    using Xceed.Wpf.Toolkit.PropertyGrid;
    using Xceed.Wpf.Toolkit.PropertyGrid.Editors;

    public partial class CircuitComponentDataControl : ITypeEditor
    {
        // TODO Make it show something meaningfull instead of byte[]...
        public CircuitComponentDataControl()
        {
            InitializeComponent();
        }

        public FrameworkElement ResolveEditor(PropertyItem propertyItem)
        {
            DataContext = propertyItem;
            return this;
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            var open = new Microsoft.Win32.OpenFileDialog();
            open.FileName = "";
            open.DefaultExt = ".sldprt";
            open.Filter = "SolidWorks частина (.sldprt)|*.sldprt";

            if (open.ShowDialog() == true)
            {
                var fileName = open.FileName;

                ((PropertyItem)DataContext).Value = File.ReadAllBytes(fileName);
            }
            else
            {
                ((PropertyItem)DataContext).Value = null;
            }            
        }

    }
}
