from markov import *

Markov.execute('acbacccabbc', [
	# sort
	f('ca', False, 'ac'),
	f('ba', False, 'ab'),	
	f('cb', False, 'bc'),
	# reduce
	f('aa', False, 'a'),
	f('bb', False, 'b'),
	f('cc', False, 'c'),
	# replace
	f('a', False, '1'),
	f('b', False, '1'),
	f('c', False, '1')
])