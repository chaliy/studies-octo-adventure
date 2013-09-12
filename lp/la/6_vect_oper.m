a = [1; -3; -4]
b = [2; 0; -2]

m = a + 3*b
n= a - 2*b

# Sum of multiplications
dot(m,n)

sm = dot(m,n) # Scalar multiplication
lm = sqrt(sum(m.^2)) # Length m
ln = sqrt(sum(n.^2)) # Length n
cosF = sm / (lm * ln) # Cosinus

ssm = lm * ln * cosF

vm = det( [[1, 1, 1]; m'; n'] )

