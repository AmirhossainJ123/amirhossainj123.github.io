import os
from os import system as do
from time import sleep as wait

def arrayTostring(s):
    str1 = ""
    for ele in s:
        str1 += ele
    return str1

def length(array):
    num = 0
    for _ in array:
        num+=1
    return num

# you are allowed to yoink anything from this python file and don't give ANY credit ;c
def filter(directory):
    directories = []
    dir = [x.replace("\\","/") for x in directory]
    for x in dir:
        if (x.find(".git") == -1):
            directories.append(x)
    return directories
subdirectories = filter([x[0] for x in os.walk(".")])
Submit = []
hasdone = 0
TotalFiles = []
for directory in subdirectories:
    for filename in os.listdir(directory):
        f = os.path.join(directory, filename)
        if os.path.isfile(f) and (f.endswith(".html") or f.endswith(".js") or f.endswith(".css") or f.endswith(".py")):
            f = "C:/Users/AmirhossainJ123/Pictures/website/amirhossainj12345.github.io" + f[1:]
            Submit.append(f)
            print(f)
        if os.path.isfile(f):
            TotalFiles.append(f)
number = 0
for y in Submit:
    A = open(y,"r")
    number += length(arrayTostring(A.read()).replace(" ","").replace("    ","").split("\n"))
print(str(number) + " " + str(length(TotalFiles)) + " " + str(length(Submit)))
B = open("code_range.html","w")
B.write("<h2>Lines of code: " + str(number) + "</h2>\n" + "<h2>Files: " + str(length(TotalFiles)) + "</h2>\n" + "<h2>Files of Code: " + str(length(Submit)) + "</h2>")
B.close()
wait(3)