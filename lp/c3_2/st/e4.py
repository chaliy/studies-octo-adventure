from minmax_clust import *

s = MinMax([
        (1,1),
        (1,2),
        (2,2),
        (5,4),
        (5,5)
	])


s.dump_points()

s.cluster()
s.dump_cluster()
s.plot_cluster('e4');
