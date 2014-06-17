# coding=utf-8
from numpy import *
from functools import reduce
import operator

def lagrange(x_point, x, f):
    n = len(x)

    def b(i):
        lx = 1.0        
        for j in range(n):
            if j != i:
                lx *= (x_point - x[j]) / (x[i] - x[j])
        return lx

    L = [b(i) for i in range(len(x))]

    return sum(L[i] * f(x[i]) for i in range(n))