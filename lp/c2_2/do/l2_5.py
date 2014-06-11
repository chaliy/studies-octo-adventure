# coding=utf-8
from numpy import *
from operator import itemgetter, attrgetter

def vald(G):
    w = [min(a) for a in G]
    m = max(w)
    return [("A%d" % ai, a) for ai, a in enumerate(w) if a == m ]

def sevidge(G):
    r = [max(a) for a in G]
    m = min(r)
    return [("A%d" % ai, a) for ai, a in enumerate(r) if a == m ]

def hurwitz(G, x):
    h = lambda a: int(x * min(a) + (1-x) * max(a))
    r = [[min(a), max(a), h(a)]  for a in G]
    m = max(a[2] for a in r) 
    return [("A%d" % ai, a) for ai, a in enumerate(r) if a[2] == m ]
