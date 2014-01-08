A = [7, -6, -1; 3, -3, 4; 4, -3, -5]
B = [0; 0; 0]

# Matrix - Does not work
X = inv(A) * B

# Kramer

det([A(:,2), A(:,3), B])
det([A(:,1), B, A(:,3)])
det([A(:,1), A(:,2), B])