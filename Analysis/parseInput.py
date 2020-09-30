import json
import csv

adds = 0
OUTPUT_FILE = 'data_comp_test.csv'

compFileNames = ['comp_files/data.txt', 'comp_files/data_temp.txt', 'comp_files/data_temp1.txt']
#compFileNames = ['comp_files/data_temp1.txt']


def get_wpm(msgLen, inputTime):
    return ((msgLen - 1) / float(inputTime)) * 60 * (1 / 5.0)

def getDels(keyStrokes):
    sumDels = 0
    numDels = 0
    corrTime = 0
    for i in range(0, len(keyStrokes)-1):
        diff = len(keyStrokes[i + 1][1]) - len(keyStrokes[i][1])

        if diff < 0:
            corrTime += int(keyStrokes[i+1][0]) - int(keyStrokes[i][0])
            sumDels += abs(diff)
            numDels += 1
    return sumDels, numDels, corrTime

def autocorrect(keyStrokes):
    count = 0
    for i in range(0, len(keyStrokes)-1):
        diff = len(keyStrokes[i + 1][1]) - len(keyStrokes[i][1])
        if diff > 1:
            count = count + 1
            print(keyStrokes[i])
            print(keyStrokes[i+1])
            print(diff)
    return count

with open(OUTPUT_FILE, 'w', newline='') as out:
    writer = csv.writer(out, delimiter=',')
    writer.writerow(["participantNo", "inputType", "trialNo", "inputTime", "prepTime", "msg", "msgLen",
        "wpm", "incorrect_fixed", "fixes", "triad", "taskType", "setNum", "totalTime", "entryTime", "corrTime", "acCount"])

for fileName in compFileNames:
    with open(fileName, 'r', encoding="utf8") as f:
        test =  json.loads(f.read(), encoding="utf8")
        #calc WPM, sum of all deletions, number of deletes
        with open(OUTPUT_FILE, 'a', newline='') as out:
            writer = csv.writer(out, delimiter=',')
            for i in range(0, len(test)):
                taskType = ''
                acCount = 0

                if test[i]["transOn"] == 'false':
                    taskType = 'Composition'

                inputTime = int(test[i]['keyStrokes'][-1][0]) - int(test[i]['keyStrokes'][0][0])

                if (int(test[i]['participantNo']) > 4):
                    totalTime = int(test[i]['stopInputTime']) - int(test[i]['startThinkTime'])
                    entryTime = int(test[i]['stopInputTime']) - int(test[i]['keyStrokes'][0][0])
                elif int(test[i]['trialNo']) == 1:
                    entryTime = 0
                    totalTime = 0
                    #continue
                else:
                    totalTime = int(test[i]['thinkTime']) + int(test[i]['inputTime'])
                    entryTime = int(test[i]['inputTime'])

                sumDels, numDels, corrTime = getDels(test[i]['keyStrokes'])

                if (test[i]['inputType'] == "Keyboard"):
                    acCount = autocorrect(test[i]['keyStrokes'])
                else:
                    acCount = 0
                #print(numDels, corrTime)
                
                writer.writerow([test[i]['participantNo'], test[i]['inputType'], 
                    test[i]['trialNo'], inputTime, test[i]['thinkTime'], test[i]['msg'], 
                    len(test[i]['msg']), get_wpm(len(test[i]['msg']), float(inputTime / 1000.0)),
                    sumDels, numDels, test[i]['triad'], taskType, test[i]['setNum'], 
                    totalTime, entryTime, corrTime, acCount])
            