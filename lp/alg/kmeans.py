import sys, math, random
from pylab import *
from point import *

INT_MAX = 100000

class KMeans(object):
	def __init__(self, points):
		self._points = points
		self._centers = []
		self._clusters = []
		self._k = 0

	def dump_points(self):
		print(self._points)

	def dump_cluster(self):		
		print("Cluster with k-means. K=" + str(self._k) + ":")
		for cluster_index in range(0, len(self._clusters)):
			center = self._centers[cluster_index]
			cluster = self._clusters[cluster_index]
			print("#" + str(cluster_index + 1) + ": " + str(center) + " " + str(cluster) + "") 

	def plot_cluster(self, file_name):

		clusters = Points.array_of(self._clusters)

		colors = ['r','b','g','y','m']

		for cluster_index in range(len(clusters)):
			cluster = clusters[cluster_index]
			scatter(cluster.x(),cluster.y(), c=colors[cluster_index], label="#" + str(cluster_index))

		legend()

		xlabel('x')
		ylabel('y')
		title('K-means clustering')
		grid(True)
		axis('equal')
		savefig(file_name)

	def cluster(self, K):
		self._k = K
		
		# Put first points as centers
		self._centers = [self._points[i] for i in range(0, K)]

		while True:

			# Recluster against centers
			self._clusters = [[] for i in range(0, K)]
			for other_point in self._points:
				min_z_point_index = 0
				min_distance = INT_MAX
				for z_point_index in range(len(self._centers)):
					z_point = self._centers[z_point_index]
					item_distance = other_point.distanceTo(z_point)
					
					if item_distance < min_distance:
						min_distance = item_distance
						min_z_point_index = z_point_index

				self._clusters[min_z_point_index].append(other_point)

			# New cluster centers
			centers_moved = False
			for z_point_index in range(len(self._centers)):
				prev_center = self._centers[z_point_index]
				cluster_points = self._clusters[z_point_index]
				new_center = Point.find_center(cluster_points)

				centers_moved = centers_moved or new_center.distanceTo(prev_center) > 0.01

				self._centers[z_point_index] = new_center			

			if not centers_moved:
				return

