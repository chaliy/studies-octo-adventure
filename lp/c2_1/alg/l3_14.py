# coding=utf8

# 14. Задано алфавіт A={а,b,c}. Перетворити слово р так, щоб спочатку 
# йшли всі символи а, потім − всі символи b і в кінці − всі символи с. 

from markov import *

machine = Markov('acbacccabbc', [
	f('ca', False, 'ac'),
	f('ba', False, 'ab'),	
	f('cb', False, 'bc')
])

machine.print_program()
machine.run()