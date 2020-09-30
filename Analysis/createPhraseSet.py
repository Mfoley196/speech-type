import json
import csv
import random
from operator import itemgetter
from collections import OrderedDict
from string import punctuation
import re
#import numpy

#Which participant to start at
START_PARTICIPANTS = 29
#How many participants in total
NUM_OF_PARTICIPANTS = 30


phLen = {}
phrGoodLen = {}
#lengths = numpy.array([])
phSum = 0
phAvg = 0
lenUL = 0
lenLL = 0
megaKey = []
megaSpeech = []
selectedPhrs = []

MSG_COL = 6
PART_COL = 0
INPUT_TYPE = 1
LEN_COL = 7
FILE_NAME = "data_comp.csv"

row_count = 0

with open(FILE_NAME, 'r', encoding="utf8") as f:
    test =  csv.reader(f, delimiter=",")

    row_count = sum(1 for row in test)

# with open(FILE_NAME, 'r', encoding="utf8") as f:
#     test =  csv.reader(f, delimiter=",")

#     #Create dictionary of all phrases and their lengths
#     for row in test:
#         phLen[row[MSG_COL]] = len(row[MSG_COL])
#         #lengths = numpy.append(lengths, len(test[i]['msg']))
#         phSum += len(row[MSG_COL])

#     phLenSorted = sorted(phLen.items(), key=itemgetter(1))

#     phAvg = phSum / row_count

#     startIndex = 0
#     stopIndex = 0
#     for i in range(len(phLenSorted)):
#         if phLenSorted[i][1] == round(phAvg):
#             if startIndex == 0:
#                 startIndex = i
#                 stopIndex = i
#             selectedPhrs.append(phLenSorted[i][0])
#             stopIndex = stopIndex + 1

#     #selectedPhrs.append("ads")
#     if len(selectedPhrs) < 20:
#         diff = 20 -len(selectedPhrs)
        
#         if diff % 2 == 0:
#             for i in phLenSorted[startIndex-1:startIndex-(diff // 2)-1:-1]:
#                 selectedPhrs.append(i[0])

#             for i in phLenSorted[stopIndex:stopIndex+(diff // 2)]:
#                 selectedPhrs.append(i[0])
#         else:
#             for i in phLenSorted[startIndex-1:startIndex-(diff // 2)-1:-1]:
#                 selectedPhrs.append(i[0])

#             for i in phLenSorted[stopIndex:stopIndex+(diff // 2)+1]:
#                 selectedPhrs.append(i[0])

#     # Shuffle phrases, and divide into sets C & D
#     random.shuffle(selectedPhrs)

#     setC = selectedPhrs[:10]
#     setD = selectedPhrs[10:]

#     #Write sets C & D to file
#     with open("transcription/setC.txt", "w") as f2:
#         for i in setC:
#             #print(re.sub('[.]', '', i.lower().rstrip()))
#             #print(i.rstrip().translate(str.maketrans('', '', punctuation)))
#             f2.write("%s\n" % (re.sub('[.]', '', i.rstrip())))

#     with open("transcription/setD.txt", "w") as f2:
#         for i in setD:
#             f2.write("%s\n" % (re.sub('[.]', '', i.rstrip())))



#Group phrases into arrays based on participantNo and inputType
for i in range(START_PARTICIPANTS, NUM_OF_PARTICIPANTS+1):
    print(i)
    phrasesKey = []
    phrasesSpeech = []

    with open(FILE_NAME, 'r', encoding="utf8") as f:
        test =  csv.reader(f, delimiter=",")
        next(test, None)
        for j in test:
            if int(j[PART_COL]) == i:
                if j[INPUT_TYPE] == "Keyboard":
                    phrasesKey.append(j[MSG_COL])
                elif j[INPUT_TYPE] == "Speech":
                    phrasesSpeech.append(j[MSG_COL])
        
        megaSpeech.append(phrasesSpeech)
        megaKey.append(phrasesKey)

    #For each participant, randomly select 10 of their phrases and write to file
    for index, phrases in enumerate(megaKey):
        #Remove phrases that are already in selectedPhrs
        for item in phrases:
            if item in selectedPhrs:
                phrases.remove(item)

        #dump sample to file w/ name i + "-keyboard.txt"
        with open("testtranscription/" + str(i) + "-keyboard.txt", 'w') as f:
            for j in random.sample(phrases, 10):
                f.write("%s\n" % (re.sub('[.]', '', j.rstrip())))

    #Create files for speech phrases
    for index, phrases in enumerate(megaSpeech):
        #Remove phrases that are already in selectedPhrs
        for item in phrases:
            if item in selectedPhrs:
                phrases.remove(item)

        #dump sample to file w/ name i + "-keyboard.txt"
        with open("testtranscription/" + str(i) + "-speech.txt", 'w') as f:
            for j in random.sample(phrases, 10):
                f.write("%s\n" % (re.sub('[.]', '', j.rstrip())))