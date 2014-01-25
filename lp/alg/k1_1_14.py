from thresold_clust import *
from point import *

s = Thresold([		
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
	
s.cluster(2)
s.dump_cluster()
s.plot_cluster('k1_1_14');
