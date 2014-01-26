# coding=utf8

from array import array
from collections import namedtuple
from utils import *

control = namedtuple('C', ['state', 'value', 'direction', 'new_value', 'new_state'])

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

class Turing(object):
	def __init__(self, initial_tape, initial_state, final_state, program):
		self._current_state = initial_state
		self._final_state = final_state
		self._tape = initial_tape
		self._program = program

	def _trace_state(self):
		print("State " + str(self._current_state) + "; " + str(self._tape))	

	def step(self):		
		current_char = self._tape.read_current()	
		
		current_control = find(lambda x: x.state == self._current_state and x.value == current_char, self._program)

		if current_control:		

			self._tape.write(current_control.new_value)
			self._tape.move(current_control.direction)

			self._current_state = current_control.new_state
			return self._current_state != self._final_state

		return False

	def run_steps(self):
		self._trace_state()

		while self.step(): 	
			self._trace_state()

		self._trace_state()

	def print_program(self):
		for control in self._program:
			
			if control.direction  == 'L':
				direction_disp = "←"
			elif control.direction  == 'R':
				direction_disp = "→"
			else:
				direction_disp = control.direction 

			def fix_falue(s):				
				if s == None:
					return "λ"
				return str(s)

			print("<" 
				+ control.state + ", \"" + fix_falue(control.value) + "\", " 
				+ direction_disp + ", \"" + fix_falue(control.new_value) + "\", " + str(control.new_state) 
				+ ">")	

	@staticmethod
	def run(initial_tape, initial_state, final_state, program):
		machine = Turing(initial_tape, 
			initial_state, final_state, 
			program
		)

		machine.run_steps()
