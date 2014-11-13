namespace SolidDip.Solid
{
    using System;
    using System.Linq;
    using Utils;
    using Model;
    using SolidWorks.Interop.sldworks;
    using System.IO;
    using SolidWorks.Interop.swconst;

    public class DipBuilder
    {
        const double PinDistance = 0.00254;
        const double PinRadius = 0.0005;
        const double FirstPin = 0.00109;

        readonly SwContext ctx;
        int error;
        int warning;

        public DipBuilder(SwContext ctx)
        {
            this.ctx = ctx;
        }

        public ModelDoc2 Build(DipCorpus corpus)
        {
            var sw = ctx.Instance;

            var pinCount = corpus.PinCount;
            
            var width = corpus.CorpusWidthMm / 1000;
            var length = (((pinCount / 2) - 1) * PinDistance) + (FirstPin * 2.0);
            var height = 0.00368;

            var dx = (width / 2) + PinRadius;            
            var dy = -FirstPin;
            var dz = 0.005;

            var bevel = 0.0005;
            var bottomBevel = 0.0004;

            var pinSurfHeight = 0.0006;

            var halfHeight = height / 2.0;
            var halfWidth = width / 2.0;
            var halfLength = length / 2.0;

            var widthWithPins = width + (PinRadius * 2);
            var pinThickness = 0.0003;
            var pinWidth = 0.0005;
            var pinWidthBase = 0.0015;

            var bottomPinHeight = 0.0032;
            var bevelPinHeight = 0.00051;
            var pinHeight = bottomPinHeight + bevelPinHeight + halfHeight;
            

            ModelDoc2 doc = sw.NewPart();

            // Body
            doc.Extension.SelectByID2("Top Plane", "PLANE", 0, 0, 0, false, 0, null, 0);

            var bodyPlane = doc.FeatureManager.InsertRefPlane(8, dz, 0, 0, 0, 0);
            bodyPlane.Name = "Body Plane";
            
            doc.Extension.SelectByID2("Body Plane", "PLANE", 0, 0, 0, true, 0, null, 0);            
            
            var bodySketchSegments = doc.SketchManager.CreateLinesRectangle(
               -FirstPin, PinRadius, 0.0,                  
               -FirstPin + length, PinRadius + width, 0.0
               );

            doc.SketchManager.InsertSketch(true);

            doc.SelectSegments(bodySketchSegments);

            var bodyFeature = doc.FeatureManager.FeatureExtrusion2(false, false, false,
                0, 0, height / 2.0, height / 2.0, false, false, false, false,
                0, 0, false, false, false, false, true, true, true, 0, 0, false);

            bodyFeature.Name = "Body Feature";

            // Make it black
            foreach (var face in (dynamic[])bodyFeature.GetFaces())
            {
                var body = face.GetBody();
                body.MaterialPropertyValues2 = new double[9] { 0, 0, 0, 1, 1, 1, 0.3, 0, 0 }; // Black
            }

            doc.ClearSelection2(true);

            // Bevel
            doc.Extension.SelectByID2("Right Plane", "PLANE", 0, 0, 0, false, 0, null, 0);
            
            var leftBevelSketchSegments = doc.SketchManager.CreateLinesByPoints(
               dx - halfWidth, dz + (pinSurfHeight / 2.0), 0.0, // A
               dx - halfWidth + bevel, dz + halfHeight, 0.0, // B
               dx + halfWidth - bevel, dz + halfHeight, 0.0, // C
               dx + halfWidth, dz + (pinSurfHeight / 2.0), 0.0, // D
               dx + halfWidth, dz - (pinSurfHeight / 2.0), 0.0, // E
               dx + halfWidth - bottomBevel, dz - halfHeight, 0.0, // F
               dx - halfWidth + bottomBevel, dz - halfHeight, 0.0, // G
               dx - halfWidth, dz - (pinSurfHeight / 2.0), 0.0, // H
               dx - halfWidth, dz + (pinSurfHeight / 2.0), 0.0 // A
               );

            doc.SketchManager.InsertSketch(true);

            doc.SelectSegments(leftBevelSketchSegments);

            var leftBevelFeature = doc.FeatureManager.FeatureCutThin2(false, false, false, 0, 0, length, length, false, false, false, false,
                1.74532925199433E-02, 1.74532925199433E-02, false, false, false, false, 0.01, 0.01, 0.01, 0, 0, false, 0.005, true, true, 0, 0, false);

            leftBevelFeature.Name = "Bevel Feature";
            doc.ClearSelection2(true);

            // Cover Plane

            doc.Extension.SelectByID2("Top Plane", "PLANE", 0, 0, 0, true, 0, null, 0);
            var coverPlane = doc.FeatureManager.InsertRefPlane(8, dz + halfHeight, 0, 0, 0, 0);
            coverPlane.Name = "Cover Plane";

            // Sign
            doc.Extension.SelectByID2("Cover Plane", "PLANE", 0, 0, 0, true, 0, null, 0);
            var signSketchSegments = ((dynamic[])doc.SketchManager.CreateCenterRectangle(0.0, halfWidth + PinRadius, 0.0, .001, 0.0005, 0.0)).Cast<SketchSegment>();

            doc.RoundCorners(0.0002, signSketchSegments);

            doc.SketchManager.InsertSketch(true);

            doc.SelectSegments(signSketchSegments);
            var signFeature = doc.FeatureManager.FeatureCut3(true, false, false, 0, 0, halfHeight / 4.0, .0, false, false, false, false,
                1.74532925199433E-02, 1.74532925199433E-02, false, false, false, false, false, true, true, true, true, false, 0, .0, false);

            signFeature.Name = "Sign Feature";

            doc.ClearSelection2(true);

            return doc;

            // Pin Plane

            doc.Extension.SelectByID2("Front Plane", "PLANE", 0, 0, 0, true, 0, null, 0);
            var pinPlane = doc.FeatureManager.InsertRefPlane(264, (halfLength - FirstPin), 0, 0, 0, 0);
            pinPlane.Name = "Pin Plane";

            // First and Last Pin
            doc.Extension.SelectByID2("Pin Plane", "PLANE", 0, 0, 0, false, 0, null, 0);

            var pinSketchSegments = doc.SketchManager.CreateLinesByPoints(
              -widthWithPins / 2.0, -pinHeight, .0, // A
              -(halfWidth + PinRadius), +pinSurfHeight / 2.0, .0, // B
              +(halfWidth + PinRadius), +pinSurfHeight / 2.0, .0, // C
              +widthWithPins / 2.0, -pinHeight, .0 // D
            );

            doc.SketchManager.InsertSketch(true);

            var customBendAllowanceData = doc.FeatureManager.CreateCustomBendAllowance();
            customBendAllowanceData.KFactor = 0.5;
            var pinFeature = doc.FeatureManager.InsertSheetMetalBaseFlange2(pinThickness, false, PinRadius, pinWidthBase / 2.0, pinWidthBase / 2.0, false, 0, 0, 0,
                customBendAllowanceData, false, 0, 0.0001, 0.0001, 0.5, true, false, true, true);
            pinFeature.Name = "First and Last Pin Feature";

            // Pin profile
            doc.Extension.SelectByID2("Right Plane", "PLANE", 0, 0, 0, true, 0, null, 0);
            
            var dPin = halfLength - FirstPin;

            var pinProfileSketchSegments = doc.SketchManager.CreateLinesByPoints(
              -(pinWidth / 2.0) + dPin, -pinHeight, .0, // A
              -(pinWidth / 2.0) + dPin, -(halfHeight + bevelPinHeight), .0, // B
              -(pinWidthBase / 2.0) + dPin, -halfHeight, .0, // C
              -(pinWidthBase / 2.0) + dPin, -(pinHeight + 0.001), .0,
              (pinWidthBase / 2.0) + dPin, -(pinHeight + 0.001), .0,
              (pinWidthBase / 2.0) + dPin, -halfHeight, .0,
              (pinWidth / 2.0) + dPin, -(halfHeight + bevelPinHeight), .0,
              (pinWidth / 2.0) + dPin, -pinHeight, .0,
              -(pinWidth / 2.0) + dPin, -pinHeight, .0 // A
            );

            doc.SketchManager.InsertSketch(true);

            doc.SelectSegments(pinProfileSketchSegments);
            var pinProfileFeature = doc.FeatureManager.FeatureCut3(false, false, false, 0, 0, 0.01, 0.01, false, false, false, false,
                1.74532925199433E-02, 1.74532925199433E-02, false, false, false, false, false, true, true, true, true, false, 0, .0, false);
            pinProfileFeature.Name = "Pin Profile Feature";

            doc.ClearSelection2(true);

            // Create other pins

            var directionVertex = ((dynamic[])bodyFeature.GetFaces())
                .SelectMany(f => ((object[])f.GetEdges()).Cast<IEdge>())
                .Select(e => new
                {
                    Start = (double[])e.GetStartVertex().GetPoint(),
                    End = (double[])e.GetEndVertex().GetPoint()
                })
                .Where(v =>
                {
                    var edgeWidth = Math.Abs(v.Start[2] - v.End[2]);
                    return (Math.Abs(edgeWidth - length) < 0.001 && v.Start[2] > v.End[2]);
                })
                .First();
            
            doc.Extension.SelectByID2("", "EDGE", directionVertex.Start[0], directionVertex.Start[1], (directionVertex.Start[2] + directionVertex.End[2]) / 2.0, false, 1, null, 0);
            doc.Extension.SelectByID2("Pin Profile Feature", "SOLIDBODY", 3.68237484639167E-03, -1.38341410382736E-03, -3.5620114174435E-03, true, 256, null, 0);
            var otherPinsFeature = doc.FeatureManager.FeatureLinearPattern3(pinCount / 2, PinDistance, 1, 0.01, true, false, "NULL", "NULL", false, false);
            otherPinsFeature.Name = "Other Pins Feature";

            return doc;
        }

        public CircuitComponent BuildComponent(DipCorpus corpus)
        {
            var sw = ctx.Instance;
            var doc = Build(corpus);

            var tmpFileName = Path.Combine(Path.ChangeExtension(Path.GetTempFileName(), "sd") + "\\", corpus.Name + ".sldprt");

            Directory.CreateDirectory(Path.GetDirectoryName(tmpFileName));
            
            var ext = doc.Extension;
            var res = ext.SaveAs(tmpFileName, (int)swSaveAsVersion_e.swSaveAsCurrentVersion, 
                (int)swSaveAsOptions_e.swSaveAsOptions_Silent, null, ref error, ref warning);

            sw.QuitDoc(doc.GetTitle());

            return new CircuitComponent
            {
                PartName = corpus.Name,
                Data = File.ReadAllBytes(tmpFileName),                
                ZeroXMm = (corpus.CorpusWidthMm / 2) + 0.25,
                ZeroYMm = ((((corpus.PinCount / 2) - 1) * PinDistance) / 2) * 1000,
                ZeroZMm = 0.5,
                ZeroAngle = 90
            };
        }
    }
}
