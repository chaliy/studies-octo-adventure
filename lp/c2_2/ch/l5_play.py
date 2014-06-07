# coding=utf-8
import random
import unittest

import numpy
from l5 import *

if __name__ == '__main__':

    #f = lambda x: math.tan(x)
    #f = lambda x: x*x-9*x+14
    #f = lambda x: (x*x-cos(5*x))

    f = lambda x: 2.0*(x**4.0) - (x**2.0) - 10.0
    f1 = lambda x: 8.0*(x**3.0) - 2.0*x
    # a = -2.0
    # b = -1.0
    a = 1.0
    b = 2.0

    print(bisection(f, a, b, 0.0001))
    print(hord(f, a, b, 0.0001))
    print(newton(f, f1, a, b, 0.0001))
    print(fixed_point(f, (a + b)/2, 0.0001))    
