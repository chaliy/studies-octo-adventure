from sort import *

print("Insertsion sort")
data = list("INSERTIONSORT")
result = insertion_sort(data)

print("Result: " + str(result))


print("Merge sort")
data = [23, 55, 47, 35, 10, 90, 84, 30]
result = merge_sort(data)

print("Result: " + str(result))
