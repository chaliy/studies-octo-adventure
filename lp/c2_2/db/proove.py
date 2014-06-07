from numpy import *

def proove(F, R):

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

        print(f, R)

    return any([all([v.startswith("A") for v in r]) for r in R])


F = [(["A"], ["B"]),
    (["A","B"], ["D","E"]),
    (["C"], ["E"]),
    (["D"], ["B"])]


R = [
    ["A1", "B12", "A3", "B14", "B15"],
    ["B21", "A2", "A3", "B24", "B25"],
    ["A1", "B32", "B42", "A4", "A5"],
    ["B41", "B42", "A3", "A4", "B45"]]


# F = [(["A"], ["B"]),
#     (["A"], ["C"]),
#     (["E"], ["A"]),
#     (["B"], ["C"])]

# R = [
#     ["A1", "B12", "B13", "A4", "B15"],
#     ["A1", "B22", "B23", "B24", "A5"],
#     ["B31", "A2", "A3", "B34", "B35"],
#     ["B41", "A2", "B43", "A4", "A5"]]


print("Proove no looss:", proove(F, R))