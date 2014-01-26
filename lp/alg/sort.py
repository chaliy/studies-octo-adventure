# coding=utf8

def insertion_sort(data):
    
    for i in range(1,len(data)):        
        j = i
        while j > 0 and data[j] < data[j - 1]:
            data[j],data[j - 1] = data[j - 1], data[j]
            j -= 1

        print(str(data[0:i]) + "|" + str(data[i:len(data)]))
    
    return data


def merge_sort(data):

    print("Split " +str(data))

    l = len(data)

    if l == 1:
    	return data

    data1 = merge_sort(data[:l//2])
    data2 = merge_sort(data[l//2:])

    sorted_data = []

    data1_index = 0
    data2_index = 0

    print("Merge: " + str(data1) + " and " + str(data2))

    # Merge
    while data1_index < len(data1) and data2_index < len(data2):
        if data1[data1_index] >= data2[data2_index]:
            sorted_data.append(data2[data2_index])
            data2_index += 1
        else:
            sorted_data.append(data1[data1_index])
            data1_index += 1

    # Put rest of it
    if data1_index < len(data1):
        sorted_data.extend(data1[data1_index:])
    else:
        sorted_data.extend(data2[data2_index:])


    
    return sorted_data


