# coding=utf-8
import numpy as np

def mass_processing(descr, mean_time, intension, n = 1, k = 1):

    intension = intension * k/n

    avr_iterval_E_t = 3600/intension    

    norm_intension_U = round(mean_time/avr_iterval_E_t, 3)
    

    if norm_intension_U >= k:
        return {
            "descr": descr,
            "mean_time": mean_time,            
            "intension": intension,
            "avr_iterval_E_t": avr_iterval_E_t,
            "norm_intension_U": norm_intension_U,
            "can_process": False
        }

    load_p = round(norm_intension_U / k, 3)
    

    probability_occupied_C = 0
    if k == 1:
        probability_occupied_C = norm_intension_U
    elif k == 2:
        probability_occupied_C = (norm_intension_U ** k)/(k + norm_intension_U)
    elif k == 3:
        probability_occupied_C = (norm_intension_U ** k)/((norm_intension_U ** 2) + (4 * norm_intension_U) + 6)
    else:
        raise Exception("Not implemented")
    probability_occupied_C = round(probability_occupied_C, 3)

    
    mean_wait_Wq = round((probability_occupied_C * mean_time) / (k * (1-load_p)))    

    wait_W = mean_wait_Wq + mean_time    

    np_90 = round((mean_time / (k * (1 - load_p))) * np.log(10 * probability_occupied_C))

    return {
        "descr": descr,
        "mean_time": mean_time,            
        "intension": intension,
        "avr_iterval_E_t": avr_iterval_E_t,
        "norm_intension_U": norm_intension_U,
        "can_process": True,
        "load_p": load_p,
        "probability_occupied_C": probability_occupied_C,
        "mean_wait_Wq": mean_wait_Wq,
        "wait_W": wait_W,
        "np_90": np_90
    }

def print_result(res):

    print(res["descr"])
    print("E(s)", res["mean_time"], "sec")
    print("l", res["intension"], "doc/hour")
    print("E(t)", res["avr_iterval_E_t"], "sec")
    print("U", res["norm_intension_U"])

    if res["can_process"]:
        print("p", res["load_p"])
        print("C(k,U)", res["probability_occupied_C"])
        print("Wq", res["mean_wait_Wq"], "sec")
        print("W", res["wait_W"], "sec")
        print("np(90)", res["np_90"], "sec")
    else:
        print("Cannot process workload")
    pass

# mean_time = 40 # sec
# intension = 120 # doc/hour

mean_time = 40 # sec
intension = 160 # doc/hour

# print_result(mass_processing("1 принтер", mean_time, intension))
# print_result(mass_processing("2 принтера(2 пачки)", mean_time, intension, 2, 1))
# print_result(mass_processing("2 принтера(сумісне)", mean_time, intension, 2, 2))

# print_result(mass_processing("3 принтера(3  пачки)", mean_time, intension, 3, 1))
print_result(mass_processing("3 принтера(сумісне)", mean_time, intension, 3, 3))

