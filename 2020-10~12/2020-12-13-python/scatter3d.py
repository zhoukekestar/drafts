import matplotlib.pyplot as plt
import numpy as np

fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')

pointsA = np.random.normal(loc=[40, 60, 40], scale=15, size=[200, 3])
ax.scatter(pointsA.T[0], pointsA.T[1], pointsA.T[2], marker='o', label="A")


pointsB = np.random.normal(loc=[80, 100, 80], scale=12, size=[100, 3])
ax.scatter(pointsB.T[0], pointsB.T[1], pointsB.T[2], marker='^', label="B")


pointsC = np.random.normal(loc=[20, 110, 20], scale=8, size=[30, 3])
ax.scatter(pointsC.T[0], pointsC.T[1], pointsC.T[2], marker='d', label="C")

ax.set_xlabel('X Label')
ax.set_ylabel('Y Label')
ax.set_zlabel('Z Label')

plt.show();
