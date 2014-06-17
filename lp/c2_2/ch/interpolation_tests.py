# coding=utf-8
import random
import unittest

import numpy

from interpolation import *

class TestInterpolation(unittest.TestCase):
  
    def test_lagranage(self): 

        x = [1, 2, 4]
        f_test = {
            1: 1,
            2: 0,
            4: 3
        }.get


        test_x = [1, 2.5, 4, 5]

        result = [lagrange(xv, x, f_test) for xv in test_x]
        
        self.assertEqual(result, [1, .125, 3, 7])



if __name__ == '__main__':
    unittest.main()