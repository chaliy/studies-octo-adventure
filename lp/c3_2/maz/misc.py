# dic = {'a': 30,'c': 20, 'b': 15, 'd': 10, 'e': 5}
#
# tree = [['b', ['d', 'e']]]
#
# print(tree)

def hoffman(data):
    dic = {}
    i = 0
    while i < len(data):
        current_existing = None
        current_new = ''
        for j in range(i, len(data)):
            current_new = data[i:j+1]
            print('current_new: ' + current_new + "; " + str(i) + "; " + str(j))

            if not current_new in dic.keys():
                dic[current_new] = len(dic.keys())
                i = j
                break
            else:
                current_existing = current_new

        yield dic[current_new]
        i += 1


data = 'TOTOLOTOTOLOTO'

for code in hoffman(data):
    print('Code: ' + str(code))
