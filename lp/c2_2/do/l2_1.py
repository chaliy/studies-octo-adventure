def pareto(alternatives):
    def more_or_equal(x,y):
        return (x[0] >= y[0] and x[1] >= y[1])

    next = alternatives	
    for f in alternatives:	
        next = [x for x in next if (not (more_or_equal(f, x)) or x == f)]

    return next

def slater(alternatives):
    def more(x,y):
        return (x[0] > y[0] and x[1] > y[1])

    next = alternatives	
    for f in alternatives:	
        next = [x for x in next if (not (more(f, x)) or x == f)]		

    return next