namespace SolidDip.Utils
{
    using System;
    using System.Globalization;


    public static class PrimitivesExtensions
    {
        public static string ToInvariantString(this double input)
        {
            return input.ToString(CultureInfo.InvariantCulture);
        }

        public static double AsDoubleOrZero(this string input)
        {
            double output;
            if (Double.TryParse(input, out output))
            {
                return output;
            }
            return 0.0;
        }

        public static bool IsValidDouble(this string input)
        {
            double output;
            return Double.TryParse(input, out output);
        }
    }
}
