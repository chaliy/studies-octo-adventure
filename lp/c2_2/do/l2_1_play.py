# coding=utf-8
import numpy

from l2_1 import *
        
# source = [79, 95, 4, 37, 92, 95, 12, 52, 70, 14]
# alternatives = [[int(x/10),x%10] for x in source]

alternatives = [[1,2], [3,1], [0,3], [-1,2], [4,1], [6,-2]]

print(pareto(alternatives))
print(slater(alternatives))
