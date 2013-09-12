A = [1, 5, -6; 3, 1, 4; 2, -3, 1]
B = [-15; 13; 9]

NA = [A,B]

rank (A)
rank (NA)

d = det( A )

# Kramer

det([A(:,2), A(:,3), B])
det([A(:,1), B, A(:,3)])
det([A(:,1), A(:,2), B])

# Matrix

(inv (A) * B)