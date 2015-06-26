from minmax_clust import *

s = MinMax([
        (-5,-3),
        (-4,-3),
        (-3,-4),
        (-2,-3),
        (4,-2),
        (5,-2),
        (5,-3),
        (6,-3),
        (7,-4),
        (-2,0),
        (-2,1),
        (-1,2),
        (0,2)
	])


s.dump_points()

s.cluster()
s.dump_cluster()
s.plot_cluster('l2');
