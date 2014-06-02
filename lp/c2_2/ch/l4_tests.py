# coding=utf-8
import random
import unittest

import numpy

from l4 import *

class TestL4(unittest.TestCase):

    def setUp(self):
        pass

  
    def test_iterative(self):  

        A = matrix([[4., 0.24, -0.08], 
                    [0.09, 3, -0.15], 
                    [0.04, -0.08, 4]])

        B = matrix([[8.],
                    [9.],
                    [20.]])

        X = iterative(A, B, 0.000001)
        
        self.assertTrue(allclose(X, [[ 1.90919836],
                                     [ 3.19496436],
                                     [ 5.04480727]]))


    def test_iterative_not_close(self):  

        A = matrix([
            [-5., 1., -7., 8.],
            [0., 9., -3., -4.],
            [-3., 7., 5., 0.],
            [0., -7., -11., -4.]
        ])

        B = matrix([[33.],
                    [-6.],
                    [-13.],
                    [10.]])

        self.assertRaises(Exception, iterative, (A, B, 0.000001))


if __name__ == '__main__':
    unittest.main()