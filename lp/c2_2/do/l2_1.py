# coding=utf8

from array import array
from collections import namedtuple

def pareto(alternatives):
    def more_or_equal(x,y):
        return (x[0] >= y[0] and x[1] >= y[1])

    next = alternatives	
    for f in alternatives:	
        next = [x for x in next if (not (more_or_equal(f, x)) or x == f)]

    return next

def slater(alternatives):
    def more(x,y):
        return (x[0] > y[0] and x[1] > y[1])

    next = alternatives	
    for f in alternatives:	
        next = [x for x in next if (not (more(f, x)) or x == f)]		

    return next

source = [79, 95, 4, 37, 92, 95, 12, 52, 70, 14]
alternatives = [[x/10,x%10] for x in source]
print("Source: ", alternatives)
print("Pareto: ", pareto(alternatives))
print("Slater: ", slater(alternatives))


s1 = [47, 24, 82, 35, 32, 04, 54, 43, 98, 86, 40, 78, 59, 62, 62, 83, 41, 48, 23, 24]
s2 = [72, 22, 54, 35, 21, 57, 65, 47, 71, 76, 69, 18, 1, 3, 53, 33, 07, 59, 28, 06]
s3 = [97, 20, 84, 8, 34, 98, 91, 76, 98, 15, 52, 71, 89, 59, 6, 10, 16, 24, 9, 39]

s2_alternatives = [[x/10,x%10] for x in s2]
print("Source: ", s2_alternatives)
#print("Pareto: ", pareto(s2_alternatives))
print("Slater: ", slater(s2_alternatives))

