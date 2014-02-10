# coding=utf8

from array import array
from collections import namedtuple
control = namedtuple('c', ['command', 'next_command_index'])

class Taperecorder(object):
	def __init__(self, initial = [], head_position = 0): 
		self._head_position = head_position
		self._data = initial

	def read_current(self):		
		return self._data[self._head_position]

	def write(self, v):
		self._data[self._head_position] = v

	def move_right(self):
		self._head_position += 1
		if self._head_position == len(self._data):
			self._data.append(0)

	def move_left(self):
		if self._head_position == 0:
			raise Exception("No more tape")
		self._head_position -= 1

	def move_to(self, new_position):
		while new_position > len(self._data):		 	
			self._data.append(0)
		self._head_position = new_position

	def __str__(self):
		descr = "Tape ["
		for i in range(len(self._data)):
			if i == self._head_position:
				descr += ">" + str(self._data[i]) + "<"
			else:
				descr += str(self._data[i])
		return descr + "]"


class Post(object):
	def __init__(self, initial_tape, program, head_position = 0):
		self._current_command_index = 1
		self._tape = Taperecorder(initial_tape, head_position)
		self._program = program	

	def step(self):
		current_control = self._program[self._current_command_index]
		current_command = current_control.command
		next_command_index = current_control.next_command_index

		if current_command == 'L':
			self._tape.move_left()

		elif current_command == 'R':
			self._tape.move_right()

		elif current_command == 'V':
			self._tape.write(1)

		elif current_command == 'X':
			self._tape.write(0)

		elif current_command.startswith('?'):
			current_value = self._tape.read_current()
			if current_value == 0:
				next_command_index = int(current_command.replace("?", ""))

		elif current_command == '!':
			return False
		else:
			raise Exception("Have no idea what command " + current_command + " means")

		print(str(self._current_command_index) + " -> " + str(self._tape))	

		self._current_command_index = next_command_index

		return True

	def print_program(self):
		for key in self._program.keys():
			control = self._program[key]
			command = control.command			
			if command == 'L':
				command_disp = "←"
			elif command == 'R':
				command_disp = "→"
			elif command.startswith('?'):
				command_disp = command.replace("?", "? ") + " :"
			else:
				command_disp = command

			if command == "!":
				print(str(key) + ". " + command_disp)			
			else:
				print(str(key) + ". " + command_disp + " " + str(control.next_command_index))			

	def run_steps(self):
		print("Start:" + str(self._tape))

		stepCount = 0

		while self.step() & (stepCount < 100):
			stepCount += 1			

		print("End:" + str(self._tape))

	@staticmethod
	def run(initial_tape, program, head_position = 0):
		machine = Post(initial_tape, 			
			program, head_position)
		
		machine.run_steps()
