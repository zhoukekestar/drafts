import matplotlib.pyplot as plt
import numpy as np

pointsA = np.random.normal(loc=[40, 60], scale=15, size=[200, 2])
plt.scatter(pointsA.T[0], pointsA.T[1], marker='o', label="A")


pointsB = np.random.normal(loc=[80, 100], scale=12, size=[100, 2])
plt.scatter(pointsB.T[0], pointsB.T[1], marker='^', label="B")


pointsC = np.random.normal(loc=[20, 110], scale=8, size=[30, 2])
plt.scatter(pointsC.T[0], pointsC.T[1], marker='d', label="C")


plt.show();
