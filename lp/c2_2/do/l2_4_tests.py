import random
import unittest

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

from l2_4 import *

class TestL2_4(unittest.TestCase):

    def setUp(self):
        self.alternatives = pd.DataFrame({ 
            'Q1' : [1, 6, 5, 1, 5, 7, 3, 1],
            'Q2' : [4, 2, 7, 5, 2, 4, 2, 5],
            'Q3' : [6, 1, 7, 2, 2, 5, 2, 6] })

  
    def test_decide_with_linear_convolution(self):  

        result = decide_with_linear_convolution(self.alternatives, ['Q1', 'Q2', 'Q3'], [0.2, 0.3, 0.5])

        self.assertEqual(result.index.values, [2])


    def test_decide_with_maximin(self):  

        result = decide_with_maximin(self.alternatives, ['Q1', 'Q2', 'Q3'], [0.2, 0.3, 0.5])

        self.assertEqual(result.index.values, [5])

    def test_decide_with_lexicographical_optiomization(self):  

        result = decide_with_lexicographical_optiomization(self.alternatives, ['Q1', 'Q2', 'Q3'])

        self.assertEqual(result.index.values, [5])

    

if __name__ == '__main__':
    unittest.main()