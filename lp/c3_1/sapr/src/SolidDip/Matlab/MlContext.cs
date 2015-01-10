using System;
using System.Diagnostics;
using System.IO;
using System.Reflection;

namespace SolidDip.Matlab
{
    public class MlContext
    {
        public Tuple<double[], double> Execute(double l1, double l2, double l3)
        {
            MLApp.MLApp matlab = new MLApp.MLApp();


            var appFolder = Path.GetDirectoryName(
                Assembly.GetExecutingAssembly().Location
            );
            var workFolder = Path.Combine(appFolder, "Matlab");

            matlab.Execute(@"cd " + workFolder);

            object result = null;

            matlab.Feval("Calculation", 2, out result, l1, l2, l3);

            // Display result 
            object[] res = (object[])result;
            var x = (double[,])res[0];
            var fval = (double)res[1];

            return Tuple.Create(new double[] { x[0, 0], x[0, 1], x[0, 2] }, fval);
        }
    }
}
