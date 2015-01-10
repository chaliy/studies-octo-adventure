namespace SolidDip.Solid
{
    using System.Linq;
    using System.Collections.Generic;
    using SolidWorks.Interop.sldworks;

    static class SwExtensions
    {
        public static void SelectSegments(this ModelDoc2 @this, IEnumerable<SketchSegment> segments)
        {
            @this.ClearSelection2(true);
            foreach (var segment in segments)
            {
                segment.Select(true);
            }
        }

        public static void RoundCorners(this ModelDoc2 @this, double d, IEnumerable<SketchSegment> segments)
        {
            var segmentsCached = segments.ToArray();
            @this.RoundCorner(d, segmentsCached[0], segmentsCached[1]);
            @this.RoundCorner(d, segmentsCached[1], segmentsCached[2]);
            @this.RoundCorner(d, segmentsCached[2], segmentsCached[3]);
            @this.RoundCorner(d, segmentsCached[3], segmentsCached[0]);
        }

        public static void RoundCorner(this ModelDoc2 @this, double d, SketchSegment segment1, SketchSegment segment2)
        {
            @this.ClearSelection2(true);
            segment1.Select(true);
            segment2.Select(true);
            @this.SketchManager.CreateFillet(d, 1);
        }

        public static SketchSegment[] CreateLinesByPoints(this SketchManager manager, params double[] points)
        {
            manager.InsertSketch(true);

            manager.AddToDB = true;
            var segments = new List<SketchSegment>();
            for(var i = 0; i < points.Length - 3; i+=3)
            {
                segments.Add(manager.CreateLine(points[i], points[i + 1], points[i + 2], points[i + 3], points[i + 4], points[i + 5]));
            }
            manager.AddToDB = false;
            return segments.ToArray();
        }

        public static SketchSegment[] CreateLinesRectangle(this SketchManager manager, double x1, double y1, double z1, double x2, double y2, double z2)
        {
            return manager.CreateLinesByPoints(
                x1, y1, z1, // A               
                x2, y1, z1, // B
                x2, y2, z2, // C
                x1, y2, z2, // D
                x1, y1, z1 // A
                );
        }

        
    }
}
