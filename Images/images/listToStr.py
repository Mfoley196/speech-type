with open("images1.txt", "r+") as f:
    with open("imgsForApp.txt", 'w') as out:
        for line in f:
            pics = ""
            for i in line.strip()[1:-1].split(","):
                pics += i.strip()[1:-1] + ","
            out.write("\"" + pics[:-1] + "\",\n")
        #print line.rstrip()[1:-1].split(",")[0][1:-1]
