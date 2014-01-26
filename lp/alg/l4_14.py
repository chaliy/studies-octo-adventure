from sort import *

data = [23, 55, 47, 35, 10, 90, 84, 30]
print("Insertsion sort: " + str(data))
result = insertion_sort(data)

print("Result: " + str(result))

print("Merge sort: " + str(data))
result = merge_sort(data)

print("Result: " + str(result))