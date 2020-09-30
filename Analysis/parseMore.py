import csv
import editdistance


INF_COL = 16
COR_COL = 17
FIXES_COL = 10
INC_FIX_COL = 9
MSG_COL = 5
COR_MSG_COL = 6
COR_G_MSG_COL = 18

def uncorrected_error_rate(row, inf, corr):
    return int(inf) / (float(corr) + int(inf) + int(row[FIXES_COL]))

def corrected_error_rate(row, inf, corr):
    return int(row[INC_FIX_COL]) / (float(corr) + int(inf) + int(row[FIXES_COL]))

def bandwidth(row, inf, corr):
    return int(corr) / (float(corr) + int(inf) + int(row[FIXES_COL]) + int(row[INC_FIX_COL]))

with open('data_comp_test.csv','r') as csvinput:
    with open('parse_more.csv', 'w') as csvoutput:
        w = csv.writer(csvoutput, lineterminator='\n')
        r = csv.reader(csvinput)

        all = []
        row = next(r)
        #print row
        #row.append("inf")
        #row.append("correct")
        row.append("uncorrected_error_rate")
        row.append("corrected_error_rate")
        row.append("bandwidth")
        all.append(row)

        #uncorrected error rate = inf / (correct + inf + fixes)
        #corrected error rate = incorrect-fixed / (correct + inf + fixes)
        #bandwidth = correct / (correct + inf + fixes + incorrect-fixed)

        for row in r:
            if int(row[0]) <= 4 and int(row[2]) == 1:
                continue
    
            inf1 = editdistance.eval(row[MSG_COL].rstrip(), row[COR_MSG_COL].rstrip())
            maxStrLen1 = len(max(row[MSG_COL].rstrip(), row[COR_MSG_COL].rstrip()))
            correct1 = int(maxStrLen1 - inf1)
            uer1 = uncorrected_error_rate(row, inf1, correct1)
            cer1 = corrected_error_rate(row, inf1, correct1)
            bd1 = bandwidth(row, inf1, correct1)

            inf2 = editdistance.eval(row[MSG_COL].rstrip(), row[COR_G_MSG_COL].rstrip())
            maxStrLen2 = len(max(row[MSG_COL].rstrip(), row[COR_G_MSG_COL].rstrip()))
            correct2 = int(maxStrLen2 - inf2)
            uer2 = uncorrected_error_rate(row, inf2, correct2)
            cer2 = corrected_error_rate(row, inf2, correct2)
            bd2 = bandwidth(row, inf2, correct2)

            row.append((uer1 + uer2) / 2)
            row.append((cer1 + cer2) / 2)
            row.append((bd1 + bd2) / 2)
            all.append(row)
        
        w.writerows(all)