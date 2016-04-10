using System;
using System.Threading.Tasks;
using MathNet.Numerics.LinearAlgebra;
using MathNet.Numerics.LinearAlgebra.Double;

namespace L3FunctionalDecomposition
{
    public class Program
    {
        

        private class Strategy
        {
            readonly int n;
            readonly Random rnd = new Random();            

            public Strategy(int n)
            {
                this.n = n;
            }
    
            async Task<Matrix<double>> BuildMatrix(Func<int, int, double> formula)
            {
                return DenseMatrix.Create(n, n, formula);           
            }
    
            async Task<Vector<double>> BuildVector(Func<int, double> formula)
            {
                return DenseVector.Create(n, formula);
            }

            public async Task<Matrix<double>> Go()
            {
                var A = await BuildMatrix((x, y) => rnd.NextDouble());
                var b = await BuildVector(i => (i % 2 == 0) ? 11 * Math.Pow(i, 2) : 11 / i);
                var y1 = A.Multiply(b).ToColumnMatrix();
                Console.WriteLine($"y1: ${y1}");

                var A1 = await BuildMatrix((x, y) => rnd.NextDouble());
                var b1 = await BuildVector(i => rnd.NextDouble());
                var c1 = await BuildVector(i => rnd.NextDouble());
                var y2 = A1.Multiply(b1.Subtract(c1.Multiply(2))).ToColumnMatrix();
                Console.WriteLine($"y2: ${y2}");

                var A2 = await BuildMatrix((x, y) => rnd.NextDouble());
                var B2 = await BuildMatrix((x, y) => rnd.NextDouble());
                var C2 = await BuildMatrix((x, y) => (x + y == 0) ? 0.0 : 1 / (Math.Pow(x,2) + y));
                var Y3 = A2.Multiply(B2.Subtract(C2));
                Console.WriteLine($"Y3: ${Y3}");

                var x1 = y2.Multiply(y1.Transpose());                
                var x2 = Y3.Multiply(y2.Transpose().Multiply(y2).At(0, 0));                
                var x3 = y1.Transpose().Multiply(Y3.Power(2)).Multiply(y2).At(0, 0);                
                var x4 = Y3;
                var x5 = Y3.Multiply(y1).Multiply(y1.Transpose()).Multiply(Y3);                
                
                return x1.Add(x2).Add(x3).Add(x4).Add(x5);

            }
        }            
        
        public static void Main(string[] args)
        {
            var strategy = new Strategy(5);
            var result = strategy.Go().Result;

            Console.WriteLine($"Result: {result}");

        }
    }
}
