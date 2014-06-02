# coding=utf-8
from numpy import *

def iterative(A, B, e):
    numrows, numcols = A.shape

    Ad = A.diagonal().T

    # DgZ = abs((eye(numcols) - 1))
    # Aa = matrix([(-A[i]/A[i,i]).getA1() for i in range(numcols)] * DgZ)
    # or use fill_diagonal
    Aa = matrix([[(0 if i==j else (-A[i, j]/A[i, i])) for j in range(numcols)] 
                        for i in range(numrows)])
    
    if not (Ad.T >= [sum(l) for l in array(Aa.tolist())]).all():
        raise Exception(u'Ітеративний метод не сходиться')

    Bb = (B / Ad)
    Xc = B[:]

    def all_right(Xc):
        return abs(sum((A * Xc) - B)) < e

    #for i in range(10):
    while not all_right(Xc):
        Xc = Bb + (Aa * Xc)
        #Xc = (1/Ad) * (B + (Aa * Xc))

    return Xc


def gaussseidel(A, B, e):
    U = triu(A)
    L = tril(A)
    D = A.diagonal()
    M = D + L    
    N = -U

    X = B[:]
    Pinv = M.I

    def all_right(X):
        return abs(sum((A * X) - B)) < e

    for i in range(10):
    #while not all_right(X):
        X = (Pinv * (N * X)) + (Pinv * B)

    return X


def gaussseidel2(a, b, x, e):

    def error(x1, x):
        return max(abs(x1 - x))

    xx = copy(x)
    x1x = zeros_like(x)

    for i in range(10):
        if error(x1x, xx) <= e:
            return xx
    #while not error(x1x, xx) <= e:
        x1x = copy(xx)
        for i in range(len(x1x)):
            sum_a = sum(a[i, :i] * x1x[:i])
            sum_b = sum(a[i, i+1:] * x1x[i+1:])
            xx[i] = (1 / a[i, i]) * (b[i] - sum_a - sum_b)
    else:
        raise Exception("Потрібно більше 10ти ітерацій, схоже система не сходиться.")

    return xx


if __name__ == '__main__':

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

    A = matrix([[4., 0.24, -0.08],
                [0.09, 3., -0.15],
                [0.04, -0.08, 4.]])

    B = matrix([[8.],
                [9.],
                [20.]])

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

    print(iterative(A, B, 0.000001))
    print(linalg.solve(A,B))
    # print(gaussseidel(A, B, 0.00001))
    print(gaussseidel2(A, B, B[:], 0.00001))

