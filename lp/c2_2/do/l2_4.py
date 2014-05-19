from PIL import Image, ImageDraw, ImageFont, ImageColor
from utils import *

WHITE_COLOR = ImageColor.getrgb('white')

def gen_images(letters, fontName = "times.ttf", underline=False):
    font = ImageFont.truetype(fontName, 17)

    for (i, v) in enumerate(letters):
            
        img = Image.new("RGB", (17, 17), color=WHITE_COLOR)

        draw = ImageDraw.Draw(img)
        
        draw.text((0, -2), v, font=font, fill="black")

        if underline:
            twidth, theight = draw.textsize(v, font=font)
            draw.line((0, theight + 3, twidth, theight + 3), fill="black")

        del draw

        yield img


def save_images(images):
    for image_index, image in enumerate(images):
        image.save("l2_4_a" + str(image_index) + ".png")

def bw_matrix_from_image(image):
     return BwMatrix([
         [not image.getpixel((x, y)) == WHITE_COLOR for x in range(0,17)] 
         for y in range(0,17)])

def calc_sign(img, mask):
    return sum(1 for p in mask
                 if img.getpixel(p) == WHITE_COLOR)

sign_center_4x4_mask = [ (x, y) for x in range(6,11)
                                for y in range(6,11) ]
sign_line_y_7_mask = [(x, 7) for x in range(0,17)]
sign_line_x_7_mask = [(7, y) for y in range(0,17)]
sign_diagonal_mask = [(x, x) for x in range(0,17)]
sign_all_pixels_mask = [ (x, y) for y in range(0,17)
                                    for x in range(0,17) ]


def bw_matrix_from_mask(mask):
    bitmap = [[False for x in range(0,17)] 
                for y in range(0,17)]

    for (x, y) in mask:
        bitmap[x][y] = True

    return BwMatrix(bitmap)


import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

def linear_convolution_scores(data, criterions, criterian_weights = None):    
    if criterian_weights == None:
        criterian_weights = [1.0 for _ in criterions]

    def calculate_sum(alternative):        
        return sum(alternative[c]*criterian_weights[ci] for ci, c in enumerate(criterions))

    return data.apply(calculate_sum, axis=1)

def decide_with_linear_convolution(data, criterions, criterian_weights = None):    
    scores = linear_convolution_scores(data, criterions, criterian_weights)
    return data[scores == scores.max()]

def maximin_scores(data, criterions, criterian_weights = None):    
    if criterian_weights == None:
        criterian_weights = [1.0 for _ in criterions]

    def calculate_min(alternative):
        return min(alternative[c]*criterian_weights[ci] for ci, c in enumerate(criterions))

    return data.apply(calculate_min, axis=1)

def decide_with_maximin(data, criterions, criterian_weights = None, use_minimum = False):    
    scores = maximin_scores(data, criterions, criterian_weights)
    return data[scores == (scores.min() if use_minimum else scores.max())]


def minimax_scores(data, criterions, criterian_weights = None):    
    if criterian_weights == None:
        criterian_weights = [1.0 for _ in criterions]

    def calculate_min(alternative):
        return max(alternative[c]*criterian_weights[ci] for ci, c in enumerate(criterions))

    return data.apply(calculate_min, axis=1)

def decide_with_minimax(data, criterions, criterian_weights = None, use_minimum = False):    
    scores = minimax_scores(data, criterions, criterian_weights)
    return data[scores == (scores.min() if use_minimum else scores.max())]



def decide_with_lexicographical_optiomization(data, ordered_criterions, use_minimum = False):
    less = data
    for criterion in ordered_criterions:        
        less = less[less[criterion] == (less[criterion].min() if use_minimum else less[criterion].max())]
        if less.shape[0] <= 1:
            break

    return less


def pareto(data, criterions):
    def more_or_equal(x,y):
        return (x[0] >= y[0] and x[1] >= y[1])

    less = data	
    for item in data:	
    	less = less[less[criterion] >= item]

        #next = [x for x in next if (not (more_or_equal(f, x)) or x == f)]

    return less

# def slater(alternatives):
#     def more(x,y):
#         return (x[0] > y[0] and x[1] > y[1])

#     next = alternatives	
#     for f in alternatives:	
#         next = [x for x in next if (not (more(f, x)) or x == f)]		

#     return next


def calc_image_qualifiers(img, qualifier_masks):
    return pd.Series({ key: calc_sign(img, qualifier_masks[key])
            for key in qualifier_masks })

def calc_image_comparision(data, img, qualifier_masks):
    qualifiers = calc_image_qualifiers(img, qualifier_masks)
    return data.apply(lambda x: abs(qualifiers - x), axis=1)


