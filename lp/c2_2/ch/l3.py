# coding=utf-8
from numpy import *

def left_endpoint(x, y, f, a, b):
    return ((b-a)/len(x)) * sum(y[0:len(y)-1])

def right_endpoint(x, y, f, a, b):
    return ((b-a)/len(x)) * sum(y[1:])


def trapezoidal(x, y, f):
    h = x[1]-x[0]
    doubles = [v * 2 for v in y[1:len(y)-1]]
    return (h/2) * (y[0] + sum(doubles) + y[-1])

def simpson(x, y, f):
    h = x[1]-x[0]
    s1 = sum(y[1:-1:2])
    s2 = sum(y[2::2])
    return (h/3) * (y[0] + y[-1] + 4*s1 + 2*s2)
