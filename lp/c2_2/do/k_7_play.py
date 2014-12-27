# coding=utf-8
from numpy import *
INT_MAX = 60000

a = [110, 150, 120]
b = [100, 70, 110, 100]

c = [[3,8,1,4],
     [4,3,6,4],
     [5,2,3,3]]

print('Закрита: ', sum(a)==sum(b))

def plan(x, a, b):
    xv = matrix(x)
    xn,yn = xv.shape

    def find_iteration(s=0):

        av = copy(a)
        bv = copy(b)

        def find_min(s=0):

            sc = 0
            for xvi in xv.A1.argsort():
                x,y = unravel_index(xvi, xv.shape)
                if av[x] > 0 and bv[y] > 0:
                    if sc == s:
                        return (x,y)
                    else:
                        sc += 1

        cv = zeros_like(xv)

        for i in range(100):
            m = find_min(s)
            s = 0

            ac = av[m[0]]
            bc = bv[m[1]]
            mc = min(ac, bc)
            av[m[0]] = av[m[0]] - mc
            bv[m[1]] = bv[m[1]] - mc

            cv[m[0], m[1]] = mc

            if sum(av) + sum(bv) == 0:
                break

        return cv


    for i in range(100):
        cv = find_iteration(i)
        print('Iтерацiя #' + str(i) + ": \n" + str(cv))
        if sum(cv > 0) != xn + yn - 1:
            print('Вироджений план...')
        else:
            return cv

print("Результат: \n" +  str(plan(c, a, b)))
