namespace SolidDip.Utils
{
    using System.ComponentModel;
    using System.Reflection;
    using System;
    using System.Linq;

    public static class DataErrorInfoExtensions
    {
        public static bool IsDataValid(this IDataErrorInfo target)
        {
            return target.GetType()
                .GetProperties(BindingFlags.Public | BindingFlags.Instance)
                .All(p => String.IsNullOrWhiteSpace(target[p.Name]));
        }

        public static string GetDataValidationError(this IDataErrorInfo target)
        {

            var errors = target.GetType()
                .GetProperties(BindingFlags.Public | BindingFlags.Instance)
                .Select(p => target[p.Name])
                .Where(e => !String.IsNullOrWhiteSpace(e));

            return String.Join("\r\n", errors);
            
        }
    }
}
