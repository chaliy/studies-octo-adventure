from clust import *

s = Clusterizable([		
		Point(4.0,5.0), 
		Point(6.0,6.0), 
		Point(7.0,7.0), 
		Point(8.0,8.0),
		Point(7.0,15.0),
		Point(8.0,15.0),
		Point(9.0,15.0),
		Point(10.0,15.0),
		Point(11.0,15.0),
		Point(14.0,2.0),
		Point(15.0,3.0),
		Point(16.0,4.0)
	])

s.dump_points()
	
s.cluster(2)
s.dump_cluster()

s.cluster(3)
s.dump_cluster()