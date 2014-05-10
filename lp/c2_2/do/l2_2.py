from collections import deque
import math
from utils import *

class Container(object):

	def __init__(self, c):
		self._weights = []
		self._indexes = []
		self._c = c

	def add(self, index, weight):
		if (not self.can_fit(weight)):
			raise "There is no anough space in container"
		self._weights.append(weight)
		self._indexes.append(index)

	def add_if_can_fit(self, index, weight):
		if (self.can_fit(weight)):
			self.add(index, weight)
			return True
		return False

	def filled(self):
		return sum(self._weights)

	def can_fit(self, weight):
		return self.filled() + weight <= self._c

	def weights(self):
		return self._weights

	def indexes(self):
		return self._indexes

	def __repr__(self):
		return str(self._weights) 

	def compare_by_filled(a, b):
		return cmp(a.filled(), b.filled())

					
class Containers(list):

	def __init__(self, c, weights):
		self._c = c
		self._weights = weights		
		self.append_empty()

	def append_empty(self):
		self.append(Container(self._c))
		self.last = self[-1]

	def _repr_html_(self):

		table = IPyTable(["Weights"] + self._weights)

		for container_index, container in enumerate(self):			

			container_indexes = container.indexes()

			table.append(["C #" + str(container_index)] 
				+ [(weight if weight_index in container_indexes else "&nbsp;") 
					for weight_index, weight in enumerate(self._weights)])

		return table.to_html()


def _sort_complexity(items):
	n = len(items)
	return n + math.log(n)

def _sorted_transformer(c, weights, alg):
	(containers, o) = alg(c, sorted(weights, reverse=True))	
	return (containers, o + _sort_complexity(weights))

def nfa(c, weights):
	""" Next Fit Algorithm """	
	containers = Containers(c, weights)

	for i, weight in enumerate(weights):
		if (not containers.last.add_if_can_fit(i, weight)):
			containers.append_empty()
			containers.last.add(i, weight)

	return (containers, len(weights))

def nfa_sorted(c, weights):
	return _sorted_transformer(c, weights, nfa)

def ffa(c, weights):
	""" First Fit Algorithm """
	containers = Containers(c, weights)
	o = 0

	for i, weight in enumerate(weights):
		o += 1
		if (not containers.last.add_if_can_fit(i, weight)):
			containers_queue = deque(containers)
			while containers_queue:
				potential_conatiner = containers_queue.popleft()
				o += 1
				if (potential_conatiner.add_if_can_fit(i, weight)):
					break
			else:				
				containers.append_empty()
				containers.last.add(i, weight)

	return (containers, o)

def ffa_sorted(c, weights):
	return _sorted_transformer(c, weights, ffa)

def wfa(c, weights):
	""" Worst Fit Algorithm """
	containers = Containers(c, weights)
	o = 0
	
	for i, weight in enumerate(weights):
		o += 1
		if (not containers.last.add_if_can_fit(i, weight)):
			o += _sort_complexity(containers)
			filled_containers = sorted(containers, Container.compare_by_filled)
			
			potential_conatiner = filled_containers[0]
			o += 1
			if (not potential_conatiner.add_if_can_fit(i, weight)):
				containers.append_empty()
				containers.last.add(i, weight)

	return (containers, o)

def wfa_sorted(c, weights):
	return _sorted_transformer(c, weights, wfa)

def bfa(c, weights):
	""" Best Fit Algorithm """
	containers = Containers(c, weights)
	o = 0

	for i, weight in enumerate(weights):
		o += 1
		if (not containers.last.add_if_can_fit(i, weight)):
			o += _sort_complexity(containers)
			filled_containers = sorted(containers, Container.compare_by_filled)
			
			filled_containers_queue = deque(filled_containers)
			while filled_containers_queue:
				potential_conatiner = filled_containers_queue.pop()
				o += 1
				if (potential_conatiner.add_if_can_fit(i, weight)):					
					break				
			else:				
				containers.append_empty()
				containers.last.add(i, weight)

	return (containers, o)

def bfa_sorted(c, weights):
	return _sorted_transformer(c, weights, bfa)


def min_analitical(c, weights):
	return sum(weights)/c