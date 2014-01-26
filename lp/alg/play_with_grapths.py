import networkx as nx

#g=nx.balanced_tree(3,5)

g=nx.Graph()
# g.add_node(1)
# g.add_nodes_from([2,3])
# g.add_edge(1,2)

g.add_node('Golf')
g.add_node('Hummer')
g.add_node('Bmw')
g.add_node('Zaz')
g.add_edge('Golf','Hummer')
g.add_edge('Golf','Zaz')
g.add_edge('Golf','Bmw')
g.add_edge('Bmw','AlfaRomeo')
#labels=dict((n,d['size']) for n,d in g.nodes(data=True))
#nx.pydot_layout(g)
#pos=nx.graphviz_layout(g)
pos=nx.graphviz_layout(g,prog='dot',args='-LO')
#pos=nx.pydot_layout(g,prog='dot')
#nx.draw_graphviz(g,prog='twopi')
nx.draw(g,pos=pos)


import matplotlib.pyplot as plt
from pylab import *

# nx.draw(g)
# nx.draw_random(g)
# nx.draw_circular(g)
# nx.draw_spectral(g)
savefig("sort_tests.png")


# import pydot

# graph = pydot.Dot(graph_type='graph')

# for i in range(3):
#     edge = pydot.Edge("king", "lord%d" % i)
#     graph.add_edge(edge)

# vassal_num = 0
# for i in range(3):
#     for j in range(2):
#         edge = pydot.Edge("lord%d" % i, "vassal%d" % vassal_num)
#         graph.add_edge(edge)
#         vassal_num += 1

# graph.write_png('sort_tests.png')