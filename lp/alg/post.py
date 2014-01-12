from array import array
from collections import namedtuple
control = namedtuple('c', ['command', 'next_command_index'])

class Taperecorder(object):
	def __init__(self, initial=[]): 
		self._head_position = 0
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


class Machine(object):
	def __init__(self, initial_tape, program):
		self._current_command_index = 1
		self._tape = Taperecorder(initial_tape)
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


	def run(initial_tape, program):
		machine = Machine(initial_tape, 			
			program
		)
		
		print("Start:" + str(machine._tape))

		stepCount = 0

		while machine.step() & (stepCount < 100):
			stepCount += 1			

		print("End:" + str(machine._tape))


# Machine.run(
# 	[0,0,0,1,0,0,0,0],	
# 	{
# 		1: control('R', 2),
# 		2: control('?1', 3),
# 		3: control('X', 4),
# 		4: control('L', 5),
# 		5: control('!', 0),
# 	}
# )


# 2.4
# Machine.run(
# 	[0,0,0,1,1,1,1,1],	
# 	{
# 		1: control('R', 2),
# 		2: control('?1', 3),
# 		3: control('V', 4),
# 		4: control('!', 0),
# 	}
# )

# 5
# Machine.run(
# 	[0,1,1,1],	
# 	{
# 		1: control('?2', 3),
# 		2: control('R', 1),
# 		3: control('R', 4),
# 		4: control('?5', 3),
# 		5: control('V', 6),
# 		6: control('R', 7),
# 		7: control('V', 8),
# 		8: control('!', 0)
# 	}
# )

# 6
# Machine.run(
# 	[1,1,1,0,0,0,1,1],	
# 	{
# 		1: control('X', 2),
# 		2: control('R', 3),
# 		3: control('?4', 2),
# 		4: control('V', 5),
# 		5: control('R', 6),
# 		6: control('?8', 7),
# 		7: control('!', 0),
# 		8: control('L', 9),
# 		9: control('?10', 8),
# 		10: control('R', 1),
# 	}
# )