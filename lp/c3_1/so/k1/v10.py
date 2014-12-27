# coding=utf-8
from numpy import *
from scipy.optimize import minimize

set_printoptions(precision=4, suppress=True)

cons = ({'type': 'ineq', 'fun': lambda x:  2400 - 0.3 * x[0] - 0.5 * x[1] - 2.0 * x[2]},
        {'type': 'ineq', 'fun': lambda x:  310 - x[0]},
        {'type': 'ineq', 'fun': lambda x:  1900 - x[1]},
        {'type': 'ineq', 'fun': lambda x:  900 - x[2]}
       )

f = lambda x: -1 * (2.5 * x[0] + 4.0 * x[1] + 10 * x[2])

res = minimize(f, [0, 0, 0], method='SLSQP',
    constraints=cons,
    options={'disp': True})

print(res)
