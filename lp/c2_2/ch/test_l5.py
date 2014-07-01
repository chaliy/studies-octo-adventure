# coding=utf-8
import random
import unittest

import numpy
import numpy.testing as nt

from l5 import *

class TestL5(unittest.TestCase):

    def setUp(self):
        self.f = lambda x: 2.0*(x**4.0) - (x**2.0) - 10.0
        self.f1 = lambda x: 8.0*(x**3.0) - 2.0*x
        self.a = 1.0
        self.b = 2.0
        self.e = 0.0001        

    def test_bisection(self):
        
        x = bisection(self.f, self.a, self.b, self.e)
        
        nt.assert_approx_equal(x, 1.581138, significant=5)

    def test_hord(self):
        
        x = hord(self.f, self.a, self.b, self.e)
        
        nt.assert_approx_equal(x, 1.581138, significant=5)

    def test_newton(self):
        
        x = newton(self.f, self.f1, self.a, self.b, self.e)
        
        nt.assert_approx_equal(x, 1.581138, significant=5)
  
    def test_fixed_point(self):
        f = lambda x : sqrt(x)

        x = fixed_point(f, .5, 0.001)
        
        nt.assert_approx_equal(x, 1.0, significant=3)

    

if __name__ == '__main__':
    unittest.main()