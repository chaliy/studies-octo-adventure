# coding=utf8

# 15. На стрічці машини Тьюрінга знаходиться ціле додатне число, 
# записане в десятковій системі числення. Знайти добуток цього
# числа на число 11. Каретка знаходиться над крайньою правою цифрою числа.

from turing import *

machine = Turing(
	Taperecorder([None, '1','4'], 1),
	'movetoend', 'exit',
	[
		control('movetoend','0', 'R', '0', 'movetoend'),
		control('movetoend','1', 'R', '1', 'movetoend'),
		control('movetoend','2', 'R', '2', 'movetoend'),
		control('movetoend','3', 'R', '3', 'movetoend'),
		control('movetoend','4', 'R', '4', 'movetoend'),
		control('movetoend','5', 'R', '5', 'movetoend'),
		control('movetoend','6', 'R', '6', 'movetoend'),
		control('movetoend','7', 'R', '7', 'movetoend'),
		control('movetoend','8', 'R', '8', 'movetoend'),
		control('movetoend','9', 'R', '9', 'movetoend'),
		control('movetoend', None, '-', '0', 'moveprev'),

		control('moveprev',None, '-', None, 'exit'),
		control('moveprev','0', 'L', '0', 'getprev'),
		control('moveprev','1', 'L', '1', 'getprev'),
		control('moveprev','2', 'L', '3', 'getprev'),
		control('moveprev','3', 'L', '4', 'getprev'),
		control('moveprev','4', 'L', '4', 'getprev'),
		control('moveprev','5', 'L', '5', 'getprev'),
		control('moveprev','6', 'L', '6', 'getprev'),
		control('moveprev','7', 'L', '7', 'getprev'),
		control('moveprev','8', 'L', '8', 'getprev'),
		control('moveprev','9', 'L', '9', 'getprev'),

		control('getprev', '0', 'R', '0', 'add0'), 
		control('getprev', '1', 'R', '1', 'add1'), 
		control('getprev', '2', 'R', '2', 'add2'), 
		control('getprev', '3', 'R', '3', 'add3'), 
		control('getprev', '4', 'R', '4', 'add4'), 
		control('getprev', '5', 'R', '5', 'add5'), 
		control('getprev', '6', 'R', '6', 'add6'), 
		control('getprev', '7', 'R', '7', 'add7'), 
		control('getprev', '8', 'R', '8', 'add8'), 
		control('getprev', '9', 'R', '9', 'add9'), 

		control('add1', None, 'L', '1', 'moveprev'),
		control('add1', '0', 'L', '1', 'moveprev'),
		control('add1', '1', 'L', '2', 'moveprev'),
		control('add1', '2', 'L', '3', 'moveprev'),
		control('add1', '3', 'L', '4', 'moveprev'),
		control('add1', '4', 'L', '5', 'moveprev'),
		control('add1', '5', 'L', '6', 'moveprev'),
		control('add1', '6', 'L', '7', 'moveprev'),
		control('add1', '7', 'L', '8', 'moveprev'),
		control('add1', '8', 'L', '9', 'moveprev'),
		control('add1', '9', 'L', '0', 'moveprev'),	#c	
		
		control('add4', None, 'L', '4', 'moveprev'),
		control('add4', '0', 'L', '4', 'moveprev'),
		control('add4', '1', 'L', '5', 'moveprev'),
		control('add4', '2', 'L', '6', 'moveprev'),
		control('add4', '3', 'L', '7', 'moveprev'),
		control('add4', '4', 'L', '8', 'moveprev'),
		control('add4', '5', 'L', '9', 'moveprev'),
		control('add4', '6', 'L', '0', 'moveprev'), #c
		control('add4', '7', 'L', '1', 'moveprev'), #c
		control('add4', '8', 'L', '2', 'moveprev'), #c
		control('add4', '9', 'L', '3', 'moveprev'), #c

		# add1 - add9
	]
)

machine.print_program()

machine.run_steps()