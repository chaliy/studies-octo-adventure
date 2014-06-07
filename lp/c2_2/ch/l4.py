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


def gaussseidel(a, b, x, e):

    def error(x1, x):
        return max(abs(x1 - x))

    xx = copy(x)
    x1x = zeros_like(x)

    for i in range(10):
        if error(x1x, xx) <= e:
            return xx
        x1x = copy(xx)
        for i in range(len(x1x)):
            sum_a = sum(a[i, :i] * x1x[:i])
            sum_b = sum(a[i, i+1:] * x1x[i+1:])
            xx[i] = (1 / a[i, i]) * (b[i] - sum_a - sum_b)
    else:
        raise Exception("Потрібно більше 10ти ітерацій, схоже система не сходиться.")

    return xx
