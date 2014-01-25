# coding=utf8

# 15. На стрічці машини Тьюрінга знаходиться ціле додатне число, 
# записане в десятковій системі числення. Знайти добуток цього
# числа на число 11. Каретка знаходиться над крайньою правою цифрою числа.

from turing import *

Machine.run(
	Taperecorder([None, '1','4'], 1),
	'movetoend', 'exit',
	{
		predicate('movetoend','0'): transfer('movetoend', '0', 'R'),
		predicate('movetoend','1'): transfer('movetoend', '1', 'R'),
		predicate('movetoend','2'): transfer('movetoend', '2', 'R'),
		predicate('movetoend','3'): transfer('movetoend', '3', 'R'),
		predicate('movetoend','4'): transfer('movetoend', '4', 'R'),
		predicate('movetoend','5'): transfer('movetoend', '5', 'R'),
		predicate('movetoend','6'): transfer('movetoend', '6', 'R'),
		predicate('movetoend','7'): transfer('movetoend', '7', 'R'),
		predicate('movetoend','8'): transfer('movetoend', '8', 'R'),
		predicate('movetoend','9'): transfer('movetoend', '9', 'R'),
		predicate('movetoend', None): transfer('moveprev', '0', '-'),

		predicate('moveprev',None): transfer('exit', None, '-'),
		predicate('moveprev','0'): transfer('getprev', '0', 'L'),
		predicate('moveprev','1'): transfer('getprev', '1', 'L'),
		predicate('moveprev','2'): transfer('getprev', '3', 'L'),
		predicate('moveprev','3'): transfer('getprev', '4', 'L'),
		predicate('moveprev','4'): transfer('getprev', '4', 'L'),
		predicate('moveprev','5'): transfer('getprev', '5', 'L'),
		predicate('moveprev','6'): transfer('getprev', '6', 'L'),
		predicate('moveprev','7'): transfer('getprev', '7', 'L'),
		predicate('moveprev','8'): transfer('getprev', '8', 'L'),
		predicate('moveprev','9'): transfer('getprev', '9', 'L'),

		predicate('getprev', '0'): transfer('add0', '0', 'R'), 
		predicate('getprev', '1'): transfer('add1', '1', 'R'), 
		predicate('getprev', '2'): transfer('add2', '2', 'R'), 
		predicate('getprev', '3'): transfer('add3', '3', 'R'), 
		predicate('getprev', '4'): transfer('add4', '4', 'R'), 
		predicate('getprev', '5'): transfer('add5', '5', 'R'), 
		predicate('getprev', '6'): transfer('add6', '6', 'R'), 
		predicate('getprev', '7'): transfer('add7', '7', 'R'), 
		predicate('getprev', '8'): transfer('add8', '8', 'R'), 
		predicate('getprev', '9'): transfer('add9', '9', 'R'), 
		
		predicate('add4', None): transfer('moveprev', '4', 'L'),
		predicate('add4', '0'): transfer('moveprev', '4', 'L'),
		predicate('add4', '1'): transfer('moveprev', '5', 'L'),
		predicate('add4', '2'): transfer('moveprev', '6', 'L'),
		predicate('add4', '3'): transfer('moveprev', '7', 'L'),
		predicate('add4', '4'): transfer('moveprev', '8', 'L'),
		predicate('add4', '5'): transfer('moveprev', '9', 'L'),
		# predicate('add4', '6'): transfer('moveprev', '8', 'L'),
		# predicate('add4', '7'): transfer('moveprev', '8', 'L'),
		# predicate('add4', '8'): transfer('moveprev', '8', 'L'),
		# predicate('add4', '9'): transfer('moveprev', '8', 'L'),

		predicate('add1', None): transfer('moveprev', '1', 'L'),
		predicate('add1', '0'): transfer('moveprev', '1', 'L'),
		predicate('add1', '1'): transfer('moveprev', '2', 'L'),
		predicate('add1', '4'): transfer('moveprev', '5', 'L'),
	}
)

 