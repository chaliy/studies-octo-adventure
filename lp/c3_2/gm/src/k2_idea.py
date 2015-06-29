from sympy import symbols, Matrix, solve_linear_system
from sympy.abc import x, y

S2 = Matrix((
    # x1, x2, x3 ... x6
    (0.0, 0.0, 1.0, 2.0, 0.0, 2.0), # [L]
    (1.0, 0.0, 0.0, 1.0, 0.0, 1.0), # [M]
    (0.0, -1.0, 0.0, -2.0, 1.0, 0.00) # [T]
))

x1, x2, x3, x4, x5, x6 = symbols('x1 x2 x3 x4 x5 x6')

solve_linear_system(S2, x1, x2, x3, x4, x5, x6)
