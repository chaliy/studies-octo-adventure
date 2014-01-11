from array import array
from collections import namedtuple
predicate = namedtuple('P', ['state', 'value'])
transfer = namedtuple('T', ['new_state', 'new_value', 'direction'])

class Taperecorder(object):
	def __init__(self, initial=[]): 
		self._head_position = 0
		self._data = initial

	def read_current(self):		
		return self._data[self._head_position]

	def write(self, v):
		self._data[self._head_position] = v

	def _move_right(self):
		self._head_position += 1
		if self._head_position == len(self._data):
			self._data.append(None)

	def _move_left(self):
		if self._head_position == 0:
			raise Exception("No more tape")
		self._head_position -= 1		

	def move(self, direction):
		if direction == "R":
			self._move_right()			 
		elif direction == "L":
			self._move_left()		

	def __str__(self):
		return "Tape at " + str(self._head_position) + " of " + str(self._data)

class Machine(object):
	def __init__(self, initial_tape, initial_state, final_state, program):
		self._current_state = initial_state
		self._final_state = final_state
		self._tape = Taperecorder(initial_tape)
		self._program = program	

	def _trace_state(self):
		print("State " + str(self._current_state) + "; " + str(self._tape))	

	def step(self):		
		current_char = self._tape.read_current()	
		current_predicate = predicate(self._current_state, current_char)
		if current_predicate in self._program:		

			transfer = self._program[current_predicate]

			self._tape.write(transfer.new_value)
			self._tape.move(transfer.direction)

			self._current_state = transfer.new_state
			return self._current_state != 'q0'

		return False

	def run(initial_tape, initial_state, final_state, program):
		machine = Machine(initial_tape, 
			initial_state, final_state, 
			program
		)

		machine._trace_state()

		while machine.step(): 	
			machine._trace_state()

		machine._trace_state()


Machine.run(
	['a','b','b'],
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