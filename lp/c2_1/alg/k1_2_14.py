from minmax_clust import *

s = MinMax([		
		(1,2), 
		(1,3), 
		(1,4), 
		(1,5), 
		(2,2), 
		(2,3), 
		(2,4), 
		(3,7), 
		(3,8), 
		(3,9)
	])

s.dump_points()
	
s.cluster()
s.dump_cluster()
s.plot_cluster('k1_2_14');