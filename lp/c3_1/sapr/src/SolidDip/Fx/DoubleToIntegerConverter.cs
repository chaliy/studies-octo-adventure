namespace SolidDip.Fx
{
    using System;
    using System.ComponentModel;
    using System.Globalization;
    using System.Windows.Data;

    public class DoubleToIntegerConverter : IValueConverter
    {
        //public override bool CanConvertFrom(ITypeDescriptorContext context, Type sourceType)
        //{
        //    return sourceType == typeof(double) || base.CanConvertFrom(context, sourceType);
        //}

        //public override bool CanConvertTo(ITypeDescriptorContext context, Type t)
        //{
        //    return base.CanConvertTo(context, t);
        //}

        //public override object ConvertFrom(ITypeDescriptorContext context, CultureInfo culture, object value)
        //{
        //    if (value is double)
        //    {
        //        var value2 = (double)value;
        //        return (int)value2;
        //    }
        //    return base.ConvertFrom(context, culture, value);
        //}

        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            return System.Convert.ToDouble(value);
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            return System.Convert.ToInt32(value);
        }
    }
}
