import sys, math, random
from point import *
from pylab import *

class Thresold(object):
    def __init__(self, points):
        self._points = Points.from_tuples(points)
        self._centers = []
        self._clusters = []
        self._t = 0;

    def dump_points(self):
        print(self._points)

    def dump_cluster(self):        
        print("Clusted with T=" + str(self._t) + " :")
        for cluster_index in range(len(self._clusters)):
            center = self._centers[cluster_index]
            cluster = self._clusters[cluster_index]
            print("#" + str(cluster_index + 1) + ": " + str(center) + " " + str(cluster) + "") 

    def plot_cluster(self, file_name):

        colors = ['r','b','g','y','m']

        for cluster_index in range(len(self._clusters)):
            cluster = self._clusters[cluster_index]
            scatter(cluster.x(),cluster.y(), c=colors[cluster_index], label="#" + str(cluster_index))

        legend()

        xlabel('x')
        ylabel('y')
        title('Clustering using thresold')
        grid(True)
        axis('equal')
        savefig(file_name)

    def cluster(self, t):
        self._t = t
        for next in self._points:

            next_handled = False

            print("Process " + str(next))

            for cluster_index in range(len(self._clusters)):
                center = self._centers[cluster_index]                
                distance = center.distanceTo(next)
                print("Distance from " + str(center) + ": " + str(distance))
                if distance <= t:
                    print("Added to cluster " + str(cluster_index))
                    # Create new cluster
                    self._clusters[cluster_index].append(next)
                    next_handled = True;

            if next_handled == False:
                # Create new cluster
                print("New cluster " + str(next))
                self._centers.append(next)
                self._clusters.append(Points([next]))

