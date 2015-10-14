# coding=utf-8
import networkx as nx
import numpy as np

G=nx.Graph()
G.add_edge(0, 1, weight=2)
G.add_edge(1, 3, weight=5)
G.add_edge(1, 2, weight=1)
G.add_edge(3, 2, weight=3)
G.add_edge(2, 0, weight=4)
V = 4
print(G.nodes())
print(G.edges(data='weight'))

# Таблиця відстаней

dt = np.full((V,V), np.inf)
for x,y,w in G.edges(data='weight'):
    dt[x,y] = dt[y,x] = w

# Таблиця послідовностей
st = np.matrix([
    [0, 2, 3, 4],
    [1, 0, 3, 4],
    [1, 2, 0, 4],
    [1, 2, 3, 0]
])

print(dt)
# print(st)
