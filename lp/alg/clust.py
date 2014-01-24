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
		self._centers = []
		self._clusters = []
		self._t = 0;

	def dump_points(self):
		print(self._points)

	def dump_cluster(self):		
		print("Clusted with T=" + str(self._t) + " :")
		for cluster_index in range(0, len(self._clusters)):
			center = self._centers[cluster_index]
			cluster = self._clusters[cluster_index]
			print("#" + str(cluster_index + 1) + ": " + str(center) + " [" + str(cluster) + "]") 

	def cluster(self, t):
		self._t = t
		for next in self._points:

			next_handled = False

			for cluster_index in range(0, len(self._clusters)):
				center = self._centers[cluster_index]				
				distance = center.distanceTo(next)
				if distance < t:
					# Create new cluster
					self._clusters[cluster_index].append(next)
					next_handled = True;				

			if next_handled == False:
				# Create new cluster
				self._centers.append(next)
				self._clusters.append([next])

