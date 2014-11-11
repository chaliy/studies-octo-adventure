namespace SolidDip.Solid
{
    using System.IO;
    using SolidDip.Model;
    using SolidWorks.Interop.sldworks;
    using SolidWorks.Interop.swconst;

    public class AssemblyContext
    {
        readonly SldWorks sw;
        readonly ModelDoc2 doc;
        int error;
        int warning;

        const double PI = 3.14159;
        const double RadPerDeg = PI / 180.0;
        readonly string workingFolder;
        readonly MathUtility math;
        readonly DragOperator drag;

        public AssemblyContext(string assemblyPath)
        {
            //var sw = Activator.GetObject(Type.GetTypeFromProgID("SldWorks.Application")) as SldWorks;
            //var sw = (SldWorks)System.Runtime.InteropServices.Marshal.GetActiveObject("SldWorks.Application");
            sw = new SldWorks();
            sw.Visible = true;
            workingFolder = Path.GetDirectoryName(assemblyPath);
            sw.SetCurrentWorkingDirectory(workingFolder);

            var filePath = assemblyPath;

            doc = sw.OpenDoc6(filePath,
                (int)swDocumentTypes_e.swDocASSEMBLY,
                (int)swOpenDocOptions_e.swOpenDocOptions_Silent, "",
                ref error, ref warning);

            drag = (DragOperator)((AssemblyDoc)doc).GetDragOperator();
            math = (MathUtility)sw.GetMathUtility();
        }

        public ModelDoc2 AssemblyDocument { get { return doc; } }
        public AssemblyDoc Assembly { get { return (AssemblyDoc)doc; } }


        public void Place(PlaceSpec place, Model.CircuitComponent part)
        {
            var partPath = Path.Combine(workingFolder, part.PartName + ".sldprt");
            if (!File.Exists(partPath))
            {
                File.WriteAllBytes(partPath, part.Data);
            }

            var pattDoc = sw.OpenDoc6(partPath,
                (int)swDocumentTypes_e.swDocPART,
                (int)swOpenDocOptions_e.swOpenDocOptions_Silent, "", ref error, ref warning);

            // Activate main assembly
            sw.ActivateDoc3(doc.GetTitle(), true, (int)swRebuildOnActivation_e.swUserDecision, ref error);

            // In context of top projection place goes X -> X, Y -> Z
            var x = (part.ZeroXMm - place.XMm) / 1000;
            var y = part.ZeroYMm / 1000;
            var z = (part.ZeroZMm + place.YMm) / 1000;

            var component = ((AssemblyDoc)doc).AddComponent5(Path.GetFileNameWithoutExtension(partPath),
                (int)swAddComponentConfigOptions_e.swAddComponentConfigOptions_CurrentSelectedConfig,
                "", false, "", x, y, z);

            RotatePartY(component, new[] { -place.XMm / 1000, 0.0, -place.YMm / 1000 }, part.ZeroAngle + place.Angle);
        }

        private void RotatePartY(Component2 component, double[] origin, double angle)
        {
            if (angle != 0)
            {
                var point = (MathPoint)math.CreatePoint(origin);
                var axis = (MathVector)math.CreateVector(new[] { 0.0, 1.0, 0.0 }); // Y                
                var form = (MathTransform)math.CreateTransformRotateAxis(point, axis, angle * RadPerDeg);

                drag.AddComponent(component, false);

                drag.CollisionDetectionEnabled = false;
                drag.DynamicClearanceEnabled = false;
                // Axial rotation
                drag.TransformType = 1;
                // Solve by relaxation
                drag.DragMode = 2;

                drag.BeginDrag();
                drag.Drag(form);
                drag.EndDrag();
            }            
        }

        //private void MovePart(Component2 component, double x, double y)
        //{
        //    // In context of top projection X -> X, Y -> Z
        //    var transform = new[] {
        //        // Unit rotation matrix
        //        1.0, 0.0, 0.0,
        //        0.0, 1.0, 0.0,
        //        0.0, 0.0, 1.0,
        //        // Translation
        //        x, 0,0, -y,
        //        // Unit scaling
        //        1.0,
        //        // No used so pad with zeros
        //        0.0, 0.0, 0.0,
        //    };
             
        //    var form = (MathTransform)math.CreateTransform(transform);

        //    drag.AddComponent(component, false);

        //    drag.CollisionDetectionEnabled = false;
        //    drag.DynamicClearanceEnabled = false;
        //    // Axial rotation
        //    drag.TransformType = 0;
        //    // Solve by relaxation
        //    drag.DragMode = 2;

        //    drag.BeginDrag();
        //    drag.Drag(form);
        //    drag.EndDrag();

        //}
    }
}
