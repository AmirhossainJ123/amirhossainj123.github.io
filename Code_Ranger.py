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
for directory in subdirectories:
    for filename in os.listdir(directory):
        f = os.path.join(directory, filename)
        if os.path.isfile(f) and f.endswith(".html"):
            f = "C:/Users/AmirhossainJ123/Pictures/website/amirhossainj12345.github.io" + f[1:]
            Submit.append(f)
            print(f)
number = 0
for y in Submit:
    A = open(y,"r")
    number += length(arrayTostring(A.read()).replace(" ","").replace("    ","").split("\n"))
print(number)
B = open("code_range.html","w")
B.write("Lines: " + str(number))
B.close()
wait(3)