# coding=utf-8
from numpy import *


sign = lambda x: math.copysign(1, x)

def bisection(f, a, b, e):

    xl = a
    xr = b
    m = xr - xl
    xd = xr - xl
    xm = (xr + xl) / 2
    for i in range(1000):
        xd = xd / 2
        xm = xl + xd
        
        if sign(f(xl)) != sign(f(xm)):
            xr = xm
        else:
            xl = xm

        if abs(f(xm)) < e:
            return xm
    else:
        raise Exception(u"Неможливо порахувати. Більше ніж 1000 ітерацій...")


def hord(f, a, b, e):
    for i in range(1000):
        va = f(a)
        vb = f(b)

        c = a - ((va/(vb - va)) * (a - b))
        if f(c)*va > 0.0:
            a = c
        else:
            b = c

        if abs(f(c)) < e:
            return c
    else:
        raise Exception(u"Неможливо порахувати. Більше ніж 1000 ітерацій...")     


def newton(f, f1, a, b, e):
    """ Метод Ньютона(Дотичних) """

    if f(a)*f1(a) > 0:
        c=a
    else: 
        c=b

    for i in range(1000):

        c = c-(f(c)/f1(c))

        if abs(f(c)) < e:
            return c
    else:
        raise Exception(u"Неможливо порахувати. Більше ніж 1000 ітерацій...")     


def fixed_point(f, x0, e):
    """ Метод простої ітерації """
    xc = x0    
    for i in range(1000):
        x = f(xc)
        if abs(xc - x) < e:
            return x

        if abs(x0 - x) > 1000.0:
            raise Exception(u"Неможливо порахувати. Незбіжна...")

        xc = x
    else:
        raise Exception(u"Неможливо порахувати. Більше ніж 1000 ітерацій...")
    