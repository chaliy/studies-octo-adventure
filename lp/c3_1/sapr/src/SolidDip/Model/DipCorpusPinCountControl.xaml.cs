namespace SolidDip.Model
{
    using System.Windows;
    using Xceed.Wpf.Toolkit.PropertyGrid;
    using Xceed.Wpf.Toolkit.PropertyGrid.Editors;

    public partial class DipCorpusPinCountControl : ITypeEditor
    {
        public DipCorpusPinCountControl()
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
