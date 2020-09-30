import csv
import editdistance

INF_COL = 17
COR_COL = 18
FIXES_COL = 10
INC_FIX_COL = 9
MSG_COL = 5
COR_MSG_COL = 6

def uncorrected_error_rate(row):
    return int(row[INF_COL]) / float(int(row[COR_COL]) + int(row[INF_COL]) + int(row[FIXES_COL]))

def corrected_error_rate(row):
    return int(row[INC_FIX_COL]) / float(int(row[COR_COL]) + int(row[INF_COL]) + int(row[FIXES_COL]))

def bandwidth(row):
    return int(row[COR_COL]) / float(int(row[COR_COL]) + int(row[INF_COL]) + int(row[FIXES_COL]) + int(row[INC_FIX_COL]))

with open('data_trans_test.csv','r') as csvinput:
    with open('parse_more_trans.csv', 'w') as csvoutput:
        w = csv.writer(csvoutput, lineterminator='\n')
        r = csv.reader(csvinput)

        all = []
        row = next(r)
        #print row
        row.append("inf")
        row.append("correct")
        row.append("uncorrected_error_rate")
        row.append("corrected_error_rate")
        row.append("bandwidth")
        all.append(row)

        #uncorrected error rate = inf / (correct + inf + fixes)
        #corrected error rate = incorrect-fixed / (correct + inf + fixes)
        #bandwidth = correct / (correct + inf + fixes + incorrect-fixed)

        for row in r:
            inf = editdistance.eval(row[MSG_COL].rstrip(), row[COR_MSG_COL].rstrip())
            maxStrLen = len(max(row[MSG_COL].rstrip(), row[COR_MSG_COL].rstrip()))
            #print(row[MSG_COL].rstrip() + "\n" + row[COR_MSG_COL].rstrip())
            #print(inf)

 
            row.append(inf)
            row.append(int(maxStrLen - inf))
            #print(row)

            #print(inf)
            row.append(uncorrected_error_rate(row))
            row.append(corrected_error_rate(row))
            row.append(bandwidth(row))
            all.append(row)
        
        w.writerows(all)