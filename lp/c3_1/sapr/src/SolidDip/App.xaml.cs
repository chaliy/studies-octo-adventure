namespace SolidDip
{
    using SolidWorks.Interop.sldworks;
    using SolidWorks.Interop.swconst;
    using System;
    using System.Linq;
    using System.Threading;
    using System.Windows;
    using Helpers;

    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application
    {
        int errors;
        int warnings;

        protected override void OnStartup(StartupEventArgs e)
        {
            var sw = new SldWorks();
            sw.Visible = true;

            //var fileName = @"C:\\Users\\Mike\\Projects\\studies-octo-adventure\\lp\\c3_1\\sapr\\parts\\16 DIP IC.SLDASM";

            //var swModel = swApp.OpenDoc6(fileName, (int)swDocumentTypes_e.swDocASSEMBLY, (int)swOpenDocOptions_e.swOpenDocOptions_Silent, "", ref errors, ref warnings);

            //model_path = "Y:\\Templates\\Solidworks\\test.SLDPRT"
            //doc, errors, warnings = sw.OpenDoc6(model_path, swconst.constants.swDocPART, swconst.constants.swOpenDocOptions_Silent, "", pythoncom.Missing, pythoncom.Missing)
            //sw.ActivateDoc2(model_path, false,pythoncom.Missing)
            //Part = sw.ActiveDoc  

            var width = 0.00648;
            var length = 0.0098;
            var height = 0.00368;

            var bevel = 0.0005;
            var bottomBevel = 0.0003;


            ModelDoc2 doc = sw.NewPart();

            doc.Extension.SelectByID2("SLDPRT", "COMPONENT", 0, 0, 0, false, 0, null, 0);
            //doc.Extension.SelectByID2("Front Plane", "PLANE", 0, 0, 0, false, 0, null, 0);
            var bodySketchSegments = ((dynamic[])doc.SketchManager.CreateCornerRectangle(0, 0, 0, width, length, 0)).Cast<SketchSegment>();

            doc.SketchManager.InsertSketch(true);

            doc.SelectSegments(bodySketchSegments);

            var bodyFeature = doc.FeatureManager.FeatureExtrusion2(true, false, false,
                0, 0, height, height, false, false, false, false,
                0, 0, false, false, false, false, true, true, true, 0, 0, false);

            bodyFeature.Name = "Body Feature";

            doc.ClearSelection2(true);

            //var c = doc.SketchManager.CreateLine(0, 0, height / 2.0, 0, bevel, 0);
            //var a = doc.SketchManager.CreateLine(0, 0, 0, 0, 0, height / 2.0);
            //var b = ((dynamic[])doc.SketchManager.CreateCornerRectangle(0, 0, 0, width, length, 0)).Cast<SketchSegment>();

            doc.Extension.SelectByID2("Top Plane", "PLANE", 0, 0, 0, false, 0, null, 0);
            doc.SketchManager.InsertSketch(true);

            var pinSurfHeight = .0004;
            var bevelDepth = (height / 2.0) - (pinSurfHeight / 2.0);
          
            var leftBevelSketchSegments = doc.SketchManager.CreateSplain(
               .0, -bevelDepth, .0, // A
               bevel, .0, .0, // B
               width - bevel, .0, .0, // C
               width, -bevelDepth, .0, // D
               width, -(bevelDepth + pinSurfHeight), .0, // E Pin surface
               width - bottomBevel, -height, .0, // F
               bottomBevel, -height, .0, // G
               .0, -(bevelDepth + pinSurfHeight), .0, // H
               .0, -bevelDepth, .0 // A
               );

            doc.SketchManager.InsertSketch(true);

            doc.SelectSegments(leftBevelSketchSegments);


            var leftBevelFeature = doc.FeatureManager.FeatureCutThin2(false, false, false, 0, 0, length, length, false, false, false, false, 
                1.74532925199433E-02, 1.74532925199433E-02, false, false, false, false, 0.01, 0.01, 0.01, 0, 0, false, 0.005, true, true, 0, 0, false);
            
            leftBevelFeature.Name = "Bevel Feature";
            doc.ClearSelection2(true);

            
            base.OnStartup(e);

            Application.Current.Shutdown(); 
        } 
    }
}
