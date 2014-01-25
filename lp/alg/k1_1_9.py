from thresold_clust import *

s = Thresold([		
		(4.0,5.0), 
		(6.0,6.0), 
		(7.0,7.0), 
		(8.0,8.0),
		(7.0,15.0),
		(8.0,15.0),
		(9.0,15.0),
		(10.0,15.0),
		(11.0,15.0),
		(14.0,2.0),
		(15.0,3.0),
		(16.0,4.0)
	])

s.dump_points()
	
s.cluster(2)
s.dump_cluster()

s.cluster(3)
s.dump_cluster()