import sys, math, random
from point import *
from pylab import *

class MinMax(object):
	def __init__(self, points):
		self._points = [ Point(p[0], p[1]) for p in points ]
		self._centers = []		

	def dump_points(self):
		print(self._points)

	def dump_cluster(self):		
		print("Cluster centers with 0.5 thresold:")
		print(self._centers)

	def plot_cluster(self, file_name):

		points = Points(self._points)
		scatter(points.x(),points.y(), c='b', label="Source")

		centers = Points(self._centers)
		scatter(centers.x(),centers.y(), c='r', label="Centers")

		
		legend()

		xlabel('x')
		ylabel('y')
		title('Minmax clustering')
		grid(True)
		axis('equal')
		savefig(file_name)

	def cluster(self):		

		self._centers = [self._points[0]]
		max_distances = []

		while True:

			other_points = filter(lambda x: x not in self._centers, self._points)

			def row_min_distance(other_point):
				min_distance = 10000 # Should be max int
				min_point = None
				for z_point in self._centers:
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
				self._centers.append(max_point)
			else:
				return
