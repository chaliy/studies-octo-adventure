namespace SolidDip.Helpers
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

        public static SketchSegment[] CreateSplain(this SketchManager manager, params double[] points)
        {
            var segments = new List<SketchSegment>();
            for(var i = 0; i < points.Length - 3; i+=3)
            {
                segments.Add(manager.CreateLine(points[i], points[i + 1], points[i + 2], points[i + 3], points[i + 4], points[i + 5]));
            }
            return segments.ToArray();
        }
    }
}
