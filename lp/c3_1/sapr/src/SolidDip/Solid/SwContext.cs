namespace SolidDip.Solid
{
    using SolidWorks.Interop.sldworks;

    public class SwContext
    {
        private SldWorks sw;

        public SwContext()
        {
            //var sw = Activator.GetObject(Type.GetTypeFromProgID("SldWorks.Application")) as SldWorks;
            //var sw = (SldWorks)System.Runtime.InteropServices.Marshal.GetActiveObject("SldWorks.Application");
            sw = new SldWorks();
            sw.Visible = true;
        }

        public SldWorks Instance { get { return sw; } }
    }
}
