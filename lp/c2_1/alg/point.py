import sys, math, random, string

class Point(object):
	
	def __init__(self, x, y):
		self._x = x
		self._y = y

	def distanceTo(self, other):
		return math.sqrt(math.pow(self._x - other._x, 2) + math.pow(self._y - other._y, 2))

	def __repr__(self):
		return "(" + str(self._x) + "; " + str(self._y) + ")"

	@staticmethod
	def find_center(points):
		x_sum = 0
		y_sum = 0
		point_count = len(points)
		for point in points:
			x_sum += point._x
			y_sum += point._y

		return Point(x_sum/point_count, y_sum/point_count)

	@staticmethod
	def find_center(points):
		x_sum = 0
		y_sum = 0
		point_count = len(points)
		for point in points:
			x_sum += point._x
			y_sum += point._y

		return Point(x_sum/point_count, y_sum/point_count)
	

class Points(object):
	def __init__(self, points):
		self._points = points

	def x(self):
		return [ p._x for p in self._points ]

	def y(self):
		return [ p._y for p in self._points ]

	def append(self, point):
		self._points.append(point)

	def __iter__(self):
		for p in self._points:
			yield p

	def __repr__(self):
		str_points = [str(x) for x in self._points ]
		return "[" + string.join(str_points, ", ") + "]"

	@staticmethod
	def array_of(points_points):
		return [ Points(points) for points in points_points ]

	@staticmethod
	def from_tuples(points):
		return Points([ Point(p[0], p[1]) for p in points ])