from turing import *

Machine.run(
	Taperecorder(['a','b','b']),
	'q1', 'q0',
	{
		predicate('q1','a'): transfer('q2', None, 'R'),
		predicate('q1','b'): transfer('q3', None, 'R'),

		predicate('q2','a'): transfer('q2', 'a', 'R'),
		predicate('q2','b'): transfer('q2', 'b', 'R'),
		predicate('q2', None): transfer('q0', 'a', 'L'),

		predicate('q3','a'): transfer('q3', 'a', 'R'),
		predicate('q3','b'): transfer('q3', 'b', 'R'),
		predicate('q3', None): transfer('q0', 'b', 'L'),
	}
)