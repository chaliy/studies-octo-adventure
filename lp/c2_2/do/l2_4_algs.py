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
