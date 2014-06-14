from linalg_solve import *

 # A = matrix([[2.3, 6.7, 9.8],
#             [24, 42, 1],
#             [6, 0, 2]])

# B = matrix([[1.],
#             [2.],
#             [3.]])

# A = matrix([[4., -1, 1],
#             [2, 6, -1],
#             [1, 2, -3]])

# B = matrix([[4.],
#             [7.],
#             [0.]])

# A = matrix([[4., 0.24, -0.08],
#             [0.09, 3., -0.15],
#             [0.04, -0.08, 4.]])

# B = matrix([[8.],
#             [9.],
#             [20.]])

# A = matrix([
#     [-5., 1., -7., 8.],
#     [0., 9., -3., -4.],
#     [-3., 7., 5., 0.],
#     [0., -7., -11., -4.]
# ])
#
# B = matrix([[33.],
#             [-6.],
#             [-13.],
#             [10.]])

# Control

A = matrix([
    [-15.0, -2.0, 4.0, -4.0],
    [1.0, 9.0, -5.0, -1.0],
    [1.0, 3.0, 14.0, -3.0],
    [2.0, -1.0, 1.0, -5.0]
])

B = matrix([[9.0],
            [-4.0],
            [6.0],
            [-7.0]])

b = [9.0, -4.0, 6.0, -7.0]
# print(A.I * B)
# print(iterative(A, B, 0.000001))
print(linalg.solve(A,B))
# print(gaussseidel(A, B, zeros_like(B), 0.01))

# 2 [[ 0.42857143]] 
# L [ 0.07142857  0.21428571] [-0.76126984  0.09657848] * [-0.05437642  0.02069539] 
# R [-0.21428571] [ 1.34603175] * [-0.28843537] = 0.750687830688

# .43+

# print(A)
# print(A[1,:2])

# # print(B)
# print(B[:2])

# print(A[1,:2].getA1() * B[:2].getA1())




# def seidel(m, b, eps):
#     n = len(m)
#     r = range(n)
#     x = [0] * len(m)
#     c = 0
#     conv = False
#     while not conv:
#         p = x.copy()
#         for i in r:
#             var = sum(m[i][j] * p[j] for j in range(i))
#             var += sum(m[i][j] * p[j] for j in range(i, n))
#             x[i] = (b[i] - var) / m[i][i]
 
#         conv = sum((x[i]-p[i])**2 for i in r) < eps
#         print(x)
#         c += 1
#         if c > 100:
#             break
#     return x

# # B = [9.0, -4.0, 6.0, -7.0]

# # # print(is_seidel_conv(A))
# print(seidel([
#     [-15.0, -2.0, 4.0, -4.0],
#     [1.0, 9.0, -5.0, -1.0],
#     [1.0, 3.0, 14.0, -3.0],
#     [2.0, -1.0, 1.0, -5.0]
# ], [9.0, -4.0, 6.0, -7.0], 0.001))

# for i in range(6):
#      x[0] = A[0, 0]*0  + A[0,1]*x[1] + A[0,2]*x[2] + A[0,3]*x[3]
#      x[1] = A[1, 0]*x[0] + A[1,1]*0  + A[1,2]*x[2] + A[1,3]*x[3]
#      x[2] = A[2, 0]*x[0] + A[2,1]*x[1] + A[2,2]*0  + A[2,3]*x[3]
#      x[3] = A[3, 0]*x[0] + A[3,1]*x[1] + A[3,2]*x[2] + A[3,3]*0
#      print('%f %f %f %f' %(x[0],x[1],x[2],x[3])) #display the iterations to the user


# def seidel5(A, B):
#     print(tril(A))
#     print(triu(A))
#     n,m = A.shape  
#     GgZ = abs((eye(n) - 1))
#     print(GgZ)
#     U = triu(A) ** GgZ
#     print(U)


# seidel5(A,B)

# A = array([1,2,3])
# B = array([2,3,4])

# print(A)
# print(B)

# # print(A.prod(B))
# # print(A ** B)
# print(A * B)