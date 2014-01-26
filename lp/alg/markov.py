# Simple Markov interpretator implementation

from array import array
from collections import namedtuple
import re

f = namedtuple('f', ['match', 'final', 'replace'])

class Markov(object):
	def __init__(self, word, program):
		self._word = word
		self._program = program

	def _apply(self):
		for f in self._program:
			if re.search(f.match, self._word) != None:
				self._word = re.sub(f.match, f.replace, self._word)
				print("Apply " + f.match + " " + ['','|'][f.final] + "-> " + f.replace + ": " + self._word)
				return not f.final		
		return False


	def run(self):
		c = 0;
		print("Start from: " + self._word)
		while self._apply():
			if c == 100:
				raise Exception("Tired to waste CPU")			

		print("End with: " + self._word)
		return self._word

	def print_program(self):
		for f in self._program:
			print(f.match + " " + ['','|'][f.final] + "-> " + f.replace)	

	@staticmethod
	def execute(word, program):
		machine = Markov(word, program)
		return machine.run()


