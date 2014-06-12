# coding=utf-8
import random
import unittest

import numpy
import numpy.testing as nt

from l2_1 import *

class TestL2_5(unittest.TestCase):      

    def test_pareto(self):
        
        source = [79, 95, 4, 37, 92, 95, 12, 52, 70, 14]
        alternatives = [[int(x/10),x%10] for x in source]
        results = pareto(alternatives)
     
        self.assertEqual(results, [[7, 9], [9, 5], [9, 5]])

    def test_slater(self):
        
        source = [79, 95, 4, 37, 92, 95, 12, 52, 70, 14]
        alternatives = [[int(x/10),x%10] for x in source]
        results = slater(alternatives)
     
        self.assertEqual(results, [[7, 9], [9, 5], [9, 2], [9, 5]])
  

if __name__ == '__main__':
    unittest.main()