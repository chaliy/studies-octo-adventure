from kmeans import *
from point import *

s = KMeans([		
		Point(1,2), 
		Point(1,3), 
		Point(1,4), 
		Point(1,5), 
		Point(2,2), 
		Point(2,3), 
		Point(2,4), 
		Point(3,7), 
		Point(3,8), 
		Point(3,9)
	])

s.dump_points()
	
s.cluster(3)
s.dump_cluster()
s.plot_cluster('k2_1_14');

