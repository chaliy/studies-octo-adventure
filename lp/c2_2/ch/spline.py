from pylab import arange
from numpy import *
from math import e
from math import pi
from math import sin
from math import cos
from numpy import poly1d
from numpy import polyval


def cubic(n, x, y):

    zeroV = lambda m: ([0]*m)

    h = zeroV(n-1)

    # alpha will be values in a system of eq's that will allow us to solve for c
    # and then from there we can find b, d through substitution.
    alpha = zeroV(n-1)

    # l, u, z are used in the method for solving the linear system
    l = zeroV(n+1)
    u = zeroV(n)
    z = zeroV(n+1)

    # b, c, d will be the coefficients along with a.
    a = y
    b = zeroV(n)
    c = zeroV(n+1)
    d = zeroV(n)

    for i in range(n-1):
        # h[i] is used to satisfy the condition that
        # Si+1(xi+l) = Si(xi+l) for each i = 0,..,n-1
        # i.e., the values at the knots are "doubled up"
        h[i] = x[i+1]-x[i]

    for i in range(1, n-1):
        # Sets up the linear system and allows us to find c.  Once we have
        # c then b and d follow in terms of it.
        alpha[i] = (3./h[i])*(a[i+1]-a[i])-(3./h[i-1])*(a[i] - a[i-1])

    # I, II, (part of) III Sets up and solves tridiagonal linear system...
    # I
    l[0] = 1
    u[0] = 0
    z[0] = 0

    # II
    for i in range(1, n-1):
        l[i] = 2*(x[i+1] - x[i-1]) - h[i-1]*u[i-1]
        u[i] = h[i]/l[i]
        z[i] = (alpha[i] - h[i-1]*z[i-1])/l[i]

    l[n] = 1
    z[n] = 0
    c[n] = 0

    # III... also find b, d in terms of c.
    for j in range(n-2, -1, -1):
        c[j] = z[j] - u[j]*c[j+1]
        b[j] = (a[j+1] - a[j])/h[j] - h[j]*(c[j+1] + 2*c[j])/3.
        d[j] = (c[j+1] - c[j])/(3*h[j])


    def polinome(a, b, c, d, x_i):
        root = poly1d(x_i,True)
        # print(root)
        return d*root**3 + c*root**2 + b*root + a

    splines = [(x[j], x[j+1], polinome(a[j],b[j],c[j],d[j],x[j])) for j in range(n-1)]

    return lambda v: (p(v) for (xa, xb, p) in splines if xa < v <= xb)


x = linspace(0, 10, 10).tolist()
y = [cos(-x_val**2/8.0) for x_val in x]

cubic(10,x,y)