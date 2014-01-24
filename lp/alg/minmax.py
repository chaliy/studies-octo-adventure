import sys, math, random

class Point(object):
	
	def __init__(self, x, y):
		self._x = x
		self._y = y

	def distanceTo(self, other):
		return math.sqrt(math.pow(self._x - other._x, 2) + math.pow(self._y - other._y, 2))

	def __repr__(self):
		return "(" + str(self._x) + "; " + str(self._y) + ")"

class Clusterizable(object):
	def __init__(self, points):
		self._points = points
		self._z_points = []		

	def dump_points(self):
		print(self._points)

	def dump_cluster(self):		
		print("Cluster centers with 0.5 thresold:")
		print(self._z_points)

	def cluster(self):		

		self._z_points = [self._points[0]]
		max_distances = []

		while True:

			other_points = filter(lambda x: x not in self._z_points, self._points)

			def row_min_distance(other_point):
				min_distance = 10000 # Should be max int
				min_point = None
				for z_point in self._z_points:
					item_distance = other_point.distanceTo(z_point)
					if item_distance < min_distance:
						min_distance = item_distance
						min_point = other_point

				return (min_point, min_distance)

			def col_max_distance(other_points):

				max_distance = 0
				max_point = None

				for other_point in other_points:

					row_distance = row_min_distance(other_point)					
					item_distance = row_distance[1]
					if item_distance > max_distance:
						max_distance = item_distance
						max_point = row_distance[0]

				return (max_point, max_distance)



			result = col_max_distance(other_points)
			max_distance = result[1]
			max_point = result[0]

			if len(max_distances) == 0 or (max_distance > min(max_distances) / 2):
				max_distances.append(max_distance)
				self._z_points.append(max_point)
			else:
				return
