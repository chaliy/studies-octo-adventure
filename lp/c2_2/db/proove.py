from numpy import *

def proove(p, F, C):

    def build_r():    
        def row(r, ri, C):
            return [ ("A%d" % (ci + 1)) if (c in r) else ("B%d%d" % ((ri + 1), (ci + 1))) for ci, c in enumerate(C)]

        return [row(r, ri, C) for ri, r in enumerate(p)]

    R = build_r()
    print("Initial")
    print(matrix(R))

    I = {
            "A": 0,
            "B": 1,
            "C": 2,
            "D": 3,
            "E": 4
        }

    def key(r, x):
        k = ""
        for xi in x:
            k += r[I[xi]] + ":"
        return k        

    for f in F:
        for r in R:
            x = f[0]
            y = f[1]
            k = key(r, x)

            for ri in R:
                if key(ri,x) == k:
                    for yi in y:
                        ri[I[yi]] = r[I[yi]]            

        print(f)
        print(matrix(R))

    return any([all([v.startswith("A") for v in r]) for r in R])

C = ["A", "B", "C", "D", "E"]

# True test
p = [["A", "D"], ["A", "E"], ["B", "C"], ["B", "D", "E"]]
F = [(["A"], ["B"]),
    (["A"], ["C"]),
    (["E"], ["A"]),
    (["B"], ["C"])]

# Mike
# p = [["A","B"], ["A", "D"], ["D","E"], ["A","B","E"]]
# F = [(["A"], ["B"]),
#     (["A","B"], ["D","E"]),
#     (["C"], ["E"]),
#     (["D"], ["B"])]

# Павлік
# p = [["A", "B"], ["A", "D"], ["D","E"], ["A","B","E"]]
# F = [(["A"], ["C","D"]),
#     (["C"], ["A","D"]),
#     (["A"], ["E"]),    
#     (["C"], ["D","E"])]


print("Proove no looss:", proove(p, F, C))