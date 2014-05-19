# coding=utf8
from l2_4 import *

letters = "VGYJM≡Б457"

# images = list(gen_images(letters))
# print([calc_sign_center_4x4(img) for img in images])
# print([calc_sign_line_y_7(img) for img in images])
# print([calc_sign_line_x_7(img) for img in images])


import pandas as pd
import numpy as np
import matplotlib.pyplot as pt

# alternatives = pd.DataFrame({ 'Q1' : [1, 6, 5, 1, 5, 7, 3, 1],
#                      'Q2' : [4, 2, 7, 5, 2, 4, 2, 5],
#                      'Q3' : [6, 1, 7, 2, 2, 5, 2, 6] })

# print(alternatives)

base_images = list(gen_images(letters))

qualifier_masks = { 
   'S1' : sign_center_4x4_mask,
   'S2' : sign_line_y_7_mask,
   'S3' : sign_line_x_7_mask,
   'S4' : sign_diagonal_mask,
   'S5' : sign_all_pixels_mask
}

base_image_qalifiers = pd.DataFrame({
            key:[calc_sign(img, qualifier_masks[key]) for img in base_images] 
            for key in qualifier_masks })


x1_4 = list(gen_images([letters[0], letters[2], letters[6], letters[8]], fontName = "times.ttf", underline=True))
x5_8 = list(gen_images([letters[1], letters[3], letters[5], letters[7]], fontName = "timesi.ttf"))
x9_11 = list(gen_images([letters[1], letters[4], letters[5]], fontName = "timesbd.ttf"))
x12_15 = list(gen_images([letters[0], letters[3], letters[6], letters[9]], fontName = "verdana.ttf"))
x16 = list(gen_images(['8'], fontName = "times.ttf"))

test_letters = [letters[i] for i in [0, 2, 6, 8, 1, 3, 5, 7, 1, 4, 5, 0, 3, 6, 9]] + ['8']
test_images = x1_4 + x5_8 + x9_11 + x12_15 + x16

comparision_result = calc_image_comparision(base_image_qalifiers, test_images[0], qualifier_masks)

# print(comparision_result)
# #print(minimax_scores(comparision_result, ["S1", "S2", "S3", "S4", "S5"]))
# print(decide_with_minimax(comparision_result, ["S1", "S2", "S3", "S4", "S5"], use_minimum=True))
# print(decide_with_lexicographical_optiomization(comparision_result, ["S1", "S2", "S3", "S4", "S5"], use_minimum=True))


def pareto(data):
    def more_or_equal(x,y):
        return (x[0] >= y[0] and x[1] >= y[1])

    less = data 
    for item in data.iterrows():   
        #print(item)
        less = less[less >= item]

        #next = [x for x in next if (not (more_or_equal(f, x)) or x == f)]

    return less


data = pd.DataFrame({
    "Q1": [7, 9, 0, 3, 9, 9, 1, 5, 7, 1],
    "Q2": [9, 5, 4, 7, 2, 5, 2, 2, 0, 4]
    }, index=list('ABCDEFGHJI'))

#print(data.loc[:,["Q1", "Q2"]])

print(pareto(data.loc[:,["Q1", "Q2"]]))