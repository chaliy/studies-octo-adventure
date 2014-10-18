using OxyPlot;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace Guard.Views
{
    /// <summary>
    /// Interaction logic for OutputGraph.xaml
    /// </summary>
    public partial class OutputGraph : Page
    {
        public OutputGraph()
        {
            InitializeComponent();

            this.Points = new List<DataPoint>
                              {
                                  new DataPoint(0, 1.2),
                                  new DataPoint(1, 1.2),
                                  new DataPoint(2, 1.2),
                                  new DataPoint(3, 1.2),
                                  new DataPoint(4, 1.2),
                                  new DataPoint(5, 1.2),
                                  new DataPoint(6, 1.2),
                                  new DataPoint(7, 1.2),
                                  new DataPoint(8, 1.2),
                                  new DataPoint(9, 1.2),
                                  new DataPoint(10, 1.2)
                              };

        }

        public IList<DataPoint> Points { get; private set; }

        private void OnLoaded(object sender, RoutedEventArgs e)
        {
            DataContext = this;
        }
    }
}
