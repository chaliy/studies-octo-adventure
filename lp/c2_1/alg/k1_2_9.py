from minmax_clust import *

s = MinMax([		
		(5,5), 
		(6,6), 
		(7,7), 
		(8,8), 
		(7,15), 
		(8,15), 
		(9,15), 
		(10,15), 
		(11,15),
		(14,2), 
		(15,3), 
		(16,4)
	])

s.dump_points()
	
s.cluster()
s.dump_cluster()
s.plot_cluster('k1_2_9');