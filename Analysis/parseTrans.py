import json
import csv

adds = 0
i = 0
OUTPUT_FILE = 'data_trans_test.csv'

transFileNames = ['trans_files/data_trans.txt',
'trans_files/data_trans_temp.txt',
'trans_files/data_trans_temp1.txt'
]

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
    writer.writerow(["participantNo", "inputType", "trialNo", "inputTime", "prepTime", "msg", "orgMsg", "msgLen",
        "wpm", "incorrect_fixed", "fixes", "taskType", "setNum", "totalTime", "entryTime", "corrTime", "acCount"])


for fileName in transFileNames:
    with open(fileName, 'r', encoding="utf8") as f:
        test =  json.loads(f.read())

        #calc WPM, sum of all deletions, number of deletes

        with open(OUTPUT_FILE, 'a', newline='') as out:
            writer = csv.writer(out, delimiter=',')
           
            for i in range(0, len(test)):
                taskType = ''
                acCount = 0

                if test[i]["transOn"] == 'true':
                    taskType = 'Transcription'

                if "keyStrokes" in test[i]:
                    inputTime = int(test[i]['keyStrokes'][-1][0]) - int(test[i]['keyStrokes'][0][0])
                else:
                    continue
                    
                totalTime = int(test[i]['stopInputTime']) - int(test[i]['startThinkTime'])
                entryTime = int(test[i]['stopInputTime']) - int(test[i]['keyStrokes'][0][0])
                sumDels, numDels, corrTime = getDels(test[i]['keyStrokes'])

                if (test[i]['inputType'] == "Keyboard"):
                    acCount = autocorrect(test[i]['keyStrokes'])
                else:
                    acCount = 0

                
                writer.writerow([test[i]['participantNo'], test[i]['inputType'], 
                    test[i]['trialNo'], inputTime, test[i]['thinkTime'], test[i]['msg'], test[i]['origMsg'],
                    len(test[i]['msg']), get_wpm(len(test[i]['msg']), float(inputTime) / 1000.0),
                    sumDels, numDels, taskType, test[i]['setNum'], totalTime, entryTime, corrTime, acCount])

