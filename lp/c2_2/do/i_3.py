# coding=utf-8
import numpy

from l2_5 import *

# G = [[2,5,6,10,3],
#       [12,6,11,15,9],
#       [12,13,12,13,9],
#       [11,8,9,6,9]]


G = [[2,4,6,15,3],
      [12,6,11,10,9],
      [12,5,3,6,9],
      [3,8,2,9,4]]

print(vald(G))
print(sevidge(G))
print(hurwitz(G, 0.6))
print(laplas(G))
        