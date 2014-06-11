# coding=utf-8
from numpy import *
INT_MAX = 60000

a = [110, 150, 120]
b = [100, 70, 110, 100]

c = [[3,8,1,4],
     [4,3,6,4],
     [5,2,3,3]]

print(u"Закрита: ", sum(a)==sum(b))

def base_plan(x, a, b):
    xv = matrix(x)
    xn,yn = xv.shape

    def find_iteration():

        av = copy(a)
        bv = copy(b)

        def find_min(): 
            xr = 0
            yr = 0
            m = INT_MAX
            for xi in range(xn):
                for yi in range(yn):
                    if av[xi] > 0 and bv[yi] > 0:
                        if xv[xi, yi] < m:
                            m = xv[xi, yi]
                            xr = xi
                            yr = yi

            return (xr, yr)

        cv = zeros_like(xv)

        for i in range(100):        
            m= find_min()    

            ac = av[m[0]]
            bc = bv[m[1]]        
            mc = min(ac, bc)        
            av[m[0]] = av[m[0]] - mc
            bv[m[1]] = bv[m[1]] - mc    

            cv[m[0], m[1]] = mc

            # print(m)
            # print(av)
            # print(xv)
            # print(bv)
            # print(cv)

            if sum(av) + sum(bv) == 0:
                break
        
        return cv

    cv = find_iteration()
    print(cv)    
    print("Вироджений:", sum(cv > 0) != xn + yn - 1)

print(base_plan(c, a, b))