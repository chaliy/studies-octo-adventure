# coding=utf-8
from numpy import *
from scipy.optimize import minimize

set_printoptions(precision=4, suppress=True)

cons = ({'type': 'ineq', 'fun': lambda x:  25 - 0.2 * x[0] - 0.4 * x[1] - 0.33 * x[2]},
        {'type': 'ineq', 'fun': lambda x:  130 - 5 * x[0] - 8.33 * x[2]},
        {'type': 'ineq', 'fun': lambda x:  16 - 0.6 * x[1] - 0.33 * x[2]},
        {'type': 'ineq', 'fun': lambda x:  7 - 0.2 * x[0] - 0.1 * x[1] - 0.33 * x[2]},
        {'type': 'ineq', 'fun': lambda x:  14 - 0.5 * x[1]},
        {'type': 'ineq', 'fun': lambda x:  x[0]},
        {'type': 'ineq', 'fun': lambda x:  x[1]},
        {'type': 'ineq', 'fun': lambda x:  x[2]}
       )

bnds = ((0, None), (0, None), (0, None))

f = lambda x: -1 * (x[0] + x[1] + x[2])

res = minimize(f, [10, 10, 10], method='SLSQP',
    constraints=cons,
    bounds=bnds,
    options={'disp': True})

print(res)

for c in cons:
    print(c['fun'](res.x))
