using OpenCL.Net.Extensions;
using OpenCL.Net;
using System;
using System.Linq;

namespace L4OpenCL
{
    class Program
    {
        private const int ArrayLength = 1024;

        static readonly int n = 10;
        static readonly Random rnd = new Random();

        static float[] Source(int n, Func<int, float> init) => Enumerable.Range(0, n).Select(init).ToArray();
        static float[] SourceZeroMatrix() => Source(n * n, _ => 0f);
        static float[] SourceZeroVector() => Source(n, _ => 0f);
        static float[] SourceRndMatrix() => Source(n * n, _ => (float)rnd.NextDouble());
        static float[] SourceRndVector() => Source(n, _ => (float)rnd.NextDouble());
        //static float[] SourceMatrix(Func<int, int, float> init) => Source(n * n, i => init(i%n, i));

        static float[] Transpose(OpenCL.Net.Environment env, float[] A, int w, int h)
        {
            var len = (uint)A.Length;
            var bufferA = env.Context.CreateBuffer(A, MemFlags.ReadOnly);            
            var bufferB = env.Context.CreateBuffer(Source(A.Length, _ => 0f), MemFlags.WriteOnly);

            var kernel = new Kernel.Transpose(env.Context);
            kernel.Compile("-cl-opt-disable");

            kernel.Run(env.CommandQueues[0], bufferB, bufferA, w, h, len);

            // WTF: We should wait for run
            var results = new float[A.Length];
            env.CommandQueues[0].ReadFromBuffer(bufferB, results);

            return results;
        }


        static float[] AddMatrix(OpenCL.Net.Environment env, float[] A, float[] B)
        {
            var len = (uint)A.Length;
            var bufferA = env.Context.CreateBuffer(A, MemFlags.ReadOnly);
            var bufferB = env.Context.CreateBuffer(B, MemFlags.ReadOnly);
            var bufferC = env.Context.CreateBuffer(Source(A.Length, _ => 0f), MemFlags.WriteOnly);

            var kernel = new Kernel.AddMatrix(env.Context);
            kernel.Compile("-cl-opt-disable");

            kernel.Run(env.CommandQueues[0], bufferC, bufferA, bufferB, len);

            // WTF: We should wait for run
            var results = new float[A.Length];
            env.CommandQueues[0].ReadFromBuffer(bufferC, results);

            return results;
        }

        static float[] SubstractMatrix(OpenCL.Net.Environment env, float[] A, float[] B)
        {
            var len = (uint)A.Length;
            var bufferA = env.Context.CreateBuffer(A, MemFlags.ReadOnly);
            var bufferB = env.Context.CreateBuffer(B, MemFlags.ReadOnly);
            var bufferC = env.Context.CreateBuffer(Source(A.Length, _ => 0f), MemFlags.WriteOnly);

            var kernel = new Kernel.SubstractMatrix(env.Context);
            kernel.Compile("-cl-opt-disable");

            kernel.Run(env.CommandQueues[0], bufferC, bufferA, bufferB, len);

            // WTF: We should wait for run
            var results = new float[A.Length];
            env.CommandQueues[0].ReadFromBuffer(bufferC, results);

            return results;
        }

        static float[] MultiplyScalar(OpenCL.Net.Environment env, float[] A, float scalar)
        {
            var len = (uint)A.Length;
            var bufferA = env.Context.CreateBuffer(A, MemFlags.ReadOnly);            
            var bufferB = env.Context.CreateBuffer(Source(A.Length, _ => 0f), MemFlags.WriteOnly);

            var kernel = new Kernel.MultiplyScalar(env.Context);
            kernel.Compile("-cl-opt-disable");

            kernel.Run(env.CommandQueues[0], bufferB, bufferA, scalar, len);

            // WTF: We should wait for run
            var results = new float[A.Length];
            env.CommandQueues[0].ReadFromBuffer(bufferB, results);

            return results;
        }

        static float[] MultiplyMatrix(OpenCL.Net.Environment env, float[] A, float[] B)
        {
            var len = (uint)A.Length;
            var bufferA = env.Context.CreateBuffer(A, MemFlags.ReadOnly);
            var bufferB = env.Context.CreateBuffer(B, MemFlags.ReadOnly);
            var bufferC = env.Context.CreateBuffer(SourceZeroMatrix(), MemFlags.WriteOnly);
            
            var kernel = new Kernel.MultiplyMatrix(env.Context);                        
            kernel.Compile("-cl-opt-disable");

            kernel.Run(env.CommandQueues[0], bufferC, bufferA, bufferB, n, n, len);

            // WTF: We should wait for run
            var results = new float[A.Length];
            env.CommandQueues[0].ReadFromBuffer(bufferC, results);

            return results;
        }

        static float[] MultiplyMatrixVector(OpenCL.Net.Environment env, float[] A, float[] b)
        {
            var len = (uint)b.Length;
            var bufferA = env.Context.CreateBuffer(A, MemFlags.ReadOnly);
            var bufferB = env.Context.CreateBuffer(b, MemFlags.ReadOnly);
            var bufferC = env.Context.CreateBuffer(SourceZeroVector(), MemFlags.WriteOnly);

            var kernel = new Kernel.MultiplyMatrixVector(env.Context);
            kernel.Compile("-cl-opt-disable");

            kernel.Run(env.CommandQueues[0], bufferC, bufferA, bufferB, n, len);

            // WTF: We should wait for run
            var results = new float[b.Length];
            env.CommandQueues[0].ReadFromBuffer(bufferC, results);

            return results;
        }

        static void DumpMatrix(float[] A)
        {
            Console.WriteLine(String.Join(",", A));
        }

        static void Main(string[] args)
        {
            using (var env = "*NVidia*".CreateCLEnvironment())
            {
                var A = SourceRndMatrix();
                var b = Source(n, i => (float)((i % 2 == 0) ? 11.0f * Math.Pow(i, 2) : 11.0f / i));
                var y1 = MultiplyMatrixVector(env, A, b);

                Console.WriteLine($"Вектор y1: {String.Join(",", y1)}");

                var A1 = SourceRndMatrix();
                var b1 = SourceRndVector();
                var c1 = SourceRndVector();
                var c12 = MultiplyScalar(env, c1, 2.0f);
                var b12 = SubstractMatrix(env, b1, c12);
                var y2 = MultiplyMatrixVector(env, A1, b12);

                Console.WriteLine($"Вектор y2: {String.Join(",", y2)}");


                var A2 = SourceRndMatrix();
                var B2 = SourceRndMatrix();
                var C2 = SourceRndMatrix(); // (x, y) => (x + y == 0) ? 0.0 : 1 / (Math.Pow(x, 2) + y));
                var C22 = SubstractMatrix(env, B2, C2);
                var Y3 = MultiplyMatrix(env, A2, C22);
                Console.WriteLine($"Матриця Y3: {String.Join(",", Y3)}");


                //var x1 = y2.Multiply(y1.Transpose());
                //var x2 = Y3.Multiply(y2.Transpose().Multiply(y2).At(0, 0));
                //var x3 = y1.Transpose().Multiply(Y3.Power(2)).Multiply(y2).At(0, 0);
                //var x4 = Y3;
                //var x5 = Y3.Multiply(y1).Multiply(y1.Transpose()).Multiply(Y3);

                //var R = x1.Add(x2).Add(x3).Add(x4).Add(x5);
                //Console.WriteLine($"R: {String.Join(",", R)}");                

            }
        }
    }
}
