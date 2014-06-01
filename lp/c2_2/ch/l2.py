# coding=utf-8
from numpy import *

def func_diff(y, n, i):
    def diff(n, i):
        if n == 1:
            return y[i+1] - y[i]
        if n == 0:
            return y[i]
        return diff(n-1, i+1) - diff(n-1, i)

    return diff(n, i)

def newton1(x, y, point, degree):
    h = x[1] - x[0]
    q = (point - x[0])/h

    def item(n):
        qq = q
        for j in range(1, n):
            qq *= (q - j + 1)
        #print(n, "q:", qq, "diff:", func_diff(y, n, 0))
        return (qq/math.factorial(n)) * func_diff(y, n, 0)

    return sum([y[0]] + [item(j) for j in range(1, degree + 1)])

def newton2(x, y, point, degree):
    h = x[1] - x[0]
    q = (point - x[-1])/h    

    def item(n):
        qq = q
        for j in range(1, n):
            qq *= (q + j - 1)
        #print(n, "q:", qq, "diff:", func_diff(y, n, degree-n))
        return (qq/math.factorial(n)) * func_diff(y, n, degree-n)

    return sum([y[-1]] + [item(j) for j in range(1, degree + 1)])