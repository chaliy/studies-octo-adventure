from array import array
from collections import namedtuple
predicate = namedtuple('P', ['state', 'value'])
transfer = namedtuple('T', ['new_state', 'new_value', 'direction'])

class Taperecorder(object):
	def __init__(self, initial=[], head_position = 0): 
		self._head_position = head_position
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
		self._tape = initial_tape
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
			return self._current_state != self._final_state

		return False

	@staticmethod
	def run(initial_tape, initial_state, final_state, program):
		machine = Machine(initial_tape, 
			initial_state, final_state, 
			program
		)

		machine._trace_state()

		while machine.step(): 	
			machine._trace_state()

		machine._trace_state()
