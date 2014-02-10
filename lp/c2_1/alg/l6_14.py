import pydot

# [23, 55, 47, 35, 10, 90, 84, 30]

g1 = pydot.Dot(graph_type='graph')
g1.add_node(pydot.Node("23-55"))
g1.write_png('l6_14_1.png')

g2 = pydot.Dot(graph_type='graph')
g2.add_edge(pydot.Edge("47", "23"))
g2.add_edge(pydot.Edge("47", "55"))
g2.write_png('l6_14_2.png')

g3 = pydot.Dot(graph_type='graph')
g3.add_edge(pydot.Edge("47", "23-35"))
g3.add_edge(pydot.Edge("47", "55"))
g3.write_png('l6_14_3.png')

g4 = pydot.Dot(graph_type='graph')
g4.add_edge(pydot.Edge("23-47", "10"))
g4.add_edge(pydot.Edge("23-47", "35"))
g4.add_edge(pydot.Edge("23-47", "55"))
g4.write_png('l6_14_4.png')

g5 = pydot.Dot(graph_type='graph')
g5.add_edge(pydot.Edge("23-47", "10"))
g5.add_edge(pydot.Edge("23-47", "35"))
g5.add_edge(pydot.Edge("23-47", "55-90"))
g5.write_png('l6_14_5.png')

g6 = pydot.Dot(graph_type='graph')
g6.add_edge(pydot.Edge("47", "23"))
g6.add_edge(pydot.Edge("47", "84"))
g6.add_edge(pydot.Edge("23", "10"))
g6.add_edge(pydot.Edge("23", "35"))
g6.add_edge(pydot.Edge("84", "58"))
g6.add_edge(pydot.Edge("84", "90"))
g6.write_png('l6_14_6.png')

g7 = pydot.Dot(graph_type='graph')
g7.add_edge(pydot.Edge("47", "23"))
g7.add_edge(pydot.Edge("47", "84"))
g7.add_edge(pydot.Edge("23", "10"))
g7.add_edge(pydot.Edge("23", "30-35"))
g7.add_edge(pydot.Edge("84", "58"))
g7.add_edge(pydot.Edge("84", "90"))
g7.write_png('l6_14_7.png')