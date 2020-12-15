import matplotlib.pyplot as plt
import numpy as np
import random

pointsA = np.random.normal(loc=[40, 60], scale=15, size=[200, 2])
plt.scatter(pointsA.T[0], pointsA.T[1], marker='o', label="A")


pointsB = np.random.normal(loc=[80, 100], scale=12, size=[100, 2])
plt.scatter(pointsB.T[0], pointsB.T[1], marker='^', label="B")


pointsC = np.random.normal(loc=[20, 110], scale=8, size=[30, 2])
plt.scatter(pointsC.T[0], pointsC.T[1], marker='s', label="C")

# 所有的点加在一起
points = list(pointsC) + list(pointsB) + list(pointsA)

KNUM = 3

# 获取所有点的取值范围
minX = 999
maxX = 0
minY = 999
maxY = 0

for p in points:
    minX = int(min(minX, p[0]))
    maxX = int(max(maxX, p[0]))
    minY = int(min(minY, p[1]))
    maxY = int(max(maxY, p[1]))

print(minX, maxX, minY, maxY)

# 随机初始化 K 个点
pointsK = []
for num in range(0, KNUM):
    pointsK.append([random.randrange(minX, maxX), random.randrange(minY, maxY)]);

pointsK = np.array(pointsK)
plt.scatter(pointsK.T[0], pointsK.T[1], marker='+', label="K")

# 两点间距离
def pointsLength(a, b):
    return (a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1])

# 分配节点到 K 个中心队列中
def gotoK(points, pointsK):

    # 初始化 K 个队列
    pointsArr = []
    for k in range(len(pointsK)):
        pointsArr.append([])

    for p in points:
        minLen = 999
        minKIndex = 0
        for i, k in enumerate(pointsK):
            if (pointsLength(p, k) < minLen):
                minLen = pointsLength(p, k)
                minKIndex = i
        pointsArr[minKIndex].append(p)

    # for k in range(len(pointsK)):
    #     print(k, len(pointsArr[k]))

    newPointsK = []
    for k in range(len(pointsK)):
        sumx = 0
        sumy = 0
        for p in pointsArr[k]:
            sumx += p[0]
            sumy += p[1]

        if (len(pointsArr[k]) == 0):
            newPointsK.append([pointsK[k][0], pointsK[k][1]])
        else:
            newPointsK.append([sumx / len(pointsArr[k]), sumy / len(pointsArr[k])])
    return newPointsK

plt.show()

def drawABC():
    allp = np.array(points)
    plt.scatter(allp.T[0], allp.T[1], marker='o', label="A")
    # plt.scatter(pointsA.T[0], pointsA.T[1], marker='o', label="A")
    # plt.scatter(pointsB.T[0], pointsB.T[1], marker='^', label="B")
    # plt.scatter(pointsC.T[0], pointsC.T[1], marker='s', label="C")

for i in range(8):
    print(i)
    drawABC()
    pointsK = np.array(gotoK(points, pointsK))
    plt.scatter(pointsK.T[0], pointsK.T[1], marker = '+', label = 'k')
    plt.show()

# print(type(list(pointsC)))


