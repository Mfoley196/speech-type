import re
import string
import csv
from functools import reduce

MSG_COL = 5
totalWordCount = 0
oovWordCount = 0
punctuation = [",", ".", "?", "!"]
#

with open("email64k.txt", 'r') as f:
    common_words = f.read().split("\n")

with open("parse_more.csv", "r") as csvinput:
    r = csv.reader(csvinput)

    row = next(r)
    for trial in r:
        s = trial[MSG_COL].lower().translate(str.maketrans('', '', string.punctuation))
        #s = reduce(lambda a,b: a.replace(b, ''), punctuation, trial[MSG_COL].lower())
        #s = trial[MSG_COL].lower().replace(",", "").replace(".", "").replace("?", "").replace("!", "").replace("\"", "")
        x = s.split()
        #print(x)
        totalWordCount += len(x)
        for word in x:
            if word not in common_words:
                oovWordCount += 1
                print(word)

print(totalWordCount)
print(oovWordCount)
print((oovWordCount/totalWordCount) * 100)