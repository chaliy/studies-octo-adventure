import pydot

# [23, 55, 47, 35, 10, 90, 84, 30]

g1 = pydot.Dot(graph_type='graph')
g1.add_edge(pydot.Edge("23", "55"))
g1.write_png('l5_14_1.png')

g2 = pydot.Dot(graph_type='graph')
g2.add_edge(pydot.Edge("23", "55"))
g2.add_edge(pydot.Edge("55", "47"))
g2.write_png('l5_14_2.png')

g3 = pydot.Dot(graph_type='graph')
g3.add_edge(pydot.Edge("23", "47"))
g3.add_edge(pydot.Edge("47", "55"))
g3.write_png('l5_14_3.png')

g4 = pydot.Dot(graph_type='graph')
g4.add_edge(pydot.Edge("47", "23"))
g4.add_edge(pydot.Edge("47", "55"))
g4.write_png('l5_14_4.png')

g5 = pydot.Dot(graph_type='graph')
g5.add_edge(pydot.Edge("47", "23"))
g5.add_edge(pydot.Edge("47", "55"))
g5.add_edge(pydot.Edge("23", "35"))
g5.write_png('l5_14_5.png')

g6 = pydot.Dot(graph_type='graph')
g6.add_edge(pydot.Edge("47", "23"))
g6.add_edge(pydot.Edge("47", "55"))
g6.add_edge(pydot.Edge("23", "10"))
g6.add_edge(pydot.Edge("23", "35"))
g6.write_png('l5_14_6.png')

g7 = pydot.Dot(graph_type='graph')
g7.add_edge(pydot.Edge("47", "23"))
g7.add_edge(pydot.Edge("47", "55"))
g7.add_edge(pydot.Edge("55", "90"))
g7.add_edge(pydot.Edge("23", "10"))
g7.add_edge(pydot.Edge("23", "35"))
g7.write_png('l5_14_7.png')

g8 = pydot.Dot(graph_type='graph')
g8.add_edge(pydot.Edge("47", "23"))
g8.add_edge(pydot.Edge("47", "55"))
g8.add_edge(pydot.Edge("55", "90"))
g8.add_edge(pydot.Edge("90", "84"))
g8.add_edge(pydot.Edge("23", "10"))
g8.add_edge(pydot.Edge("23", "35"))
g8.write_png('l5_14_8.png')

g9 = pydot.Dot(graph_type='graph')
g9.add_edge(pydot.Edge("47", "23"))
g9.add_edge(pydot.Edge("47", "55"))
g9.add_edge(pydot.Edge("55", "90"))
g9.add_edge(pydot.Edge("90", "84"))
g9.add_edge(pydot.Edge("23", "10"))
g9.add_edge(pydot.Edge("23", "35"))
g9.add_edge(pydot.Edge("35", "30"))
g9.write_png('l5_14_9.png')
