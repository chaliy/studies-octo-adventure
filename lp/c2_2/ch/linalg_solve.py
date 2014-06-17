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


def is_seidel_conv(A):
    n,m = A.shape    
    for i in range(n):        
      for j in range(m):
        if j != i:
            # TODO incorrect: Should be summ of other items
          if abs(A[i, j]) >= abs(A[i, i]):
            return False
    return True


def gaussseidel(A, b, x, e):

    def error(x1, x):
        return max(abs(x1 - x))

    n, m = A.shape

    Ad = A.diagonal().T
    bb = (b / Ad)    

    Aa = matrix([[(0 if i==j else (A[i, j]/A[i, i])) for j in range(m)]
                        for i in range(n)])

    xx = matrix(x, copy=True)    

    for counter in range(10):        
        x_prev = copy(xx)
        for i in range(n):
                        
            sum_a = sum(Aa[i, :i].getA1() * xx[:i].getA1())
            sum_b = sum(Aa[i, i+1:].getA1() * xx[i+1:].getA1())
            
            xn = bb[i] - (sum_a + sum_b);

            xx[i] = xn            
        if error(x_prev, xx) <= e:
            return xx        
    else:        
        raise Exception("Потрібно більше 10ти ітерацій, схоже система не сходиться.")

    return xx


def gaussseidel_matrix(A, B):
    print(tril(A))
    print(triu(A))
    n,m = A.shape  
    GgZ = abs((eye(n) - 1))
    print(GgZ)
    U = triu(A) ** GgZ
    print(U)