from turing import *

Turing.run(
	Taperecorder(['a','b','b']),
	'q1', 'q0',
	[
		control('q1','a', 'R', None, 'q2'),
		control('q1','b', 'R', None, 'q3'),

		control('q2','a', 'R', 'a', 'q2'),
		control('q2','b', 'R', 'b', 'q2'),
		control('q2', None, 'L', 'a', 'q0'),

		control('q3','a', 'R', 'a', 'q3'),
		control('q3','b', 'R', 'b', 'q3'),
		control('q3', None, 'L', 'b', 'q0')
	]
)