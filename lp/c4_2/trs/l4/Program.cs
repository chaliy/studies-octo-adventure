using System;
using MathNet.Numerics.LinearAlgebra.Double;

namespace L4LocalMul
{
    public class Program
    {
        readonly static Random rnd = new Random();

        public static void Main(string[] args)
        {
            var n = 10;
            var A = DenseMatrix.Create(n, n, (i, j) => i == j ? n : 0);
            Console.WriteLine($"A: {A}");
            var B = DenseMatrix.Create(n, n, (i, j) =>
            {
                Func<int> next = () => rnd.Next(1, 100);
                var q1 = (j < n/2) && (i < n/2);
                var q2 = (j >= n/2) && (i < n/2);
                var q3 = (j < n/2) && (i >= n/2);
                var q4 = (j >= n/2) && (i >= n/2);
                
                if (q1) return (i > j) ? next() : 0;
                if (q2) return (i > n-j-2) ? next() : 0;                
                if (q3) return (n-i > j) ? next() : 0;                
                if (q4) return (n-i > n-j-1) ? next() : 0;                

                return 0;
            });

            Console.WriteLine($"B: {B}");

            var Y1 = A.Multiply(B);
            Console.WriteLine($"Y1: {Y1}");

            var Y2 = DenseMatrix.Create(n, n, (i, j) => 0);
            for (var i = 0; i < n; i++)
            {
                for (var j = 0; j < n; j++)
                {
                    Y2[i, j] = 0;
                    for (var k = 0; k < n; k++)
                    {
                        Y2[i, j] += (A[i, k] * B[k, j]);
                    }
                }
            }
            Console.WriteLine($"Local: {Y2}");
        }
    }
}
