from kmeans import *
from point import *

s = KMeans([
		Point(5,5), 
		Point(6,6), 
		Point(7,7), 
		Point(8,8), 
		Point(7,15), 
		Point(8,15), 
		Point(9,15), 
		Point(10,15), 
		Point(11,15),
		Point(14,2), 
		Point(15,3), 
		Point(16,4)
	])

s.dump_points()
	
s.cluster(3)
s.dump_cluster()

s.plot_cluster('k2_1_9');