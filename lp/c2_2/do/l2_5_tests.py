# coding=utf-8
import random
import unittest

import numpy
import numpy.testing as nt

from l2_5 import *

class TestL2_5(unittest.TestCase):      

    def test_vald(self):
        
        G1 = [[20,30,15,15],
              [75,20,35,20],
              [25,80,25,25],
              [85,5,45,5]]

        O = vald(G1)
        
        self.assertEqual(O, [('A2', 25)])

    def test_sevidge(self):
        
        G2 = [[65,50,30],
              [10,60,10],
              [60,0,20],
              [0,75,0]]

        O = sevidge(G2)
        
        self.assertEqual(O, [('A1', 60), ('A2', 60)])

    def test_hurwitz(self):
        
        G3 = [[19,30,41,49],
              [51,38,10,20],
              [73,18,81,11]]

        O = hurwitz(G3, 0.6)
        
        self.assertEqual(O, [('A2', [11, 81, 39])])
    

if __name__ == '__main__':
    unittest.main()