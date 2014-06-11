# coding=utf8
import operator
from utils import *

class ClothesSet(object):
	def __init__(self, name, temp_min, temp_max, clothes, weight):		
		self.name = name
		self.temp_min = temp_min
		self.temp_max = temp_max
		self.clothes = clothes
		self.weight = weight

	def get_price(self):
		return self.weight * 10;

	def __repr__(self):
		return self.name + ": " + str(self.temp_min) + '..' + str(self.temp_max) + ': ' + ', '.join(self.clothes)

class ClothesItem(object):
	def __init__(self, name, weight, price):
		self.name = name
		self.weight = weight
		self.price = price


class MonthCalculation(object):
	def __init__(self, tag, clothes_set, clothes_diff, added_price, full_price):
		self.tag = tag
		self.clothes_set = clothes_set
		self.clothes_diff = clothes_diff
		self.added_price = added_price
		self.full_price = full_price

	def __repr__(self):
		return "(Diff: " + str(self.clothes_diff) + "; Added price: " + str(self.added_price) + ")"


class ClothesSolver(object):
	def __init__(self, all_clothes_sets, all_clothes, temps):
		self.all_clothes_sets = all_clothes_sets
		self.all_clothes = all_clothes
		self.temps = temps

	def _calculate_clothes_diff(self, clothes_set, temp):		
		applicable_set = next((x for x in self.all_clothes_sets if x.temp_min < temp <= x.temp_max), None)

		return [ x for x in applicable_set.clothes if not x in clothes_set.clothes ]

	def _calculate_added_price_of_clothes(self, clothes):		
		def get_price_for_item(clothes_item):
			return next(x for x in self.all_clothes if x.name == clothes_item).price
		return sum(get_price_for_item(x) + 2.0 for x in clothes)


	def calculate_options(self, monthes):

		def calulate_monthes(clothes_set):
			def calulate_month(m):
				temp = self.temps[m]
				clothes_diff = self._calculate_clothes_diff(clothes_set, temp)
				added_price = self._calculate_added_price_of_clothes(clothes_diff)
				full_price = clothes_set.get_price() + added_price
				return MonthCalculation(m, clothes_set, clothes_diff, added_price, full_price)

			return [calulate_month(m) for (m,_) in monthes]

		return [ (cs, calulate_monthes(cs)) for cs in self.all_clothes_sets ]

	def find_best_strategy(self, monthes):	

		probabilities = [p for (_, p) in monthes]

		def expected_favor(calculations):
			return sum(-calculation.full_price * probabilities[calculation_index] 
				for calculation_index, calculation in enumerate(calculations))

		options = self.calculate_options(monthes)
		expected_favors = [(clothes_set, expected_favor(calculations)) 
							for (clothes_set, calculations) in options]

		return sorted(expected_favors, key=operator.itemgetter(1), reverse=True)
