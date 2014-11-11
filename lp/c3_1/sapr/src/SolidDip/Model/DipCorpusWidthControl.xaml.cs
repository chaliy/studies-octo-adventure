namespace SolidDip.Model
{
    using System.Windows;
    using Xceed.Wpf.Toolkit.PropertyGrid;
    using Xceed.Wpf.Toolkit.PropertyGrid.Editors;

    public partial class DipCorpusWidthControl : ITypeEditor
    {
        public DipCorpusWidthControl()
        {
            InitializeComponent();
        }

        public FrameworkElement ResolveEditor(PropertyItem propertyItem)
        {
            Loaded += (s, e) =>
            {
                DataContext = propertyItem;
            };
            return this;
        }
    }
}
