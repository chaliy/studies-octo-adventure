__kernel void Transpose(__global float* B, __global float* A, int w, int h)
{
    int tx = get_global_id(0);
    int ty = get_global_id(1);
    
    if (tx < w && ty < h)
    {
        int iin  = tx  + w * ty;
        int iout = ty + h * tx;
        B[iout] = A[iin]; 
    }
}

__kernel void MultiplyScalar(__global float* B, __global float* A, float scale)
{
    int id = get_global_id(0);
    B[id] = A[id] * scale;
}

__kernel void AddMatrix(__global float* C, __global float* A, __global float* B)
{
    int id = get_global_id(0);
    C[id] = A[id] + B[id];
}	

__kernel void SubstractMatrix(__global float* C, __global float* A, __global float* B)
{
    int id = get_global_id(0);
    C[id] = A[id] - B[id];
}	

__kernel void MultiplyMatrixVector(__global float* c, __global float* A, __global float* b, int wA)
{
    int tx = get_global_id(0); 

    float value = 0;
    for (unsigned int k = 0; k < wA; ++k) {
        value += A[tx * wA + k] * b[k];
    }

    c[tx] = value;
}

__kernel void MultiplyMatrix(__global float* C, __global float* A, __global float* B, int wA, int wB)
{
     
   int tx = get_global_id(0); 
   int ty = get_global_id(1);
 
   float value = 0;
   for (int k = 0; k < wA; ++k)
   {
      float elementA = A[ty * wA + k];
      float elementB = B[k * wB + tx];
      value += elementA * elementB;
   }
 
   C[ty * wA + tx] = value;
}