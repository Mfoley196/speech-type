import os
import random
from numpy.random import choice

dirpath = "C:\\Users\\Margaret\\Desktop\\Research\\myapp\\images\\"

with open("images3.txt", 'w') as f:
    for i in range(0, 20):
        #Select an animal or a person
        dir1 = choice(['animals', 'people'], p=[0.2, 0.8])
        #dir1 = random.choice(['animals', 'people'])
        img1 = random.choice(os.listdir(dirpath + dir1 + "\\"))

        #Select a thing
        img2 = random.choice(os.listdir(dirpath + "things\\"))

        #Select an animal, person, or thing
        dir3 = choice(['animals', 'people', 'things'], p=[0.1, 0.25, 0.65])
        #dir3 = random.choice(['animals', 'people', 'things'])
        img3 = random.choice(os.listdir(dirpath + dir3 + "\\"))

        imgs = [img1, img2, img3]

        random.shuffle(imgs)
        print (imgs[0] + "," + imgs[1] + "," + imgs[2])
        f.write(imgs[0] + "," + imgs[1] + "," + imgs[2] + "\n")