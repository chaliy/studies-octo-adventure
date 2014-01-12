from markov import *

Machine.run('acbacccabbc', [
	f('ca', False, 'ac'),
	f('ba', False, 'ab'),	
	f('cb', False, 'bc')
])